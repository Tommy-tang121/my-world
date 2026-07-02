export default function SectionDivider({ width = 'full' }) {
  const w = width === 'short' ? 'w-16' : 'w-full'
  const opacity = width === 'short' ? 'via-primary/50' : 'via-primary/30'
  return (
    <div className={`${w} h-px bg-gradient-to-r from-transparent ${opacity} to-transparent my-10`} />
  )
}
