import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'
import { Button } from './ui'
import { RissmeLogo } from './ui/RissmeLogo'

const links = [
  { to: '/features', label: 'Features' },
  { to: '/safety', label: 'Safety' },
  { to: '/premium', label: 'Premium' },
  { to: '/about', label: 'About' },
]

function Logo() {
  return (
    <Link to="/" className="group" aria-label="Rissme home">
      <RissmeLogo
        variant="dark"
        markClass="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`section flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5 dark-glass ${
          scrolled ? 'shadow-card' : 'shadow-sm'
        }`}
      >
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-white/10 text-mist-100' : 'text-mist-300/80 hover:text-mist-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Button to="/download" className="px-5 py-2.5 text-sm">
            Get the app
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-mist-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="section mt-2 md:hidden"
          >
            <div className="dark-glass flex flex-col gap-1 rounded-4xl p-3 shadow-card">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-base font-semibold ${
                      isActive ? 'bg-white/10 text-mist-100' : 'text-mist-300'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Button to="/download" className="mt-1 w-full">
                Get the app <Heart className="h-4 w-4 fill-white" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
