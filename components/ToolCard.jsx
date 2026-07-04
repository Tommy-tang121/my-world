'use client'
import { useMouseGlow } from '@/hooks/useMouseGlow'

export default function ToolCard({ name, testimonial }) {
  const { ref, onMouseMove } = useMouseGlow()

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="group relative bg-surface/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 transition-all duration-slow overflow-hidden hover:border-primary/30 hover:shadow-[0_0_30px_rgba(230,57,70,0.08)] h-full w-full"
    >
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-slow"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230,57,70,0.4), transparent 40%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <h3 className="text-base font-semibold text-text-primary mb-1">{name}</h3>
      {testimonial && (
        <p className="text-xs text-text-tertiary italic leading-relaxed">{testimonial}</p>
      )}
    </div>
  )
}
