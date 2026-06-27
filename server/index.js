import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { Resend } from 'resend'
import { buildWelcomeEmail } from './welcomeEmail.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.join(__dirname, '..', 'dist')

const PORT = process.env.PORT || 3000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Resend's constructor throws if the key is missing, so this stays null
// until configured rather than crashing the whole server (and taking the
// static site down with it) over a missing third-party key.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// ── Local waitlist storage ───────────────────────────────────────────
// The source of truth for "did we capture this signup" - independent of
// whether Resend is reachable. A transient email-provider hiccup should
// never lose a signup, so this always happens first and gates nothing.
const dataDir = path.join(__dirname, 'data')
const waitlistFile = path.join(dataDir, 'waitlist.csv')
fs.mkdirSync(dataDir, { recursive: true })
if (!fs.existsSync(waitlistFile)) fs.writeFileSync(waitlistFile, 'email,joined_at\n')

const knownEmails = new Set(
  fs
    .readFileSync(waitlistFile, 'utf8')
    .split('\n')
    .slice(1)
    .map((line) => line.split(',')[0])
    .filter(Boolean),
)

// Returns true if this email was newly added (false if it was already on the list).
function saveEmailLocally(email) {
  if (knownEmails.has(email)) return false
  knownEmails.add(email)
  fs.appendFileSync(waitlistFile, `${email},${new Date().toISOString()}\n`)
  return true
}

const app = express()
app.use(express.json())

app.post('/api/waitlist', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase()
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email.' })
  }

  const isNew = saveEmailLocally(email)

  // Everything below is best-effort - the signup is already durably saved
  // above, so a Resend outage should never turn into an error response.
  if (isNew && resend) {
    // Internal heads-up. Resend's sandbox sender works without verifying a
    // domain, but can only deliver to your own account email - fine here
    // since the recipient is always you, not the subscriber.
    if (process.env.WAITLIST_NOTIFY_EMAIL) {
      resend.emails
        .send({
          from: 'onboarding@resend.dev',
          to: process.env.WAITLIST_NOTIFY_EMAIL,
          subject: 'New Rissme waitlist signup',
          text: `${email} just joined the Rissme waitlist.`,
        })
        .then(({ error }) => {
          if (error) console.error('[waitlist] notify email failed (non-fatal):', error)
        })
        .catch((err) => console.error('[waitlist] notify email failed (non-fatal):', err))
    }

    // The actual welcome email, sent to the subscriber. This needs a
    // verified domain in Resend (Resend > Domains > Add domain) - sending
    // to anyone other than your own account email fails until that's done.
    // WAITLIST_FROM_EMAIL should be an address on that verified domain,
    // e.g. hello@rissme.com.
    if (process.env.WAITLIST_FROM_EMAIL) {
      const { subject, text, html } = buildWelcomeEmail(email)
      resend.emails
        .send({ from: process.env.WAITLIST_FROM_EMAIL, to: email, subject, text, html })
        .then(({ error }) => {
          if (error) console.error('[waitlist] welcome email failed (non-fatal):', error)
        })
        .catch((err) => console.error('[waitlist] welcome email failed (non-fatal):', err))
    }

    if (process.env.RESEND_AUDIENCE_ID) {
      resend.contacts
        .create({ email, audienceId: process.env.RESEND_AUDIENCE_ID, unsubscribed: false })
        .catch((err) => console.error('[waitlist] audience save failed (non-fatal):', err))
    }
  }

  return res.status(200).json({ ok: true })
})

// Serve the built site and let React Router handle client-side routes.
app.use(express.static(distPath))
app.use((req, res, next) => {
  if (req.method !== 'GET') return next()
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`rissme server listening on http://localhost:${PORT}`)
})
