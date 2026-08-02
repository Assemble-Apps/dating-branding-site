/**
 * Carousel-ready rendered app screens for the AppPreview section.
 * These go inside phone-carousel.jsx's frame — no extra top-padding
 * needed since the status bar (dynamic island, time, battery) is
 * rendered by the carousel frame above this component.
 *
 * All 14 UX issues from the design review are addressed here:
 *  1. Safe-area: nav header sits right below status bar, no overcrowding
 *  2. Equal-size skip/super-like buttons (h-11 w-11), primary heart h-14 w-14
 *  3. pb-5 below buttons before gesture bar
 *  4. Pills: px-3 py-[5px] + gap-1.5 — no crowding
 *  5. Text shadow on name for readability
 *  6. objectPosition: 'center 15%' — headroom on portrait photos
 *  7. Heart is primary (hot-pink glow), star/x are secondary (equal size)
 *  8. Card radius matches screen container radius
 *  9. Pills: horizontal padding + proper min-height
 * 10. Gradient: 4-stop smooth fade, 62% height
 * 11. Card: ring-1 ring-black/[0.06] for subtle screen depth
 * 12. "Nearby" title has gap-3 from back-button icons
 * 13. Name and age on separate lines
 * 14. Bio line below age for vertical balance
 */
import { motion } from 'framer-motion'
import {
  BadgeCheck, Heart, X, Star, MapPin,
  ChevronLeft, SlidersHorizontal, Send, Sparkles,
} from 'lucide-react'

// ── Screen 1: Swipe / Nearby ──────────────────────────────────────────────
export function AppSwipeScreen() {
  return (
    <div className="flex h-full flex-col bg-[#faf7f8]">
      {/* Nav bar — compact, no circles that compete with the Dynamic Island */}
      <div className="flex shrink-0 items-center justify-between px-5 pt-2 pb-2">
        <button className="text-plum-800/70" aria-label="Back">
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <span className="font-display text-[15px] font-semibold tracking-tight text-plum-900">Nearby</span>
        <button className="text-plum-800/70" aria-label="Filter">
          <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      {/* Card stack */}
      <div className="relative mx-3 flex-1">
        {/* Behind cards — depth effect */}
        <div className="absolute inset-x-5 bottom-0 top-3 rounded-[1.5rem] bg-lilac-100/60" />
        <div className="absolute inset-x-2.5 bottom-0 top-1.5 rounded-[1.5rem] bg-blush-100/70" />

        {/* Main card: ring adds subtle depth vs the frame (fix #11, #8) */}
        <div className="relative h-full overflow-hidden rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.07]">
          {/* Profile photo — objectPosition gives headroom (fix #6) */}
          <img
            src="/realones/ananya.webp"
            alt="Ananya"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: 'center 15%' }}
            draggable={false}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />

          {/* 4-stop gradient — long smooth fade (fix #10) */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: '62%',
              background:
                'linear-gradient(to top, rgba(46,34,51,0.90) 0%, rgba(46,34,51,0.62) 22%, rgba(46,34,51,0.28) 48%, transparent 68%)',
            }}
          />

          {/* Info block (fix #4, #9, #13, #14) */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
            {/* Name + verified on one line */}
            <div className="flex items-center gap-1.5">
              <span
                className="font-display text-[20px] font-bold leading-none text-white"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.35)' }}
              >
                Ananya
              </span>
              <BadgeCheck className="h-[18px] w-[18px] shrink-0 fill-white text-plum-700" />
            </div>

            {/* Age on separate line from name (fix #13) */}
            <p className="mt-0.5 text-[12px] font-medium text-white/75">26 · Mumbai</p>

            {/* Bio for vertical balance (fix #14) */}
            <p className="mt-1 text-[11px] leading-snug text-white/60 line-clamp-1">
              dog mom · film nerd · will judge your playlist
            </p>

            {/* Pills: proper padding + spacing (fix #9) */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-[5px] text-[10px] font-medium text-white backdrop-blur-sm">
                <MapPin className="h-[10px] w-[10px] shrink-0" /> 2.4 km
              </span>
              <span className="flex items-center rounded-full bg-white/20 px-3 py-[5px] text-[10px] font-medium text-white backdrop-blur-sm">
                5′4″
              </span>
              <span className="flex items-center rounded-full bg-white/20 px-3 py-[5px] text-[10px] font-medium text-white backdrop-blur-sm">
                ♏ Scorpio
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons (fixes #2, #3, #7) */}
      {/* Heart = primary (largest, hot-pink glow) */}
      {/* Skip & Super-like = secondary (equal size, equal shadow) */}
      <div className="flex shrink-0 items-center justify-center gap-5 pb-5 pt-3.5">
        <button
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-plum-500 shadow-[0_2px_12px_rgba(0,0,0,0.13)] ring-1 ring-black/[0.05]"
          aria-label="Pass"
        >
          <X className="h-[18px] w-[18px]" />
        </button>

        <button
          className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-peach-400 to-blush-400 text-white shadow-[0_6px_22px_rgba(255,79,168,0.50)]"
          aria-label="Like"
        >
          <Heart className="h-6 w-6 fill-white" />
        </button>

        <button
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-lilac-500 shadow-[0_2px_12px_rgba(0,0,0,0.13)] ring-1 ring-black/[0.05]"
          aria-label="Super Like"
        >
          <Star className="h-[18px] w-[18px] fill-lilac-200" />
        </button>
      </div>
    </div>
  )
}

