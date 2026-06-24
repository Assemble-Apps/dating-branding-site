import { memo, useMemo, useState, useEffect, useId, useRef } from 'react'
import { Heart } from '../Decor'
import { cn } from '../../lib/utils'

// ── Theme - sand-to-hot-pink ramp instead of GitHub's green ──────────────
const COLORS = {
  level0: '#F1E6D6',
  level1: '#FFD6E8',
  level2: '#FF9AC8',
  level3: '#FF69B4',
  level4: '#FF1493',
}

// ── Date helpers ──────────────────────────────────────────────────────────
function parseDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const FULL_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

function formatTooltipDate(dateStr) {
  const date = parseDate(dateStr)
  const month = FULL_MONTH_NAMES[date.getMonth()]
  const day = date.getDate()
  return `${month} ${day}${getOrdinalSuffix(day)}`
}

// ── Demo data: deterministic so the heatmap doesn't reshuffle on every
// render, weighted so weekends run hotter than weekdays - a believable
// "matches per day" shape without needing a real backend feed. ──────────
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function generateMatchData(startDate, endDate) {
  const start = parseDate(startDate)
  const end = parseDate(endDate)
  const rand = seededRandom(20260101)
  const data = {}
  let current = new Date(start)
  while (current <= end) {
    const dow = current.getDay()
    const weekendBoost = dow === 0 || dow === 6 ? 1.6 : 1
    const roll = rand()
    let count = 0
    if (roll > 0.18) {
      count = Math.round(rand() * 6 * weekendBoost) + (roll > 0.72 ? 3 : 0)
    }
    const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4
    data[formatDate(current)] = { level, count }
    current = addDays(current, 1)
  }
  return data
}

// ── Build calendar grid ───────────────────────────────────────────────────
function buildGrid(startDate, endDate, startsOnSunday) {
  const start = parseDate(startDate)
  const end = parseDate(endDate)
  const startDay = startsOnSunday ? 0 : 1
  const startDow = start.getDay()
  const offset = (startDow - startDay + 7) % 7
  const gridStart = addDays(start, -offset)

  const weeks = []
  const monthLabels = []
  let current = new Date(gridStart)
  let weekIndex = 0
  let lastMonth = -1

  while (current <= end || (weeks.length > 0 && (weeks[weeks.length - 1]?.length ?? 0) < 7)) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const dateStr = formatDate(current)
      const isInRange = current >= start && current <= end
      week.push(isInRange ? dateStr : null)
      if (isInRange && current.getMonth() !== lastMonth) {
        lastMonth = current.getMonth()
        monthLabels.push({ label: MONTH_NAMES[current.getMonth()], weekIndex })
      }
      current = addDays(current, 1)
    }
    weeks.push(week)
    weekIndex++
    if (current > end && weeks[weeks.length - 1]?.every((d) => d === null || parseDate(d) > end)) break
  }

  return { weeks, monthLabels, gridStart: formatDate(gridStart) }
}

