// Minimal className combiner (shadcn-style `cn`, no clsx/tailwind-merge
// dependency since callers here never pass conflicting utility classes).
export function cn(...inputs) {
  return inputs.flat().filter(Boolean).join(' ')
}
