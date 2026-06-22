import * as React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { cn } from '../../lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* Deterministic placement so first render is stable (no Math.random):
 * one portrait per row, with every third row holding a second one,
 * columns walked in a scattered pattern. Returns a grid of speaker
 * indices (or -1 for an empty cell). */
function buildLayout(count, cols) {
  const rows = []
  let i = 0
  let r = 0
  while (i < count) {
    const row = new Array(cols).fill(-1)
    const a = (r * 2 + (r % 2)) % cols
    row[a] = i++
    if (r % 3 === 0 && i < count) {
      let b = (a + 2) % cols
      if (b === a) b = (a + 1) % cols
      row[b] = i++
    }
    rows.push(row)
    r++
  }
  return rows
}

/* Keep portraits a usable size: cap the desired column count on smaller
 * viewports. Starts from `desired` so the first client render is stable,
 * then narrows after mount. */
function useResponsiveColumns(desired) {
  const [cols, setCols] = React.useState(desired)

  React.useEffect(() => {
    const sm = window.matchMedia('(min-width: 640px)')
    const lg = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      if (lg.matches) setCols(desired)
      else if (sm.matches) setCols(Math.min(desired, 3))
      else setCols(Math.min(desired, 2))
    }
    update()
    sm.addEventListener('change', update)
    lg.addEventListener('change', update)
    return () => {
      sm.removeEventListener('change', update)
      lg.removeEventListener('change', update)
    }
  }, [desired])

  return cols
}

export function ScrollPortraitWall({
  title = 'Real Ones',
  date = '2026',
  hint = 'scroll down to see effect',
  speakers,
  columns = 4,
  showCaptions = true,
  className,
}) {
  const root = React.useRef(null)
  const hintRef = React.useRef(null)
  const cols = useResponsiveColumns(Math.max(1, columns))
  const layout = React.useMemo(() => buildLayout(speakers.length, cols), [speakers.length, cols])

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const items = gsap.utils.toArray('.spw-item')

      if (reduce) {
        gsap.set(items, { scale: 1 })
        return
      }

      // Hint fades away over the first stretch of scrolling.
      gsap.to(hintRef.current, {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=40%',
          scrub: true,
        },
      })

      // Each portrait scrubs scale 0 → 1 → 0 across its full pass through the
      // viewport: it grows in from its transform-origin corner, peaks at
      // centre, then shrinks away - "comes and goes".
      items.forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
          .fromTo(el, { scale: 0 }, { scale: 1, ease: 'power2.out', duration: 0.5 })
          .to(el, { scale: 0, ease: 'power2.in', duration: 0.5 })
      })
    },
    { scope: root, dependencies: [cols], revertOnUpdate: true },
  )

  return (
    <section
      ref={root}
      aria-label={typeof title === 'string' ? title : undefined}
      className={cn('relative w-full bg-[#EDE3D3] text-ink-800', className)}
    >
      {/* Scroll hint, lower-centre of the first screen, fading on scroll */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute left-1/2 top-[60vh] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center"
      >
        <span className="relative max-w-[14ch] text-xs font-semibold uppercase tracking-wide text-ink-700/50 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:to-ink-800/20 after:content-['']">
          {hint}
        </span>
      </div>

      {/* Sticky centred title - inverts against whatever portrait is behind it */}
      <div className="pointer-events-none sticky top-1/2 z-20 -translate-y-1/2 text-center text-white mix-blend-exclusion">
        <h2 className="font-display text-5xl font-semibold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
          {title}
        </h2>
        {date && <p className="mt-1 text-xs uppercase tracking-wide text-white/60 sm:text-sm">{date}</p>}
      </div>

      {/* The scattered portrait grid */}
      <div className="relative z-0 mb-[40vh] mt-[40vh]">
        {layout.map((row, ri) => (
          <div key={ri} className="flex w-full items-start">
            {row.map((idx, ci) => {
              if (idx === -1) return <div key={ci} className="flex-1" />

              const s = speakers[idx]
              const origin = ci < cols / 2 ? 'right bottom' : 'left bottom'

              return (
                <div key={ci} className="flex-1">
                  {/* Image + caption scale together as one unit, so the
                      caption never lingers after its portrait is gone. The
                      caption sits in normal flow, so it also can't overlap
                      the row below. */}
                  <div
                    className="spw-item w-full"
                    style={{ transformOrigin: origin, transform: 'scale(0)' }}
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-peach-200 to-lilac-200">
                      {/* Fallback shown until the photo loads / if it's missing */}
                      <span className="absolute inset-0 grid place-items-center font-display text-5xl text-white/70">
                        {s.name?.[0]}
                      </span>
                      <img
                        src={s.src}
                        alt={s.name}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                        className="relative h-full w-full object-cover grayscale contrast-[1.15] filter transition-transform duration-500 ease-in-out hover:scale-95"
                      />
                    </div>
                    {showCaptions && (
                      <div className="flex w-full items-baseline justify-between gap-2 px-1 pb-2 pt-2 text-[11px] uppercase leading-tight text-ink-700/60 sm:text-sm">
                        <span className="truncate font-semibold">{s.name}</span>
                        <span className="shrink-0 italic text-blush-400">{s.role}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ScrollPortraitWall
