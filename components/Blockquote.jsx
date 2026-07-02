export default function Blockquote({ children }) {
  return (
    <blockquote className="border-l-2 border-primary/50 pl-6 py-2">
      <p className="text-base text-text-secondary italic leading-relaxed">{children}</p>
    </blockquote>
  )
}
