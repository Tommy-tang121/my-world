import CTAButton from './CTAButton'

export default function HeroSection({ name, tagline, subtitle }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(230,57,70,0.15), transparent)',
        }}
      />
      <div className="relative max-w-content mx-auto px-8 pt-24 pb-12 flex items-center justify-center gap-16">
        <div className="flex-1">
          <p className="text-xs tracking-[0.2em] uppercase text-text-tertiary mb-4">{tagline}</p>
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
            {name}
          </h1>
          <p className="text-xl text-text-secondary mb-10">{subtitle}</p>
          <div className="flex gap-4">
            <CTAButton href="/works" variant="primary">探索我的作品</CTAButton>
            <CTAButton href="/about" variant="outline">了解我的经历</CTAButton>
          </div>
        </div>
        <div className="w-[120px] h-[120px] rounded-2xl border border-border shadow-[0_0_40px_rgba(230,57,70,0.1)] bg-surface-elevated flex items-center justify-center flex-shrink-0">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 0 0-16 0" />
          </svg>
        </div>
      </div>
    </section>
  )
}
