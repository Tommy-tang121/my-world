# 汤思远个人网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This is an inline, staged execution — pause after each Phase for user review.

**Goal:** 基于 `design/ui-components.html` 设计系统，搭建 5 页个人作品集网站（首页/作品/AI工具/关于/Now + 首页底部联系区），全静态可部署 Vercel。

**Architecture:** Next.js App Router + Tailwind CSS + 纯 JS。内容抽数据文件，组件从原型迁移。3D 轮播用 CSS transform + rAF + lerp 实现，鼠标光晕用 CSS 变量 + 伪元素。

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, JavaScript (.jsx)

**Spec:** [docs/superpowers/specs/2026-07-01-portfolio-website-design.md](file:///e:/My%20world/docs/superpowers/specs/2026-07-01-portfolio-website-design.md)

---

## 文件结构

```
e:\My world\
├── src/
│   ├── app/
│   │   ├── layout.jsx              # 根布局：字体、Navbar、全局样式
│   │   ├── page.jsx                # 首页
│   │   ├── works/page.jsx          # 作品页
│   │   ├── ai-tools/page.jsx       # AI 工具页
│   │   ├── about/page.jsx          # 关于页
│   │   ├── now/page.jsx            # Now 页
│   │   └── globals.css             # Tailwind + 全局样式
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PageHeader.jsx
│   │   ├── HeroSection.jsx
│   │   ├── EntryCard.jsx           # 含 BorderGlow
│   │   ├── CTAButton.jsx           # primary/outline/arrow 三变体
│   │   ├── Blockquote.jsx
│   │   ├── ContactCard.jsx
│   │   ├── Gallery3D.jsx           # 3D 轮播容器
│   │   ├── WorkCard.jsx
│   │   ├── CarouselDots.jsx
│   │   ├── CategoryHeader.jsx
│   │   ├── ToolCard.jsx
│   │   ├── Timeline.jsx
│   │   └── SectionDivider.jsx
│   ├── hooks/
│   │   └── useMouseGlow.js         # 鼠标光晕 Hook
│   └── data/
│       ├── home.js
│       ├── contacts.js
│       ├── works.js
│       ├── aiTools.js
│       ├── about.js
│       └── now.js
├── tailwind.config.js
├── next.config.js
├── package.json
└── jsconfig.json                   # 路径别名 @/*
```

---

## Phase 1：项目骨架与设计系统落地

**目标**：Next.js 跑起来，Tailwind 配好设计 tokens，全局样式生效，首页能打开（空白也行）。

### Task 1.1: 初始化 Next.js 项目

**Files:**
- Create: `package.json`, `next.config.js`, `jsconfig.json`, `tailwind.config.js`, `src/app/layout.jsx`, `src/app/globals.css`, `src/app/page.jsx`

- [ ] **Step 1: 在 `e:\My world` 初始化 Next.js**

```bash
npx create-next-app@latest . --js --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint --use-npm
```

注意：该命令会询问是否覆盖已存在文件，按提示确认。如果 `design/` 和 `docs/` 目录冲突，选择保留它们（Next.js 创建的样板目录如 `app/` 会生成在根目录，我们后续移到 `src/` 下）。

预期：生成标准 Next.js 项目结构。

- [ ] **Step 2: 调整为 `src/` 目录结构**

把 `app/` 移到 `src/app/`，确保 `jsconfig.json` 的 `@/*` 指向 `src/*`：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 3: 验证开发服务器启动**

```bash
npm run dev
```

预期：`http://localhost:3000` 打开看到 Next.js 默认欢迎页。

---

### Task 1.2: 配置 Tailwind 设计 tokens

**Files:**
- Modify: `tailwind.config.js`, `src/app/globals.css`

- [ ] **Step 1: 写入 Tailwind 配置（颜色/字体/断点）**

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E63946',
          light: '#FF6B6B',
          dark: '#C1121F',
        },
        background: '#0A0A0A',
        surface: {
          DEFAULT: '#111111',
          elevated: '#1A1A1A',
        },
        border: {
          DEFAULT: '#2A2A2A',
          subtle: '#1E1E1E',
        },
        text: {
          primary: '#F0F0F0',
          secondary: '#999999',
          tertiary: '#666666',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      maxWidth: {
        'container': '1700px',
        'content': '1400px',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: 写入全局样式 `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #E63946;
  --color-primary-light: #FF6B6B;
  --color-primary-dark: #C1121F;
  --color-background: #0A0A0A;
  --color-surface: #111111;
  --color-surface-elevated: #1A1A1A;
  --color-border: #2A2A2A;
  --color-border-subtle: #1E1E1E;
  --color-text-primary: #F0F0F0;
  --color-text-secondary: #999999;
  --color-text-tertiary: #666666;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #0A0A0A;
  color: #F0F0F0;
}

/* 滚动条 */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #0A0A0A; }
::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 4px; }
```

- [ ] **Step 3: 在 `layout.jsx` 配置字体**

```jsx
// src/app/layout.jsx
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata = {
  title: '汤思远 Portfolio',
  description: '用 AI 重新定义个人效率的产品经理',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: 把首页 `page.jsx` 改成最简占位**

```jsx
// src/app/page.jsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-text-primary">汤思远</h1>
    </main>
  )
}
```

- [ ] **Step 5: 验证样式生效**

```bash
npm run dev
```

预期：`localhost:3000` 显示黑底白字"汤思远"，字体是 Inter。

- [ ] **Step 6: 提交**

```bash
git add -A
git commit -m "feat: 初始化 Next.js 项目，配置 Tailwind 设计 tokens"
```

---

## Phase 2：通用组件与布局

**目标**：Navbar、PageHeader、CTAButton、SectionDivider 等通用组件完成，所有页面能显示标题和导航。

### Task 2.1: Navbar 组件

**Files:**
- Create: `src/components/Navbar.jsx`

- [ ] **Step 1: 实现 Navbar**

```jsx
// src/components/Navbar.jsx
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
```

- [ ] **Step 2: 在 `layout.jsx` 挂载 Navbar**

修改 `src/app/layout.jsx`，在 `<body>` 内 `<main>` 外加：

```jsx
import Navbar from '@/components/Navbar'
// ...
<body className="font-sans antialiased">
  <Navbar />
  <main className="pt-20">{children}</main>
