import Link from 'next/link'

export default function CTAButton({ children, href, variant = 'primary', className = '' }) {
  const base = 'inline-flex items-center gap-2 text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-base'
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark hover:shadow-[0_0_24px_rgba(230,57,70,0.25)]',
    outline: 'border border-primary/50 text-primary hover:bg-primary/10',
    arrow: 'border border-primary/50 text-primary hover:bg-primary/10',
  }
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {variant === 'arrow' && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      )}
    </Link>
  )
}
