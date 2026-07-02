'use client'
import Link from 'next/link'
import { useMouseGlow } from '@/hooks/useMouseGlow'

export default function EntryCard({ icon, title, description, href }) {
  const { ref, onMouseMove } = useMouseGlow()

  return (
    <Link
      href={href}
      ref={ref}
      onMouseMove={onMouseMove}
      className="group relative flex flex-col bg-surface/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 transition-all duration-slow overflow-hidden hover:border-primary/30 hover:shadow-[0_0_30px_rgba(230,57,70,0.08)]"
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-slow"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230,57,70,0.4), transparent 40%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-tertiary leading-relaxed">{description}</p>
    </Link>
  )
}
