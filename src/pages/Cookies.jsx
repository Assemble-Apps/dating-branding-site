import { motion } from 'framer-motion'
import { Cookie, Settings, BarChart2, ShieldOff, RefreshCw, Mail, ChevronRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Reveal, stagger } from '../components/ui'
import { Heart } from '../components/Decor'

const LAST_UPDATED = 'July 25, 2026'

const toc = [
  { id: 'what', label: 'What are cookies?' },
  { id: 'types', label: 'Cookies we use' },
  { id: 'third-party', label: 'Third-party cookies' },
  { id: 'control', label: 'Your controls' },
  { id: 'updates', label: 'Updates' },
  { id: 'contact', label: 'Contact' },
]

const cookieTypes = [
  {
    icon: Settings,
    name: 'Essential cookies',
    canOptOut: false,
    color: 'from-peach-300 to-blush-400',
    description: "These make the site work. They handle things like keeping you logged in, remembering your session, and basic security checks. Without these, Rissme can't function.",
    examples: ['Session token (keeps you logged in)', 'CSRF protection token', 'Cookie consent record'],
  },
  {
    icon: BarChart2,
    name: 'Analytics cookies',
    canOptOut: true,
    color: 'from-blush-300 to-lilac-400',
    description: 'Help us understand how people use the site - which pages get visited, where users drop off, and how features perform. All data is anonymised and aggregated. We use Google Analytics 4.',
    examples: ['Page views and session duration', 'Button click events (anonymised)', 'Referral source (how you found us)'],
  },
  {
    icon: RefreshCw,
    name: 'Functional cookies',
    canOptOut: true,
    color: 'from-lilac-300 to-blush-300',
    description: "Remember your preferences so you don't have to set them every visit - things like your theme choice or any toggles you've set.",
    examples: ['UI preference settings', 'Locale / language preference'],
  },
  {
    icon: ShieldOff,
    name: 'Advertising cookies',
    canOptOut: false,
    color: 'from-peach-200 to-blush-200',
    description: "We don't use them. Full stop. No ad networks, no retargeting pixels, no Facebook/TikTok conversion tracking.",
    examples: ['None - we don\'t run ad cookies'],
    isNone: true,
  },
]

