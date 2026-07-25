import { motion } from 'framer-motion'
import { ShieldCheck, Eye, Database, Share2, UserCheck, Trash2, Cookie, Mail, ChevronRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Reveal, stagger, fadeUp } from '../components/ui'
import { Heart } from '../components/Decor'

const LAST_UPDATED = 'July 25, 2026'

const toc = [
  { id: 'collect', label: 'What we collect' },
  { id: 'use', label: 'How we use it' },
  { id: 'share', label: 'Who we share it with' },
  { id: 'rights', label: 'Your rights' },
  { id: 'retention', label: 'Data retention' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'children', label: "Children's privacy" },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'Contact us' },
]

function Section({ id, icon: Icon, title, children }) {
  return (
    <Reveal>
      <div id={id} className="scroll-mt-28 rounded-[2rem] border border-white/65 bg-white/52 p-8 shadow-card backdrop-blur-md sm:p-10">
        <div className="mb-6 flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-peach-300 to-blush-400 text-white shadow-sm">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-ink-800 sm:text-3xl">{title}</h2>
        </div>
        <div className="space-y-4 text-ink-700/85 leading-relaxed">{children}</div>
      </div>
    </Reveal>
  )
}

function P({ children }) {
  return <p className="text-[0.975rem]">{children}</p>
}

