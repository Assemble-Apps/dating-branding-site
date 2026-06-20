import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Button that renders as a router <Link>, an <a>, or a <button>.
export function Button({ children, to, href, variant = 'primary', className = '', ...props }) {
  const cls = `${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`
  const motionProps = { whileTap: { scale: 0.96 } }

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={cls} {...props}>
          {children}
        </Link>
      </motion.div>
    )
  }
  if (href) {
    return (
      <motion.a {...motionProps} href={href} className={cls} {...props}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button {...motionProps} className={cls} {...props}>
      {children}
    </motion.button>
  )
}

// Fade + rise on scroll into view.
export function Reveal({ children, delay = 0, y = 28, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Stagger container + item helpers.
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Infinite horizontal marquee. Pass an array of nodes.
export function Marquee({ items, className = '' }) {
  const doubled = [...items, ...items]
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}

// Section heading with eyebrow + dreamy gradient title.
export function SectionHeading({ eyebrow, title, sub, center = true, className = '', light = false }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className={`font-display text-4xl font-semibold leading-[1.05] sm:text-5xl ${light ? 'text-mist-100' : 'text-ink-800'}`}>{title}</h2>
      {sub && <p className={`mt-5 text-lg ${light ? 'text-mist-300/80' : 'text-ink-700/75'}`}>{sub}</p>}
    </div>
  )
}
