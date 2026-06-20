import { motion } from 'framer-motion'
import { BadgeCheck, Heart, X, Star, Send } from 'lucide-react'

// Reusable phone device shell.
export function PhoneFrame({ children, className = '' }) {
  return (
    <div className={`relative mx-auto w-[280px] sm:w-[310px] ${className}`}>
      <div className="relative rounded-[2.75rem] border-[10px] border-plum-900/90 bg-plum-900 p-2 shadow-card">
        {/* notch */}
        <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-plum-900" />
        <div className="relative h-[580px] w-full overflow-hidden rounded-[2.1rem] bg-cream">
          {children}
        </div>
      </div>
    </div>
  )
}

// A pastel "photo" stand-in with a big emoji + name.
function ProfilePhoto({ emoji, from, to, name, age, distance, verified }) {
  return (
    <div className="relative h-full w-full" style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}>
      <div className="flex h-full w-full items-center justify-center text-[8rem] drop-shadow-sm">{emoji}</div>
      {/* soft top + bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-plum-900/60 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 text-white">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-2xl font-semibold">{name}, {age}</h3>
          {verified && <BadgeCheck className="h-5 w-5 fill-white text-plum-700" />}
        </div>
        <p className="mt-1 text-sm text-white/85">📍 {distance} away</p>
      </div>
    </div>
  )
}

// Swipe deck screen.
export function SwipeScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 pt-9 pb-3">
        <span className="font-display text-xl font-semibold text-plum-900">rissme</span>
        <span className="text-xl">💗</span>
      </div>
      <div className="relative flex-1 px-4">
        <div className="absolute inset-x-6 top-2 h-full scale-95 rounded-3xl bg-lilac-200/60" />
        <div className="absolute inset-x-5 top-1 h-full scale-[0.975] rounded-3xl bg-blush-200/70" />
        <div className="relative h-[400px] overflow-hidden rounded-3xl shadow-soft">
          <ProfilePhoto emoji="🧁" from="#FFC9B3" to="#FFA6C4" name="Mara" age={24} distance="2 km" verified />
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 py-5">
        <button className="grid h-12 w-12 place-items-center rounded-full bg-white text-plum-700 shadow-card" aria-label="pass">
          <X className="h-5 w-5" />
        </button>
        <button className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-peach-400 to-blush-400 text-white shadow-pill" aria-label="like">
          <Heart className="h-7 w-7 fill-white" />
        </button>
        <button className="grid h-12 w-12 place-items-center rounded-full bg-white text-lilac-500 shadow-card" aria-label="super like">
          <Star className="h-5 w-5 fill-lilac-300 text-lilac-400" />
        </button>
      </div>
    </div>
  )
}

// Chat screen.
export function ChatScreen() {
  const bubbles = [
    { me: false, text: 'ok your prompt about ranch dressing was unhinged 😭' },
    { me: true, text: 'and yet here you are, replying' },
    { me: false, text: 'fair. coffee sat?' },
    { me: true, text: 'only if you bring the ranch 💀' },
  ]
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-peach-50 to-lilac-100">
      <div className="flex items-center gap-3 px-5 pt-10 pb-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-peach-300 to-blush-300 text-lg">🧁</div>
        <div>
          <div className="flex items-center gap-1">
            <p className="font-semibold text-plum-900">Mara</p>
            <BadgeCheck className="h-4 w-4 fill-lilac-400 text-white" />
          </div>
          <p className="text-xs text-emerald-500">● online now</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-4 py-2">
        {bubbles.map((b, i) => (
          <div key={i} className={`flex ${b.me ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                b.me
                  ? 'rounded-br-md bg-gradient-to-br from-peach-400 to-blush-400 text-white'
                  : 'rounded-bl-md bg-white text-plum-800'
              }`}
            >
              {b.text}
            </div>
          </div>
        ))}
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blush-300 [animation-delay:-0.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blush-300 [animation-delay:-0.1s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blush-300" />
            </div>
          </div>
        </div>
      </div>
      <div className="m-3 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-card">
        <span className="flex-1 text-sm text-plum-700/50">type something cute…</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-peach-400 to-lilac-400 text-white">
          <Send className="h-4 w-4" />
        </span>
      </div>
    </div>
  )
}

// "It's a match" celebration screen.
export function MatchScreen() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden mesh-panel px-6 text-center">
      <motion.div
        className="absolute left-6 top-16 text-3xl"
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >💖</motion.div>
      <motion.div
        className="absolute right-7 top-24 text-2xl"
        animate={{ y: [0, -18, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >✨</motion.div>
      <motion.div
        className="absolute bottom-24 left-10 text-2xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity }}
      >💌</motion.div>

      <h3 className="font-display text-4xl font-semibold text-gradient">it's a vibe!</h3>
      <p className="mt-2 text-sm text-plum-700/80">you and Mara liked each other</p>

      <div className="mt-7 flex items-center -space-x-5">
        <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-lilac-200 to-sky-200 text-4xl shadow-card">🦋</div>
        <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-peach-200 to-blush-200 text-4xl shadow-card">🧁</div>
      </div>

      <button className="mt-8 rounded-full bg-gradient-to-r from-peach-400 to-blush-400 px-7 py-3 text-sm font-semibold text-white shadow-pill">
        send the first riss →
      </button>
      <button className="mt-3 text-sm font-medium text-plum-700/60">keep swiping</button>
    </div>
  )
}
