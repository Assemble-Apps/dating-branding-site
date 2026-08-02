/**
 * Logo wrappers using the actual Rissme logo assets.
 *
 * variant="light"  → dark-text / pink mark (cream / white backgrounds)
 * variant="dark"   → white-text / white mark (dark glass backgrounds)
 *
 * For light backgrounds  → rissme_light_logo-transparent.png  (or SVG)
 * For dark  backgrounds  → rissme_dark_logo-transparent.png
 */

// Transparent mark extracted from the SVG — works on any background colour
const MARK = '/rissme%20logo/rissme_svg_logo-transparent.png'

// ── Horizontal logo: mark + "rissme" wordmark — navbar ────────────────
// variant controls the wordmark text colour only; the mark is always the
// same transparent gradient image.
export function RissmeLogo({
  variant   = 'dark',   // 'dark' = white text  |  'light' = ink text
  className = '',
  markClass = 'h-9 w-auto',
}) {
  const textColor = variant === 'dark' ? '#F6F3FC' : '#100D18'
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src={MARK} alt="" aria-hidden="true" className={markClass} draggable={false} />
      <span
        className="font-display font-semibold leading-none tracking-tight"
        style={{ color: textColor, fontSize: '1.45rem' }}
      >
        rissme
      </span>
    </div>
  )
}

// ── Stacked logo: mark above, wordmark below — footer, preloader ───────
export function RissmeLogoStacked({
  variant   = 'light',  // 'light' = ink text  |  'dark' = white text
  className = '',
  markClass = 'h-16 w-auto',
}) {
  const textColor = variant === 'dark' ? '#F6F3FC' : '#100D18'
  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      <img src={MARK} alt="Rissme" className={markClass} draggable={false} />
      <span
        className="font-display font-semibold leading-none tracking-tight"
        style={{ color: textColor, fontSize: '1.45rem' }}
      >
        rissme
      </span>
    </div>
  )
}
