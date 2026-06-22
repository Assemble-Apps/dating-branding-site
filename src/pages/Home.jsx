import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Plus, Minus, Star, Sparkles, Cake, Zap, Cherry, Headphones, Award, Gift } from 'lucide-react'
import { Button, Reveal, Marquee, SectionHeading, stagger, fadeUp } from '../components/ui'
import { PhoneFrame, SwipeScreen, MatchScreen, ChatScreen } from '../components/PhoneMockup'
import { Heart, Sparkle, Squiggle, FloatingBlobs } from '../components/Decor'
import { TypewriterWord, DrawUnderline, TwinkleSparkle } from '../components/AnimatedText'
import { ScrollPortraitWall } from '../components/ui/scroll-portrait-wall'
import VerifiedReel from '../components/ui/verified-reel'
import {
  stats,
  marqueeWords,
  featureTeasers,
  steps,
  testimonials,
  faqs,
  realOnes,
} from '../data/content'

/* ── Hero ─────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden dreamy-bg pb-20 pt-10 sm:pb-28">
      <FloatingBlobs />
      <div className="section relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative text-center lg:text-left">
          <Reveal>
            <span className="chip">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blush-400" />
              </span>
              now in early access · join the list
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-ink-800 sm:text-6xl lg:text-7xl">
              slide in.
              <br />
              <span className="relative inline-block">
                <TypewriterWord text="for real" delay={0.45} />
                <DrawUnderline className="absolute -bottom-2 left-0 h-5 w-full text-blush-300" delay={1.15} />
                <TwinkleSparkle className="absolute -right-7 -top-5 h-7 w-7 text-lilac-300" delay={1.3} />
              </span>{' '}
              this time.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-lg text-lg text-ink-700/80 lg:mx-0">
              Rissme is dating that feels like a crush, not a chore. Every human is
              verified, every match has a heartbeat, and the ick is strictly not invited.{' '}
              <Heart className="inline h-4 w-4 -translate-y-0.5 fill-blush-400 text-blush-400" />
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button to="/download">
                Get on the list <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/features" variant="ghost">
                See how it works
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 lg:justify-start">
              <div className="flex -space-x-3">
                {[Sparkles, Cake, Zap, Cherry, Headphones].map((Icon, i) => (
                  <span
                    key={i}
                    className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-peach-200 to-lilac-200 shadow-sm"
                  >
                    <Icon className="h-4 w-4 text-ink-800" />
                  </span>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-peach-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-peach-400 text-peach-400" />
                  ))}
                </div>
                <p className="text-sm font-medium text-ink-700/80">
                  loved by <span className="font-bold text-ink-800">2.4M+</span> verified cuties
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Phones */}
        <div className="relative mx-auto h-[600px] w-full max-w-md">
          <motion.div
            className="absolute left-1/2 top-4 z-20 -translate-x-1/2"
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <PhoneFrame>
                <SwipeScreen />
              </PhoneFrame>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -right-2 top-40 z-30 hidden w-[180px] sm:block"
            initial={{ opacity: 0, x: 30, rotate: 8 }}
            animate={{ opacity: 1, x: 0, rotate: 8 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="rounded-[1.8rem] border-[7px] border-plum-900 bg-plum-900 shadow-card">
                <div className="h-[320px] w-full overflow-hidden rounded-[1.3rem]">
                  <MatchScreen />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <Heart className="absolute left-2 top-24 h-10 w-10 animate-floaty text-blush-300" />
          <Sparkle className="absolute right-10 top-8 h-8 w-8 animate-floatySlow text-lilac-300" />
          <Heart className="absolute bottom-16 left-8 h-7 w-7 animate-floatySlow text-peach-300" />
          <Sparkle className="absolute bottom-24 right-2 h-6 w-6 animate-floaty text-blush-300" />
        </div>
      </div>
    </section>
  )
}

/* ── Marquee strip ────────────────────────────────────────────────── */
function MarqueeStrip() {
  const items = marqueeWords.map((w, i) => (
    <span key={i} className="flex items-center gap-10">
      <span className="font-display text-2xl font-medium italic text-mist-200/90 sm:text-3xl">{w}</span>
      <Heart className="h-5 w-5 text-blush-300" />
    </span>
  ))
  return (
    <div className="border-y border-ink-800/10 py-5" style={{ background: 'rgba(15,10,20,0.88)', backdropFilter: 'blur(12px)' }}>
      <Marquee items={items} />
    </div>
  )
}

