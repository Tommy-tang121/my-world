import PageHeader from '@/components/PageHeader'
import ToolCard from '@/components/ToolCard'
import { aiTools, skills } from '@/data/ai-tools'

export const metadata = {
  title: 'AI 工具 - 汤思远',
}

export default function AIToolsPage() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="max-w-container mx-auto px-8 py-8 h-full flex flex-col">
        <PageHeader
          label="AI TOOLS"
          title="AI 工具心得"
          subtitle="我收藏和使用的 AI 工具"
        />

        {/* 左右两栏：左边 AI 工具，右边技能栈 */}
        <div className="flex-1 grid grid-cols-2 gap-x-12 min-h-0 mt-6">
          {/* 左栏：AI 工具分类 */}
          <div className="flex flex-col gap-5 min-h-0 overflow-hidden">
            {aiTools.map(group => (
              <section key={group.category} className="flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-[#C1121F]" />
                  <h2 className="text-base font-semibold text-text-primary">{group.category}</h2>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {group.tools.map(tool => (
                    <ToolCard
                      key={tool.name}
                      name={tool.name}
                      testimonial={tool.testimonial}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 右栏：技能栈 */}
          <div className="flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-[#C1121F]" />
              <h2 className="text-base font-semibold text-text-primary">技能栈</h2>
            </div>
            <div className="space-y-5">
              {skills.map(group => (
                <div key={group.category}>
                  <p className="text-sm text-text-primary font-medium mb-2">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1.5 rounded-full bg-surface-elevated text-text-primary border border-border/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
