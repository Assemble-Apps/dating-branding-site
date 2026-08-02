import { Children, useEffect, useMemo, useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

// Each animated item in its own component - keeps hook calls at component top level
function PathItem({
  baseOffset,
  index,
  total,
  path,
  enableRollingZIndex,
  zIndexBase,
  zIndexRange,
  easing,
  isHoveredRef,
  isDraggingRef,
  isGrabCursor,
  children,
}) {
  const itemOffset = useTransform(baseOffset, (v) => {
    const position = (index / total) * 100
    const wrapped = wrap(0, 100, v + position)
    const value = easing ? easing(wrapped / 100) * 100 : wrapped
    return `${value}%`
  })

  const currentOffset = useMotionValue(0)

  useEffect(() => {
    return itemOffset.on('change', (val) => {
      const m = val.match(/^([\d.]+)%$/)
      if (m) currentOffset.set(parseFloat(m[1]))
    })
  }, [itemOffset, currentOffset])

  const zIndex = useTransform(currentOffset, (val) =>
    Math.floor(zIndexBase + (val / 100) * zIndexRange)
  )

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        // offset-rotate defaults to 'auto' → element rotates to follow path tangent (ribbon effect)
        // offset-anchor defaults to '50% 50%' → element centre is placed on the path
        offsetPath: `path('${path}')`,
        offsetDistance: itemOffset,
        zIndex: enableRollingZIndex ? zIndex : undefined,
        willChange: 'offset-distance',
      }}
      onMouseEnter={() => { isHoveredRef.current = true }}
      onMouseLeave={() => { isHoveredRef.current = false }}
    >
      {children}
    </motion.div>
  )
}

export default function MarqueeAlongSvgPath({
  children,
  className = '',
  path,
  pathId,
  preserveAspectRatio = 'xMidYMid meet',
  showPath = false,
  width = '100%',
  height = '100%',
  viewBox = '0 0 100 100',
  baseVelocity = 5,
  direction = 'normal',
  easing,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },
  repeat = 3,
  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  grabCursor = false,
  enableRollingZIndex = true,
  zIndexBase = 1,
  zIndexRange = 10,
  responsive = false,
}) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const isHoveredRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragVelocity = useRef(0)
  const lastPointer = useRef({ x: 0, y: 0 })
  const directionFactor = useRef(direction === 'normal' ? 1 : -1)
  const baseOffset = useMotionValue(0)
  const hoverFactor = useMotionValue(1)
  const smoothHoverFactor = useSpring(hoverFactor, slowDownSpringConfig)

  const [, , vbW, vbH] = viewBox.split(' ').map(Number)
  const id = pathId || `mpath-${Math.random().toString(36).slice(2, 7)}`

  // Responsive: scale inner container (preserving viewBox aspect ratio) to fill outer
  useEffect(() => {
    if (!responsive) return
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const update = () => {
      const W = outer.clientWidth
      const H = outer.clientHeight
      const scaleX = W / vbW
      const scaleY = H && vbH ? H / vbH : scaleX
      const scale = H ? Math.min(scaleX, scaleY) : scaleX

      const sw = vbW * scale
      const sh = vbH * scale
      const ox = (W - sw) / 2
      const oy = H ? (H - sh) / 2 : 0

      inner.style.width = `${vbW}px`
      inner.style.height = `${vbH}px`
      inner.style.transform = `translate(${ox}px, ${oy}px) scale(${scale})`
      inner.style.transformOrigin = 'top left'

      // Only set outer height when the outer has no CSS height (i.e. it's auto)
      if (!outer.style.height || outer.dataset.autoHeight === 'true') {
        outer.style.height = `${sh}px`
        outer.dataset.autoHeight = 'true'
      }
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(outer)
    return () => ro.disconnect()
  }, [responsive, vbW, vbH])

  const items = useMemo(() => {
    const arr = Children.toArray(children)
    const total = arr.length * repeat
    return arr.flatMap((child, ci) =>
      Array.from({ length: repeat }, (_, ri) => ({
        child,
        key: `${ci}-${ri}`,
        index: ri * arr.length + ci,
        total,
      }))
    )
  }, [children, repeat])

  useAnimationFrame((_, delta) => {
    if (isDraggingRef.current && draggable) {
      baseOffset.set(baseOffset.get() + dragVelocity.current)
      dragVelocity.current *= 0.9
      if (Math.abs(dragVelocity.current) < 0.01) dragVelocity.current = 0
      return
    }
    hoverFactor.set(isHoveredRef.current && slowdownOnHover ? slowDownFactor : 1)
    const moveBy = directionFactor.current * baseVelocity * (delta / 1000) * smoothHoverFactor.get()
    baseOffset.set(baseOffset.get() + moveBy)
  })

  const onPointerDown = (e) => {
    if (!draggable) return
    e.currentTarget.setPointerCapture(e.pointerId)
    if (grabCursor) e.currentTarget.style.cursor = 'grabbing'
    isDraggingRef.current = true
    lastPointer.current = { x: e.clientX, y: e.clientY }
    dragVelocity.current = 0
  }

  const onPointerMove = (e) => {
    if (!draggable || !isDraggingRef.current) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    const d = Math.sqrt(dx * dx + dy * dy)
    dragVelocity.current = (dx > 0 ? d : -d) * dragSensitivity
    if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1)
      directionFactor.current = Math.sign(dragVelocity.current)
    lastPointer.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e) => {
    if (!draggable) return
    e.currentTarget.releasePointerCapture(e.pointerId)
    isDraggingRef.current = false
    if (grabCursor) e.currentTarget.style.cursor = 'grab'
  }

  return (
    <div
      ref={outerRef}
      className={`relative ${grabCursor ? 'cursor-grab' : ''} ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        ref={innerRef}
        className="relative"
        style={{ contain: 'layout style' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          className="w-full h-full"
          aria-hidden
        >
          <path
            id={id}
            d={path}
            stroke={showPath ? 'currentColor' : 'none'}
            strokeWidth={showPath ? 1 : 0}
            fill="none"
          />
        </svg>

        {items.map(({ child, key, index, total }) => (
          <PathItem
            key={key}
            baseOffset={baseOffset}
            index={index}
            total={total}
            path={path}
            enableRollingZIndex={enableRollingZIndex}
            zIndexBase={zIndexBase}
            zIndexRange={zIndexRange}
            easing={easing}
            isHoveredRef={isHoveredRef}
            isDraggingRef={isDraggingRef}
            isGrabCursor={grabCursor}
          >
            {child}
          </PathItem>
        ))}
      </div>
    </div>
  )
}
