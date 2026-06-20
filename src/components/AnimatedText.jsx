import { motion } from 'framer-motion'

// Gradient stops (peach -> pink -> lilac) — same family as the CSS gradient.
const STOPS = [
  [255, 138, 107], // #FF8A6B
  [255, 135, 174], // #FF87AE
  [169, 142, 255], // #A98EFF
]

// Sample the gradient at t ∈ [0,1] and return an rgb() string.
function gradColor(t) {
  const seg = t <= 0.5 ? 0 : 1
  const lt = seg === 0 ? t / 0.5 : (t - 0.5) / 0.5
  const a = STOPS[seg]
  const b = STOPS[seg + 1]
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * lt))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}

// Word whose letters spring in one-by-one and keep a gentle staggered wave.
// Each letter is a SOLID interpolated colour (no background-clip:text) driven
// by pure CSS keyframes — no framer/CSS transform fight, so it always settles.
export function PoppingGradientWord({ text, delay = 0, className = '' }) {
  const letters = [...text]
  const n = letters.length
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {letters.map((ch, i) => {
        if (ch === ' ') return <span key={i}>&nbsp;</span>
        const t = n > 1 ? i / (n - 1) : 0.5
        const d = delay + i * 0.06
        return (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block"
            style={{
              color: gradColor(t),
              animation: `popIn 0.6s ${d}s both, letterWaveK 3s ease-in-out ${d + 0.8}s infinite`,
            }}
          >
            {ch}
          </span>
        )
      })}
    </span>
  )
}

// Squiggly underline that draws itself in.
export function DrawUnderline({ className = '', delay = 0 }) {
  return (
    <svg viewBox="0 0 220 26" className={className} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" aria-hidden="true">
      <motion.path
        d="M6 17C44 7 120 5 214 12"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay, duration: 0.9, ease: 'easeInOut' }}
      />
    </svg>
  )
}

// Star that pops then keeps twinkling.
export function TwinkleSparkle({ className = '', delay = 0 }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      initial={{ scale: 0, rotate: -40, opacity: 0 }}
      animate={{ scale: [0, 1.3, 1, 0.85, 1], rotate: 0, opacity: [0, 1, 0.9, 0.55, 0.9] }}
      transition={{ delay, duration: 2.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4, times: [0, 0.22, 0.45, 0.7, 1] }}
    >
      <path d="M12 0c.5 5.4 3.2 8.1 8.6 8.6C15.2 9.1 12.5 11.8 12 17.2 11.5 11.8 8.8 9.1 3.4 8.6 8.8 8.1 11.5 5.4 12 0Z" />
    </motion.svg>
  )
}