function Section({ id, title, icon: Icon, children }) {
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

function Bold({ children }) {
  return <span className="font-semibold text-ink-800">{children}</span>
}

export default function Cookies() {
  return (
    <>
      <PageHero
        eyebrow={<><Cookie className="inline h-3.5 w-3.5 -translate-y-0.5" /> cookie policy</>}
        title={<>cookies, <span className="text-gradient">the honest kind.</span></>}
        sub="We use cookies to make the site work and to understand how people use it. Here's exactly what we use and why - no hidden trackers."
      />

      <div className="section pb-24">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/65 bg-white/40 px-6 py-4 text-sm shadow-card backdrop-blur-md">
            <p className="text-ink-700/70"><Bold>Last updated:</Bold> {LAST_UPDATED}</p>
            <p className="text-ink-700/70"><Bold>Applies to:</Bold> rissme.com website</p>
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

          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-6"
          >
            {/* What are cookies */}
            <Section id="what" icon={Cookie} title="What are cookies?">
              <P>Cookies are small text files stored on your device when you visit a website. They let the site remember information about your visit - like whether you're logged in, your preferences, or how you navigated around.</P>
              <P>They're not programs and can't execute code or carry viruses. They're just data. Most of the web uses them; we're transparent about ours.</P>
            </Section>

            {/* Cookie types */}
            <Section id="types" icon={Settings} title="Cookies we use">
              <P>We keep our cookie footprint minimal. Here's everything we use:</P>
              <div className="mt-4 space-y-4">
                {cookieTypes.map((type) => (
                  <div
                    key={type.name}
                    className={`overflow-hidden rounded-2xl border ${type.isNone ? 'border-white/40 bg-white/30' : 'border-white/60 bg-white/40'}`}
                  >
                    <div className="flex items-center justify-between gap-4 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${type.color} text-white`}>
                          <type.icon className="h-4 w-4" />
                        </div>
                        <span className="font-semibold text-ink-800">{type.name}</span>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                        type.isNone
                          ? 'bg-blush-100 text-blush-500'
                          : type.canOptOut
                          ? 'bg-blush-100/80 text-blush-500'
                          : 'bg-ink-800/10 text-ink-700'
                      }`}>
                        {type.isNone ? 'Not used' : type.canOptOut ? 'Optional' : 'Required'}
                      </span>
                    </div>
                    <div className="border-t border-white/40 px-5 py-4">
                      <p className="mb-3 text-sm text-ink-700/80">{type.description}</p>
                      <div className="space-y-1">
                        {type.examples.map((ex) => (
                          <div key={ex} className="flex items-center gap-2 text-sm text-ink-700/65">
                            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${type.isNone ? 'bg-ink-700/30' : 'bg-blush-400'}`} />
                            {ex}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Third-party */}
            <Section id="third-party" icon={BarChart2} title="Third-party cookies">
              <P>Some cookies are set by third-party services we use:</P>
              <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/40">
                <div className="divide-y divide-white/40">
                  {[
                    { name: 'Google Analytics 4', purpose: 'Anonymised site analytics', canOptOut: 'Yes - see below' },
                    { name: 'Resend', purpose: 'Email delivery (no cookie set in browser)', canOptOut: 'N/A' },
                  ].map((row) => (
                    <div key={row.name} className="grid grid-cols-3 gap-2 px-5 py-3.5 text-sm">
                      <span className="font-semibold text-ink-800">{row.name}</span>
                      <span className="text-ink-700/70">{row.purpose}</span>
                      <span className="text-right text-ink-700/70">{row.canOptOut}</span>
                    </div>
                  ))}
                </div>
              </div>
              <P>We don't use Meta Pixel, TikTok Pixel, or any advertising network cookies.</P>
            </Section>

            {/* Controls */}
            <Section id="control" icon={Settings} title="Your controls">
              <P>You have several ways to manage cookies:</P>
              <div className="space-y-3">
                {[
                  { title: 'Browser settings', desc: 'All major browsers let you view, block, or delete cookies. Blocking essential cookies will break login and core site features.' },
                  { title: 'Google Analytics opt-out', desc: 'Install the Google Analytics Opt-out Browser Add-on (available at tools.google.com/dlpage/gaoptout) to prevent your data reaching GA.' },
                  { title: 'Incognito / private mode', desc: "Most cookies are not persisted between private sessions. Good for one-off visits where you don't want cookies saved." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/60 bg-white/30 px-5 py-4">
                    <p className="font-semibold text-ink-800">{item.title}</p>
                    <p className="mt-1 text-sm text-ink-700/80">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Updates */}
            <Section id="updates" icon={RefreshCw} title="Updates">
              <P>We'll update this Cookie Policy when we add new tools or change how we use cookies. The "Last updated" date at the top will reflect any changes.</P>
              <P>For significant changes (like adding a new category of cookie), we'll surface a banner on the site so you know before you continue browsing.</P>
            </Section>

            {/* Contact */}
            <Section id="contact" icon={Mail} title="Contact">
              <P>Cookie questions? Email <Bold>privacy@rissme.com</Bold>. We'll respond within 30 days.</P>
            </Section>

            <Reveal>
              <div className="flex items-center gap-3 rounded-2xl border border-white/65 bg-white/40 px-6 py-4 text-sm text-ink-700/70 shadow-card backdrop-blur-md">
                <Heart className="h-4 w-4 shrink-0 text-blush-400" />
                <p>tl;dr - we use the minimum cookies needed to run the site and understand what's working. No ad trackers, no surprises.</p>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </>
  )
}
