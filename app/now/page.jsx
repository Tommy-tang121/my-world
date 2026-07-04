import PageHeader from '@/components/PageHeader'
import { nowData } from '@/data/now'

export const metadata = {
  title: 'Now - 汤思远',
}

export default function NowPage() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="max-w-3xl mx-auto px-8 py-10 h-full flex flex-col">
        <PageHeader
          label="NOW"
          title="最近在做"
          subtitle="此刻我正在忙什么"
        />

        {/* 最后更新时间 */}
        <p className="text-sm text-text-tertiary mb-8">
          最后更新：{nowData.lastUpdated}
        </p>

        {/* 正在忙的事 - flex-1 自适应占满剩余空间 */}
        <section className="flex-1 flex flex-col justify-center min-h-0">
          <h2 className="text-lg font-semibold text-text-primary mb-5">正在忙</h2>
          <ul className="space-y-4">
            {nowData.doing.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-base text-text-secondary leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 在思考的 - flex-1 自适应占满剩余空间 */}
        {nowData.thinking && nowData.thinking.length > 0 && (
          <section className="flex-1 flex flex-col justify-center min-h-0">
            <h2 className="text-lg font-semibold text-text-primary mb-5">在思考</h2>
            <ul className="space-y-4">
              {nowData.thinking.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-base text-text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
