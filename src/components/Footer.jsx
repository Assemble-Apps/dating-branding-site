import { Link } from 'react-router-dom'
import { Instagram, Music2, Youtube, Twitter } from 'lucide-react'
import { Heart } from './Decor'
import { GradientFooter } from './ui/gradient-footer'

const cols = [
  {
    title: 'Product',
    links: [
      { to: '/features', label: 'Features' },
      { to: '/premium', label: 'Premium' },
      { to: '/download', label: 'Get the app' },
      { to: '/safety', label: 'Safety' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About us' },
      { to: '/careers', label: 'Careers' },
      { to: '/press', label: 'Press kit' },
      { to: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/safety', label: 'Community guidelines' },
      { to: '/privacy', label: 'Privacy policy' },
      { to: '/terms', label: 'Terms of service' },
      { to: '/cookies', label: 'Cookie policy' },
    ],
  },
]

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Music2,    label: 'TikTok'    },
  { icon: Youtube,   label: 'YouTube'   },
  { icon: Twitter,   label: 'X'         },
]

export default function Footer() {
  return (
    <GradientFooter className="relative mt-10">
      {/* Footer content sits on the cream page background */}
      <div className="section pb-14 pt-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-peach-400 to-blush-400 shadow-pill">
                <Heart className="h-5 w-5 fill-white text-white" />
              </span>
              <span className="font-display text-2xl font-semibold text-ink-800">rissme</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-ink-700/65">
              Dating that feels like a crush, not a chore. Verified humans, real matches, zero ick.
            </p>
            <div className="mt-5 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full bg-ink-800/8 text-ink-700/70 transition-all hover:-translate-y-0.5 hover:bg-blush-400 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold tracking-wide text-ink-800">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l, i) => (
                  <li key={i}>
                    <Link
                      to={l.to}
                      className="text-sm text-ink-700/60 transition-colors hover:text-blush-500"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink-800/10 pt-6 text-xs text-ink-700/50 sm:flex-row">
          <p className="flex items-center gap-1.5">
            made with <Heart className="inline h-3.5 w-3.5 text-blush-400" /> for people who are done with the ick
          </p>
          <p>© {new Date().getFullYear()} Rissme · Assemble Innovations</p>
        </div>
      </div>
    </GradientFooter>
  )
}
