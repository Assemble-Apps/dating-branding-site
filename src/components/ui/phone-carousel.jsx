import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Wifi, Signal, BatteryFull } from 'lucide-react'

// ── Phone frame ────────────────────────────────────────────────────────
function PhoneFrame({ src, alt, component, active, offset }) {
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
      <div className="relative w-[260px]">
        {/* Outer frame */}
        <div className="relative rounded-[2.8rem] bg-gradient-to-b from-ink-800 to-ink-800/90 p-[3px] shadow-[0_32px_80px_-8px_rgba(16,13,24,0.55)]">
          {/* Side buttons */}
          <div className="absolute -left-[3px] top-[88px] h-8 w-[3px] rounded-l-sm bg-ink-700" />
          <div className="absolute -left-[3px] top-[130px] h-12 w-[3px] rounded-l-sm bg-ink-700" />
          <div className="absolute -left-[3px] top-[152px] h-12 w-[3px] rounded-l-sm bg-ink-700" />
          <div className="absolute -right-[3px] top-[120px] h-16 w-[3px] rounded-r-sm bg-ink-700" />

          {/* Screen bezel */}
          <div className="overflow-hidden rounded-[2.5rem] bg-black">
            {/* Status bar — white bg so Dynamic Island is clearly visible (dark pill on light) */}
            <div className="relative flex h-[52px] items-center justify-between bg-white px-5">
              <span className="text-[10px] font-bold text-ink-800">9:41</span>

              {/* Dynamic island — dark, pops against white; top-[9px] ≈ real device position */}
              <div className="absolute left-1/2 top-[9px] h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-ink-800" />

              {/* Signal · WiFi · Battery — Lucide icons for a clean, consistent look */}
              <div className="flex items-center gap-[5px] text-ink-800">
                <Signal className="h-[13px] w-[13px]" strokeWidth={2} />
                <Wifi className="h-[13px] w-[13px]" strokeWidth={2} />
                <BatteryFull className="h-[13px] w-[13px]" strokeWidth={2} />
              </div>
            </div>

            {/* App screen — accepts either an image src or a React component */}
            <div className="relative aspect-[9/19] w-full overflow-hidden">
              {component ?? (
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              )}
            </div>

            {/* Home indicator */}
            <div className="flex h-5 items-center justify-center bg-white">
              <div className="h-1 w-20 rounded-full bg-ink-800/20" />
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
      className="grid h-8 w-8 place-items-center rounded-full bg-ink-800/8 text-ink-700/60 transition-colors hover:bg-ink-800/12 hover:text-ink-800"
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
    <div className="flex flex-col items-center gap-5">
      {/* Carousel stage */}
      <div className="relative h-[580px] w-full max-w-md">
        {visible.map(({ offset, index }) => (
          <PhoneFrame
            key={index}
            src={images[index].src}
            alt={images[index].alt}
            component={images[index].component}
            active={offset === 0}
            offset={offset}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <NavBtn onClick={prev}>
          <ChevronLeft className="h-3.5 w-3.5" />
        </NavBtn>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[7px] rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-5 bg-gradient-to-r from-peach-400 to-blush-400'
                  : 'w-[7px] bg-ink-800/18 hover:bg-ink-800/30'
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
