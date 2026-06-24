import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

const GAP = 12

// Repeats the people list until it fills a full last row, so the grid
// stays rectangular no matter how many unique photos we have.
function padToGrid(items, columns) {
  if (items.length === 0) return items
  const remainder = items.length % columns
  if (remainder === 0) return items
  const fill = columns - remainder
  return items.concat(Array.from({ length: fill }, (_, i) => items[i % items.length]))
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

// A stride coprime with the photo count walks through every photo before
// repeating any of them, instead of i % length - which (whenever columns
// is a multiple of the photo count) makes every row repeat the exact same
// sequence as the row above it.
function coprimeStride(n) {
  if (n <= 2) return 1
  let s = Math.max(2, Math.round(n * 0.618))
  while (gcd(s, n) !== 1) s++
  return s
}

export default function VerifiedWall({
  title = 'the no-bots wall',
  subtitle,
  people,
  columns = 9,
  tilt = 18,
  perspective = 1100,
  speed = 22,
  height = 280,
  className = '',
}) {
  const wallRef = useRef(null)
  const blockRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const [blockHeight, setBlockHeight] = useState(0)

  // ~6 laps through the real-ones photo set so the wall feels full, walked
  // with a coprime stride so rows don't all show the same 1-2-3 order.
  const tiles = useMemo(() => {
    const stride = coprimeStride(people.length)
    const repeated = Array.from({ length: columns * 6 }, (_, i) => people[(i * stride) % people.length])
    return padToGrid(repeated, columns)
  }, [people, columns])

  // Measures one copy of the grid so the scroll loop wraps without a seam.
  useLayoutEffect(() => {
    const block = blockRef.current
    if (!block) return
    const measure = () => setBlockHeight(block.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(block)
    return () => ro.disconnect()
  }, [tiles, columns])

  // Continuous upward scroll, paused while a tile's hovered so the name stays readable.
  const y = useMotionValue(0)
  useAnimationFrame((_, delta) => {
    if (tooltip || blockHeight === 0) return
    const wrap = blockHeight + GAP
    let next = y.get() - (speed * delta) / 1000
    if (next <= -wrap) next += wrap
    y.set(next)
  })

  const handleEnter = (e, person) => {
    const wall = wallRef.current
    if (!wall) return
    const tile = e.currentTarget.getBoundingClientRect()
    const box = wall.getBoundingClientRect()
    setTooltip({
      label: person.role ? `${person.name} · ${person.role}` : person.name,
      left: tile.left - box.left + tile.width / 2,
      top: tile.top - box.top,
    })
  }

  const planeStyle = { transform: `rotateX(${tilt}deg)`, transformStyle: 'preserve-3d' }
  const gridStyle = { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: GAP }

  const renderGrid = (copy, ref) => (
    <div ref={ref} className="grid w-full" style={gridStyle}>
      {tiles.map((p, i) => (
        <div
          key={`${copy}-${p.name}-${i}`}
          aria-label={p.name}
          onMouseEnter={(e) => handleEnter(e, p)}
          className="group relative block aspect-square outline-none"
        >
          {/* The clickable/hover area stays fixed size; only this inner layer
              scales up, so the hover target never drifts out from under the cursor. */}
          <span className="absolute inset-0 overflow-hidden rounded-[4px] transition-transform duration-300 ease-out group-hover:z-20 group-hover:scale-[1.28]">
            <img
              src={p.src}
              alt={p.name}
              loading="lazy"
              draggable={false}
              className="h-full w-full select-none object-cover grayscale brightness-95 transition duration-300 group-hover:grayscale-0 group-hover:brightness-100"
            />
            <span className="pointer-events-none absolute inset-0 rounded-[4px] ring-1 ring-inset ring-ink-800/10 transition group-hover:ring-blush-400/60" />
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <div className={`w-full px-6 py-10 sm:px-10 sm:py-14 bg-[var(--wall-bg)] text-ink-800 [--wall-bg:#EDE3D3] ${className}`}>
      <div className="mx-auto flex max-w-fit flex-wrap items-center justify-center gap-3 rounded-full border border-white/65 bg-white/52 px-5 py-2.5 shadow-card backdrop-blur-md sm:gap-4 sm:px-7">
        <span className="flex items-center gap-2 whitespace-nowrap font-display text-base font-semibold tracking-tight text-ink-800 sm:text-lg">
          <ShieldCheck className="h-4 w-4 text-blush-400 sm:h-5 sm:w-5" />
          {title}
        </span>
        <span className="hidden h-5 w-px bg-ink-800/15 sm:block" />
        <span className="flex items-center gap-1.5 whitespace-nowrap text-sm text-ink-700/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 animate-dotBlink rounded-full bg-blush-400" />
          </span>
          {subtitle ?? (
            <>
              <span className="font-semibold text-blush-400">2.4M+</span> verified humans and counting
            </>
          )}
        </span>
      </div>

      <div
        ref={wallRef}
        className="relative mx-auto mt-8 max-w-6xl overflow-hidden"
        style={{ perspective: `${perspective}px`, perspectiveOrigin: '50% 50%', height }}
        onMouseLeave={() => setTooltip(null)}
      >
        <div className="h-full" style={planeStyle}>
          {/* Two identical copies stacked vertically create the illusion of an endless loop. */}
          <motion.div className="flex w-full flex-col" style={{ y, gap: GAP }}>
            {renderGrid(0, blockRef)}
            {renderGrid(1)}
          </motion.div>
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(130% 95% at 50% 50%, transparent 30%, var(--wall-bg) 82%),
              linear-gradient(to bottom, var(--wall-bg) 0%, transparent 16%, transparent 84%, var(--wall-bg) 100%),
              linear-gradient(to right, var(--wall-bg) 0%, transparent 12%, transparent 88%, var(--wall-bg) 100%)
            `,
          }}
        />

        {tooltip && (
          <div
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md bg-ink-800 px-2.5 py-1 text-xs font-medium text-mist-100 shadow-card"
            style={{ left: tooltip.left, top: tooltip.top }}
          >
            {tooltip.label}
            <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-ink-800" />
          </div>
        )}
      </div>
    </div>
  )
}