export const MatchesCalendar = memo(function MatchesCalendar({
  data: dataProp,
  startDate,
  endDate,
  startsOnSunday = true,
  cellSize = 12,
  cellGap = 3,
  cellShape = 'rounded',
  showMonthLabels = true,
  showStats = true,
  showLegend = true,
  className = '',
}) {
  const id = useId()
  const scrollRef = useRef(null)
  const canvasRef = useRef(null)
  const [gameActive, setGameActive] = useState(false)

  const resolvedEnd = endDate ?? formatDate(new Date())
  const resolvedStart = useMemo(() => {
    if (startDate) return startDate
    const d = parseDate(resolvedEnd)
    d.setFullYear(d.getFullYear() - 1)
    d.setDate(d.getDate() + 1)
    return formatDate(d)
  }, [startDate, resolvedEnd])

  const data = useMemo(
    () => dataProp ?? generateMatchData(resolvedStart, resolvedEnd),
    [dataProp, resolvedStart, resolvedEnd],
  )

  const [tooltip, setTooltip] = useState({ visible: false, date: '', count: undefined, x: 0, y: 0 })

  const { weeks, monthLabels } = useMemo(
    () => buildGrid(resolvedStart, resolvedEnd, startsOnSunday),
    [resolvedStart, resolvedEnd, startsOnSunday],
  )

  const stats = useMemo(() => {
    const entries = Object.entries(data)
    const total = entries.reduce((sum, [, v]) => sum + (v.count ?? (v.level > 0 ? 1 : 0)), 0)
    return { total }
  }, [data])

  const step = cellSize + cellGap
  const monthLabelHeight = showMonthLabels && !gameActive ? 20 : 0
  const svgWidth = weeks.length * step - cellGap
  const svgHeight = monthLabelHeight + 7 * step - cellGap

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
  }, [data])

  // ── Retro space-shooter Easter egg: shoot the match cells down to zero ──
  useEffect(() => {
    if (!gameActive) {
      weeks.forEach((week) =>
        week.forEach((date) => {
          if (!date) return
          const rect = document.getElementById(`cell-${id}-${date}`)
          if (rect) {
            rect.style.opacity = '1'
            rect.style.pointerEvents = 'auto'
            rect.setAttribute('fill', COLORS[`level${data[date]?.level ?? 0}`])
          }
        }),
      )
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    const width = svgWidth
    const height = svgHeight + 80
    canvas.width = width
    canvas.height = height

    const cellLevels = new Map()
    weeks.forEach((week) =>
      week.forEach((date) => {
        if (!date) return
        const initialLevel = data[date]?.level ?? 0
        cellLevels.set(date, initialLevel)
        const rect = document.getElementById(`cell-${id}-${date}`)
        if (rect) {
          rect.style.opacity = initialLevel === 0 ? '0' : '1'
          rect.style.pointerEvents = initialLevel === 0 ? 'none' : 'auto'
        }
      }),
    )

    const player = { x: width / 2 - 15, y: height - 25, width: 30, height: 20, speed: 4, direction: 1, color: '#FF69B4' }
    let bullets = []
    let lastShot = 0
    const cooldown = 140

    const shoot = () => {
      bullets.push({ x: player.x + player.width / 2 - 1.5, y: player.y - 4, vy: -6, width: 3, height: 8, color: '#FFFFFF' })
    }

    const stars = Array.from({ length: 140 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 0.4 + 0.1,
      size: Math.random() * 1.2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    let particles = []
    const explode = (x, y, color) => {
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 2.5 + 1.2
        particles.push({
          x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, color,
          size: Math.random() * 2 + 1, alpha: 1, life: 0, maxLife: Math.random() * 15 + 15,
        })
      }
    }

    const update = () => {
      let minWi = -1
      let maxWi = -1
      weeks.forEach((week, wi) =>
        week.forEach((date) => {
          if (!date) return
          if ((cellLevels.get(date) ?? 0) > 0) {
            if (minWi === -1) minWi = wi
            minWi = Math.min(minWi, wi)
            maxWi = Math.max(maxWi, wi)
          }
        }),
      )

      let minX = 0
      let maxX = width - player.width
      if (minWi !== -1 && maxWi !== -1) {
        minX = minWi * step
        maxX = Math.max(minX, Math.min(width - player.width, (maxWi + 1) * step - player.width))
      }
      player.x = Math.max(minX, Math.min(maxX, player.x))

      player.x += player.speed * player.direction
      if (player.x >= maxX) {
        player.x = maxX
        player.direction = -1
      } else if (player.x <= minX) {
        player.x = minX
        player.direction = 1
      }

      const now = Date.now()
      if (now - lastShot >= cooldown) {
        shoot()
        lastShot = now
      }

      let anyActive = false
      cellLevels.forEach((level) => {
        if (level > 0) anyActive = true
      })
      if (!anyActive) {
        weeks.forEach((week) =>
          week.forEach((date) => {
            if (!date) return
            const originalLevel = data[date]?.level ?? 0
            cellLevels.set(date, originalLevel)
            const rect = document.getElementById(`cell-${id}-${date}`)
            if (rect) {
              rect.setAttribute('fill', COLORS[`level${originalLevel}`])
              rect.style.opacity = originalLevel === 0 ? '0' : '1'
              rect.style.pointerEvents = originalLevel === 0 ? 'none' : 'auto'
            }
          }),
        )
      }

      stars.forEach((s) => {
        s.y += s.speed
        if (s.y > height) {
          s.y = 0
          s.x = Math.random() * width
        }
      })

      bullets = bullets.filter((b) => {
        b.y += b.vy
        return b.y > 0
      })

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life++
        p.alpha = 1 - p.life / p.maxLife
      })
      particles = particles.filter((p) => p.life < p.maxLife)

      bullets.forEach((bullet, bulletIdx) => {
        weeks.forEach((week, wi) =>
          week.forEach((date, di) => {
            if (!date) return
            const currentLevel = cellLevels.get(date) ?? 0
            if (currentLevel === 0) return

            const cellX = wi * step
            const cellY = monthLabelHeight + di * step
            if (
              bullet.x < cellX + cellSize &&
              bullet.x + bullet.width > cellX &&
              bullet.y < cellY + cellSize &&
              bullet.y + bullet.height > cellY
            ) {
              bullets.splice(bulletIdx, 1)
              const newLevel = currentLevel - 1
              cellLevels.set(date, newLevel)
              const rect = document.getElementById(`cell-${id}-${date}`)
              if (rect) {
                if (newLevel === 0) {
                  rect.style.opacity = '0'
                  rect.style.pointerEvents = 'none'
                } else {
                  rect.setAttribute('fill', COLORS[`level${newLevel}`])
                }
              }
              explode(cellX + cellSize / 2, cellY + cellSize / 2, COLORS[`level${currentLevel}`])
            }
          }),
        )
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = '#ffffff'
      stars.forEach((s) => {
        ctx.globalAlpha = s.alpha
        ctx.fillRect(s.x, s.y, s.size, s.size)
      })
      ctx.globalAlpha = 1

      bullets.forEach((b) => {
        ctx.fillStyle = b.color
        ctx.fillRect(b.x, b.y, b.width, b.height)
      })

      particles.forEach((p) => {
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fillRect(p.x, p.y, p.size, p.size)
      })
      ctx.globalAlpha = 1

      ctx.fillStyle = player.color
      ctx.shadowColor = player.color
      ctx.shadowBlur = 6
      ctx.beginPath()
      ctx.moveTo(player.x + player.width / 2, player.y)
      ctx.lineTo(player.x + player.width, player.y + player.height)
      ctx.lineTo(player.x + player.width * 0.7, player.y + player.height * 0.75)
      ctx.lineTo(player.x + player.width * 0.3, player.y + player.height * 0.75)
      ctx.lineTo(player.x, player.y + player.height)
      ctx.closePath()
      ctx.fill()
      ctx.shadowBlur = 0
    }

    const loop = () => {
      update()
      render()
      if (gameActive) animationFrameId = requestAnimationFrame(loop)
    }
    animationFrameId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(animationFrameId)
  }, [gameActive, data, weeks, step, cellSize, cellGap, monthLabelHeight, id, svgWidth, svgHeight])

  const cellRx = cellShape === 'circle' ? cellSize / 2 : cellSize * 0.2

  return (
    <div
      className={cn(
        'mx-auto w-fit overflow-x-hidden rounded-3xl border shadow-card backdrop-blur-md transition-colors duration-500',
        gameActive ? 'border-white/10 bg-ink-900' : 'border-white/65 bg-white/70',
        className,
      )}
    >
      <div className="mx-auto flex w-fit max-w-full flex-col gap-3 p-4 sm:p-5">
        <div
          ref={scrollRef}
          className={cn('relative overflow-x-auto transition-all duration-500', gameActive ? 'pb-[80px]' : '')}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
            {showMonthLabels &&
              !gameActive &&
              (() => {
                const byWeek = new Map()
                monthLabels.forEach(({ label, weekIndex }) => byWeek.set(weekIndex, label))
                const entries = Array.from(byWeek.entries())
                const validEntries = []
                for (let i = 0; i < entries.length; i++) {
                  const current = entries[i]
                  const next = entries[i + 1]
                  if (i === 0 && next && next[0] - current[0] < 3) continue
                  const lastValid = validEntries[validEntries.length - 1]
                  if (lastValid && current[0] - lastValid[0] < 3) continue
                  validEntries.push(current)
                }
                return validEntries.map(([weekIndex, label]) => (
                  <text key={`${label}-${weekIndex}`} x={weekIndex * step} y={10} fontSize={11} fill="#100D18" fillOpacity={0.55}>
                    {label}
                  </text>
                ))
              })()}

            {weeks.map((week, wi) =>
              week.map((date, di) => {
                const entry = date ? data[date] : undefined
                const level = entry?.level ?? 0
                const cellCenterX = wi * step + cellSize / 2
                const cellTopY = monthLabelHeight + di * step
                return (
                  <rect
                    key={`${wi}-${di}`}
                    id={date ? `cell-${id}-${date}` : undefined}
                    x={wi * step}
                    y={cellTopY}
                    width={cellSize}
                    height={cellSize}
                    rx={cellRx}
                    fill={COLORS[`level${level}`]}
                    style={{ transition: 'opacity 0.1s' }}
                    onMouseEnter={() => {
                      if (!date || gameActive) return
                      setTooltip({ visible: true, date, count: entry?.count, x: cellCenterX, y: cellTopY })
                    }}
                    onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
                  />
                )
              }),
            )}
          </svg>

          {gameActive && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-10 cursor-crosshair pointer-events-auto"
              style={{ width: svgWidth, height: svgHeight + 80 }}
            />
          )}

          {tooltip.visible &&
            (() => {
              const count = tooltip.count ?? 0
              const formattedDate = formatTooltipDate(tooltip.date)
              const text =
                count === 0 ? `no riss-tory on ${formattedDate}.` : `${count} match${count !== 1 ? 'es' : ''} on ${formattedDate}.`
              return (
                <div
                  className="pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-ink-800 px-2.5 py-1 text-[11px] font-medium text-mist-100 shadow-card"
                  style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, calc(-100% - 6px))' }}
                >
                  {text}
                  <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rotate-45 bg-ink-800" />
                </div>
              )
            })()}
        </div>

        <div className="flex items-center justify-between gap-x-4">
          {showLegend && (
            <div
              className={cn(
                'mt-0.5 flex shrink-0 flex-wrap items-center gap-4 text-xs',
                gameActive ? 'text-mist-300' : 'text-ink-700/60',
              )}
            >
              <div className="flex items-center gap-1.5">
                <span>fewer</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <svg key={level} width={cellSize} height={cellSize}>
                    <rect width={cellSize} height={cellSize} rx={cellRx} fill={COLORS[`level${level}`]} />
                  </svg>
                ))}
                <span>more</span>
              </div>

              <div className={cn('flex items-center gap-2 border-l pl-4', gameActive ? 'border-white/15' : 'border-ink-800/15')}>
                <span className="select-none text-[11px]">arcade mode</span>
                <button
                  type="button"
                  onClick={() => setGameActive((v) => !v)}
                  className={cn(
                    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                    gameActive ? 'bg-blush-400' : 'bg-ink-800/20',
                  )}
                >
                  <span
                    className={cn(
                      'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      gameActive ? 'translate-x-4' : 'translate-x-0',
                    )}
                  />
                </button>
              </div>
            </div>
          )}

          {showStats && (
            <p
              className={cn(
                'ml-auto flex flex-1 flex-wrap items-center justify-end gap-x-1 text-sm font-medium',
                gameActive ? 'text-mist-200' : 'text-ink-700/70',
              )}
            >
              <span className="font-bold text-blush-400">{stats.total.toLocaleString()}</span>
              <span>matches sparked this year</span>
              <Heart className="h-3.5 w-3.5 fill-blush-400 text-blush-400" />
            </p>
          )}
        </div>
      </div>
    </div>
  )
})

MatchesCalendar.displayName = 'MatchesCalendar'

export default MatchesCalendar
