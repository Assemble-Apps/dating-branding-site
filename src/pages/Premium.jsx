import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight, Gem, Lock, Gift } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Button, Reveal, SectionHeading, stagger, fadeUp } from '../components/ui'
import { Heart, Sparkle, Squiggle } from '../components/Decor'
import { plans, planPerks, premiumPerks } from '../data/content'

function PlanCard({ p }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      className={`relative flex flex-col rounded-[2rem] p-8 shadow-card backdrop-blur-md ${
        p.highlight
          ? 'border-2 border-white/20 bg-ink-800/90 ring-glow'
          : 'border border-white/65 bg-white/52'
      }`}
    >
      {p.highlight && (
        <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-peach-400 to-blush-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-pill">
          most loved <Heart className="h-3 w-3 fill-white" />
        </span>
      )}
      <div className="flex items-baseline justify-between">
        <h3 className={`font-display text-2xl font-semibold ${p.highlight ? 'text-mist-100' : 'text-ink-800'}`}>{p.duration}</h3>
        {p.highlight && <Sparkles className="h-5 w-5 text-blush-400" />}
      </div>
      <p className="mt-1 text-sm font-medium text-blush-400">{p.tag}</p>

      <div
        className={`mt-5 flex items-start gap-2.5 rounded-2xl border px-4 py-3.5 ${
          p.highlight ? 'border-white/15 bg-white/5' : 'border-ink-800/10 bg-ink-800/[0.04]'
        }`}
      >
        <Lock className={`mt-0.5 h-4 w-4 shrink-0 ${p.highlight ? 'text-blush-300' : 'text-blush-400'}`} />
        <p className={`text-sm leading-snug ${p.highlight ? 'text-mist-200' : 'text-ink-700/85'}`}>
          Price reveal dropping soon - never this cheap again, promise. 🤫
        </p>
      </div>

      {p.bonusDays ? (
        <p className={`mt-3 flex items-center gap-1.5 text-sm font-semibold ${p.highlight ? 'text-blush-300' : 'text-blush-400'}`}>
          <Gift className="h-3.5 w-3.5" /> +{p.bonusDays} extra days on us - {p.days + p.bonusDays} days total
        </p>
      ) : (
        <p className={`mt-3 text-sm ${p.highlight ? 'text-mist-300/70' : 'text-ink-700/60'}`}>{p.days} days of full access</p>
      )}

      <ul className="mt-7 flex-1 space-y-3">
        {planPerks.map((perk) => (
          <li key={perk} className={`flex items-start gap-3 ${p.highlight ? 'text-mist-200' : 'text-ink-800'}`}>
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-peach-300 to-blush-400 text-white">
              <Check className="h-3 w-3" />
            </span>
            <span className="text-[0.95rem]">{perk}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {p.highlight ? (
          <Button to="/download" className="w-full">
            {p.cta} <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button to="/download" variant="ghost" className="w-full">
            {p.cta}
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default function Premium() {
  return (
    <>
      <PageHero
        eyebrow={<><Gem className="inline h-3.5 w-3.5 -translate-y-0.5" /> premium</>}
        title={<>unlock your <span className="text-gradient">main-character</span> era.</>}
        sub="The free plan already slaps. Premium just turns the rizz up to eleven - see your likes, rewind your oops, and boost when it counts. Pick your days, that's it."
      />

      {/* Plans */}
      <section className="section py-12 sm:py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {plans.map((p) => (
            <PlanCard key={p.duration} p={p} />
          ))}
        </motion.div>
        <Reveal>
          <p className="mt-6 text-center text-sm text-ink-700/65">
            Cancel anytime, no awkward breakup convo required. Final pricing in INR, dropping soon.
          </p>
        </Reveal>
      </section>

      {/* Perks grid */}
      <section className="section py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="what you get"
            title="perks that pull their weight"
            sub="Every Premium feature is designed to get you more (and better) matches - not just more swipes."
          />
        </Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {premiumPerks.map((perk) => (
            <motion.div
              key={perk.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group rounded-4xl border border-white/65 bg-white/52 p-7 shadow-card backdrop-blur-md"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-peach-400 via-blush-400 to-lilac-400 text-white shadow-sm transition-transform group-hover:scale-110">
                <perk.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink-800">{perk.title}</h3>
              <p className="mt-2 text-ink-700/80">{perk.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Banner */}
      <section className="section pb-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] mesh-panel border border-white/10 px-7 py-16 text-center shadow-card sm:py-20">
            <Sparkle className="absolute left-10 top-10 h-9 w-9 animate-floaty text-blush-300/30" />
            <Heart className="absolute right-12 top-12 h-8 w-8 animate-floatySlow text-lilac-300/30" />
            <Squiggle className="absolute bottom-8 left-1/2 hidden h-6 w-40 -translate-x-1/2 text-white/10 sm:block" />
            <h2 className="font-display text-4xl font-semibold text-mist-100 sm:text-5xl">go <span className="text-gradient">Premium</span></h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-mist-300">
              Pick 3, 10, or 30 days - the 30-day plan comes with 3 extra days on us. Pricing's locked for now, but it won't be cheaper than this again.
            </p>
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
