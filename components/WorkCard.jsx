export default function WorkCard({ work, onOpenDetail }) {
  return (
    <div className="w-full min-h-[260px] bg-surface border border-border/60 rounded-2xl overflow-hidden flex flex-col">
      {/* 正文区 */}
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-semibold text-text-primary mb-2">{work.title}</h3>
        <p className="text-sm text-text-secondary mb-3">{work.intro}</p>

        {work.problem && (
          <p className="text-sm text-text-secondary italic mb-4 flex items-start gap-2">
            <span className="text-primary">→</span>
            <span>{work.problem}</span>
          </p>
        )}

        {/* 技术标签 */}
        {work.tags && work.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {work.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-surface-elevated text-text-secondary border border-border/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 底部：右下角详情按钮 */}
        <div className="mt-auto pt-4 border-t border-border-subtle flex justify-end">
          <button
            onClick={onOpenDetail}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-light transition-colors duration-base group"
          >
            <span>查看详情</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-0.5 transition-transform duration-base"
            >
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
