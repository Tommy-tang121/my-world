'use client'
import { useState, useEffect } from 'react'

export default function WorkDetail({ work, onClose }) {
  const [opened, setOpened] = useState(false)
  const [videoExpanded, setVideoExpanded] = useState(false)

  // 挂载后触发翻开动画
  useEffect(() => {
    const t = setTimeout(() => setOpened(true), 10)
    return () => clearTimeout(t)
  }, [])

  // ESC 关闭
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    // 锁滚动
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  const close = () => {
    setOpened(false)
    setTimeout(onClose, 400) // 等动画结束再卸载
  }

  const detail = work.detail || {}

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        opacity: opened ? 1 : 0,
        transition: 'opacity 400ms ease',
      }}
      onClick={close}
    >
      {/* 设计稿翻页容器 */}
      <div
        className="relative bg-surface border border-border/60 rounded-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col"
        style={{
          transformOrigin: 'center bottom',
          transform: opened ? 'perspective(2000px) rotateX(0deg) scale(1)' : 'perspective(2000px) rotateX(-90deg) scale(0.8)',
          opacity: opened ? 1 : 0,
          transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部标题栏 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-[0.2em] uppercase text-text-tertiary">项目名称</span>
            <h2 className="text-xl font-semibold text-text-primary">{work.title}</h2>
          </div>
          <button
            onClick={close}
            aria-label="关闭"
            className="w-8 h-8 rounded-full flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface-elevated transition-all duration-base"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* 内容滚动区 */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          {/* 视频提示卡 - 有视频才显示，默认折叠，点击展开 */}
          {detail.videoHtml && (
            !videoExpanded ? (
              <button
                onClick={() => setVideoExpanded(true)}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-surface-elevated border border-border/60 hover:border-primary/50 transition-all duration-base group text-left"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-base flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">演示视频</div>
                  <div className="text-xs text-text-tertiary">点击播放项目演示</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-tertiary group-hover:text-primary transition-colors">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
            ) : (
              <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
                <div
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: detail.videoHtml }}
                />
              </div>
            )
          )}

          {/* 项目介绍 */}
          {detail.intro && (
            <section>
              <h3 className="text-sm tracking-[0.2em] uppercase text-text-tertiary mb-3">项目介绍</h3>
              <p className="text-base text-text-secondary leading-relaxed">{detail.intro}</p>
              {work.problem && (
                <p className="text-sm text-text-tertiary italic mt-3 flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>{work.problem}</span>
                </p>
              )}
            </section>
          )}

          {/* 技术栈 */}
          {detail.techStack && detail.techStack.length > 0 && (
            <section>
              <h3 className="text-sm tracking-[0.2em] uppercase text-text-tertiary mb-3">技术栈</h3>
              <div className="p-4 rounded-lg bg-surface-elevated border border-border/40">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {detail.techStack.map((tech) => tech.desc ? `${tech.name}（${tech.desc}）` : tech.name).join(' + ')}
                </p>
              </div>
            </section>
          )}

          {/* GitHub 链接 */}
          {detail.github && (
            <section>
              <a
                href={detail.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-base text-sm font-medium group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub 仓库链接：</span>
                <span className="text-text-secondary group-hover:text-primary transition-colors duration-base">{detail.github}</span>
              </a>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
