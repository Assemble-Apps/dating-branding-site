import { motion } from 'framer-motion'
import { BookOpen, Rss, Sparkles, Heart as HeartIcon, ShieldCheck, Zap, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Button, Reveal, stagger, fadeUp } from '../components/ui'
import { Heart, Sparkle, FloatingBlobs } from '../components/Decor'

const comingSoon = [
  {
    icon: HeartIcon,
    tag: 'dating intel',
    title: 'Why your opening line matters more than your photos',
    teaser: `Spoiler: "hey" has a 12% reply rate. We ran the numbers so you don't have to.`,
    color: 'from-peach-300 to-blush-400',
  },
  {
    icon: ShieldCheck,
    tag: 'safety',
    title: 'How we detect fake profiles before they reach you',
    teaser: "A peek behind the curtain of Rissme's verification system - written by the team who built it.",
    color: 'from-blush-300 to-lilac-400',
  },
  {
    icon: Sparkles,
    tag: 'features',
    title: 'The story behind the Matches Calendar',
    teaser: "We wanted something that felt like your love life was actually going somewhere. Here's how that idea became a product.",
    color: 'from-lilac-300 to-blush-300',
  },
  {
    icon: Zap,
    tag: 'gen-z dating',
    title: 'Green flags, red flags, and the beige flags no one talks about',
    teaser: "A guide to the subtle signs that actually predict whether someone's worth swiping on.",
    color: 'from-peach-200 to-blush-300',
  },
  {
    icon: HeartIcon,
    tag: 'real talk',
    title: "Dating apps made us lonelier - here's why Rissme is different",
    teaser: 'We looked at the research. We talked to our users. Then we built something different.',
    color: 'from-blush-200 to-lilac-300',
  },
  {
    icon: BookOpen,
    tag: 'product',
    title: 'Building a dating app that Gen Z actually wants to use',
    teaser: 'Our founding story: from a group chat complaint to a product with a waitlist.',
    color: 'from-peach-300 to-lilac-300',
  },
]

export default function Blog() {
  return (
    <>
      <PageHero
        eyebrow={<><BookOpen className="inline h-3.5 w-3.5 -translate-y-0.5" /> the rissme blog</>}
        title={<>dating intel, <span className="text-gradient">delivered.</span></>}
        sub="Real talk on modern dating, product deep dives, safety guides, and the occasional hot take. We're cooking - first posts dropping at launch."
      />

      {/* Coming soon notice */}
      <section className="section pt-28 pb-4 sm:pt-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] mesh-panel border border-white/10 px-7 py-12 text-center shadow-card sm:py-16">
            <FloatingBlobs />
            <Sparkle className="absolute left-10 top-10 h-8 w-8 animate-floaty text-blush-300/30" />
            <Heart className="absolute right-12 top-12 h-7 w-7 animate-floatySlow text-lilac-300/30" />
            <div className="relative">
              <span className="chip mx-auto"><Rss className="inline h-3 w-3 -translate-y-0.5" /> coming at launch</span>
              <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl font-semibold text-mist-100 sm:text-4xl">
                the blog is almost <span className="text-gradient">ready to spill</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-mist-300/85">
                Join the waitlist and you'll be the first to read - along with early access to the app.
              </p>
              <div className="mt-8 flex justify-center">
                <Button to="/download">
                  Get early access <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Preview cards */}
      <section className="section py-16 sm:py-20">
        <Reveal>
          <div className="mb-12 text-center">
            <span className="chip mx-auto">sneak peek</span>
            <h2 className="mt-5 font-display text-3xl font-semibold text-ink-800 sm:text-4xl">
              what's <span className="text-gradient">dropping soon</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-700/75">
              These are the first pieces we're writing. No publish date yet - but they're real.
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {comingSoon.map((post) => (
            <motion.div
              key={post.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group relative cursor-default overflow-hidden rounded-[2rem] border border-white/65 bg-white/52 p-7 shadow-card backdrop-blur-md"
            >
              {/* Coming soon overlay pill */}
              <span className="absolute right-5 top-5 rounded-full bg-ink-800/10 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-ink-700/50">
                soon
              </span>

              <div className={`mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${post.color} text-white shadow-sm transition-transform group-hover:scale-110`}>
                <post.icon className="h-5 w-5" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-blush-400">{post.tag}</span>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-800">{post.title}</h3>
              <p className="mt-2 text-sm text-ink-700/75 leading-relaxed">{post.teaser}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Newsletter CTA */}
      <section className="section pb-20">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-[2.5rem] border border-white/65 bg-white/52 p-10 text-center shadow-card backdrop-blur-md sm:p-14">
            <Heart className="h-10 w-10 animate-heart text-blush-400" />
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink-800 sm:text-4xl">
                don't miss the first drop
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-ink-700/75">
                Get notified the moment the blog goes live - along with your early app access.
              </p>
            </div>
            <Button to="/download">
              Join the waitlist <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
