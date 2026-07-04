import PageHeader from '@/components/PageHeader'
import CTAButton from '@/components/CTAButton'
import { aboutData } from '@/data/about'

export const metadata = {
  title: '关于 - 汤思远',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-8 py-16">
        <PageHeader
          label="WHO AM I"
          title="关于我"
          subtitle="一些关于我的故事"
        />

        {/* 自我介绍 */}
        <div className="space-y-5 mb-16">
          {aboutData.intro.map((p, i) => (
            <p key={i} className="text-base text-text-primary leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* 工作经历时间线 */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-text-primary mb-8">工作经历</h2>
          <div className="relative pl-8">
            {/* 左侧竖线 */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

            <div className="space-y-10">
              {aboutData.timeline.map((item, i) => (
                <div key={i} className="relative">
                  {/* 红色圆点 */}
                  <div className="absolute -left-8 top-1.5 w-2 h-2 rounded-full bg-primary" />
                  <p className="text-sm text-text-primary mb-1">{item.date}</p>
                  {item.company && (
                    <p className="text-base text-text-primary font-semibold mb-0.5">{item.company}</p>
                  )}
                  {item.role && (
                    <p className="text-sm text-text-primary mb-3">{item.role}</p>
                  )}
                  {item.duties && item.duties.length > 0 && (
                    <ul className="space-y-2">
                      {item.duties.map((duty, j) => (
                        <li key={j} className="text-sm text-text-primary leading-relaxed flex items-start gap-2">
                          <span className="text-primary mt-1.5 flex-shrink-0">·</span>
                          <span>{duty}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部 CTA */}
        <CTAButton href="/works" variant="arrow">
          查看我的作品
        </CTAButton>
      </div>
    </div>
  )
}