/* ── Stats ────────────────────────────────────────────────────────── */
function Stats() {
  return (
    <section className="section py-16 sm:py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="glass rounded-4xl p-7 text-center shadow-card"
          >
            <div className="inline-flex items-center gap-1.5 font-display text-4xl font-semibold text-gradient sm:text-5xl">
              {s.value}
              {s.icon && <s.icon className="h-7 w-7 fill-peach-400 text-peach-400 sm:h-8 sm:w-8" />}
            </div>
            <div className="mt-2 text-sm font-medium text-ink-700/70">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ── Real Ones scroll wall ────────────────────────────────────────── */
function RealOnesWall() {
  return (
    <section className="relative">
      <div className="section pb-2 pt-4 text-center">
        <Reveal>
          <span className="chip mx-auto inline-flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5" /> the realness check
          </span>
        </Reveal>
      </div>
      <ScrollPortraitWall
        title="real ones"
        date="no bots, ever"
        hint="scroll to meet the cuties"
        speakers={realOnes}
        columns={3}
        showCaptions
      />
    </section>
  )
}

/* ── Feature teasers ──────────────────────────────────────────────── */
function Features() {
  return (
    <section className="section py-16 sm:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="why it hits different"
          title={<>built for butterflies,<br className="hidden sm:block" /> not boredom</>}
          sub="Everything about Rissme is designed to get you off the app and into something real."
        />
      </Reveal>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-14 grid gap-5 sm:grid-cols-2"
      >
        {featureTeasers.map((f) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-4xl border border-white/65 bg-white/52 p-7 shadow-card backdrop-blur-md sm:p-9"
          >
            <div className="relative z-10">
              <div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${f.tone} shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                <f.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-ink-800">{f.title}</h3>
              <p className="mt-3 text-ink-700/75">{f.body}</p>
            </div>
            <f.icon className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 text-blush-200/60 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ── How it works ─────────────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="section">
        <Reveal>
          <SectionHeading
            eyebrow="three taps to a crush"
            title="how rissme works"
            sub="No 40-question personality quiz. No paywall to say hi. Just you, your vibe, and verified humans nearby."
          />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative h-full rounded-4xl border border-white/65 bg-white/52 p-8 text-center shadow-card backdrop-blur-md">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-peach-400 to-blush-400 px-4 py-1 font-display text-sm font-bold text-white shadow-pill">
                  step {s.n}
                </span>
                <div className="mx-auto mt-3 grid h-20 w-20 place-items-center rounded-blob bg-gradient-to-br from-peach-400 via-blush-400 to-lilac-400 shadow-sm animate-blob">
                  <s.icon className="h-9 w-9 text-white" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-ink-800">{s.title}</h3>
                <p className="mt-3 text-ink-700/75">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Verified callout ─────────────────────────────────────────────── */
function VerifiedCallout() {
  return (
    <section className="section py-16">
      <Reveal>
        <div className="relative grid items-center gap-10 overflow-hidden rounded-[2.5rem] mesh-panel p-8 shadow-card sm:p-14 lg:grid-cols-[1fr_0.8fr]">
          <FloatingBlobs />
          <div className="relative">
            <span className="eyebrow">the green-flag guarantee</span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-mist-100 sm:text-5xl">
              if they’re on Rissme,<br />
              they’re <span className="text-gradient">actually them.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-mist-300/85">
              A quick selfie verification matches every person to their photos - so the
              cutie in your chat is the cutie in the pics. Bots and catfish? Filtered out
              before they ever reach your deck.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/safety">
                How we keep it safe <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <PhoneFrame className="w-[240px]">
                <ChatScreen />
              </PhoneFrame>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ── Testimonials ─────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="section py-16 sm:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="the people have spoken"
          title="receipts, not red flags"
          sub="Real reviews from people who deleted the other apps."
        />
      </Reveal>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeUp}
            whileHover={{ y: -6, rotate: -1 }}
            className="rounded-4xl border border-white/65 bg-white/52 p-6 shadow-card backdrop-blur-md"
          >
            <div className="flex items-center gap-1 text-peach-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-peach-400" />
              ))}
            </div>
            <p className="mt-4 text-ink-800/80">&ldquo;{t.text}&rdquo;</p>
            <div className="mt-5 flex items-center gap-3">
              <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${t.tone}`}>
                <t.icon className="h-5 w-5 text-ink-800" />
              </span>
              <span className="font-semibold text-ink-800">{t.name}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ── FAQ ──────────────────────────────────────────────────────────── */
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section py-16 sm:py-24">
      <Reveal>
        <SectionHeading eyebrow="ok but real questions" title="the lil FAQ" />
      </Reveal>
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <Reveal key={i} delay={i * 0.04}>
              <div className="overflow-hidden rounded-3xl border border-white/65 bg-white/52 shadow-card backdrop-blur-md">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-semibold text-ink-800 sm:text-xl">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-peach-300 to-blush-300 text-white">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-ink-700/75">{f.a}</p>
                </motion.div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* ── Final CTA ────────────────────────────────────────────────────── */
function FinalCta() {
  return (
    <section className="section pb-8 pt-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.75rem] mesh-panel border border-white/10 px-7 py-16 text-center shadow-card sm:px-12 sm:py-24">
          <Sparkle className="absolute left-10 top-10 h-10 w-10 animate-floaty text-blush-300/30" />
          <Heart className="absolute right-12 top-14 h-9 w-9 animate-floatySlow text-lilac-300/30" />
          <Heart className="absolute bottom-10 left-1/4 h-7 w-7 animate-floaty text-peach-300/25" />
          <Squiggle className="absolute bottom-8 right-10 hidden h-6 w-32 text-white/10 sm:block" />

          <h2 className="relative font-display text-4xl font-semibold leading-tight text-mist-100 sm:text-6xl">
            your next crush is<br /><span className="text-gradient">already verified.</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-lg text-mist-300">
            Join the list and be first through the door when Rissme drops. Tiny launch-day surprise included.{' '}
            <Gift className="inline h-4 w-4 -translate-y-0.5 text-blush-300" />
          </p>
          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/download">
              Get on the list <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              to="/premium"
              variant="ghost"
              className="border-white/25 bg-white/10 text-mist-100 hover:border-white/40 hover:bg-white/[0.18]"
            >
              Peek at Premium
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Stats />
      <RealOnesWall />
      <Features />
      <HowItWorks />
      <VerifiedCallout />
      <Testimonials />
      <Faq />
      <FinalCta />
      <VerifiedReel />
    </>
  )
}
