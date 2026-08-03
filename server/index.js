import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import pg from 'pg'
import { Resend } from 'resend'
import { buildWelcomeEmail } from './welcomeEmail.js'

const { Pool } = pg
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.join(__dirname, '..', 'dist')

const PORT    = process.env.PORT || 3000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ── PostgreSQL pool ───────────────────────────────────────────────────
const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME     || 'rissmewaitlistdb',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '',
})

pool.on('error', (err) => console.error('[db] idle client error (non-fatal):', err.message))

// Auto-create table on first boot so the server is self-bootstrapping.
pool.query(`
  CREATE TABLE IF NOT EXISTS waitlist (
    id        SERIAL PRIMARY KEY,
    email     VARCHAR(255) UNIQUE NOT NULL,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    source    VARCHAR(100)
  )
`).then(() => console.log('[db] waitlist table ready'))
  .catch(err => console.error('[db] table init failed:', err.message))

// ── CSV backup (belt-and-suspenders) ─────────────────────────────────
// Postgres is the source of truth. The CSV is a local human-readable
// backup so we never lose a signup even if the DB is unavailable.
const dataDir     = path.join(__dirname, 'data')
const waitlistFile = path.join(dataDir, 'waitlist.csv')
fs.mkdirSync(dataDir, { recursive: true })
if (!fs.existsSync(waitlistFile)) fs.writeFileSync(waitlistFile, 'email,joined_at\n')

function appendCsvBackup(email) {
  try {
    fs.appendFileSync(waitlistFile, `${email},${new Date().toISOString()}\n`)
  } catch (err) {
    console.error('[csv] backup write failed (non-fatal):', err.message)
  }
}

// ── Resend ────────────────────────────────────────────────────────────
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

function fireEmails(email) {
  if (!resend) return

  if (process.env.WAITLIST_NOTIFY_EMAIL) {
    resend.emails
      .send({
        from: 'onboarding@resend.dev',
        to:   process.env.WAITLIST_NOTIFY_EMAIL,
        subject: 'New Rissme waitlist signup',
        text: `${email} just joined the Rissme waitlist.`,
      })
      .catch(err => console.error('[waitlist] notify failed (non-fatal):', err.message))
  }

  if (process.env.WAITLIST_FROM_EMAIL) {
    const { subject, text, html } = buildWelcomeEmail(email)
    resend.emails
      .send({ from: process.env.WAITLIST_FROM_EMAIL, to: email, subject, text, html })
      .catch(err => console.error('[waitlist] welcome failed (non-fatal):', err.message))
  }

  if (process.env.RESEND_AUDIENCE_ID) {
    resend.contacts
      .create({ email, audienceId: process.env.RESEND_AUDIENCE_ID, unsubscribed: false })
      .catch(err => console.error('[waitlist] audience save failed (non-fatal):', err.message))
  }
}

// ── API ───────────────────────────────────────────────────────────────
const app = express()
app.use(express.json())

app.post('/api/waitlist', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase()
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email.' })
  }

  let isNew = false
  try {
    const result = await pool.query(
      `INSERT INTO waitlist (email, source)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [email, req.body?.source || 'website']
    )
    isNew = result.rowCount > 0
    if (isNew) appendCsvBackup(email)
    console.log(`[waitlist] ${isNew ? 'NEW' : 'DUP'} — ${email}`)
  } catch (err) {
    console.error('[waitlist] DB write failed:', err.message)
    appendCsvBackup(email)
    isNew = true
  }

  if (isNew) fireEmails(email)

  return res.status(200).json({ ok: true, alreadyOnList: !isNew })
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
