export default function HeroSection({ name, tagline, subtitle }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(230,57,70,0.15), transparent)',
        }}
      />
      <div className="relative max-w-content mx-auto px-8 pt-20 pb-8 flex items-center justify-center gap-10">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-text-tertiary mb-3">{tagline}</p>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
            {name}
          </h1>
          <p className="text-lg text-text-secondary">{subtitle}</p>
        </div>
        <div className="w-[100px] h-[100px] rounded-2xl border border-border shadow-[0_0_40px_rgba(230,57,70,0.1)] overflow-hidden flex-shrink-0">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/avatar.jpg`} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}
