import { motion } from 'framer-motion'
import { ArrowRight, Lightbulb, Wrench, Rocket, Palette, Compass, ShieldCheck, Code2, PartyPopper } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Button, Reveal, SectionHeading, stagger, fadeUp } from '../components/ui'
import { Heart, Sparkle, Squiggle, FloatingBlobs } from '../components/Decor'
import { values, stats } from '../data/content'

const timeline = [
  { year: '2024', icon: Lightbulb, title: 'the ick that started it all', body: 'Four friends, four dead dating apps, one too many catfish. We figured dating online could feel human again - so we started sketching.' },
  { year: '2025', icon: Wrench, title: 'we built the trust layer first', body: 'Before a single swipe, we built verification, safety and privacy. The fun stuff means nothing if it doesn’t feel safe.' },
  { year: '2026', icon: Rocket, title: 'rissme goes live', body: 'Early access opens to our waitlist. Verified humans, real matches, zero bots - finally a dating app that doesn’t make you sigh.' },
]

const team = [
  { icon: Palette, name: 'Aria', role: 'design & vibes' },
  { icon: Compass, name: 'Ravi', role: 'product' },
  { icon: ShieldCheck, name: 'Noor', role: 'trust & safety' },
  { icon: Code2, name: 'Tia', role: 'engineering' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow={<><PartyPopper className="inline h-3.5 w-3.5 -translate-y-0.5" /> our whole thing</>}
        title={<>we’re building dating<br />that <span className="text-gradient">doesn’t make you sigh.</span></>}
        sub="Rissme started as a group chat rant about everything wrong with dating apps. Now it’s a mission: make online dating feel human, safe, and a little bit magic again."
      />

      {/* Mission statement */}
      <section className="section py-14">
        <Reveal>
          <div className="relative mx-auto max-w-3xl rounded-[2.5rem] border border-white/65 bg-white/52 p-8 text-center shadow-card backdrop-blur-md sm:p-14">
            <Sparkle className="absolute -left-3 -top-3 h-10 w-10 animate-floatySlow text-lilac-300" />
            <Heart className="absolute -bottom-3 -right-2 h-9 w-9 animate-floaty text-blush-300" />
            <p className="font-display text-2xl font-medium italic leading-relaxed text-ink-800/80 sm:text-3xl">
              “Dating apps turned romance into a slot machine. We’re turning it back into{' '}
              <span className="text-gradient not-italic">butterflies.</span>”
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-blush-400">- the rissme team</p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="section py-14 sm:py-20">
        <Reveal>
          <SectionHeading eyebrow="what we stand on" title="our four green flags" />
        </Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-4xl border border-white/65 bg-white/52 p-8 shadow-card backdrop-blur-md"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-peach-200 to-lilac-200">
                <v.icon className="h-7 w-7 text-ink-800" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink-800">{v.title}</h3>
              <p className="mt-3 text-ink-700/80">{v.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats band */}
      <section className="section py-10">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 rounded-[2.5rem] mesh-panel p-8 shadow-card sm:grid-cols-4 sm:p-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="inline-flex items-center gap-1.5 font-display text-4xl font-semibold text-gradient sm:text-5xl">
                  {s.value}
                  {s.icon && <s.icon className="h-7 w-7 fill-peach-400 text-peach-400 sm:h-8 sm:w-8" />}
                </div>
                <div className="mt-1.5 text-sm font-medium text-mist-300/80">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="section py-16 sm:py-24">
        <Reveal>
          <SectionHeading eyebrow="how we got here" title="the rissme origin story" />
        </Reveal>
        <div className="mx-auto mt-14 max-w-3xl space-y-5">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <div className="flex items-start gap-5 rounded-3xl border border-white/65 bg-white/52 p-6 shadow-card backdrop-blur-md sm:p-8">
                <div className="flex flex-col items-center">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-peach-200 to-lilac-200">
                    <t.icon className="h-7 w-7 text-ink-800" />
                  </span>
                  <span className="mt-2 font-display text-sm font-bold text-blush-400">{t.year}</span>
                </div>
                <div>
                  <h4 className="font-display text-xl font-semibold text-ink-800 sm:text-2xl">{t.title}</h4>
                  <p className="mt-2 text-ink-700/80">{t.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section py-10">
        <Reveal>
          <SectionHeading eyebrow="the humans behind it" title="say hi to the team" sub="A tiny crew that cares a lot. (Yes, we use the app. Yes, it’s working.)" />
        </Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4"
        >
          {team.map((m) => (
            <motion.div
              key={m.name}
              variants={fadeUp}
              whileHover={{ y: -6, rotate: -2 }}
              className="rounded-4xl border border-white/65 bg-white/52 p-6 text-center shadow-card backdrop-blur-md"
            >
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-blob bg-gradient-to-br from-lilac-100 to-blush-100 animate-blob">
                <m.icon className="h-9 w-9 text-ink-800" />
              </div>
              <h4 className="mt-4 font-display text-lg font-semibold text-ink-800">{m.name}</h4>
              <p className="text-sm text-ink-700/65">{m.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="section py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] mesh-panel border border-white/10 px-7 py-16 text-center shadow-card">
            <Squiggle className="absolute left-1/2 top-8 hidden h-6 w-40 -translate-x-1/2 text-white/10 sm:block" />
            <Heart className="absolute bottom-10 left-12 h-8 w-8 animate-floaty text-lilac-300/30" />
            <h2 className="font-display text-4xl font-semibold text-mist-100 sm:text-5xl">come date the <span className="text-gradient">better way</span></h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-mist-300">Be one of the first verified cuties through the door.</p>
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
