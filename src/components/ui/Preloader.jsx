/**
 * Rissme Preloader
 *
 * Phases:
 *  counting — logo + 0→100% counter (easeInOutExpo, 5.5 s)
 *  ready    — counter holds at 100, "click here to find your one" button appears
 *  done     — fade out (0.75 s) → onDone() callback
 */
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CrowdCanvas from './CrowdCanvas'

function eioExpo(t) {
  if (t === 0) return 0
  if (t === 1) return 1
  return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
}

function LogoMark() {
  return (
    <div className="flex justify-center">
      <img
        src="/rissme%20logo/rissme_svg_logo-transparent.png"
        alt="Rissme"
        style={{ height: '88px', width: 'auto' }}
        draggable={false}
      />
    </div>
  )
}

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState('counting')
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  // counter 0 → 100 over 5500 ms
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

  const showCounter = phase === 'counting' || phase === 'ready'

  return (
    <AnimatePresence onExitComplete={onDone}>
      {phase !== 'done' ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ background: '#EDE3D3' }}
          exit={{ opacity: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }}
        >
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
                        fontFamily:    'Fraunces, serif',
                        fontSize:      'clamp(96px, 18vw, 160px)',
                        fontWeight:    600,
                        color:         '#100D18',
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
                        fontSize:   'clamp(18px, 2.5vw, 26px)',
                        fontWeight: 500,
                        color:      '#FF69B4',
                        marginLeft: '6px',
                      }}
                    >
                      %
                    </span>
                  </motion.div>

                  {/* CTA — appears once counter hits 100 */}
                  <AnimatePresence>
                    {phase === 'ready' && (
                      <motion.button
                        key="cta"
                        onClick={() => setPhase('done')}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        whileHover={{
                          scale:      1.06,
                          boxShadow:  '0 8px 32px rgba(255,105,180,0.28), inset 0 1px 0 rgba(255,255,255,0.7)',
                          background: 'rgba(255,255,255,0.45)',
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-8 flex cursor-pointer items-center gap-2 rounded-full px-7 py-3"
                        style={{
                          fontFamily:         '"Plus Jakarta Sans", system-ui, sans-serif',
                          fontSize:           '0.875rem',
                          fontWeight:         600,
                          color:              '#100D18',
                          letterSpacing:      '0.02em',
                          background:         'rgba(255,255,255,0.28)',
                          backdropFilter:     'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border:             '1px solid rgba(255,255,255,0.55)',
                          boxShadow:          '0 4px 24px rgba(16,13,24,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                        }}
                      >
                        click here to find your one
                        <span style={{ color: '#FF69B4' }}>→</span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
