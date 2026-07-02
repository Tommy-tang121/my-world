'use client'
import { useMouseGlow } from '@/hooks/useMouseGlow'

export default function ContactCard({ icon, label, value, href }) {
  const { ref, onMouseMove } = useMouseGlow()
  const Wrapper = href ? 'a' : 'div'

  return (
    <Wrapper
      href={href}
      ref={ref}
      onMouseMove={onMouseMove}
      className="block bg-surface/80 backdrop-blur-sm rounded-2xl border border-border/50 p-6 transition-colors duration-slow hover:border-primary/30"
    >
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center flex-shrink-0 text-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm text-text-tertiary mb-1">{label}</p>
          <p className="text-lg font-medium text-text-primary">{value}</p>
        </div>
      </div>
    </Wrapper>
  )
}