</body>
```

- [ ] **Step 3: 验证**

```bash
npm run dev
```

预期：顶部出现毛玻璃导航栏，5 个页签，当前页高亮。

- [ ] **Step 4: 提交**

```bash
git add src/components/Navbar.jsx src/app/layout.jsx
git commit -m "feat: 添加顶部导航栏"
```

---

### Task 2.2: PageHeader / CTAButton / SectionDivider 组件

**Files:**
- Create: `src/components/PageHeader.jsx`, `src/components/CTAButton.jsx`, `src/components/SectionDivider.jsx`

- [ ] **Step 1: PageHeader**

```jsx
// src/components/PageHeader.jsx
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
```

- [ ] **Step 2: CTAButton（三变体）**

```jsx
// src/components/CTAButton.jsx
import Link from 'next/link'

export default function CTAButton({ children, href, variant = 'primary', className = '' }) {
  const base = 'inline-flex items-center gap-2 text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-base'
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark hover:shadow-[0_0_24px_rgba(230,57,70,0.25)]',
    outline: 'border border-primary/50 text-primary hover:bg-primary/10',
    arrow: 'border border-primary/50 text-primary hover:bg-primary/10',
  }
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {variant === 'arrow' && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      )}
    </Link>
  )
}
```

- [ ] **Step 3: SectionDivider**

```jsx
// src/components/SectionDivider.jsx
export default function SectionDivider({ width = 'full' }) {
  const w = width === 'short' ? 'w-16' : 'w-full'
  const opacity = width === 'short' ? 'via-primary/50' : 'via-primary/30'
  return (
    <div className={`${w} h-px bg-gradient-to-r from-transparent ${opacity} to-transparent my-10`} />
  )
}
```

- [ ] **Step 4: 提交**

```bash
git add src/components/PageHeader.jsx src/components/CTAButton.jsx src/components/SectionDivider.jsx
git commit -m "feat: 添加 PageHeader/CTAButton/SectionDivider 通用组件"
```

---

## Phase 3：首页

**目标**：首页完整呈现——Hero + 入口卡片（含鼠标光晕）+ 引用块 + 底部联系区。

### Task 3.1: useMouseGlow Hook + EntryCard 组件

**Files:**
- Create: `src/hooks/useMouseGlow.js`, `src/components/EntryCard.jsx`

- [ ] **Step 1: useMouseGlow Hook**

```js
// src/hooks/useMouseGlow.js
import { useRef } from 'react'

