/**
 * Rissme Cinematic Preloader
 *
 * Phases:
 *  counting  — logo + 0→100% counter (easeInOutExpo, 1.8 s)
 *  gallery   — floating card cycling through 4 portraits (400 ms each)
 *  expanding — final card FLIP-expands to fullscreen (1.2 s)
 *  revealing — staggered headline + subtitle + CTA (1.2 s hold)
 *  done      — fade out (0.7 s) → onDone() callback
 *
 * Total runtime: ≈ 6.5 – 7 s
 */
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CrowdCanvas from './CrowdCanvas'

// ── Gallery portraits ─────────────────────────────────────────────────
const GALLERY = [
  { src: '/realones/mara.jpg',    rotate: -1.8 },
  { src: '/realones/diya.jpg',    rotate:  2.2 },
  { src: '/realones/zoya.jpg',    rotate: -1.1 },
  { src: '/realones/ananya.webp', rotate:  1.5 }, // ← expands to fullscreen
]
const FINAL = GALLERY.length - 1

// ── easeInOutExpo ─────────────────────────────────────────────────────
function eioExpo(t) {
  if (t === 0) return 0
  if (t === 1) return 1
  return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
}

// ── Rissme logo mark ──────────────────────────────────────────────────
function LogoMark({ className = '' }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img
        src="/rissme%20logo/rissme_svg_logo-transparent.png"
        alt="Rissme"
        style={{ height: '88px', width: 'auto' }}
        draggable={false}
      />
    </div>
  )
}

