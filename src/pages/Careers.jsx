import { motion } from 'framer-motion'
import { Briefcase, Heart as HeartIcon, Zap, Users, Globe, Coffee, ArrowRight, Mail, Sparkles } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Button, Reveal, SectionHeading, stagger, fadeUp } from '../components/ui'
import { Heart, Sparkle, FloatingBlobs } from '../components/Decor'

const values = [
  {
    icon: HeartIcon,
    title: 'Real > perfect',
    body: 'We ship things that feel human. We'd rather be honest and imperfect than polished and hollow.',
    color: 'from-peach-300 to-blush-400',
  },
  {
    icon: Zap,
    title: 'Move fast, break ick',
    body: 'We iterate quickly, learn from users, and cut anything that doesn't serve real connections.',
    color: 'from-blush-300 to-lilac-400',
  },
  {
    icon: Users,
    title: 'Safety by default',
    body: 'Every feature we build gets pressure-tested for how it could be misused. Safety isn't a feature — it's the foundation.',
    color: 'from-lilac-300 to-blush-300',
  },
  {
    icon: Globe,
    title: 'Built for Bharat',
    body: 'We're building a product that understands Indian dating culture — not a copy-paste of what works in San Francisco.',
    color: 'from-peach-200 to-blush-300',
  },
]

const perks = [
  { icon: Coffee, text: 'Remote-first team — work from wherever your Wi-Fi works' },
  { icon: Sparkles, text: 'Equity for early hires — you own a piece of what you're building' },
  { icon: HeartIcon, text: 'Health insurance from day one' },
  { icon: Zap, text: 'Learning budget — books, courses, conferences, whatever helps you grow' },
  { icon: Users, text: 'Small team, high ownership — no committees, no bureaucracy' },
  { icon: Globe, text: 'Flexible hours — we care about output, not check-ins' },
]

const openRoles = [
  {
    title: 'Full-Stack Engineer (React + Spring Boot)',
    type: 'Full-time · Remote',
    team: 'Engineering',
    description: 'You'll own features end-to-end — from the Figma mock to the database query. We use React (Vite), Tailwind, and Spring Boot on Java 21. Experience with WebRTC or real-time systems is a big plus.',
  },
  {
    title: 'Growth & Community Manager',
    type: 'Full-time · Remote',
    team: 'Growth',
    description: 'Drive waitlist growth and build the Rissme community before and after launch. You'll own social, influencer partnerships, and the content calendar. You live on Instagram Reels and know what actually goes viral.',
  },
  {
    title: 'Product Designer (UI/UX)',
    type: 'Full-time · Remote',
    team: 'Design',
    description: 'Own the design system and new feature UX from zero to shipped. Deep Figma skills required. Bonus if you have experience designing for dating, social, or consumer apps.',
  },
]

export default function Careers() {
  return (
    <>
      <PageHero
        eyebrow={<><Briefcase className="inline h-3.5 w-3.5 -translate-y-0.5" /> careers</>}
        title={<>build the app <span className="text-gradient">you wish existed.</span></>}
        sub="We're a small team with a big mission: make dating feel like a crush again. If that sounds like your kind of problem, let's talk."
      />

      {/* Values */}
      <section className="section py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="how we work"
            title="our culture, for real"
            sub="Not a ping-pong-table-and-free-snacks culture. A we-care-about-the-product-and-each-other culture."
          />
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
              className="group rounded-[2rem] border border-white/65 bg-white/52 p-8 shadow-card backdrop-blur-md"
            >
              <div className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${v.color} text-white shadow-sm transition-transform group-hover:rotate-6`}>
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink-800">{v.title}</h3>
              <p className="mt-2 text-ink-700/80">{v.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Perks */}
      <section className="section pb-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] mesh-panel border border-white/10 px-8 py-14 shadow-card sm:px-14 sm:py-16">
            <FloatingBlobs />
            <Sparkle className="absolute left-10 top-10 h-8 w-8 animate-floaty text-blush-300/30" />
            <div className="relative">
              <span className="chip"><Sparkles className="inline h-3 w-3 -translate-y-0.5" /> perks</span>
              <h2 className="mt-5 font-display text-3xl font-semibold text-mist-100 sm:text-4xl">
                what you get on day <span className="text-gradient">one</span>
              </h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {perks.map((p) => (
                  <Reveal key={p.text}>
                    <div className="flex items-start gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                      <p.icon className="mt-0.5 h-4 w-4 shrink-0 text-blush-300" />
                      <span className="text-sm font-medium text-mist-200">{p.text}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Open roles */}
      <section className="section pb-16 sm:pb-24">
        <Reveal>
          <SectionHeading
            eyebrow="open roles"
            title="who we're looking for"
            sub="We're hiring across engineering, design, and growth. All roles are remote and based in India."
          />
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-10 space-y-5"
        >
          {openRoles.map((role, i) => (
            <motion.div
              key={role.title}
              variants={fadeUp}
              className="group rounded-[2rem] border border-white/65 bg-white/52 p-8 shadow-card backdrop-blur-md transition-all hover:border-blush-300/40"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gradient-to-br from-peach-300 to-blush-400 px-3 py-0.5 text-xs font-bold text-white">
                      {role.team}
                    </span>
                    <span className="text-xs text-ink-700/55">{role.type}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink-800 sm:text-2xl">{role.title}</h3>
                  <p className="mt-2 text-ink-700/80 leading-relaxed">{role.description}</p>
                </div>
                <div className="shrink-0">
                  <a
                    href={`mailto:careers@rissme.com?subject=Application: ${encodeURIComponent(role.title)}`}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/65 bg-white/52 px-5 py-3 text-sm font-semibold text-ink-800 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-blush-300/50 hover:shadow-md"
                  >
                    Apply <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Speculative */}
        <Reveal>
          <div className="mt-8 rounded-[2rem] border border-dashed border-blush-300/40 bg-blush-100/20 p-8 text-center backdrop-blur-md">
            <HeartIcon className="mx-auto h-8 w-8 text-blush-400" />
            <h3 className="mt-4 font-display text-xl font-semibold text-ink-800">Don't see your role?</h3>
            <p className="mx-auto mt-2 max-w-sm text-ink-700/75">
              We're always interested in exceptional people. Send us a note about who you are and what you'd build at Rissme.
            </p>
            <a
              href="mailto:careers@rissme.com?subject=Speculative application"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-blush-500 hover:underline"
            >
              <Mail className="h-4 w-4" /> careers@rissme.com
            </a>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="section pb-20">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-[2.5rem] border border-white/65 bg-white/52 p-10 text-center shadow-card backdrop-blur-md sm:p-14">
            <Heart className="h-10 w-10 animate-heart text-blush-400" />
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink-800 sm:text-4xl">
                ready to build something real?
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-ink-700/75">
                We move fast, we care about the work, and we genuinely like each other. Come build with us.
              </p>
            </div>
            <Button to="mailto:careers@rissme.com">
              Email careers@rissme.com <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
