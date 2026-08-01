import { Lock } from 'lucide-react'
import { realOnes } from '../../data/content'
import { Heart, Sparkle } from '../Decor'
import MarqueeAlongSvgPath from './marquee-along-svg-path'

const WAVE_PATH =
  'M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5'
const VIEW_BOX = '0 0 996 330'

// 13 faces × repeat=2 = 26 items — same ratio as the demo (13 imgs × 2 repeats)
// 26 × 56px ≈ 1456px ≈ path arc length → cards nearly touching, just like the demo
const FACES = realOnes.slice(0, 13)

function FaceCard({ src, name }) {
  return (
    <div
      className="group relative"
      style={{ width: 56, height: 56 }}
    >
      <div className="h-full w-full overflow-hidden rounded-xl border-[2.5px] border-white shadow-[0_3px_12px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-125">
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
          className="h-full w-full object-cover"
        />
      </div>
      {/* tiny verified badge — stays subtle, not distracting */}
      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-gradient-to-br from-peach-400 to-blush-400 text-[5px] leading-none text-white">
        ✓
      </span>
    </div>
  )
}

export default function VerifiedReel() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      style={{
        backgroundColor: '#EDE3D3',
        backgroundImage:
          'radial-gradient(at 12% 16%, rgba(255,20,147,0.22) 0px, transparent 50%), radial-gradient(at 86% 10%, rgba(255,105,180,0.22) 0px, transparent 45%), radial-gradient(at 80% 84%, rgba(255,141,199,0.26) 0px, transparent 52%)',
      }}
    >
      {/* Floating decor */}
      <Heart className="pointer-events-none absolute left-[8%] top-[12%] h-8 w-8 animate-floaty text-blush-300/60" />
      <Sparkle className="pointer-events-none absolute right-[9%] top-[18%] h-7 w-7 animate-floatySlow text-lilac-300/60" />
      <Heart className="pointer-events-none absolute bottom-[10%] right-[13%] h-5 w-5 animate-floatySlow text-peach-300/60" />

      {/* Heading */}
      <div className="section relative z-50 mb-20 text-center">
        <p className="eyebrow mb-4 inline-flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" /> every face, verified
        </p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-ink-800 sm:text-6xl">
          your person is{' '}
          <span className="inline-flex items-end gap-3">
            in here.{' '}
            <Heart className="mb-1 h-9 w-9 fill-blush-400 text-blush-400 sm:h-12 sm:w-12" />
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-700/70">
          2.4M verified cuties — no bots, no catfish, no ick.
        </p>
      </div>

      <MarqueeAlongSvgPath
        path={WAVE_PATH}
        viewBox={VIEW_BOX}
        baseVelocity={8}
        repeat={2}
        slowdownOnHover
        slowDownFactor={0.2}
        draggable
        dragSensitivity={0.08}
        grabCursor
        responsive
        enableRollingZIndex
        zIndexBase={1}
        zIndexRange={20}
        className="w-full scale-105"
      >
        {FACES.map(({ name, src }) => (
          <FaceCard key={name} src={src} name={name} />
        ))}
      </MarqueeAlongSvgPath>
    </section>
  )
}
