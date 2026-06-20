import { motion } from 'framer-motion'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Button, Reveal, SectionHeading, stagger, fadeUp } from '../components/ui'
import { PhoneFrame, MatchScreen } from '../components/PhoneMockup'
import { Heart, Sparkle, FloatingBlobs } from '../components/Decor'
import { safetyPillars, safetyPromises } from '../data/content'

const verifySteps = [
  { emoji: '🤳', title: 'Snap a live selfie', body: 'Follow a quick gesture prompt so we know it’s really you, right now — not a saved photo.' },
  { emoji: '🧠', title: 'We match the face', body: 'A liveness + face-match check compares it to your profile photos in seconds.' },
  { emoji: '✅', title: 'Get your blue badge', body: 'Pass and you’re verified. Your selfie is never shown on your profile and is purged after.' },
]

export default function Safety() {
  return (
    <>
      <PageHero
        eyebrow="🛡️ safety, but make it default"
        title={<>good vibes only,<br /><span className="text-gradient">protected by design.</span></>}
        sub="Verification, privacy and moderation aren’t add-ons at Rissme — they’re the foundation. Here’s exactly how we keep it real."
      >
        <Button to="/download">
          Join safely <ArrowRight className="h-4 w-4" />
        </Button>
      </PageHero>

      {/* Pillars */}
      <section className="section py-16 sm:py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {safetyPillars.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group rounded-4xl border border-white/65 bg-white/52 p-8 shadow-card backdrop-blur-md"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-lilac-200 to-blush-200 text-2xl shadow-sm transition-transform group-hover:rotate-6">
                {p.emoji}
              </div>
              <h3 className="font-display text-2xl font-semibold text-ink-800">{p.title}</h3>
              <p className="mt-3 text-ink-700/80">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Verification flow */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="section">
          <Reveal>
            <SectionHeading
              eyebrow="how verification works"
              title="verified in under 10 seconds"
              sub="A quick, private check that keeps catfish out — without keeping your selfie."
            />
          </Reveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div className="space-y-4">
              {verifySteps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="flex items-start gap-5 rounded-3xl border border-white/65 bg-white/52 p-6 shadow-card backdrop-blur-md">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-peach-200 to-blush-200 text-2xl">
                      {s.emoji}
                    </span>
                    <div>
                      <h4 className="font-display text-xl font-semibold text-ink-800">{s.title}</h4>
                      <p className="mt-1.5 text-ink-700/80">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15}>
              <div className="relative flex justify-center">
                <Sparkle className="absolute -left-2 top-4 h-8 w-8 animate-floatySlow text-lilac-300" />
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                  <PhoneFrame className="w-[250px]">
                    <MatchScreen />
                  </PhoneFrame>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="section py-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] mesh-panel p-8 shadow-card sm:p-14">
            <FloatingBlobs />
            <div className="relative">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-9 w-9 text-blush-400" />
                <h2 className="font-display text-3xl font-semibold text-mist-100 sm:text-4xl">our safety promises</h2>
              </div>
              <p className="mt-3 max-w-lg text-mist-300/85">
                The non-negotiables. The stuff we’d want for our own friends, group chats and little siblings.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {safetyPromises.map((p, i) => (
                  <Reveal key={p} delay={i * 0.04}>
                    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-peach-300 to-blush-400 text-white">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="font-medium text-mist-200">{p}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Reassurance / CTA */}
      <section className="section py-16">
        <Reveal>
          <div className="rounded-[2.5rem] border border-white/65 bg-white/52 p-8 text-center shadow-card backdrop-blur-md sm:p-14">
            <Heart className="mx-auto h-12 w-12 animate-heart text-blush-400" />
            <h2 className="mt-5 font-display text-3xl font-semibold text-ink-800 sm:text-4xl">
              feeling unsafe? we move fast.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-700/80">
              Block and report are always one tap away — it removes the match, the chat, and hides you both ways
              instantly. Real human moderators review every report, and repeat offenders get auto-suspended.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/download">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/about" variant="ghost">
                Read our mission
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
