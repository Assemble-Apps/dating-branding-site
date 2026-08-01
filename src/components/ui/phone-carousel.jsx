import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ── Phone frame ────────────────────────────────────────────────────────
function PhoneFrame({ src, alt, active, offset }) {
  const scale = active ? 1 : 0.82
  const rotateY = offset * -18
  const translateX = offset * 38
  const zIndex = active ? 10 : 5 - Math.abs(offset)
  const opacity = Math.abs(offset) > 1 ? 0 : active ? 1 : 0.72

  return (
    <div
      className="absolute top-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        left: '50%',
        transform: `translateX(calc(-50% + ${translateX}%)) scale(${scale}) perspective(900px) rotateY(${rotateY}deg)`,
        zIndex,
        opacity,
      }}
    >
      {/* Phone shell */}
      <div className="relative w-[220px] sm:w-[248px]">
        {/* Outer frame */}
        <div className="relative rounded-[2.8rem] bg-gradient-to-b from-ink-800 to-ink-800/90 p-[3px] shadow-[0_32px_80px_-8px_rgba(16,13,24,0.55)]">
          {/* Side buttons */}
          <div className="absolute -left-[3px] top-[88px] h-8 w-[3px] rounded-l-sm bg-ink-700" />
          <div className="absolute -left-[3px] top-[130px] h-12 w-[3px] rounded-l-sm bg-ink-700" />
          <div className="absolute -left-[3px] top-[152px] h-12 w-[3px] rounded-l-sm bg-ink-700" />
          <div className="absolute -right-[3px] top-[120px] h-16 w-[3px] rounded-r-sm bg-ink-700" />

          {/* Screen bezel */}
          <div className="overflow-hidden rounded-[2.5rem] bg-black">
            {/* Status bar */}
            <div className="relative flex h-10 items-center justify-between bg-black px-6">
              <span className="text-[10px] font-semibold text-white/80">9:41</span>
              {/* Dynamic island */}
              <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
              <div className="flex items-center gap-1">
                <div className="h-2.5 w-3.5 rounded-sm border border-white/70 p-px">
                  <div className="h-full w-3/4 rounded-sm bg-white/70" />
                </div>
              </div>
            </div>

            {/* App screen */}
            <div className="relative aspect-[9/19] w-full overflow-hidden bg-gradient-to-b from-peach-100 to-blush-100">
              <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Home indicator */}
            <div className="flex h-6 items-center justify-center bg-black">
              <div className="h-1 w-24 rounded-full bg-white/30" />
            </div>
          </div>
        </div>

        {/* Reflection */}
        <div className="mx-4 mt-2 h-6 rounded-b-full bg-gradient-to-b from-ink-800/20 to-transparent blur-md" />
      </div>
    </div>
  )
}

// ── Nav button ─────────────────────────────────────────────────────────
function NavBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/65 bg-white/52 text-ink-700 shadow-card backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-blush-300/50 hover:text-blush-500 hover:shadow-md"
    >
      {children}
    </button>
  )
}

// ── Main component ─────────────────────────────────────────────────────
export default function PhoneCarousel({ images, autoPlayMs = 3200 }) {
  const [current, setCurrent] = useState(0)
  const total = images.length

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])

  useEffect(() => {
    const t = setInterval(next, autoPlayMs)
    return () => clearInterval(t)
  }, [next, autoPlayMs])

  // Compute offsets: -1 left, 0 center, +1 right (only show ±1)
  const visible = [-1, 0, 1].map((o) => ({
    offset: o,
    index: (current + o + total) % total,
  }))

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Carousel stage */}
      <div className="relative h-[500px] w-full max-w-md sm:h-[560px]">
        {visible.map(({ offset, index }) => (
          <PhoneFrame
            key={index}
            src={images[index].src}
            alt={images[index].alt}
            active={offset === 0}
            offset={offset}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-5">
        <NavBtn onClick={prev}>
          <ChevronLeft className="h-4 w-4" />
        </NavBtn>

        {/* Dots */}
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 bg-gradient-to-r from-peach-400 to-blush-400'
                  : 'w-2 bg-ink-800/20 hover:bg-blush-300/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <NavBtn onClick={next}>
          <ChevronRight className="h-4 w-4" />
        </NavBtn>
      </div>
    </div>
  )
}
