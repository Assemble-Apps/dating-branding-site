import { motion } from 'framer-motion'
import { FileText, UserCheck, MessageSquare, CreditCard, Shield, AlertTriangle, Scale, Mail, ChevronRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Reveal, stagger, fadeUp } from '../components/ui'
import { Heart } from '../components/Decor'

const LAST_UPDATED = 'July 25, 2026'
const EFFECTIVE_DATE = 'July 25, 2026'

const toc = [
  { id: 'acceptance', label: 'Acceptance of terms' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'account', label: 'Your account' },
  { id: 'conduct', label: 'Community conduct' },
  { id: 'content', label: 'Your content' },
  { id: 'premium', label: 'Premium & payments' },
  { id: 'ip', label: 'Intellectual property' },
  { id: 'termination', label: 'Termination' },
  { id: 'liability', label: 'Limitation of liability' },
  { id: 'law', label: 'Governing law' },
  { id: 'contact', label: 'Contact' },
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

function Note({ children }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-blush-200/60 bg-blush-100/40 px-5 py-4">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-blush-400" />
      <p className="text-[0.9rem] text-ink-700/85">{children}</p>
    </div>
  )
}

export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow={<><FileText className="inline h-3.5 w-3.5 -translate-y-0.5" /> terms of service</>}
        title={<>the rules, <span className="text-gradient">kept real.</span></>}
        sub="We keep legalese to a minimum. These terms exist to protect everyone on Rissme - including you. Please read them."
      />

      <div className="section pb-24">
        {/* Meta strip */}
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/65 bg-white/40 px-6 py-4 text-sm shadow-card backdrop-blur-md">
            <p className="text-ink-700/70"><Bold>Last updated:</Bold> {LAST_UPDATED}</p>
            <p className="text-ink-700/70"><Bold>Effective:</Bold> {EFFECTIVE_DATE}</p>
            <p className="text-ink-700/70"><Bold>Operated by:</Bold> Assemble Innovations, India</p>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-start">
          {/* Sticky TOC */}
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
            <Section id="acceptance" icon={FileText} title="Acceptance of terms">
              <P>By creating an account, accessing, or using Rissme (the "App"), you agree to these Terms of Service and our <a href="/privacy" className="font-semibold text-blush-500 hover:underline">Privacy Policy</a>. If you don't agree, don't use the App.</P>
              <P>These terms form a binding legal agreement between you and <Bold>Assemble Innovations</Bold> ("we", "us", "our"). We may update them - we'll notify you of material changes before they take effect.</P>
            </Section>

            <Section id="eligibility" icon={UserCheck} title="Eligibility">
              <Note>Rissme is strictly 18+ only. No exceptions.</Note>
              <P>To use Rissme you must:</P>
              <UL items={[
                'Be at least 18 years old',
                'Be legally permitted to enter into a binding contract under Indian law',
                'Not have been previously banned or removed from Rissme for a policy violation',
                'Not be a convicted sex offender',
              ]} />
              <P>By using the App you represent and warrant that you meet all of the above. We reserve the right to verify age and suspend accounts we reasonably believe are under 18.</P>
            </Section>

            <Section id="account" icon={Shield} title="Your account">
              <P>You're responsible for everything that happens under your account. Keep your login credentials secure and don't share them with anyone.</P>
              <UL items={[
                'Use your real name, real photos, and accurate information on your profile - no catfishing, ever',
                'You may only create one account. Duplicate accounts (especially after a ban) are not permitted',
                'Notify us immediately at support@rissme.com if you suspect unauthorised access to your account',
                "Don't transfer or sell your account to anyone else",
              ]} />
              <P>You can delete your account at any time via Settings → Delete account. Deletion is permanent and removes your data within 30 days.</P>
            </Section>

            <Section id="conduct" icon={MessageSquare} title="Community conduct">
              <P>Rissme is built on the premise that everyone deserves a safe, respectful experience. The following are <Bold>strictly prohibited</Bold>:</P>
              <UL items={[
                'Harassment, hate speech, threats, or bullying of any kind',
                'Sharing explicit content without explicit consent from all parties',
                'Impersonating another person, celebrity, or public figure',
                'Soliciting money, financial information, or sexual services',
                'Sending spam, promotional content, or unsolicited links',
                'Using the App to facilitate illegal activity of any kind',
                'Scraping, reverse engineering, or attempting to extract data from the App',
                'Creating fake, bot-driven, or AI-generated profiles',
              ]} />
              <P>Violations may result in immediate account suspension, permanent ban, and/or referral to law enforcement. We take this seriously.</P>
              <P>You can report any user with one tap on their profile. Reports are reviewed by real humans - we don't just auto-close tickets.</P>
            </Section>

            <Section id="content" icon={MessageSquare} title="Your content">
              <P>You own what you post. By uploading photos, writing a bio, or sending messages on Rissme, you grant us a limited, non-exclusive, royalty-free licence to use, display, and store that content solely for the purpose of operating the App.</P>
              <P>We will never sell your photos or content to third parties, use them in advertising without your consent, or share them outside the App beyond what's described in our Privacy Policy.</P>
              <P>You agree that content you post:</P>
              <UL items={[
                'Is yours to share (you hold the rights or have permission)',
                "Doesn't infringe anyone else's intellectual property, privacy, or rights",
                "Doesn't contain nudity, graphic violence, or illegal material",
                'Is accurate and not misleading',
              ]} />
              <P>We may remove content that violates these rules without notice.</P>
            </Section>

            <Section id="premium" icon={CreditCard} title="Premium & payments">
              <P>Premium plans are available in 3-day, 10-day, and 30-day durations. The 30-day plan includes 3 bonus days.</P>
              <UL items={[
                'All prices are in INR and inclusive of applicable GST',
                "Payments are processed by third-party payment providers - we don't store your card details",
                'Premium features activate immediately upon successful payment',
                'Plans are non-auto-renewing by default - you choose when to top up',
                "Refunds: if a technical issue on our side prevented you from using Premium features you paid for, contact us within 7 days and we'll make it right",
                "We reserve the right to change pricing with 14 days' notice to existing users",
              ]} />
              <Note>Exact pricing is not yet published. By continuing to use the App you acknowledge that pricing will be disclosed before any purchase is required.</Note>
            </Section>

            <Section id="ip" icon={Shield} title="Intellectual property">
              <P>Everything that makes Rissme, Rissme - the logo, design, code, brand, copy, and features - belongs to Assemble Innovations and is protected under Indian and international intellectual property law.</P>
              <P>You may not copy, reproduce, distribute, or create derivative works from any part of the App without our written permission. "Rissme" is a brand name of Assemble Innovations - don't use it in a way that implies endorsement or affiliation.</P>
              <P>If you believe content on Rissme infringes your intellectual property rights, email <Bold>legal@rissme.com</Bold> with details of the alleged infringement.</P>
            </Section>

            <Section id="termination" icon={AlertTriangle} title="Termination">
              <P>You can stop using Rissme and delete your account at any time - no awkward breakup conversation required.</P>
              <P>We may suspend or permanently terminate your account if you:</P>
              <UL items={[
                'Violate any part of these Terms or our Community Guidelines',
                'Engage in behaviour that endangers the safety of other users',
                'Use the App in ways that are fraudulent or harmful to Rissme or third parties',
                'Are found to be under 18',
              ]} />
              <P>Upon termination, your licence to use the App ends immediately. Your data will be deleted in accordance with our <a href="/privacy" className="font-semibold text-blush-500 hover:underline">Privacy Policy</a>.</P>
            </Section>

            <Section id="liability" icon={Scale} title="Limitation of liability">
              <P>The App is provided "as is." We work hard to keep it running smoothly, but we can't guarantee it'll always be available, error-free, or that every match will be your person.</P>
              <P>To the maximum extent permitted by applicable Indian law, Assemble Innovations is not liable for:</P>
              <UL items={[
                'Any indirect, incidental, or consequential damages arising from your use of the App',
                'Loss of data, loss of profits, or loss of goodwill',
                "Actions or content of other users - we moderate, but we can't see everything in real time",
                'Third-party services (payment processors, analytics, etc.) linked to or integrated with the App',
              ]} />
              <P>Nothing in these Terms limits our liability for fraud, death, or personal injury caused by our negligence, as required by Indian law.</P>
            </Section>

            <Section id="law" icon={Scale} title="Governing law">
              <P>These Terms are governed by the laws of India, including the Information Technology Act 2000, the Digital Personal Data Protection Act 2023, and the Consumer Protection Act 2019 where applicable.</P>
              <P>Any disputes will first be attempted to be resolved through good-faith negotiation. If that fails, disputes shall be subject to the exclusive jurisdiction of the courts of <Bold>Bengaluru, Karnataka, India</Bold>.</P>
              <P>If you're a consumer under Indian law, you also have rights under the Consumer Protection Act 2019 that cannot be excluded by these Terms.</P>
            </Section>

            <Section id="contact" icon={Mail} title="Contact">
              <P>Questions about these Terms? Reach out:</P>
              <div className="mt-2 overflow-hidden rounded-2xl border border-white/60 bg-white/40">
                <div className="divide-y divide-white/40">
                  {[
                    { label: 'General queries', value: 'support@rissme.com' },
                    { label: 'Legal & IP', value: 'legal@rissme.com' },
                    { label: 'Data & privacy', value: 'privacy@rissme.com' },
                    { label: 'Registered entity', value: 'Assemble Innovations, India' },
                  ].map((row) => (
                    <div key={row.label} className="flex flex-col gap-0.5 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm font-medium text-ink-700/70">{row.label}</span>
                      <span className="text-sm font-semibold text-ink-800">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Reveal>
              <div className="flex items-center gap-3 rounded-2xl border border-white/65 bg-white/40 px-6 py-4 text-sm text-ink-700/70 shadow-card backdrop-blur-md">
                <Heart className="h-4 w-4 shrink-0 text-blush-400" />
                <p>These terms exist to protect you as much as they protect us. If something's unclear or seems unfair, email us - we'd rather fix it than defend it.</p>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </>
  )
}
