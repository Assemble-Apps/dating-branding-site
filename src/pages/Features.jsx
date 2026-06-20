import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Button, Reveal, SectionHeading } from '../components/ui'
import { PhoneFrame, SwipeScreen, ChatScreen } from '../components/PhoneMockup'
import { Heart, Sparkle } from '../components/Decor'
import { featureSections, steps } from '../data/content'

const accentMap = {
  peach: { chip: 'from-peach-200 to-blush-200', dot: 'text-peach-500' },
  blush: { chip: 'from-blush-200 to-lilac-200', dot: 'text-blush-400' },
  lilac: { chip: 'from-lilac-200 to-sky-200', dot: 'text-lilac-500' },
}

function FeatureRow({ f, i }) {
  const a = accentMap[f.accent]
  const flip = i % 2 === 1
  return (
    <Reveal>
      <div
        className={`grid items-center gap-8 rounded-[2.25rem] border border-white/65 bg-white/52 p-7 shadow-card backdrop-blur-md sm:p-10 lg:grid-cols-2 lg:gap-14 ${
          flip ? 'lg:[&>div:first-child]:order-2' : ''
        }`}
      >
        <div>
          <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${a.chip} text-3xl shadow-sm`}>
            {f.emoji}
          </div>
          <h3 className="mt-6 font-display text-3xl font-semibold text-ink-800 sm:text-4xl">{f.title}</h3>
          <p className="mt-4 text-lg text-ink-700/80">{f.blurb}</p>
          <ul className="mt-6 space-y-3">
            {f.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-ink-800">
                <span className={`grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${a.chip}`}>
                  <Check className="h-3.5 w-3.5 text-ink-800" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex justify-center">
          <div className={`relative grid aspect-square w-full max-w-sm place-items-center rounded-[2rem] bg-gradient-to-br ${a.chip} shadow-soft`}>
            <f.icon className="h-32 w-32 text-white/80" strokeWidth={1.3} />
            <span className="absolute right-6 top-6 text-4xl drop-shadow-sm">{f.emoji}</span>
            <Heart className="absolute -left-3 bottom-8 h-8 w-8 animate-floaty text-white/70" />
            <Sparkle className="absolute -right-2 -top-2 h-7 w-7 animate-floatySlow text-white/80" />
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Features() {
  return (
    <>
      <PageHero
        eyebrow="✨ the feature drop"
        title={<>everything you need to <span className="text-gradient">catch feelings.</span></>}
        sub="Verified humans, smarter matching, and chat that actually flirts back. Here’s the full toolkit."
      >
        <Button to="/download">
          Get the app <ArrowRight className="h-4 w-4" />
        </Button>
        <Button to="/premium" variant="ghost">
          Compare Rissme+
        </Button>
      </PageHero>

      {/* Phone showcase */}
      <section className="section py-16">
        <div className="grid items-center gap-10 sm:grid-cols-2 lg:grid-cols-2">
          <Reveal>
            <div className="flex justify-center gap-6">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <PhoneFrame className="w-[230px]">
                  <SwipeScreen />
                </PhoneFrame>
              </motion.div>
              <motion.div
                className="mt-10 hidden sm:block"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PhoneFrame className="w-[230px]">
                  <ChatScreen />
                </PhoneFrame>
              </motion.div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              center={false}
              eyebrow="designed to feel good"
              title="a feed that respects your time"
              sub="No infinite doomscroll, no pay-to-say-hi. Rissme is built to get you matched, talking, and offline — with the people who are actually right there."
            />
            <div className="mt-7 grid grid-cols-2 gap-4">
              {steps.map((s) => (
                <div key={s.n} className="rounded-3xl border border-white/65 bg-white/52 p-5 backdrop-blur-md">
                  <div className="text-2xl">{s.emoji}</div>
                  <p className="mt-2 font-display text-lg font-semibold text-ink-800">{s.title}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full feature rows */}
      <section className="section space-y-8 py-10">
        {featureSections.map((f, i) => (
          <FeatureRow key={f.title} f={f} i={i} />
        ))}
      </section>

      {/* CTA */}
      <section className="section py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] mesh-panel border border-white/10 px-7 py-16 text-center shadow-card sm:py-20">
            <Sparkle className="absolute left-10 top-10 h-9 w-9 animate-floaty text-blush-300/30" />
            <Heart className="absolute bottom-10 right-12 h-8 w-8 animate-floatySlow text-lilac-300/30" />
            <h2 className="font-display text-4xl font-semibold text-mist-100 sm:text-5xl">ready to feel the <span className="text-gradient">butterflies?</span></h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-mist-300">It’s free, it’s verified, and your next crush is one swipe away.</p>
            <div className="mt-8 flex justify-center">
              <Button to="/download">
                Get on the list <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