function UL({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[0.975rem]">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-peach-400 to-blush-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Bold({ children }) {
  return <span className="font-semibold text-ink-800">{children}</span>
}

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow={<><ShieldCheck className="inline h-3.5 w-3.5 -translate-y-0.5" /> privacy policy</>}
        title={<>your data, <span className="text-gradient">your rules.</span></>}
        sub="We built Rissme for real people. That means being straight with you about what data we collect, why we need it, and how you stay in control."
      />

      <div className="section pb-24">
        {/* Meta strip */}
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/65 bg-white/40 px-6 py-4 text-sm shadow-card backdrop-blur-md">
            <p className="text-ink-700/70">
              <Bold>Last updated:</Bold> {LAST_UPDATED}
            </p>
            <p className="text-ink-700/70">
              <Bold>Applies to:</Bold> Rissme app, website, and waitlist
            </p>
            <p className="text-ink-700/70">
              <Bold>Jurisdiction:</Bold> India (IT Act 2000 + DPDP Act 2023)
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-start">
          {/* Table of contents — sticky on desktop */}
          <Reveal>
            <div className="sticky top-28 hidden rounded-[2rem] border border-white/65 bg-white/52 p-6 shadow-card backdrop-blur-md lg:block">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blush-400">On this page</p>
              <nav>
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-700/75 transition-all hover:bg-blush-100/60 hover:text-blush-500"
                      >
                        <ChevronRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Reveal>

          {/* Sections */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-6"
          >
            {/* 1. What we collect */}
            <Section id="collect" icon={Database} title="What we collect">
              <P>To run a dating app that actually works (and keeps out the bots), we need some information from you. Here's exactly what:</P>

              <div className="space-y-5">
                <div>
                  <p className="mb-2 font-semibold text-ink-800">Account & profile info</p>
                  <UL items={[
                    'Name, date of birth, gender identity, and sexual orientation (whatever you choose to share)',
                    'Email address and phone number (for login and account recovery)',
                    'Profile photos you upload',
                    'Bio, prompts, and preferences you set',
                  ]} />
                </div>
                <div>
                  <p className="mb-2 font-semibold text-ink-800">Usage & activity</p>
                  <UL items={[
                    'Swipe history, matches, and messages (to make matching better, not to judge you)',
                    'App activity — features you use, time spent, and how you interact with profiles',
                    'Device info: model, OS version, app version, crash logs',
                    'IP address and broad location (city-level) for safety and fraud prevention',
                  ]} />
                </div>
                <div>
                  <p className="mb-2 font-semibold text-ink-800">Verification data</p>
                  <UL items={[
                    'Selfies taken during the liveness verification check — these are processed to confirm you\'re a real human and then deleted. They are never stored on your profile.',
                    'Face match result (pass/fail) is stored — not the biometric data itself',
                  ]} />
                </div>
                <div>
                  <p className="mb-2 font-semibold text-ink-800">What we do NOT collect</p>
                  <UL items={[
                    'Precise GPS location — we use approximate location only for distance matching',
                    'Contacts, call logs, or anything outside the app',
                    'Sensitive financial info (payments are handled by third-party processors)',
                  ]} />
                </div>
              </div>
            </Section>

            {/* 2. How we use it */}
            <Section id="use" icon={Eye} title="How we use it">
              <P>We use your data to run the app — full stop. Here's the breakdown:</P>
              <UL items={[
                'Matching: showing you profiles and computing compatibility based on your preferences and activity',
                'Safety: detecting bots, fake profiles, harassment, and spam — this is the #1 use case',
                'Verification: running the liveness check to give you (and your matches) the blue badge',
                'Communications: sending you match notifications, important account emails, and (if you opt in) re-engagement nudges',
                'Product improvement: understanding which features land and which ones don\'t — in aggregate, not by watching individuals',
                'Legal compliance: fulfilling our obligations under Indian law (IT Act 2000, DPDP Act 2023)',
              ]} />
              <P>We do <Bold>not</Bold> use your data to train public AI models or sell insights about you to advertisers.</P>
            </Section>

            {/* 3. Who we share it */}
            <Section id="share" icon={Share2} title="Who we share it with">
              <P>Your data is never sold. Period. We share it only where absolutely necessary:</P>
              <UL items={[
                'Other users — your public profile (photos, bio, age, location distance) is shown to potential matches. Messages are visible only to the two people in the chat.',
                'Service providers — cloud hosting (servers that store your data), email delivery, payment processors, and crash-reporting tools. All are bound by data processing agreements.',
                'Law enforcement — only when legally required by a valid court order or government request under Indian law.',
                'Business transfers — if Rissme is acquired or merges, your data may transfer to the new entity. We\'ll notify you before that happens.',
              ]} />
              <P>We share the minimum needed to do the job. No more.</P>
            </Section>

            {/* 4. Your rights */}
            <Section id="rights" icon={UserCheck} title="Your rights">
              <P>Under India's Digital Personal Data Protection Act 2023 (DPDP), you have clear rights over your data:</P>
              <UL items={[
                'Access — request a copy of the personal data we hold about you',
                'Correction — ask us to fix inaccurate or incomplete data',
                'Erasure ("right to be forgotten") — delete your account and all associated data from our systems',
                'Data portability — get your data in a machine-readable format',
                'Withdraw consent — opt out of non-essential processing (like re-engagement emails) at any time',
                'Grievance redressal — raise a complaint with our Data Protection Officer (contact below)',
              ]} />
              <P>To exercise any of these, email us at <Bold>privacy@rissme.com</Bold>. We respond within 30 days. Account deletion can also be done directly in the app: Settings → Delete account.</P>
            </Section>

            {/* 5. Data retention */}
            <Section id="retention" icon={Trash2} title="Data retention">
              <P>We keep your data for as long as your account is active, plus a short period after deletion for legal and safety purposes.</P>
              <UL items={[
                'Active account data: retained while your account exists',
                'Messages: retained for 90 days after a conversation ends, then automatically purged',
                'Verification selfies: deleted immediately after the liveness check passes (within minutes)',
                'Post-deletion: account data is purged within 30 days. Safety logs (block/report records) may be retained for up to 12 months to protect other users',
                'Legal holds: if we\'re required by law to retain data longer, we\'ll only retain what\'s legally necessary',
              ]} />
            </Section>

            {/* 6. Cookies */}
            <Section id="cookies" icon={Cookie} title="Cookies">
              <P>The website uses cookies and similar technologies. Here's what and why:</P>
              <UL items={[
                'Essential cookies: keep you logged in and make the site work. You can\'t opt out of these without breaking the experience.',
                'Analytics cookies: help us understand which pages people visit and where they drop off — using aggregate, anonymised data only (Google Analytics 4).',
                'No advertising cookies: we don\'t run retargeting ads or share cookie data with ad networks.',
              ]} />
              <P>You can manage cookie preferences in your browser settings. Clearing cookies will log you out of the site.</P>
            </Section>

            {/* 7. Children */}
            <Section id="children" icon={ShieldCheck} title="Children's privacy">
              <P>Rissme is strictly <Bold>18+ only.</Bold></P>
              <P>We do not knowingly collect data from anyone under 18. If you believe a minor has created an account, email us immediately at <Bold>safety@rissme.com</Bold> and we will delete the account and all associated data within 24 hours.</P>
              <P>Our verification flow includes a date-of-birth check. Profiles flagged as underage are automatically suspended and reviewed by our safety team.</P>
            </Section>

            {/* 8. Changes */}
            <Section id="changes" icon={Eye} title="Changes to this policy">
              <P>We may update this Privacy Policy when we add features, change how we process data, or as legal requirements evolve. When we do:</P>
              <UL items={[
                'We\'ll update the "Last updated" date at the top of this page',
                'For material changes (changes to what data we collect or who we share it with), we\'ll send you an in-app notification and email at least 14 days before the change takes effect',
                'Your continued use of Rissme after that date means you accept the updated policy',
              ]} />
              <P>We'll never quietly bury important changes in legalese. If something significant changes, we'll say so clearly.</P>
            </Section>

            {/* 9. Contact */}
            <Section id="contact" icon={Mail} title="Contact us">
              <P>Questions, requests, or complaints about how we handle your data:</P>
              <div className="mt-2 overflow-hidden rounded-2xl border border-white/60 bg-white/40">
                <div className="divide-y divide-white/40">
                  {[
                    { label: 'General privacy questions', value: 'privacy@rissme.com' },
                    { label: 'Safety & under-18 reports', value: 'safety@rissme.com' },
                    { label: 'Data Protection Officer', value: 'dpo@rissme.com' },
                    { label: 'Postal address', value: 'Assemble Innovations, India' },
                  ].map((row) => (
                    <div key={row.label} className="flex flex-col gap-0.5 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm font-medium text-ink-700/70">{row.label}</span>
                      <span className="text-sm font-semibold text-ink-800">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <P>We aim to respond within 30 days. For urgent safety concerns, we respond within 24 hours.</P>
            </Section>

            {/* Footer note */}
            <Reveal>
              <div className="flex items-center gap-3 rounded-2xl border border-white/65 bg-white/40 px-6 py-4 text-sm text-ink-700/70 shadow-card backdrop-blur-md">
                <Heart className="h-4 w-4 shrink-0 text-blush-400" />
                <p>This policy is written in plain English on purpose. If something's unclear, reach out — we'd rather explain it than hide behind legalese.</p>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </>
  )
}