export function useMouseGlow() {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return { ref, onMouseMove: handleMouseMove }
}
```

- [ ] **Step 2: EntryCard（含 BorderGlow）**

```jsx
// src/components/EntryCard.jsx
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
```

- [ ] **Step 3: 提交**

```bash
git add src/hooks/useMouseGlow.js src/components/EntryCard.jsx
git commit -m "feat: 添加鼠标光晕 Hook 与 EntryCard 组件"
```

---

### Task 3.2: HeroSection + Blockquote + ContactCard 组件

**Files:**
- Create: `src/components/HeroSection.jsx`, `src/components/Blockquote.jsx`, `src/components/ContactCard.jsx`

- [ ] **Step 1: HeroSection**

```jsx
// src/components/HeroSection.jsx
import CTAButton from './CTAButton'

export default function HeroSection({ name, tagline, subtitle, avatar }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(230,57,70,0.15), transparent)',
        }}
      />
      <div className="relative max-w-content mx-auto px-8 py-32 flex items-center gap-16">
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
          {avatar || (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Blockquote**

```jsx
// src/components/Blockquote.jsx
export default function Blockquote({ children }) {
  return (
    <blockquote className="border-l-2 border-primary/50 pl-6 py-2">
      <p className="text-base text-text-secondary italic leading-relaxed">{children}</p>
    </blockquote>
  )
}
```

- [ ] **Step 3: ContactCard**

```jsx
// src/components/ContactCard.jsx
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
```

- [ ] **Step 4: 提交**

```bash
git add src/components/HeroSection.jsx src/components/Blockquote.jsx src/components/ContactCard.jsx
git commit -m "feat: 添加 HeroSection/Blockquote/ContactCard 组件"
```

---

### Task 3.3: 首页数据文件

**Files:**
- Create: `src/data/home.js`, `src/data/contacts.js`

- [ ] **Step 1: home.js**

```js
// src/data/home.js
export const homeData = {
  tagline: 'Product Manager & AI Explorer',
  name: '汤思远',
  subtitle: '用 AI 重新定义个人效率的产品经理',
  quote: '我相信 AI 是下一个时代的基础设施。不是因为它很酷，而是因为它确实能让人做事的效率提升一个量级。我想成为那些不仅使用 AI，还能用 AI 创造价值的人。',
  entries: [
    {
      title: '我的作品',
      description: '查看我开发过的项目',
      href: '/works',
      icon: 'grid',
    },
    {
      title: 'AI工具心得',
      description: '收藏和使用的AI工具',
      href: '/ai-tools',
      icon: 'sparkle',
    },
    {
      title: '关于我',
      description: '了解我的经历',
      href: '/about',
      icon: 'clock',
    },
    {
      title: '联系方式',
      description: '与我取得联系',
      href: '/#contact',
      icon: 'mail',
    },
  ],
}

export const iconMap = {
  grid: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  sparkle: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z"/><path d="M18 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z"/></svg>,
  clock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  mail: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>,
}
```

注意：因 JSX 不能直接写在 `.js` 文件，改为 `.jsx`：`src/data/home.jsx`，或在组件内做 icon 映射。**改为后者**：数据只存 icon key，组件内查表。修正版：

```js
// src/data/home.js
export const homeData = {
  tagline: 'Product Manager & AI Explorer',
  name: '汤思远',
  subtitle: '用 AI 重新定义个人效率的产品经理',
  quote: '我相信 AI 是下一个时代的基础设施。不是因为它很酷，而是因为它确实能让人做事的效率提升一个量级。我想成为那些不仅使用 AI，还能用 AI 创造价值的人。',
  entries: [
    { title: '我的作品', description: '查看我开发过的项目', href: '/works', icon: 'grid' },
    { title: 'AI工具心得', description: '收藏和使用的AI工具', href: '/ai-tools', icon: 'sparkle' },
    { title: '关于我', description: '了解我的经历', href: '/about', icon: 'clock' },
    { title: '联系方式', description: '与我取得联系', href: '/#contact', icon: 'mail' },
  ],
}
```

icon 映射放到 `src/components/icons.jsx`：

```jsx
// src/components/icons.jsx
export const icons = {
  grid: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  sparkle: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z"/><path d="M18 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z"/></svg>,
  clock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  mail: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>,
  wechat: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 3C4.9 3 2 5.5 2 8.5c0 1.7.8 3.2 2.1 4.3L3.5 15l2.5-1c1 .4 1.7.5 2.5.5.3 0 .5 0 .8 0"/><path d="M15.5 6C19.1 6 22 8.5 22 11.5c0 1.7-.8 3.2-2.1 4.3L20.5 18l-2.5-1c-1 .4-1.7.5-2.5.5-3.6 0-6.5-2.5-6.5-5.5S11.9 6 15.5 6Z"/></svg>,
}
```

- [ ] **Step 2: contacts.js**

```js
// src/data/contacts.js
export const contacts = [
  { icon: 'wechat', label: '微信 / WeChat', value: 'Siyuan_Tang' },
  { icon: 'mail', label: '邮箱 / Email', value: 'siyuan@example.com', href: 'mailto:siyuan@example.com' },
]
```

- [ ] **Step 3: 提交**

```bash
git add src/data/home.js src/data/contacts.js src/components/icons.jsx
git commit -m "feat: 添加首页与联系区数据文件"
```

---

### Task 3.4: 组装首页

**Files:**
- Modify: `src/app/page.jsx`

- [ ] **Step 1: 组装首页**

```jsx
// src/app/page.jsx
import HeroSection from '@/components/HeroSection'
import EntryCard from '@/components/EntryCard'
import Blockquote from '@/components/Blockquote'
import ContactCard from '@/components/ContactCard'
import CTAButton from '@/components/CTAButton'
import SectionDivider from '@/components/SectionDivider'
import { icons } from '@/components/icons'
import { homeData } from '@/data/home'
import { contacts } from '@/data/contacts'

export default function Home() {
  return (
    <>
      <HeroSection
        name={homeData.name}
        tagline={homeData.tagline}
        subtitle={homeData.subtitle}
      />

      <section className="max-w-content mx-auto px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeData.entries.map(entry => (
            <EntryCard
              key={entry.href}
              icon={icons[entry.icon]}
              title={entry.title}
              description={entry.description}
              href={entry.href}
            />
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-8 py-16">
        <Blockquote>{homeData.quote}</Blockquote>
      </section>

      <section id="contact" className="max-w-content mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Let&apos;s connect</h2>
          <p className="text-text-secondary">想聊聊？随时找我</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {contacts.map(contact => (
            <ContactCard
              key={contact.label}
              icon={icons[contact.icon]}
              label={contact.label}
              value={contact.value}
              href={contact.href}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <CTAButton href="/works" variant="arrow">查看我的作品</CTAButton>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: 验证首页**

```bash
npm run dev
```

预期：
- Hero 区极光背景 + 渐变名字 + 头像框
- 4 张入口卡片，鼠标移上去有红光跟随
- 引用块
- 底部联系区 2 张卡片 + CTA

- [ ] **Step 3: 提交**

```bash
git add src/app/page.jsx
git commit -m "feat: 首页完整组装"
```

---

## Phase 4：作品页（3D 轮播）

**目标**：作品页完成，3D 画廊轮播可拖拽/滚轮/触屏/点圆点。

### Task 4.1: WorkCard 组件

**Files:**
- Create: `src/components/WorkCard.jsx`

- [ ] **Step 1: WorkCard**

```jsx
// src/components/WorkCard.jsx
import Link from 'next/link'

export default function WorkCard({ work }) {
  const { title, description, problem, tags = [], github, demo } = work

  return (
    <div className="w-[380px] bg-surface border border-border/60 rounded-2xl overflow-hidden flex-shrink-0">
      <div
        className="h-[200px] flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1A1A1A, #111111)',
          backgroundImage: `
            linear-gradient(rgba(42,42,42,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,42,42,0.1) 1px, transparent 1px),
            linear-gradient(135deg, #1A1A1A, #111111)
          `,
          backgroundSize: '24px 24px, 24px 24px, 100% 100%',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-2">{description}</p>
        {problem && <p className="text-sm text-text-tertiary italic mb-3">→ {problem}</p>}
        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-surface-elevated text-text-secondary border border-border/50">
                {tag}
              </span>
            ))}
          </div>
        )}
        {(github || demo) && (
          <div className="flex gap-4 pt-4 border-t border-border/30">
            {github && (
              <Link href={github} target="_blank" className="text-sm text-primary hover:underline flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
                GitHub
              </Link>
            )}
            {demo && (
              <Link href={demo} target="_blank" className="text-sm text-primary hover:underline flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Demo
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add src/components/WorkCard.jsx
git commit -m "feat: 添加 WorkCard 组件"
```

---

### Task 4.2: Gallery3D + CarouselDots 组件（核心交互）

**Files:**
- Create: `src/components/Gallery3D.jsx`, `src/components/CarouselDots.jsx`

- [ ] **Step 1: CarouselDots**

```jsx
// src/components/CarouselDots.jsx
export default function CarouselDots({ count, active, onSelect }) {
  return (
    <div className="flex gap-3 justify-center mt-12">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`跳转到第 ${i + 1} 张`}
          className={`w-8 h-8 rounded-full transition-all duration-slow cursor-pointer ${
            i === active
              ? 'bg-primary scale-130'
              : 'bg-border/60 hover:bg-border'
          }`}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Gallery3D（3D 轮播核心）**

```jsx
// src/components/Gallery3D.jsx
'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import WorkCard from './WorkCard'
import CarouselDots from './CarouselDots'

export default function Gallery3D({ works }) {
  const count = works.length
  const [activeIndex, setActiveIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const targetRotation = useRef(0)
  const currentRotation = useRef(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startRotation = useRef(0)
  const rafId = useRef(null)

  const anglePerCard = 360 / count
  const radius = 500

  // 旋转到指定索引
  const rotateToIndex = useCallback((index) => {
    const normalized = ((index % count) + count) % count
    targetRotation.current = -normalized * anglePerCard
    setActiveIndex(normalized)
  }, [count, anglePerCard])

  // lerp 动画
  useEffect(() => {
    const animate = () => {
      const diff = targetRotation.current - currentRotation.current
      if (Math.abs(diff) < 0.01) {
        currentRotation.current = targetRotation.current
        setRotation(targetRotation.current)
      } else {
        currentRotation.current += diff * 0.1
        setRotation(currentRotation.current)
      }
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  // 鼠标拖拽
  const handleMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.clientX
    startRotation.current = targetRotation.current
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    const delta = e.clientX - startX.current
    const angleDelta = (delta / 300) * anglePerCard
    targetRotation.current = startRotation.current + angleDelta
    setRotation(targetRotation.current)
  }

  const handleMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    // snap 到最近的卡片
    const nearestIndex = Math.round(-targetRotation.current / anglePerCard)
    rotateToIndex(nearestIndex)
  }

  // 滚轮
  const handleWheel = (e) => {
    e.preventDefault()
    if (e.deltaY > 0) rotateToIndex(activeIndex + 1)
    else rotateToIndex(activeIndex - 1)
  }

  // 触屏
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
    startRotation.current = targetRotation.current
  }

  const handleTouchMove = (e) => {
    const delta = e.touches[0].clientX - startX.current
    const angleDelta = (delta / 300) * anglePerCard
    targetRotation.current = startRotation.current + angleDelta
    setRotation(targetRotation.current)
  }

  const handleTouchEnd = () => {
    const nearestIndex = Math.round(-targetRotation.current / anglePerCard)
    rotateToIndex(nearestIndex)
  }

  return (
    <div
      className="relative h-[600px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {works.map((work, i) => {
          const angle = i * anglePerCard
          const isActive = i === activeIndex
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 transition-opacity duration-slow"
              style={{
                transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                opacity: isActive ? 1 : 0.4,
              }}
            >
              <WorkCard work={work} />
            </div>
          )
        })}
      </div>
      <CarouselDots count={count} active={activeIndex} onSelect={rotateToIndex} />
    </div>
  )
}
```

- [ ] **Step 3: 提交**

```bash
git add src/components/Gallery3D.jsx src/components/CarouselDots.jsx
git commit -m "feat: 添加 3D 画廊轮播组件（拖拽/滚轮/触屏/圆点）"
```

---

### Task 4.3: 作品页数据与组装

**Files:**
- Create: `src/data/works.js`, `src/app/works/page.jsx`

- [ ] **Step 1: works.js（4 个占位作品）**

```js
// src/data/works.js
export const works = [
  {
    title: '作品一',
    description: '一句话描述这个项目是什么',
    problem: '解决了什么具体问题',
    tags: ['Next.js', 'Tailwind'],
    github: 'https://github.com/',
    demo: 'https://example.com',
  },
  {
    title: '作品二',
    description: '一句话描述这个项目是什么',
    problem: '解决了什么具体问题',
    tags: ['Python', 'FastAPI'],
    github: 'https://github.com/',
  },
  {
    title: '作品三',
    description: '一句话描述这个项目是什么',
    tags: ['React', 'Node.js'],
    demo: 'https://example.com',
  },
  {
    title: '作品四',
    description: '一句话描述这个项目是什么',
    problem: '解决了什么具体问题',
    tags: ['LangChain'],
  },
]
```

- [ ] **Step 2: 作品页组装**

```jsx
// src/app/works/page.jsx
import PageHeader from '@/components/PageHeader'
import Gallery3D from '@/components/Gallery3D'
import { works } from '@/data/works'

export default function WorksPage() {
  return (
    <div className="max-w-content mx-auto px-8 py-16">
      <PageHeader label="PROJECTS" title="我的作品" subtitle="我开发过的项目" />
      <Gallery3D works={works} />
    </div>
  )
}
```

- [ ] **Step 3: 验证**

```bash
npm run dev
```

访问 `localhost:3000/works`，预期：4 张作品卡片排成 3D 环，可拖拽/滚轮/触屏/点圆点切换。

- [ ] **Step 4: 提交**

```bash
git add src/data/works.js src/app/works/page.jsx
git commit -m "feat: 作品页完成"
```

---

## Phase 5：AI 工具页

**目标**：AI 工具页完成，3 个分类（Model/Agent/Video）各展示工具卡片。

### Task 5.1: CategoryHeader + ToolCard 组件

**Files:**
- Create: `src/components/CategoryHeader.jsx`, `src/components/ToolCard.jsx`

- [ ] **Step 1: CategoryHeader**

```jsx
// src/components/CategoryHeader.jsx
export default function CategoryHeader({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-primary-dark" />
      <h2 className="text-xl font-semibold text-text-primary">{children}</h2>
    </div>
  )
}
```

- [ ] **Step 2: ToolCard**

```jsx
// src/components/ToolCard.jsx
import { useMouseGlow } from '@/hooks/useMouseGlow'

export default function ToolCard({ name, testimonial, href }) {
  const { ref, onMouseMove } = useMouseGlow()
  const Wrapper = href ? 'a' : 'div'

  return (
    <Wrapper
      href={href}
      ref={ref}
      onMouseMove={onMouseMove}
      className="block bg-surface/80 backdrop-blur-sm rounded-2xl border border-border/50 p-6 transition-all duration-slow hover:border-primary/30 hover:shadow-[0_0_30px_rgba(230,57,70,0.06)]"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-3">{name}</h3>
      {testimonial && (
        <p className="text-sm text-text-secondary italic leading-relaxed">"{testimonial}"</p>
      )}
    </Wrapper>
  )
}
```

- [ ] **Step 3: 提交**

```bash
git add src/components/CategoryHeader.jsx src/components/ToolCard.jsx
git commit -m "feat: 添加 CategoryHeader/ToolCard 组件"
```

---

### Task 5.2: AI 工具页数据与组装

**Files:**
- Create: `src/data/aiTools.js`, `src/app/ai-tools/page.jsx`

- [ ] **Step 1: aiTools.js**

```js
// src/data/aiTools.js
export const aiTools = [
  {
    category: 'Model',
    tools: [
      { name: 'ChatGPT', testimonial: '日常思考和代码辅助，用得最多的AI。', link: 'https://chat.openai.com' },
      { name: 'Claude', testimonial: '长文本处理和代码理解很强。', link: 'https://claude.ai' },
      { name: 'Gemini', testimonial: '谷歌生态整合好。', link: 'https://gemini.google.com' },
    ],
  },
  {
    category: 'Agent',
    tools: [
      { name: 'Dify', testimonial: '搭建AI Agent工作流的首选平台。', link: 'https://dify.ai' },
      { name: 'Coze', testimonial: '字节出的Agent平台，国内可用。', link: 'https://coze.cn' },
    ],
  },
  {
    category: 'Video',
    tools: [
      { name: 'Runway', testimonial: 'AI视频生成领跑者。', link: 'https://runwayml.com' },
      { name: 'Pika', testimonial: '视频生成效果不错。', link: 'https://pika.art' },
    ],
  },
]
```

- [ ] **Step 2: AI 工具页组装**

```jsx
// src/app/ai-tools/page.jsx
import PageHeader from '@/components/PageHeader'
import CategoryHeader from '@/components/CategoryHeader'
import ToolCard from '@/components/ToolCard'
import { aiTools } from '@/data/aiTools'

export default function AIToolsPage() {
  return (
    <div className="max-w-content mx-auto px-8 py-16">
      <PageHeader label="AI TOOLS" title="AI 工具心得" subtitle="我收藏和使用的 AI 工具" />
      <div className="space-y-16">
        {aiTools.map(group => (
          <section key={group.category}>
            <CategoryHeader>{group.category}</CategoryHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {group.tools.map(tool => (
                <ToolCard
                  key={tool.name}
                  name={tool.name}
                  testimonial={tool.testimonial}
                  href={tool.link}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: 验证**

访问 `localhost:3000/ai-tools`，预期：3 个分类块，每块有红色竖条标题 + 工具卡片网格，hover 有光晕。

- [ ] **Step 4: 提交**

```bash
git add src/data/aiTools.js src/app/ai-tools/page.jsx
git commit -m "feat: AI 工具页完成"
```

---

## Phase 6：关于页

**目标**：关于页完成——自我介绍 + 工作经历时间线。

### Task 6.1: Timeline 组件

**Files:**
- Create: `src/components/Timeline.jsx`

- [ ] **Step 1: Timeline**

```jsx
// src/components/Timeline.jsx
export default function Timeline({ items }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
      {items.map((item, i) => (
        <div key={i} className="flex mb-8 relative last:mb-0">
          <div className="w-32 shrink-0 text-sm text-text-tertiary">{item.date}</div>
          <div className="absolute -left-6 top-[7px] w-2 h-2 rounded-full bg-primary" />
          <div className="text-base text-text-primary font-medium">{item.content}</div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add src/components/Timeline.jsx
git commit -m "feat: 添加 Timeline 组件"
```

---

### Task 6.2: 关于页数据与组装

**Files:**
- Create: `src/data/about.js`, `src/app/about/page.jsx`

- [ ] **Step 1: about.js**

```js
// src/data/about.js
export const aboutData = {
  intro: [
    '我是汤思远，一名产品经理，正在用 AI 工具重新定义个人效率。',
    '过去几年我从零开始学习编程和 AI 技术，现在专注于 AI 应用开发与产品探索。我相信 AI 是下一个时代的基础设施，想成为那些不仅使用 AI，还能用 AI 创造价值的人。',
  ],
  timeline: [
    { date: '2024 - 至今', content: 'AI应用开发与产品探索' },
    { date: '2022 - 2024', content: '产品经理，关注效率工具与用户体验' },
    { date: '2020 - 2022', content: '从零开始学习编程和AI技术' },
  ],
}
```

- [ ] **Step 2: 关于页组装**

```jsx
// src/app/about/page.jsx
import PageHeader from '@/components/PageHeader'
import Timeline from '@/components/Timeline'
import CTAButton from '@/components/CTAButton'
import { aboutData } from '@/data/about'

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-16">
      <PageHeader label="WHO AM I" title="关于我" subtitle="一些关于我的故事" />

      <section className="space-y-4 mb-16">
        {aboutData.intro.map((p, i) => (
          <p key={i} className="text-base text-text-secondary leading-relaxed">{p}</p>
        ))}
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-8">工作经历</h2>
        <Timeline items={aboutData.timeline} />
      </section>

      <div className="text-center">
        <CTAButton href="/works" variant="arrow">查看我的作品</CTAButton>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: 验证**

访问 `localhost:3000/about`，预期：自我介绍 + 时间线 + 底部 CTA。

- [ ] **Step 4: 提交**

```bash
git add src/data/about.js src/app/about/page.jsx
git commit -m "feat: 关于页完成"
```

---

## Phase 7：Now 页

**目标**：Now 页完成——更新时间 + 正在忙的事 + 当前关注。

### Task 7.1: Now 页数据与组装

**Files:**
- Create: `src/data/now.js`, `src/app/now/page.jsx`

- [ ] **Step 1: now.js**

```js
// src/data/now.js
export const nowData = {
  lastUpdated: '2026-07-01',
  doing: [
    '学习 LangChain 开发',
    '搭建个人网站',
    '阅读《AI 产品经理》',
  ],
  thinking: [
    '关注 Agent 工作流的落地场景',
    '研究 AI 产品的商业化路径',
  ],
}
```

- [ ] **Step 2: Now 页组装**

```jsx
// src/app/now/page.jsx
import PageHeader from '@/components/PageHeader'
import { nowData } from '@/data/now'

export default function NowPage() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-16">
      <PageHeader label="NOW" title="最近在做" subtitle="此刻我正在忙什么" />

      <p className="text-sm text-text-tertiary mb-12">最后更新：{nowData.lastUpdated}</p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-6">正在忙的事</h2>
        <ul className="space-y-3">
          {nowData.doing.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-base text-text-secondary">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {nowData.thinking && nowData.thinking.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-6">当前关注</h2>
          <ul className="space-y-3">
            {nowData.thinking.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-base text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
```

- [ ] **Step 3: 验证**

访问 `localhost:3000/now`，预期：标题 + 更新时间 + 两个列表（红点 + 灰字）。

- [ ] **Step 4: 提交**

```bash
git add src/data/now.js src/app/now/page.jsx
git commit -m "feat: Now 页完成"
```

---

## Phase 8：联调打磨与部署

**目标**：全站走查，修复 bug，准备部署 Vercel。

### Task 8.1: 全站走查

- [ ] **Step 1: 逐页验证**

访问每个页面，对照 spec 检查：
- `/` 首页：Hero / 入口卡片光晕 / 引用块 / 联系区
- `/works` 作品页：3D 轮播 4 种交互
- `/ai-tools` AI 工具页：3 分类 + 卡片光晕
- `/about` 关于页：时间线
- `/now` Now 页：列表

- [ ] **Step 2: 导航栏高亮验证**

每页顶部导航栏当前页签是否高亮。

- [ ] **Step 3: 响应式粗查**

浏览器窗口缩到 768px 宽，检查卡片是否变单列、布局是否破。

- [ ] **Step 4: 修复发现的问题**

按发现的问题逐一修复。

- [ ] **Step 5: 提交**

```bash
git add -A
git commit -m "fix: 全站走查修复"
```

---

### Task 8.2: 生产构建验证

**Files:**
- Modify: 可能修复构建错误

- [ ] **Step 1: 生产构建**

```bash
npm run build
```

预期：构建成功，无错误。

- [ ] **Step 2: 本地预览生产版本**

```bash
npm run start
```

访问 `localhost:3000`，确认生产版本和开发版本一致。

- [ ] **Step 3: 修复构建告警**

如有 ESLint 告警或构建警告，修复。

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "chore: 生产构建验证通过"
```

---

### Task 8.3: 部署到 Vercel

- [ ] **Step 1: 推送到 GitHub**

```bash
git remote add origin <github-repo-url>
git push -u origin main
```

- [ ] **Step 2: 在 Vercel 导入项目**

登录 vercel.com → New Project → 选择 GitHub 仓库 → 默认配置 → Deploy。

- [ ] **Step 3: 验证线上**

访问 Vercel 分配的域名，全站走查一遍。

- [ ] **Step 4: 把线上链接给用户**

---

## Self-Review

**Spec 覆盖检查**：
- ✅ 5 页 + 首页联系区：Phase 3-7 覆盖
- ✅ 导航栏 5 页签：Task 2.1
- ✅ 鼠标光晕交互：Task 3.1（Hook + EntryCard / ContactCard / ToolCard 复用）
- ✅ 3D 轮播 4 种交互：Task 4.2
- ✅ 6 个数据文件：Task 3.3 / 4.3 / 5.2 / 6.2 / 7.1
- ✅ 14 个组件：Phase 2-7 逐个覆盖
- ✅ 占位内容：各数据文件用原型现成文字
- ✅ 部署 Vercel：Task 8.3

**Placeholder 扫描**：无 TBD/TODO，所有代码块完整。

**类型/命名一致性**：
- `useMouseGlow` 在 EntryCard / ContactCard / ToolCard 中一致使用
- `homeData` / `contacts` / `works` / `aiTools` / `aboutData` / `nowData` 命名统一
- `WorkCard` 的 `work` prop 与 `Gallery3D` 传入一致

---

## Execution Handoff

计划已保存。按用户选择，**使用 inline 执行（executing-plans）**，分 Phase 推进，每个 Phase 完成后暂停给用户看效果。
