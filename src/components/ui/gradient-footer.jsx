/**
 * RissmeGradientFooter — adapted from Ruixen Gradient Footer.
 * Original concept: https://www.diabrowser.com
 *
 * Colour ramp (floor → peak): cream → blush → light-pink → hot-pink → transparent
 * so the glow rises out of the page's own sand background seamlessly.
 *
 * Plain JS — no TypeScript, no "use client", no shadcn.
 */
import { useEffect, useId, useRef, useState } from 'react'

const VBW = 1271
const VBH = 599

// Hot pink → light pink → whitish cream (matches #EDE3D3 page background at floor)
const RISSME_STOPS = [
  { offset: 0,    color: '#EDE3D3' },   // cream floor — blends with page bg
  { offset: 0.15, color: '#FFF0F6' },   // barely-there blush
  { offset: 0.32, color: '#FFD6E8' },   // light pink (peach-100)
  { offset: 0.50, color: '#FF9AC8' },   // blush-300
  { offset: 0.65, color: '#FF69B4' },   // blush-400
  { offset: 0.80, color: '#FF4FA8' },   // peach-400 (hot pink)
  { offset: 0.93, color: '#FF1493' },   // peach-500 (deep hot pink at peaks)
  { offset: 1,    color: '#FF149300' }, // transparent tip
]

// Bell curve: short edges → tallest centre, matching the mountain silhouette
function bellHeights(n, peak, valley) {
  const out = []
  const mid = (n - 1) / 2
  for (let i = 0; i < n; i++) {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid
    const eased = 1 - Math.pow(t, 1.24)
    out.push(peak * VBH * (valley + (1 - valley) * eased))
  }
  return out
}

const clamp01 = (v) => Math.max(0, Math.min(1, v))

export function GradientFooter({
  children,
  gradientHeight = '55vh',
  minReveal = 0.035,
  bars = 11,
  blur = 18,
  peak = 0.96,
  valley = 0.5,
  stops = RISSME_STOPS,
  className = '',
  style = {},
}) {
  const uid = useId().replace(/:/g, '')
  const bandRef = useRef(null)
  const [progress, setProgress] = useState(minReveal)

  useEffect(() => {
    const el = bandRef.current
    if (!el) return
    const doc = el.ownerDocument
    const win = doc.defaultView ?? window

    const measure = () => {
      const h = el.offsetHeight || 1
      const left = doc.documentElement.scrollHeight - win.innerHeight - win.scrollY
      const t = clamp01((h - left) / h)
      setProgress(minReveal + (1 - minReveal) * t)
    }

    measure()
    win.addEventListener('scroll', measure, { passive: true })
    win.addEventListener('resize', measure, { passive: true })
    return () => {
      win.removeEventListener('scroll', measure)
      win.removeEventListener('resize', measure)
    }
  }, [minReveal])

  const colW = VBW / bars

  return (
    <footer
      className={className}
      style={{ paddingBottom: gradientHeight, ...style }}
    >
      {children}

      {/* Fixed glow band — pinned to viewport bottom, rises as you scroll */}
      <div
        ref={bandRef}
        aria-hidden
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          height: gradientHeight,
          pointerEvents: 'none',
          transformOrigin: 'bottom',
          transform: `scaleY(${progress})`,
          willChange: 'transform',
        }}
      >
        <svg
          style={{ height: '100%', width: '100%', display: 'block' }}
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-${uid}`} x1="0" y1="1" x2="0" y2="0">
              {stops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
            <filter
              id={`blur-${uid}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          </defs>

          {bellHeights(bars, peak, valley).map((barH, i) => (
            <g key={i} filter={`url(#blur-${uid})`}>
              <rect
                x={i * colW}
                y={VBH - barH}
                width={colW * 1.23}
                height={barH}
                fill={`url(#grad-${uid})`}
              />
            </g>
          ))}
        </svg>
      </div>
    </footer>
  )
}
