'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/works', label: '作品' },
  { href: '/ai-tools', label: 'AI工具' },
  { href: '/about', label: '关于' },
  { href: '/now', label: 'Now' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-[rgba(10,10,10,0.6)] border-b border-[rgba(30,30,30,0.5)]">
      <div className="max-w-container mx-auto px-8 py-5 flex justify-between items-center">
        <Link href="/" className="text-sm font-medium text-text-primary hover:text-white transition-colors duration-base">
          汤思远
        </Link>
        <div className="flex gap-6">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-base ${
                  isActive
                    ? 'text-text-secondary'
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
