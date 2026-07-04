const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const works = [
  {
    title: '吃啥呢-AI智能饮食推荐微信小程序',
    intro: '一款以个人忌口为底线、以当下场景为起点的智能烹饪助手。核心价值是帮助用户快速决定吃什么，并有条不紊地做出来。',
    problem: '针对用户每天"不知道吃什么"及个人忌口难以兼顾的问题，设计并实现基于 AI 的智能饮食推荐小程序。',
    tags: ['微信小程序', '云开发', 'JSON数据库'],
    github: 'https://github.com/Tommy-tang121/chishane',
    demo: '',
    createdAt: '2024-06-15', // 最旧
    detail: {
      videoHtml: `<video src="${basePath}/videos/chishane.mp4" controls playsinline autoplay style="width:100%;height:100%;object-fit:contain" />`,
      intro: '一款以个人忌口为底线、以当下场景为起点的智能烹饪助手。核心价值是帮助用户快速决定吃什么，并有条不紊地做出来。',
      techStack: [
        { name: '微信小程序原生框架', desc: '前端' },
        { name: '微信云开发', desc: '云函数 + 云数据库 + 云存储' },
        { name: 'JSON 文档型数据库', desc: '类 MongoDB' },
      ],
      github: 'https://github.com/Tommy-tang121/chishane',
    },
  },
  {
    title: 'AI Daily',
    intro: 'AI 热点日报自动发布系统，针对 AI 行业资讯收集、整理及公众号发布流程繁琐的问题，设计并实现一套本地自动化内容生产工作流。HooK实现Windows 计划任务 + 弹窗通知闭环每日流程。',
    problem: '减少重复性工作，提升公众号发布效率。',
    tags: ['Python Flask', 'TypeScript', '微信API', 'Agnes API'],
    github: 'https://github.com/Tommy-tang121/ai-daily-wechat-publisher',
    demo: '',
    createdAt: '2026-07-01', // 最新
    detail: {
      videoHtml: `<video src="${basePath}/videos/ai-daily.mp4" controls playsinline autoplay style="width:100%;height:100%;object-fit:contain" />`,
      intro: 'AI 热点日报自动发布系统，针对 AI 行业资讯收集、整理及公众号发布流程繁琐的问题，设计并实现一套本地自动化内容生产工作流。HooK实现Windows 计划任务 + 弹窗通知闭环每日流程。',
      techStack: [
        { name: 'Python Flask', desc: '后端框架' },
        { name: 'TypeScript (bun)', desc: '运行时' },
        { name: '微信API', desc: '公众号发布' },
        { name: 'Agnes API', desc: 'AI 服务' },
      ],
      github: 'https://github.com/Tommy-tang121/ai-daily-wechat-publisher',
    },
  },
  {
    title: 'coding-pm',
    intro: 'AI 项目生命周期管理skill，针对 AI 辅助开发过程中项目管理流程分散的问题，封装一套覆盖项目全生命周期的标准化工作流，提高开发效率和交付一致性。覆盖项目从开始到结束的四个关键阶段：开工→同步→审计验收→收尾。',
    problem: '提高开发效率和交付一致性。',
    tags: [],
    github: 'https://github.com/Tommy-tang121/coding-pm',
    demo: '',
    createdAt: '2026-06-01', // coding-pm
    detail: {
      videoHtml: '',
      intro: 'AI 项目生命周期管理skill，针对 AI 辅助开发过程中项目管理流程分散的问题，封装一套覆盖项目全生命周期的标准化工作流，提高开发效率和交付一致性。覆盖项目从开始到结束的四个关键阶段：开工→同步→审计验收→收尾。',
      techStack: [],
      github: 'https://github.com/Tommy-tang121/coding-pm',
    },
  },
  {
    title: 'AI 商品分析工作流',
    intro: '基于Coze 搭建商品分析工作流。实现：自动分析商品信息、自动生成产品卖点、自动生成图片描述。',
    problem: '提升商品内容生产效率',
    tags: [],
    github: '',
    demo: '',
    createdAt: '2024-03-01', // AI 商品分析（最旧）
    detail: {
      videoHtml: '',
      intro: '基于Coze 搭建商品分析工作流。实现：自动分析商品信息、自动生成产品卖点、自动生成图片描述。',
      techStack: [],
      github: '',
    },
  },
]
