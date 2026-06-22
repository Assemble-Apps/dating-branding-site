import { Link } from 'react-router-dom'
import { Instagram, Music2, Youtube, Twitter } from 'lucide-react'
import { Heart } from './Decor'

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
      { to: '/about', label: 'Careers' },
      { to: '/about', label: 'Press kit' },
      { to: '/about', label: 'Blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/safety', label: 'Community guidelines' },
      { to: '/safety', label: 'Privacy' },
      { to: '/safety', label: 'Terms' },
      { to: '/safety', label: 'Cookie settings' },
    ],
  },
]

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Music2, label: 'TikTok' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Twitter, label: 'X' },
]

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden pb-6 sm:pb-10">
      <div className="section">
        <div className="relative overflow-hidden rounded-[2.5rem] mesh-panel px-6 py-12 shadow-card sm:px-12 sm:py-16">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-peach-400 to-blush-400 shadow-pill">
                  <Heart className="h-5 w-5 fill-white text-white" />
                </span>
                <span className="font-display text-2xl font-semibold text-mist-100">rissme</span>
              </div>
              <p className="mt-4 max-w-xs text-mist-300/80">
                Dating that feels like a crush, not a chore. Verified humans, real matches, zero ick.
              </p>
              <div className="mt-5 flex gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-mist-300 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-blush-400"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="font-display text-lg font-semibold text-mist-100">{c.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l, i) => (
                    <li key={i}>
                      <Link to={l.to} className="text-mist-300/80 transition-colors hover:text-blush-400">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-mist-300/70 sm:flex-row">
            <p className="flex items-center gap-1.5">
              made with <Heart className="inline h-4 w-4 text-blush-400" /> for people who are done with the ick
            </p>
            <p>© {new Date().getFullYear()} Rissme. swipe responsibly.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
