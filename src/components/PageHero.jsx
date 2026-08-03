import { Reveal } from './ui'
import { FloatingBlobs, Heart, Sparkle } from './Decor'

// Shared hero band for interior pages.
export default function PageHero({ eyebrow, title, sub, children }) {
  return (
    <section className="relative overflow-hidden dreamy-bg pb-14 pt-28 sm:pb-20 sm:pt-32">
      <FloatingBlobs />
      <Heart className="absolute left-[8%] top-16 h-8 w-8 animate-floaty text-blush-300" />
      <Sparkle className="absolute right-[10%] top-24 h-7 w-7 animate-floatySlow text-lilac-300" />
      {/* soft bottom fade into the page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40" style={{ background: 'linear-gradient(to bottom, transparent 0%, #EDE3D3 100%)' }} />
      <div className="section relative text-center">
        <Reveal>
          <span className="chip mx-auto">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.0] tracking-tight text-ink-800 sm:text-6xl">
            {title}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink-700/80">{sub}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
