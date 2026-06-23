import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Heart, Link as LinkIcon, Zap } from 'lucide-react'
import { cn } from '../../lib/utils'

// Responsive orbit radius - shrinks on small screens so nodes never spill
// off the panel.
function useOrbitRadius() {
  const [radius, setRadius] = useState(170)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setRadius(w < 480 ? 100 : w < 640 ? 125 : w < 1024 ? 150 : 175)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return radius
}

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({})
  const [rotationAngle, setRotationAngle] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [pulseEffect, setPulseEffect] = useState({})
  const [activeNodeId, setActiveNodeId] = useState(null)
  const containerRef = useRef(null)
  const orbitRef = useRef(null)
  const radius = useOrbitRadius()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!autoRotate || reduce) return
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)))
    }, 50)
    return () => clearInterval(timer)
  }, [autoRotate])

  const getRelatedItems = (itemId) => {
    const current = timelineData.find((item) => item.id === itemId)
    return current ? current.relatedIds : []
  }

  const isRelatedToActive = (itemId) => activeNodeId != null && getRelatedItems(activeNodeId).includes(itemId)

  const centerViewOnNode = (nodeId) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId)
    const targetAngle = (nodeIndex / timelineData.length) * 360
    setRotationAngle(270 - targetAngle)
  }

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const opening = !prev[id]
      if (opening) {
        setActiveNodeId(id)
        setAutoRotate(false)
        const nextPulse = {}
        getRelatedItems(id).forEach((relId) => {
          nextPulse[relId] = true
        })
        setPulseEffect(nextPulse)
        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }
      return { [id]: opening }
    })
  }

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radian = (angle * Math.PI) / 180
    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))
    return { x, y, zIndex, opacity }
  }

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative flex h-[580px] w-full items-center justify-center overflow-hidden rounded-[2.5rem] mesh-panel sm:h-[640px]"
    >
      <div ref={orbitRef} className="relative flex h-full w-full max-w-3xl items-center justify-center">
        {/* Center orb - searching heart */}
        <div className="absolute z-10 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-peach-400 via-blush-400 to-lilac-400">
          <div className="absolute h-20 w-20 animate-ping rounded-full border border-white/20 opacity-70" />
          <div className="absolute h-24 w-24 animate-ping rounded-full border border-white/10 opacity-50" style={{ animationDelay: '0.5s' }} />
          <div className="grid h-8 w-8 place-items-center rounded-full bg-white/90 backdrop-blur-md">
            <Heart className="h-4 w-4 animate-heart fill-blush-400 text-blush-400" />
          </div>
        </div>

        {/* Radar rings - the orbit reads as a love-radar, always scanning */}
        <div
          className="absolute rounded-full border border-white/[0.07]"
          style={{ width: radius, height: radius }}
        />
        <div className="absolute rounded-full border border-white/10" style={{ width: radius * 2, height: radius * 2 }} />
        <div
          className="absolute animate-radarSweep rounded-full"
          style={{
            width: radius * 2,
            height: radius * 2,
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,105,180,0.16) 12deg, transparent 30deg)',
            filter: 'blur(14px)',
            mixBlendMode: 'screen',
          }}
        />

        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length)
          const isExpanded = !!expandedItems[item.id]
          const isRelated = isRelatedToActive(item.id)
          const isPulsing = !!pulseEffect[item.id]
          const Icon = item.icon

          return (
            <div
              key={item.id}
              className="group absolute cursor-pointer transition-all duration-700"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              }}
              onClick={(e) => {
                e.stopPropagation()
                toggleItem(item.id)
              }}
            >
              <div
                className={cn('absolute -inset-2 rounded-full', isPulsing && 'animate-pulse duration-1000')}
                style={{ background: 'radial-gradient(circle, rgba(255,141,199,0.4) 0%, rgba(255,141,199,0) 70%)' }}
              />

              <div
                className={cn(
                  'grid h-11 w-11 place-items-center rounded-full border-2 transition-all duration-300',
                  isExpanded
                    ? 'scale-125 border-white bg-white text-ink-800 shadow-lg shadow-white/30'
                    : isRelated
                      ? 'animate-pulse border-blush-200 bg-blush-300/80 text-ink-900'
                      : 'border-white/30 bg-ink-700 text-mist-100 group-hover:scale-110 group-hover:border-blush-300 group-hover:bg-ink-600 group-hover:shadow-md group-hover:shadow-blush-400/40',
                )}
              >
                <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
              </div>

              <div
                className={cn(
                  'absolute left-1/2 top-12 -translate-x-1/2 whitespace-nowrap text-center text-xs font-semibold tracking-wide transition-all duration-300',
                  isExpanded ? 'scale-110 text-mist-100' : 'text-mist-300/80 group-hover:text-mist-100',
                )}
              >
                {item.title}
              </div>

              {isExpanded && (
                <div
                  className="dark-glass absolute left-1/2 top-20 w-64 -translate-x-1/2 rounded-2xl p-4 shadow-card"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="inline-flex rounded-full bg-gradient-to-r from-peach-400 to-blush-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {item.category}
                  </span>
                  <h4 className="mt-2.5 font-display text-base font-semibold text-mist-100">{item.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-mist-300/85">{item.content}</p>

                  <div className="mt-3.5 border-t border-white/10 pt-3">
                    <div className="mb-1 flex items-center justify-between text-[11px] text-mist-300/80">
                      <span className="flex items-center gap-1">
                        <Zap size={10} /> vibe impact
                      </span>
                      <span className="font-mono">{item.energy}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-peach-400 to-blush-400"
                        style={{ width: `${item.energy}%` }}
                      />
                    </div>
                  </div>

                  {item.relatedIds.length > 0 && (
                    <div className="mt-3.5 border-t border-white/10 pt-3">
                      <div className="mb-2 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-mist-300/70">
                        <LinkIcon size={10} /> pairs well with
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.relatedIds.map((relId) => {
                          const related = timelineData.find((i) => i.id === relId)
                          return (
                            <button
                              key={relId}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleItem(relId)
                              }}
                              className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-1 text-[11px] text-mist-200 transition-colors hover:bg-white/10 hover:text-mist-100"
                            >
                              {related?.title} <ArrowRight size={10} />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
