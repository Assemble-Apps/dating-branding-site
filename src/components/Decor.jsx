// Hand-drawn-feel decorative SVGs + ambient background pieces.
// All accept className so they can be positioned/animated freely.

export function Heart({ className = '', filled = true }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.5C12 20.5 3.5 15.2 3.5 8.9C3.5 6.1 5.7 4 8.3 4C9.9 4 11.3 4.9 12 6.2C12.7 4.9 14.1 4 15.7 4C18.3 4 20.5 6.1 20.5 8.9C20.5 15.2 12 20.5 12 20.5Z" />
    </svg>
  )
}

export function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.5 5.4 3.2 8.1 8.6 8.6C15.2 9.1 12.5 11.8 12 17.2 11.5 11.8 8.8 9.1 3.4 8.6 8.8 8.1 11.5 5.4 12 0Z" />
    </svg>
  )
}

export function Star({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.6 6.3 6.8.5-5.2 4.4 1.6 6.6L12 17.4 6.2 20.9l1.6-6.6L2.6 9.3l6.8-.5L12 2.5Z" />
    </svg>
  )
}

export function Squiggle({ className = '' }) {
  return (
    <svg viewBox="0 0 140 24" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
      <path d="M3 14C12 3 24 3 33 14s21 11 30 0 21-11 30 0 21 11 30 0" />
    </svg>
  )
}

export function Underline({ className = '' }) {
  return (
    <svg viewBox="0 0 220 26" className={className} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" aria-hidden="true">
      <path d="M6 17C44 7 120 5 214 12" />
    </svg>
  )
}

export function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 90 70" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 12c28 6 52 22 60 46" />
      <path d="M48 58l20 2 4-20" />
    </svg>
  )
}

// A soft floating gradient blob — pure decoration.
export function Blob({ className = '', from = '#FFB39A', to = '#FF87AE' }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-blob blur-2xl ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    />
  )
}

// Ambient floating blobs for section backgrounds.
export function FloatingBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Blob className="left-[-6rem] top-10 h-72 w-72 animate-floatySlow opacity-25" from="#FF8A6B" to="#FF87AE" />
      <Blob className="right-[-5rem] top-1/3 h-80 w-80 animate-floaty opacity-20" from="#A98EFF" to="#7896FF" />
      <Blob className="bottom-[-4rem] left-1/4 h-64 w-64 animate-floatySlow opacity-20" from="#FF9E84" to="#A98EFF" />
    </div>
  )
}