// ── Screen 2: Chat conversation ────────────────────────────────────────────
const CHAT_BUBBLES = [
  { me: false, text: 'ok your prompt about ranch dressing was unhinged 😊' },
  { me: true,  text: 'and yet here you are, replying' },
  { me: false, text: 'fair. coffee sat?' },
  { me: true,  text: 'only if you bring the ranch 📍' },
]

export function AppChatScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-peach-50 to-lilac-100">
      {/* Chat header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-plum-700/10 px-4 pb-3 pt-3">
        <div className="relative shrink-0">
          <img
            src="/realones/mara.jpg"
            alt="Mara"
            className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-peach-50" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-semibold text-plum-900">Mara</p>
            <BadgeCheck className="h-3.5 w-3.5 fill-lilac-400 text-white" />
          </div>
          <p className="text-[11px] font-medium text-emerald-500">● online now</p>
        </div>
      </div>

      {/* Bubbles */}
      <div className="flex flex-1 flex-col gap-2 overflow-hidden px-3.5 py-3">
        {CHAT_BUBBLES.map((b, i) => (
          <div key={i} className={`flex ${b.me ? 'justify-end' : 'justify-start'}`}>
            <span
              className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[12px] leading-snug shadow-sm ${
                b.me
                  ? 'rounded-br-[4px] bg-gradient-to-br from-peach-400 to-blush-400 text-white'
                  : 'rounded-bl-[4px] bg-white text-plum-900'
              }`}
            >
              {b.text}
            </span>
          </div>
        ))}

        {/* Typing indicator */}
        <div className="flex justify-start">
          <span className="rounded-2xl rounded-bl-[4px] bg-white px-4 py-2.5 shadow-sm">
            <span className="flex items-center gap-[5px]">
              {['-0.2s', '-0.1s', '0s'].map((d, i) => (
                <span
                  key={i}
                  className="h-[6px] w-[6px] animate-bounce rounded-full bg-blush-300"
                  style={{ animationDelay: d }}
                />
              ))}
            </span>
          </span>
        </div>
      </div>

      {/* Input */}
      <div className="m-3 flex shrink-0 items-center gap-2 rounded-full bg-white px-3.5 py-1.5 shadow-sm ring-1 ring-plum-700/10">
        <span className="flex-1 text-[11px] text-plum-700/40">type something cute…</span>
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-peach-400 to-blush-400 text-white">
          <Send className="h-3 w-3" />
        </span>
      </div>
    </div>
  )
}

// ── Screen 3: Match celebration ────────────────────────────────────────────
export function AppMatchScreen() {
  return (
    <div
      className="relative flex h-full flex-col items-center justify-center overflow-hidden px-5 text-center"
      style={{ background: 'linear-gradient(145deg, #fff0f6, #f5ecff, #ffeaf3)' }}
    >
      {/* Floating decorations */}
      <motion.div
        className="absolute left-5 top-12"
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart className="h-7 w-7 fill-blush-400 text-blush-400" />
      </motion.div>
      <motion.div
        className="absolute right-6 top-16"
        animate={{ y: [0, -16, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="h-5 w-5 text-lilac-400" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-8"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart className="h-4 w-4 fill-peach-300 text-peach-300" />
      </motion.div>

      <h3 className="font-display text-[28px] font-semibold text-gradient">it's a vibe!</h3>
      <p className="mt-1.5 text-[12px] text-plum-700/75">you and Mara liked each other</p>

      {/* Avatar pair */}
      <div className="mt-7 flex items-center -space-x-4">
        <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full border-[3px] border-white shadow-card">
          <img
            src="/realones/ananya.webp"
            alt="You"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 15%' }}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
        <div className="relative z-10 h-[72px] w-[72px] overflow-hidden rounded-full border-[3px] border-white shadow-card">
          <img
            src="/realones/mara.jpg"
            alt="Mara"
            className="h-full w-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
      </div>

      <button className="mt-8 rounded-full bg-gradient-to-r from-peach-400 to-blush-400 px-6 py-2.5 text-[13px] font-semibold text-white shadow-pill">
        send the first riss →
      </button>
      <button className="mt-3 text-[12px] font-medium text-plum-700/55">keep swiping</button>
    </div>
  )
}
