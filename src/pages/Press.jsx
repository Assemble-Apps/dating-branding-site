import { motion } from 'framer-motion'
import { Newspaper, Download, Palette, Type, Mail, Copy, Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import { Reveal, SectionHeading, stagger, fadeUp } from '../components/ui'
import { Heart, Sparkle } from '../components/Decor'

const brandColors = [
  { name: 'Deep Pink', hex: '#FF1493', tailwind: 'peach-500', role: 'Primary / CTAs' },
  { name: 'Hot Pink', hex: '#FF69B4', tailwind: 'blush-400', role: 'Accents / Gradients' },
  { name: 'Light Pink', hex: '#FF8DC7', tailwind: 'lilac-400', role: 'Soft highlights' },
  { name: 'Ink', hex: '#100D18', tailwind: 'ink-800', role: 'Body text / Dark BG' },
  { name: 'Mist', hex: '#EDE3D3', tailwind: 'mist-100', role: 'Light surfaces / Text on dark' },
  { name: 'Sand', hex: '#F6F1E7', tailwind: 'sand-100', role: 'Background warmth' },
]

const typefaces = [
  { name: 'Fraunces', role: 'Display / Headlines', sample: 'dating, for real.', weight: '600', note: 'Google Fonts' },
  { name: 'Plus Jakarta Sans', role: 'Body / UI', sample: 'Real humans. No bots.', weight: '400–700', note: 'Google Fonts' },
  { name: 'Caveat', role: 'Doodle / Annotations', sample: 'click me!', weight: '400', note: 'Google Fonts' },
]

const keyFacts = [
  { label: 'Founded', value: '2026' },
  { label: 'HQ', value: 'Delhi, India' },
  { label: 'Stage', value: 'Pre-launch / Waitlist' },
  { label: 'Target audience', value: 'Gen Z, 18–28, India' },
  { label: 'Core differentiator', value: 'Verified-only, no bots' },
  { label: 'Operated by', value: 'Assemble Innovations' },
]

const boilerplate = `Rissme is a Gen Z dating app built on a simple premise: everyone on the app is a real, verified human. Developed by Assemble Innovations and launching in India in 2026, Rissme uses face-liveness verification to eliminate bots and catfish before they can reach users. The app is designed for the 18–28 demographic who want dating to feel like a genuine connection - not a swipe conveyor belt. Rissme is currently in private waitlist mode at rissme.com.`

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-xl border border-white/65 bg-white/52 px-3 py-1.5 text-xs font-semibold text-ink-700 shadow-sm backdrop-blur-md transition-all hover:border-blush-300/50 hover:-translate-y-0.5"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-blush-400" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function Section({ title, eyebrow, children }) {
  return (
    <Reveal>
      <div className="rounded-[2rem] border border-white/65 bg-white/52 p-8 shadow-card backdrop-blur-md sm:p-10">
        <span className="text-xs font-bold uppercase tracking-widest text-blush-400">{eyebrow}</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink-800 sm:text-3xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </Reveal>
  )
}

export default function Press() {
  return (
    <>
      <PageHero
        eyebrow={<><Newspaper className="inline h-3.5 w-3.5 -translate-y-0.5" /> press kit</>}
        title={<>writing about <span className="text-gradient">rissme?</span></>}
        sub="Everything you need to cover us accurately - brand assets, key facts, boilerplate copy, and a direct line to the team."
      />

      <div className="section space-y-8 pb-24">

        {/* Media contact */}
        <Section eyebrow="press contact" title="Get in touch">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Press & media', email: 'press@rissme.com', note: 'Interview requests, fact-checking, embargoed previews' },
              { label: 'Partnerships', email: 'partnerships@rissme.com', note: 'Brand collabs, co-marketing, creator deals' },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl border border-white/60 bg-white/40 px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-widest text-blush-400">{c.label}</p>
                <a href={`mailto:${c.email}`} className="mt-1 flex items-center gap-1.5 font-semibold text-ink-800 hover:text-blush-500">
                  <Mail className="h-4 w-4" /> {c.email}
                </a>
                <p className="mt-1 text-sm text-ink-700/65">{c.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-700/60">We respond to press enquiries within 24 hours on weekdays.</p>
        </Section>

        {/* Key facts */}
        <Section eyebrow="company snapshot" title="Key facts">
          <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/40">
            <div className="divide-y divide-white/40">
              {keyFacts.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <span className="text-sm font-medium text-ink-700/70">{f.label}</span>
                  <span className="text-sm font-semibold text-ink-800">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Boilerplate */}
        <Section eyebrow="standard copy" title="Approved boilerplate">
          <div className="relative rounded-2xl border border-white/60 bg-white/30 p-5">
            <p className="text-sm leading-relaxed text-ink-700/85 pr-16">{boilerplate}</p>
            <div className="absolute right-4 top-4">
              <CopyButton text={boilerplate} />
            </div>
          </div>
          <p className="mt-3 text-sm text-ink-700/55">Please use this copy verbatim when describing Rissme in an article. Contact us if you need a shorter version.</p>
        </Section>

        {/* Brand colors */}
        <Section eyebrow="brand identity" title="Colours">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {brandColors.map((c) => (
              <motion.div key={c.name} variants={fadeUp} className="group overflow-hidden rounded-2xl border border-white/60 bg-white/40">
                <div
                  className="h-16 w-full transition-transform group-hover:scale-105"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="flex items-start justify-between gap-2 p-4">
                  <div>
                    <p className="font-semibold text-ink-800">{c.name}</p>
                    <p className="text-xs text-ink-700/55 mt-0.5">{c.role}</p>
                  </div>
                  <div className="text-right">
                    <CopyButton text={c.hex} />
                    <p className="mt-1 font-mono text-xs text-ink-700/50">{c.hex}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Typography */}
        <Section eyebrow="brand identity" title="Typography">
          <div className="space-y-4">
            {typefaces.map((t) => (
              <div key={t.name} className="flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/40 px-6 py-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink-800">{t.name}</span>
                    <span className="rounded-full bg-blush-100/60 px-2 py-0.5 text-xs text-blush-500">{t.note}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-ink-700/55">{t.role} · {t.weight}</p>
                  <p
                    className="mt-3 text-xl text-ink-800"
                    style={{ fontFamily: t.name === 'Fraunces' ? 'Fraunces, serif' : t.name === 'Caveat' ? 'Caveat, cursive' : '"Plus Jakarta Sans", sans-serif' }}
                  >
                    {t.sample}
                  </p>
                </div>
                <Type className="h-5 w-5 shrink-0 text-blush-300" />
              </div>
            ))}
          </div>
        </Section>

        {/* Logo / assets */}
        <Section eyebrow="brand assets" title="Logos & assets">
          <div className="space-y-4">
            {/* Logo preview */}
            <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/60 bg-white/40 p-8 sm:flex-row">
              {/* Light bg */}
              <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl bg-white p-6">
                <div className="flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-peach-400 to-blush-400 shadow-pill">
                    <Heart className="h-5 w-5 fill-white text-white" />
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-tight text-ink-800">rissme</span>
                </div>
                <span className="text-xs text-ink-700/40">on light</span>
              </div>
              {/* Dark bg */}
              <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl bg-ink-800 p-6">
                <div className="flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-peach-400 to-blush-400 shadow-pill">
                    <Heart className="h-5 w-5 fill-white text-white" />
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-tight text-mist-100">rissme</span>
                </div>
                <span className="text-xs text-mist-300/40">on dark</span>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-blush-300/40 bg-blush-100/20 p-6 text-center">
              <Download className="mx-auto mb-3 h-6 w-6 text-blush-400" />
              <p className="font-semibold text-ink-800">Full brand kit</p>
              <p className="mt-1 text-sm text-ink-700/65">SVG logos, app icons, and brand guidelines are available on request.</p>
              <a
                href="mailto:press@rissme.com?subject=Brand kit request"
                className="mt-4 inline-flex items-center gap-1.5 font-semibold text-blush-500 hover:underline"
              >
                <Mail className="h-4 w-4" /> Request brand kit
              </a>
            </div>
          </div>
        </Section>

        {/* Usage guidelines */}
        <Reveal>
          <div className="rounded-[2rem] border border-white/65 bg-white/52 p-8 shadow-card backdrop-blur-md sm:p-10">
            <span className="text-xs font-bold uppercase tracking-widest text-blush-400">usage guidelines</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink-800">please do / please don't</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-3 font-semibold text-blush-500">✓ Please do</p>
                <ul className="space-y-2">
                  {[
                    'Use the approved boilerplate when describing Rissme',
                    'Link to rissme.com as the official source',
                    'Reach out before publishing if you have questions about our product',
                    'Use the logo on a contrasting background only',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-700/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 font-semibold text-ink-700/60">✗ Please don't</p>
                <ul className="space-y-2">
                  {[
                    'Modify the logo, wordmark, or brand colours',
                    'Use the Rissme name in a way that implies endorsement',
                    'Publish unverified claims about user numbers or financials',
                    'Use brand assets for commercial purposes without written permission',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-700/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-700/30" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  )
}
