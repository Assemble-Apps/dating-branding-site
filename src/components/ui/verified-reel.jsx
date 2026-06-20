import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

import { realOnes } from '../../data/content'
import { Heart, Sparkle } from '../Decor'

/* Scroll-driven "verified reel": a swarm of real, verified faces flies in from
 * scatter, gathers into a ring, then blooms into a rainbow arc as you scroll —
 * all driven by NATURAL page scroll (no wheel hijacking). Flip a card to reveal
 * its verified badge. Adapted from a TS/Next intro-hero to our JS + pastel theme. */

const IMG_W = 66
const IMG_H = 92
const CARD_COUNT = 16
const CARDS = Array.from({ length: CARD_COUNT }, (_, i) => realOnes[i % realOnes.length])

const lerp = (a, b, t) => a * (1 - t) + b * t
const clamp01 = (v) => Math.min(1, Math.max(0, v))

function FlipCard({ src, alt, target }) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: 'spring', stiffness: 45, damping: 16 }}
      style={{
        position: 'absolute',
        width: IMG_W,
        height: IMG_H,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front — the verified human */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-white bg-peach-100 shadow-card"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-plum-900/10 transition-colors group-hover:bg-transparent" />
        </div>

        {/* Back — verified badge */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-white bg-gradient-to-br from-peach-400 to-lilac-400 text-white shadow-card"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-xl">💗</span>
          <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em]">verified</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function VerifiedReel() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  // Measure the pinned stage so circle/arc maths are responsive.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
    })
    ro.observe(el)
    setSize({ width: el.offsetWidth, height: el.offsetHeight })
    return () => ro.disconnect()
  }, [])

  // Drive everything from the section's own scroll progress (0 → 1).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const [p, setP] = useState(0)
  useEffect(() => smooth.on('change', setP), [smooth])

  // Gentle mouse parallax on the arc.
  const mouseX = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const [parallax, setParallax] = useState(0)
  useEffect(() => smoothMouseX.on('change', setParallax), [smoothMouseX])

  const onMouseMove = (e) => {
    const el = stageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseX.set(nx * 70)
  }

  // Stable random scatter origin per card.
  const scatter = useMemo(
    () =>
      CARDS.map(() => ({
        x: (Math.random() - 0.5) * 1400,
        y: (Math.random() - 0.5) * 900,
        rotation: (Math.random() - 0.5) * 160,
        scale: 0.6,
      })),
    [],
  )

  // Phase progress slices: scatter → ring → arc, then the arc just holds
  // (clean + symmetric) for the rest of the scroll so it can be admired.
  const assembleP = clamp01(p / 0.38) // scatter → ring
  const morphP = clamp01((p - 0.38) / 0.34) // ring → arc (settled by p≈0.72)

  const introOpacity = clamp01(1 - morphP * 2)
  const arcOpacity = clamp01((morphP - 0.5) / 0.4)

  const isMobile = size.width < 768
  const W = size.width || 800
  const H = size.height || 600
  const minDim = Math.min(W, H)
  const ringRadius = Math.min(minDim * 0.34, 300)

  // Fit the rainbow arch to the stage: pick a visible half-width + arch height,
  // then solve the radius/angle so the endpoints land near the screen edges
  // (rather than the original's oversized radius that flew cards off-screen).
  const halfWidth = W * (isMobile ? 0.4 : 0.42)
  const archHeight = H * (isMobile ? 0.3 : 0.4)
  const theta = 2 * Math.atan(archHeight / halfWidth) // half the angular spread (rad)
  const arcRadius = halfWidth / Math.sin(theta)
  const arcCenterY = -H * 0.06 + arcRadius // apex sits just above stage centre

  return (
    <section ref={sectionRef} className="relative h-[210vh]">
      <div
        ref={stageRef}
        onMouseMove={onMouseMove}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#EDE3D3', backgroundImage: 'radial-gradient(at 12% 16%, rgba(255,138,107,0.28) 0px, transparent 50%), radial-gradient(at 86% 10%, rgba(255,135,174,0.22) 0px, transparent 45%), radial-gradient(at 80% 84%, rgba(169,142,255,0.26) 0px, transparent 52%)' }}
      >
        <Heart className="absolute left-[10%] top-[18%] h-8 w-8 animate-floaty text-blush-300/70" />
        <Sparkle className="absolute right-[12%] top-[26%] h-7 w-7 animate-floatySlow text-lilac-300/70" />
        <Heart className="absolute bottom-[16%] right-[16%] h-6 w-6 animate-floatySlow text-peach-300/70" />

        {/* Intro copy — fades out as the ring blooms into the arc */}
        <div
          className="pointer-events-none absolute z-0 px-6 text-center"
          style={{ opacity: introOpacity }}
        >
          <p className="eyebrow mb-4">🔒 every face, verified</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink-800 sm:text-6xl">
            a whole world of <span className="text-gradient">real ones.</span>
          </h2>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.25em] text-ink-700/55">
            keep scrolling
          </p>
        </div>

        {/* Arc copy — fades in once the arc is formed */}
        <div
          className="pointer-events-none absolute top-[12%] z-10 px-5 text-center"
          style={{ opacity: arcOpacity, transform: `translateY(${lerp(20, 0, arcOpacity)}px)` }}
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-800 sm:text-5xl">
            your person is in here. 💗
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-700/75 sm:text-base">
            somewhere in 2.4M verified cuties — no bots, no catfish, no ick.
            <br className="hidden sm:block" /> tap a face to see the badge.
          </p>
        </div>

        {/* The card swarm */}
        <div className="absolute inset-0 flex items-center justify-center">
          {CARDS.map((card, i) => {
            // Ring position
            const ringAngle = (i / CARD_COUNT) * 360
            const ringRad = (ringAngle * Math.PI) / 180
            const ring = {
              x: Math.cos(ringRad) * ringRadius,
              y: Math.sin(ringRad) * ringRadius,
              rotation: ringAngle + 90,
              scale: 1,
            }

            // Arc position (convex-up rainbow), apex at angle 0
            const f = CARD_COUNT > 1 ? i / (CARD_COUNT - 1) : 0.5
            const ang = lerp(-theta, theta, f)
            const arc = {
              x: Math.sin(ang) * arcRadius + parallax,
              y: arcCenterY - Math.cos(ang) * arcRadius,
              rotation: (ang * 180) / Math.PI * 0.6, // softened tangent tilt
              scale: isMobile ? 1.15 : 1.4,
            }

            // scatter → ring → arc
            const s = scatter[i]
            const assembled = {
              x: lerp(s.x, ring.x, assembleP),
              y: lerp(s.y, ring.y, assembleP),
              rotation: lerp(s.rotation, ring.rotation, assembleP),
              scale: lerp(s.scale, ring.scale, assembleP),
            }
            const target = {
              x: lerp(assembled.x, arc.x, morphP),
              y: lerp(assembled.y, arc.y, morphP),
              rotation: lerp(assembled.rotation, arc.rotation, morphP),
              scale: lerp(assembled.scale, arc.scale, morphP),
              opacity: clamp01(p / 0.05),
            }

            return <FlipCard key={i} src={card.src} alt={card.name} target={target} />
          })}
        </div>
      </div>
    </section>
  )
}
