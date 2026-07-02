export default function PageHeader({ label, title, subtitle }) {
  return (
    <header className="mb-12">
      <p className="text-xs tracking-[0.2em] uppercase text-text-tertiary mb-4">{label}</p>
      <h1 className="text-4xl font-bold tracking-tight text-text-primary mb-4">{title}</h1>
      {subtitle && <p className="text-lg text-text-secondary">{subtitle}</p>}
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-8" />
    </header>
  )
}
