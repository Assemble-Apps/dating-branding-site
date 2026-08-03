import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'

const PROFILES = [
  { src: '/realones/mara.jpg',    name: 'mara',   rotate: -2.2 },
  { src: '/realones/diya.jpg',    name: 'diya',   rotate:  2.8 },
  { src: '/realones/zoya.jpg',    name: 'zoya',   rotate: -1.5 },
  { src: '/realones/ananya.webp', name: 'ananya', rotate:  1.8 },
]

export default function VerifiedProfileCards() {
  const [idx, setIdx]     = useState(0)
  const [prevIdx, setPrevIdx] = useState(null)

  useEffect(() => {
    const id = setInterval(() => {
      setPrevIdx((i) => (i === null ? 0 : (i + 1) % PROFILES.length))
      setIdx((i) => (i + 1) % PROFILES.length)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  const profile = PROFILES[idx]
  const prev    = prevIdx !== null ? PROFILES[prevIdx] : null

  return (
    <div className="relative mx-auto" style={{ width: 272, height: 372 }}>
      <AnimatePresence>
        {/* exiting card */}
        {prev && (
          <motion.div
            key={`exit-${prevIdx}`}
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: 24,
              border: '2px solid rgba(255,105,180,0.30)',
              boxShadow: '0 28px 64px rgba(16,13,24,0.22)',
              rotate: prev.rotate,
            }}
            exit={{ opacity: 0, scale: 0.93, transition: { duration: 0.3, ease: 'easeIn' } }}
          >
            <img src={prev.src} alt={prev.name} className="h-full w-full object-cover" style={{ objectPosition: 'center 18%' }} draggable={false} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(46,34,51,0.6) 0%, transparent 52%)' }} />
          </motion.div>
        )}

        {/* entering card */}
        <motion.div
          key={`enter-${idx}`}
          className="absolute inset-0 overflow-hidden"
          style={{
            borderRadius: 24,
            border: '2px solid rgba(255,105,180,0.30)',
            boxShadow: '0 28px 64px rgba(16,13,24,0.22)',
            rotate: profile.rotate,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={profile.src} alt={profile.name} className="h-full w-full object-cover" style={{ objectPosition: 'center 18%' }} draggable={false} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(46,34,51,0.6) 0%, transparent 52%)' }} />

          {/* verified badge on the card */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-sm">
            <BadgeCheck className="h-4 w-4 text-blush-400" />
            <span style={{ fontFamily: '"Plus Jakarta Sans", system-ui', fontSize: '0.78rem', fontWeight: 600, color: '#fff' }}>
              verified
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* dot indicators */}
      <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5">
        {PROFILES.map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === idx ? '20px' : '6px',
              background: i === idx ? '#FF69B4' : 'rgba(16,13,24,0.18)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
