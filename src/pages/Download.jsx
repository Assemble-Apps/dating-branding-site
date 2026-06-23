import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Apple, Play, Check, PartyPopper, Gift, Mail } from 'lucide-react'
import { Reveal } from '../components/ui'
import { PhoneFrame, SwipeScreen, MatchScreen } from '../components/PhoneMockup'
import { Heart, Sparkle, Squiggle, FloatingBlobs } from '../components/Decor'

function StoreBadge({ icon: Icon, top, bottom }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 rounded-2xl bg-plum-900 px-5 py-3 text-white transition-transform hover:-translate-y-0.5"
    >
      <Icon className="h-7 w-7" />
      <span className="text-left leading-tight">
        <span className="block text-[0.65rem] uppercase tracking-wide text-white/70">{top}</span>
        <span className="block font-display text-lg font-semibold">{bottom}</span>
      </span>
    </a>
  )
}

const perks = [
  { text: 'First through the door at launch' },
  { text: 'A lil launch-day surprise', icon: Gift },
  { text: 'Help shape what we build next' },
]

const WAITLIST_URL = import.meta.env.VITE_WAITLIST_API_URL

export default function Download() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    if (WAITLIST_URL) {
      setLoading(true)
      try {
        await fetch(WAITLIST_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
      } catch {
        // fail silently - still show success so UX isn't broken
      } finally {
        setLoading(false)
      }
    }

    setDone(true)
  }

  return (
    <section className="relative overflow-hidden dreamy-bg py-16 sm:py-20">
      <FloatingBlobs />
      <Sparkle className="absolute left-[8%] top-24 h-8 w-8 animate-floatySlow text-lilac-300" />
      <Heart className="absolute right-[10%] top-40 h-9 w-9 animate-floaty text-blush-300" />

      <div className="section relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: copy + form */}
        <div className="text-center lg:text-left">
          <Reveal>
            <span className="chip">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 animate-dotBlink rounded-full bg-blush-400" />
              </span>
              early access · dropping soon
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.0] tracking-tight text-ink-800 sm:text-6xl">
              be first to <span className="text-gradient">riss.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-lg text-ink-700/80 lg:mx-0">
              Rissme is in early access. Drop your email and skip the line - verified humans, real matches,
              zero ick, coming to your phone very soon.{' '}
              <Heart className="inline h-4 w-4 -translate-y-0.5 fill-blush-400 text-blush-400" />
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mx-auto mt-8 max-w-md lg:mx-0">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-3xl border border-white/10 bg-white/52 p-7 text-center shadow-card backdrop-blur-md"
                  >
                    <PartyPopper className="mx-auto h-10 w-10 text-blush-400" />
                    <h3 className="mt-3 inline-flex items-center gap-2 font-display text-2xl font-semibold text-mist-100">
                      you’re on the list! <PartyPopper className="h-5 w-5 text-blush-300" />
                    </h3>
                    <p className="mt-2 text-mist-300/85">
                      Keep an eye on your inbox, <span className="font-semibold text-mist-100">{email}</span> - your
                      launch-day surprise is loading.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-full border border-ink-800/20 bg-white/70 px-6 py-3.5 text-ink-800 placeholder:text-ink-700/40 shadow-sm outline-none backdrop-blur transition focus:border-blush-400 focus:ring-4 focus:ring-blush-300/30"
                    />
                    <button type="submit" disabled={loading} className="btn-primary shrink-0 whitespace-nowrap disabled:opacity-60">
                      {loading ? (
                        'Adding you…'
                      ) : (
                        <>
                          Join the list <Mail className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <ul className="mt-6 space-y-2.5">
                {perks.map((p) => (
                  <li key={p.text} className="flex items-center justify-center gap-3 text-ink-700/80 lg:justify-start">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-peach-300 to-blush-400 text-white">
                      <Check className="h-3 w-3" />
                    </span>
                    {p.text}
                    {p.icon && <p.icon className="h-4 w-4 text-blush-400" />}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-9">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blush-400">launching on</p>
              <div className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <StoreBadge icon={Apple} top="soon on the" bottom="App Store" />
                <StoreBadge icon={Play} top="soon on" bottom="Google Play" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: phones */}
        <div className="relative mx-auto h-[560px] w-full max-w-md">
          <motion.div
            className="absolute left-1/2 top-2 z-20 -translate-x-1/2"
            initial={{ opacity: 0, y: 30, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: -5 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <PhoneFrame>
                <SwipeScreen />
              </PhoneFrame>
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute -right-2 bottom-4 z-30 hidden w-[170px] sm:block"
            initial={{ opacity: 0, x: 30, rotate: 7 }}
            animate={{ opacity: 1, x: 0, rotate: 7 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="rounded-[1.8rem] border-[7px] border-plum-900 bg-plum-900 shadow-card">
                <div className="h-[300px] w-full overflow-hidden rounded-[1.3rem]">
                  <MatchScreen />
                </div>
              </div>
            </motion.div>
          </motion.div>
          <Squiggle className="absolute -left-2 top-1/2 h-6 w-28 text-blush-300" />
        </div>
      </div>
    </section>
  )
}
