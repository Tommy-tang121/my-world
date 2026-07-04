'use client'
import { useState, useMemo } from 'react'
import PageHeader from '@/components/PageHeader'
import WorkCard from '@/components/WorkCard'
import WorkDetail from '@/components/WorkDetail'
import { works } from '@/data/works'

export default function WorksPage() {
  const [selectedWork, setSelectedWork] = useState(null)

  // 按 createdAt 倒序排列（新的在前，旧的在后）
  const sortedWorks = useMemo(() => {
    return [...works].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [])

  return (
    <div className="min-h-screen">
      <div className="max-w-container mx-auto px-8 py-10">
        <PageHeader
          label="PROJECTS"
          title="我的作品"
          subtitle="我开发过的项目"
        />

        {/* 三列布局，中间列下移 40px 形成错落，后续增加自动按 3 取模分配 */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 max-w-[1200px] mx-auto">
          {sortedWorks.map((work, i) => (
            <div key={work.title} className={i % 3 === 1 ? 'mt-10' : ''}>
              <WorkCard work={work} onOpenDetail={() => setSelectedWork(work)} />
            </div>
          ))}
        </div>

        {/* 底部到底提示 */}
        <div className="flex flex-col items-center gap-3 mt-20 text-text-tertiary">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="text-xs tracking-[0.2em] uppercase">End</p>
          <p className="text-sm">所有作品都已展示完</p>
        </div>
      </div>

      {/* 详情浮层 */}
      {selectedWork && (
        <WorkDetail work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </div>
  )
}