// ── Main Preloader ─────────────────────────────────────────────────────
export default function Preloader({ onDone }) {
  const [phase, setPhase]     = useState('counting')
  const [count, setCount]     = useState(0)
  const [imgIdx, setImgIdx]   = useState(0)
  const [prevIdx, setPrevIdx] = useState(null)
  const [cardRect, setCardRect] = useState(null)
  const cardRef = useRef(null)
  const rafRef  = useRef(null)

  // ── Phase 1: counter 0 → 100 (easeInOutExpo, 5500 ms) ──────────────
  useEffect(() => {
    const start    = performance.now()
    const duration = 5500

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1)
      setCount(Math.round(eioExpo(t) * 100))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setPhase('ready')
      }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // ── Phase 2: gallery — cycle images every 400 ms ───────────────────
  useEffect(() => {
    if (phase !== 'gallery') return
    let idx = 0
    const interval = setInterval(() => {
      idx++
      if (idx > FINAL) {
        clearInterval(interval)
        // capture card position, then expand
        setTimeout(() => {
          const rect = cardRef.current?.getBoundingClientRect()
          if (rect) setCardRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })
          setPhase('expanding')
        }, 350)
        return
      }
      setPrevIdx(idx - 1)
      setImgIdx(idx)
    }, 420)
    return () => clearInterval(interval)
  }, [phase])

  // ── Phase 3 → 4: expansion done → reveal text ─────────────────────
  useEffect(() => {
    if (phase !== 'expanding') return
    const t = setTimeout(() => setPhase('revealing'), 1200)
    return () => clearTimeout(t)
  }, [phase])

  // ── Phase 4 → done: text visible → fade out ───────────────────────
  useEffect(() => {
    if (phase !== 'revealing') return
    const t = setTimeout(() => setPhase('done'), 1800)
    return () => clearTimeout(t)
  }, [phase])

  const showCard     = phase === 'gallery'
  const showCounter  = phase === 'counting' || phase === 'ready'
  const showExpanded = phase === 'expanding' || phase === 'revealing' || phase === 'done'

  return (
    <AnimatePresence onExitComplete={onDone}>
      {phase !== 'done' ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ background: '#EDE3D3' }}
          exit={{ opacity: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }}
        >

          {/* ── Counter layer ────────────────────────────────────── */}
          <AnimatePresence>
            {showCounter && (
              <motion.div
                key="counter"
                className="absolute inset-0 flex flex-col items-center justify-start overflow-hidden pt-14 sm:pt-20"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
              >
                {/* crowd walks at the bottom while counter ticks */}
                <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />

                {/* logo + counter float above crowd */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <LogoMark />
                  </motion.div>

                  <motion.div
                    className="mt-6 flex items-baseline leading-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                  >
                    <motion.span
                      className="tabular-nums"
                      style={{
                        fontFamily: 'Fraunces, serif',
                        fontSize: 'clamp(96px, 18vw, 160px)',
                        fontWeight: 600,
                        color: '#100D18',
                        letterSpacing: '-0.03em',
                      }}
                      animate={{ scale: [1, 1.025, 1] }}
                      transition={{ duration: 5.5, ease: 'easeInOut' }}
                    >
                      {count}
                    </motion.span>
                    <span
                      style={{
                        fontFamily: 'Fraunces, serif',
                        fontSize: 'clamp(18px, 2.5vw, 26px)',
                        fontWeight: 500,
                        color: '#FF69B4',
                        marginLeft: '6px',
                      }}
                    >
                      %
                    </span>
                  </motion.div>

                  {/* click to discover — appears when counting finishes */}
                  <AnimatePresence>
                    {phase === 'ready' && (
                      <motion.button
                        key="cta"
                        onClick={() => setPhase('gallery')}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-8 flex items-center gap-2 rounded-full px-7 py-3"
                        style={{
                          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#100D18',
                          letterSpacing: '0.02em',
                          background: 'rgba(255,255,255,0.28)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255,255,255,0.55)',
                          boxShadow: '0 4px 24px rgba(16,13,24,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                        }}
                      >
                        click to discover
                        <span style={{ color: '#FF69B4' }}>→</span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Gallery card layer ───────────────────────────────── */}
          <AnimatePresence>
            {showCard && (
              <motion.div
                key="gallery"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4 }}
              >
                <div
                  ref={cardRef}
                  className="relative"
                  style={{ width: 292, height: 400 }}
                >
                  <AnimatePresence>
                    {/* Exiting image */}
                    {prevIdx !== null && (
                      <motion.div
                        key={`exit-${prevIdx}`}
                        className="absolute inset-0 overflow-hidden"
                        style={{
                          borderRadius: 28,
                          border: '2px solid rgba(255,105,180,0.30)',
                          boxShadow: '0 32px 72px rgba(16,13,24,0.28)',
                          rotate: GALLERY[prevIdx].rotate,
                        }}
                        exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.32, ease: 'easeIn' } }}
                      >
                        <img
                          src={GALLERY[prevIdx].src}
                          alt=""
                          className="h-full w-full object-cover"
                          style={{ objectPosition: 'center 18%' }}
                          draggable={false}
                        />
                        {/* subtle warm overlay */}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(46,34,51,0.55) 0%, transparent 55%)' }} />
                      </motion.div>
                    )}

                    {/* Entering image */}
                    <motion.div
                      key={`enter-${imgIdx}`}
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        borderRadius: 28,
                        border: '2px solid rgba(255,105,180,0.30)',
                        boxShadow: '0 32px 72px rgba(16,13,24,0.28)',
                        rotate: GALLERY[imgIdx].rotate,
                      }}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <img
                        src={GALLERY[imgIdx].src}
                        alt=""
                        className="h-full w-full object-cover"
                        style={{ objectPosition: 'center 18%' }}
                        draggable={false}
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(46,34,51,0.55) 0%, transparent 55%)' }} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Fullscreen expansion + text reveal ───────────────── */}
          {showExpanded && cardRect && (
            <motion.div
              className="fixed overflow-hidden"
              style={{ zIndex: 10 }}
              initial={{
                top:          cardRect.top,
                left:         cardRect.left,
                width:        cardRect.width,
                height:       cardRect.height,
                borderRadius: 28,
              }}
              animate={{
                top:          0,
                left:         0,
                width:        '100vw',
                height:       '100vh',
                borderRadius: 0,
              }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Fullscreen hero image */}
              <img
                src={GALLERY[FINAL].src}
                alt=""
                className="h-full w-full object-cover"
                style={{ objectPosition: 'center 18%' }}
                draggable={false}
              />

              {/* Layered gradient for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(16,13,24,0.80) 0%, rgba(16,13,24,0.38) 40%, rgba(16,13,24,0.10) 65%, transparent 100%)',
                }}
              />

              {/* Text reveal — fades in only after expansion settles */}
              {phase === 'revealing' && (
                <div className="absolute inset-x-0 bottom-0 px-8 pb-16 sm:px-16 sm:pb-20">
                  {/* Staggered headline words */}
                  <h2
                    aria-label="slide in. for real this time."
                    style={{
                      fontFamily:    'Fraunces, serif',
                      fontWeight:    600,
                      fontSize:      'clamp(2.5rem, 6vw, 5.5rem)',
                      lineHeight:    1.0,
                      letterSpacing: '-0.02em',
                      color:         '#F6F3FC',
                    }}
                  >
                    {['slide', 'in.', 'for', 'real', 'this', 'time.'].map((word, i) => (
                      <motion.span
                        key={word + i}
                        style={{ display: 'inline-block', marginRight: '0.28em' }}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.65,
                          delay:    i * 0.085,
                          ease:     [0.22, 1, 0.36, 1],
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h2>

                  {/* Subtitle */}
                  <motion.p
                    style={{
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize:   'clamp(1rem, 2vw, 1.2rem)',
                      color:      'rgba(246,243,252,0.75)',
                      marginTop:  '1rem',
                      maxWidth:   '480px',
                    }}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Verified humans. Real matches. Zero ick.
                  </motion.p>

                  {/* CTA button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginTop: '2rem' }}
                  >
                    <span
                      style={{
                        display:       'inline-block',
                        padding:       '14px 32px',
                        borderRadius:  '999px',
                        background:    'linear-gradient(135deg,#FF4FA8,#FF69B4)',
                        boxShadow:     '0 10px 34px -8px rgba(255,105,180,0.55)',
                        fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                        fontWeight:    600,
                        fontSize:      '0.95rem',
                        color:         '#fff',
                        letterSpacing: '0.01em',
                      }}
                    >
                      get on the list →
                    </span>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
