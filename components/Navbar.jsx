'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' },
  { href: '/works', label: '作品' },
  { href: '/ai-tools', label: 'AI工具' },
  { href: '/now', label: 'Now' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="absolute top-8 right-8 z-20 flex gap-8">
      {navItems.map(item => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-lg font-medium tracking-wide transition-colors duration-base ${
              isActive
                ? 'text-primary'
                : 'text-text-tertiary hover:text-text-primary'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
