import { useEffect, useRef, useCallback } from 'react'
import createGlobe from 'cobe'
import { cn } from '../../lib/utils'

// Cities around the world, each carrying a real-ones DP instead of a
// generic landmark sticker - "matches happening everywhere" ties the
// globe to the brand instead of being a stock demo.
const defaultMarkers = [
  { id: 'paris', location: [48.86, 2.35], src: '/realones/ananya.webp', name: 'Ananya' },
  { id: 'tokyo', location: [35.68, 139.65], src: '/realones/dev.webp', name: 'Dev' },
  { id: 'nyc', location: [40.71, -74.01], src: '/realones/sim.webp', name: 'Sim' },
  { id: 'rio', location: [-22.91, -43.17], src: '/realones/kabir.jpg', name: 'Kabir' },
  { id: 'sydney', location: [-33.87, 151.21], src: '/realones/mara.jpg', name: 'Mara' },
  { id: 'mumbai', location: [19.08, 72.88], src: '/realones/zoya.jpg', name: 'Zoya' },
  { id: 'rome', location: [41.9, 12.5], src: '/realones/rhea.avif', name: 'Rhea' },
  { id: 'mexico', location: [19.43, -99.13], src: '/realones/arjun.avif', name: 'Arjun' },
  { id: 'seoul', location: [37.57, 126.98], src: '/realones/tara.webp', name: 'Tara' },
  { id: 'london', location: [51.51, -0.13], src: '/realones/vihaan.webp', name: 'Vihaan' },
]

// Projects a [lat, lng] marker onto the current globe rotation so its
// sticker <div> can be moved to sit right on top of the marker. This is
// reverse-engineered from cobe's actual minified source (its `U` and `O`
// helpers) rather than guessed - that's what keeps the DP markers glued
// to the real coastline instead of drifting into the ocean.
function latLngToUnitVector(lat, lng) {
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180 - Math.PI
  const cosLat = Math.cos(latRad)
  return [-cosLat * Math.cos(lngRad), Math.sin(latRad), cosLat * Math.sin(lngRad)]
}

function projectMarker(lat, lng, phi, theta, elevation = 0.04) {
  const r = 0.8 + elevation
  const [ux, uy, uz] = latLngToUnitVector(lat, lng)
  const x = ux * r
  const y = uy * r
  const z = uz * r

  const cosPhi = Math.cos(phi)
  const sinPhi = Math.sin(phi)
  const cosTheta = Math.cos(theta)
  const sinTheta = Math.sin(theta)

  const c = cosPhi * x + sinPhi * z
  const s = sinPhi * sinTheta * x + cosTheta * y - cosPhi * sinTheta * z
  const facing = -sinPhi * cosTheta * x + sinTheta * y + cosPhi * cosTheta * z

  return {
    xFrac: (c + 1) / 2,
    yFrac: (-s + 1) / 2,
    facing,
  }
}

export function GlobeStickers({ markers = defaultMarkers, className = '', speed = 0.003 }) {
  const canvasRef = useRef(null)
  const stickerRefs = useRef({})
  const pointerInteracting = useRef(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerDown = useCallback((e) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe = null
    let animationId
    let phi = 0
    let width = 0

    const updateStickers = (currentPhi, currentTheta) => {
      markers.forEach((m) => {
        const el = stickerRefs.current[m.id]
        if (!el) return
        const [lat, lng] = m.location
        const { xFrac, yFrac, facing } = projectMarker(lat, lng, currentPhi, currentTheta)

        if (facing < 0.03) {
          el.style.opacity = '0'
        } else {
          el.style.opacity = String(Math.min(1, facing / 0.25))
          el.style.transform = `translate(${xFrac * width}px, ${yFrac * width}px) translate(-50%, -100%)`
        }
      })
    }

    function init() {
      width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 8,
        baseColor: [1, 0.89, 0.93],
        markerColor: [1, 0.41, 0.71],
        glowColor: [1, 0.78, 0.87],
        markerElevation: 0.04,
        markers: markers.map((m) => ({ location: m.location, size: 0.05 })),
        arcs: [],
        arcColor: [1, 0.4, 0.68],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.9,
      })

      function animate() {
        if (!isPausedRef.current) phi += speed
        const currentPhi = phi + phiOffsetRef.current + dragOffset.current.phi
        const currentTheta = 0.2 + thetaOffsetRef.current + dragOffset.current.theta
        globe.update({ phi: currentPhi, theta: currentTheta })
        updateStickers(currentPhi, currentTheta)
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = '1'))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [markers, speed])

  return (
    <div className={cn('relative aspect-square select-none', className)}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          opacity: 0,
          transition: 'opacity 1.2s ease',
          borderRadius: '50%',
          touchAction: 'none',
        }}
      />
      {markers.map((m) => (
        <div
          key={m.id}
          ref={(el) => {
            stickerRefs.current[m.id] = el
          }}
          className="pointer-events-none absolute left-0 top-0 select-none"
          style={{ opacity: 0 }}
        >
          <img
            src={m.src}
            alt={m.name}
            className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-[0_2px_6px_rgba(120,26,70,0.4)] sm:h-9 sm:w-9"
          />
        </div>
      ))}
    </div>
  )
}

export default GlobeStickers
