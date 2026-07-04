import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import SoftAurora from '@/components/SoftAurora'
import ClickSpark from '@/components/ClickSpark'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata = {
  title: '汤思远 Portfolio',
  description: '用 AI 重新定义个人效率的产品经理',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        {/* SoftAurora 背景层 */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <SoftAurora
            speed={0.6}
            scale={1.5}
            brightness={1}
            color1="#f7f7f7"
            color2="#e100ff"
            noiseFrequency={2.5}
            noiseAmplitude={1}
            bandHeight={0.5}
            bandSpread={1}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1}
            enableMouseInteraction
            mouseInfluence={0.25}
          />
        </div>
        {/* 内容层 */}
        <div className="relative z-10">
          <ClickSpark
            sparkColor="#ffffff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <Navbar />
            <main>{children}</main>
          </ClickSpark>
        </div>
      </body>
    </html>
  )
}
