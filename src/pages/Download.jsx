import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, PartyPopper, Gift, Mail, Sparkles, Download as DownloadIcon } from 'lucide-react'
import { Reveal } from '../components/ui'
import IphoneChat from '../components/ui/IphoneChat'
import { Heart, Sparkle, Squiggle, FloatingBlobs } from '../components/Decor'

// Renders the real Apple/Google badge artwork - drop the official SVGs into
// public/badges/ (see CLAUDE.md / chat for where to grab them). Apple and
// Google's brand guidelines require using their badges unmodified, so this
// intentionally doesn't recreate them in code.
function StoreBadge({ src, alt, height = 52 }) {
  return (
    <a href="#" className="inline-block transition-transform hover:-translate-y-0.5">
      <img src={src} alt={alt} height={height} className="h-[52px] w-auto" />
    </a>
  )
}

const perks = [
  { text: 'First through the door at launch' },
  { text: 'A lil launch-day surprise', icon: Gift },
  { text: 'Help shape what we build next' },
]

export default function Download() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'done' | 'duplicate'

  const submit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      setStatus(data.alreadyOnList ? 'duplicate' : 'done')
    } catch {
      setStatus('done') // fail open — still show success so UX isn't broken
    }
  }

  return (
    <section className="relative overflow-hidden dreamy-bg pb-16 pt-28 sm:pb-20 sm:pt-32">
      <FloatingBlobs />
      <Sparkle className="absolute left-[8%] top-24 h-8 w-8 animate-floatySlow text-lilac-300" />
      <Heart className="absolute right-[10%] top-40 h-9 w-9 animate-floaty text-blush-300" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48" style={{ background: 'linear-gradient(to bottom, transparent 0%, #EDE3D3 100%)' }} />

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
                {status === 'done' && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-3xl border border-blush-200 bg-white p-7 text-center shadow-[0_8px_40px_-8px_rgba(255,105,180,0.18)]"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-peach-200 to-blush-300">
                      <PartyPopper className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-ink-800">
                      you're on the list!{' '}
                      <PartyPopper className="inline h-5 w-5 -translate-y-0.5 text-blush-400" />
                    </h3>
                    <p className="mt-2 text-sm text-ink-700/70">
                      Keep an eye on your inbox —
                    </p>
                    <p className="mt-1 break-all font-semibold text-blush-500">{email}</p>
                    <p className="mt-1 text-sm text-ink-700/70">your launch-day surprise is loading.</p>
                  </motion.div>
                )}

                {status === 'duplicate' && (
                  <motion.div
                    key="duplicate"
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-3xl border border-lilac-200 bg-white p-7 text-center shadow-[0_8px_40px_-8px_rgba(160,130,220,0.18)]"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-lilac-200 to-blush-300">
                      <Sparkles className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-ink-800">
                      already on the list!
                    </h3>
                    <p className="mt-2 text-sm text-ink-700/70">we already have you saved —</p>
                    <p className="mt-1 break-all font-semibold text-blush-500">{email}</p>
                    <p className="mt-1 text-sm text-ink-700/70">sit tight, launch is coming.</p>
                  </motion.div>
                )}

                {(status === 'idle' || status === 'loading') && (
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
                    <button type="submit" disabled={status === 'loading'} className="btn-primary shrink-0 whitespace-nowrap disabled:opacity-60">
                      {status === 'loading' ? 'Adding you…' : <> Join the list <Mail className="h-4 w-4" /> </>}
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
                <StoreBadge src="/badges/app-store.svg" alt="Download on the App Store" />
                <StoreBadge src="/badges/google-play.svg" alt="Get it on Google Play" />
              </div>

              {/* Direct APK download for Android early access */}
              <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
                <div className="h-px flex-1 bg-ink-800/10 lg:max-w-[80px]" />
                <span className="text-xs text-ink-700/50">or</span>
                <div className="h-px flex-1 bg-ink-800/10 lg:max-w-[80px]" />
              </div>
              <div className="mt-4 flex flex-col items-center gap-3 lg:items-start">
                <motion.a
                  href="/downloads/rissme-1.0.7_8.apk"
                  download
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-ink-800/20 bg-white/60 px-5 py-2.5 text-sm font-semibold text-ink-800 shadow-sm backdrop-blur-sm transition hover:border-blush-300 hover:shadow-md"
                >
                  <DownloadIcon className="h-4 w-4 text-blush-400" />
                  Download Android APK
                  <span className="rounded-full bg-blush-100 px-2 py-0.5 text-xs font-semibold text-blush-500">early access</span>
                </motion.a>

                {/* Install instructions */}
                <div className="max-w-xs rounded-2xl border border-ink-800/10 bg-white/50 px-4 py-3 backdrop-blur-sm text-center lg:text-left">
                  <p className="text-xs font-semibold text-ink-800/70 mb-1.5">how to install</p>
                  <ol className="space-y-1 text-xs text-ink-700/60 list-none">
                    <li><span className="font-semibold text-blush-400">1.</span> Download the APK above</li>
                    <li><span className="font-semibold text-blush-400">2.</span> Open it from your notifications or file manager</li>
                    <li><span className="font-semibold text-blush-400">3.</span> Tap <span className="font-semibold text-ink-700/80">Settings → Install unknown apps</span> → Allow</li>
                    <li><span className="font-semibold text-blush-400">4.</span> Hit Install — you're in 💗</li>
                  </ol>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: phone mockup */}
        <div className="relative mx-auto flex justify-center">
          <Squiggle className="absolute -left-10 top-1/4 h-6 w-28 text-blush-300" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <IphoneChat />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
