# 汤思远个人网站设计文档

**日期**：2026-07-01
**状态**：待用户审阅
**基于**：`design/ui-components.html`（UI 设计系统说明书）

---

## 1. 项目概述

基于已有的 UI 组件设计系统（`design/ui-components.html`），搭建汤思远的个人作品集网站。

**核心目标**：
- 还原原型的视觉风格与标志性交互
- 5 个页面（首页/作品/AI工具/关于/Now）+ 首页底部联系区，占位内容，用户后续通过数据文件替换真实信息
- 全静态，可一键部署到 Vercel

**非目标（YAGNI）**：
- 不做后端、不做 CMS、不做动态内容管理
- 不做暗/亮主题切换（保持暗色）
- 不做联系表单真实发送邮件
- 不专门优化移动端（PC 优先，移动端最小适配）

---

## 2. 技术栈

| 项 | 选择 | 理由 |
|---|---|---|
| 框架 | Next.js（App Router） | 用户熟悉；组件化便于复用；部署简单 |
| 样式 | Tailwind CSS | 原型就在用 Tailwind，迁移最自然 |
| 语言 | JavaScript（.jsx） | 用户要求不用 TS；项目规模小，JS 足够 |
| 部署 | Vercel | 免费、Next.js 原生支持 |

**3D 轮播实现**：用 CSS `transform: rotateY + translateZ` + `requestAnimationFrame` + lerp 缓动，不引入 Three.js 等重库。

---

## 3. 通用结构（所有页面共用）

### 3.1 顶部导航栏
- 固定在顶部，滚动不消失
- 半透明毛玻璃效果（`rgba(10,10,10,0.6)` + `backdrop-blur`）
- 左边：站名"汤思远"
- 右边：5 个页签 —— **首页 / 作品 / AI工具 / 关于 / Now**
- 当前页签高亮（`#999999`），默认 `#666666`，hover `#F0F0F0`
- 过渡：`color 250ms ease`

### 3.2 主内容区
- 最大宽度 1700px，左右各 2rem padding
- 内容宽度分两种：
  - 阅读型（关于、Now）：`max-w-2xl`（672px）居中
  - 展示型（作品、AI工具）：`max-w-[1400px]`

### 3.3 页面标题统一格式
```
[小标签 PROJECTS]   ← text-xs tracking-[0.2em] uppercase 灰
我的作品             ← 2xl/700 紧字距
我开发过的项目        ← lg 灰
———                 ← 64px 宽红色渐变细线
```

### 3.4 视觉风格（全站统一）
- 背景：`#0A0A0A`
- 主色：`#E63946`（light `#FF6B6B` / dark `#C1121F`）
- 文字三层次：`#F0F0F0` / `#999999` / `#666666`
- 字体：Inter + Noto Sans SC（正文）、JetBrains Mono（代码/标签）
- 圆角：卡片 16px、按钮 9999px（胶囊）
- 语义色：success `#22C55E` / warning `#F59E0B` / error `#EF4444` / info `#3B82F6`

### 3.5 交互统一规则
- 卡片 hover：边框变 `rgba(230,57,70,0.3)` + 淡红光晕
- **鼠标光晕**（标志性交互①）：部分卡片用 `::before` 伪元素 + `radial-gradient` 跟随 `--mouse-x/--mouse-y`，`mask-composite: exclude`，`opacity 0→1`
- CTA 主按钮 hover：`bg #C1121F` + `box-shadow 0 0 24px rgba(230,57,70,0.25)`
- 所有过渡 250-300ms ease

### 3.6 响应式
- PC 优先
- 断点：sm 640px / md 768px / lg 1024px / 自定义 1400px、1700px
- 移动端最小适配（卡片多列变单列），不专门优化

---

## 4. 页面设计

### 4.1 首页（Home） `/`

**结构（从上到下）**：

#### ① Hero 区
- 背景：顶部红色极光晕（`radial-gradient(ellipse 80% 50% at 50% -20%, rgba(230,57,70,0.15), transparent)`）
- 左侧文字：
  - 小标签："PRODUCT MANAGER & AI EXPLORER"
  - 大标题："汤思远"（渐变文字：`linear-gradient(to right, #F0F0F0, #999999)`）
  - 副标题："用 AI 重新定义个人效率的产品经理"
  - 两个 CTA：`[探索我的作品]`（主按钮）`[了解我的经历]`（描边按钮）
- 右侧：120×120 头像框，`rounded-2xl`，红色光晕（`box-shadow: 0 0 40px rgba(230,57,70,0.1)`），占位用人物图标

#### ② 入口卡片区（2×2 网格）
4 张入口卡片，每张：
- 红色 SVG 图标
- 标题 + 一句话描述
- **鼠标光晕效果**（标志性交互）
- 移动端单列

4 张卡片：
1. 我的作品 → `/works`
2. AI工具心得 → `/ai-tools`
3. 关于我 → `/about`
4. 联系方式 → 锚点跳转到首页底部联系区（`#contact`）

#### ③ 引用块
- 左边红色竖线（`border-left: 2px solid rgba(230,57,70,0.5)`）
- 灰色斜体文字
- 占位：原型里现成的 AI 价值观段落

#### ④ 底部联系区（替代联系页，`id="contact"`）
- 小标题："Let's connect"
- 副标题："想聊聊？随时找我"
- 联系卡片网格（复用原型 Contact Card 组件）：
  - 48×48 图标盒（红图标）+ 标签 + 具体信息
  - hover：边框变红
  - 占位：微信 `Siyuan_Tang` / 邮箱 `siyuan@example.com`
- 底部 CTA：`[查看我的作品 →]`（描边箭头按钮）

**数据文件**：
- `src/data/home.js` —— Hero 文案、引用块文字、入口卡片配置
- `src/data/contacts.js` —— 联系卡片列表（可增删，如加 GitHub/Twitter）

---

### 4.2 作品页（Works） `/works`

**结构**：

#### ① 页面标题
- 标签：PROJECTS
- 标题：我的作品
- 副标题：我开发过的项目

#### ② 3D 画廊轮播（标志性交互②）
- 卡片排成 3D 环形队列，中间正对屏幕最大，两侧倾斜后退变小变暗
- CSS `transform: rotateY + translateZ` 实现
- `requestAnimationFrame` + lerp（0.1）缓动
- 4 种操作方式：
  - 鼠标拖拽（mousedown/mousemove/mouseup）
  - 鼠标滚轮（wheel，preventDefault）
  - 触屏滑动（touchstart/touchmove/touchend）
  - 点底部圆点（click，snap 到对应索引）

#### ③ 单张作品卡片（380×480px）
- 卡片：`bg #111111`，`border 1px solid rgba(42,42,42,0.6)`，`rounded-2xl`
- 顶部图区：200px 高，`linear-gradient(135deg, #1A1A1A, #111111)` + 网格纹理 + 占位图标
- 正文区（padding 1.5rem）：
  - 作品名（xl/600 白）
  - 一句话描述（sm 灰）
  - 解决什么问题（sm 灰斜体，前面带 →）
  - 技术标签（胶囊形：`bg #1A1A1A` + 灰字 + 边框）
  - 底部分隔线 + 两个红色链接：GitHub / Demo
- **链接字段留空则不显示对应按钮**（避免空链/死链）

#### ④ 底部圆点导航
- 默认：`bg rgba(42,42,42,0.6)`
- 当前：`bg #E63946` + `scale(1.3)`
- 过渡：300ms ease

**占位内容**：4 个占位作品（用原型"AI学习整理器"格式做模板，名字先用"作品一/二/三/四"）

**可扩展性**：
- 加作品 → 在 `src/data/works.js` 列表追加一项即可
- 3D 轮播自动适配任意数量
- 卡片间距/角度根据数量自动调整

**数据文件**：`src/data/works.js`
```js
[
  {
    title, description, problem, // 可选
    tags: [],
    github, demo,               // 可选，留空不显示
    image                        // 可选
  }
]
```

---

### 4.3 AI 工具页（AI Tools） `/ai-tools`

**结构**：

#### ① 页面标题
- 标签：AI TOOLS
- 标题：AI 工具心得
- 副标题：我收藏和使用的 AI 工具

#### ② 按类别分组展示
**3 个固定分类**：
1. **Model** —— 模型类工具
2. **Agent** —— Agent 类工具
3. **Video** —— 视频类工具

每个分类：
- 分类标题：左边红色渐变小竖条（`w-1 h-6 rounded-full bg-gradient-to-b from #E63946 to #C1121F`）+ 分类名
- 下方工具卡片网格（`md:grid-cols-3`）

#### ③ 单张工具卡片
- `bg rgba(17,17,17,0.8)` + `backdrop-blur` + `rounded-2xl` + 边框
- 内容：工具名 + 一句话心得（灰斜体）
- hover：边框变红 + 淡红光晕
- **链接可选**：数据文件填了链接则整卡可点跳转官网，没填则纯展示

**占位内容**：3 个分类各放 2-3 个占位工具（含原型里的 ChatGPT/Claude/Dify），心得先用占位文字。

**可扩展性**：
- 分类数量随意增减
- 每个分类下工具数量随意
- 心得字段可留空

**数据文件**：`src/data/aiTools.js`
```js
[
  {
    category: "Model",
    tools: [
      { name, testimonial, link }  // testimonial/link 可选
    ]
  }
]
```

---

### 4.4 关于页（About） `/about`

**结构**（阅读型，窄栏居中）：

#### ① 页面标题
- 标签：WHO AM I
- 标题：关于我
- 副标题：一些关于我的故事

#### ② 自我介绍段
两三段文字，介绍背景、在做什么、想做什么。占位用原型现成文字。

#### ③ 工作经历时间线
- 纵向时间轴，左边灰色竖线（`w-px bg #2A2A2A`）
- 每个节点：红色小圆点（`w-2 h-2 rounded-full bg #E63946`）
- 日期列：`w-32 shrink-0 text-sm text #666666`
- 经历：`text-base text #F0F0F0 font-medium`
- 占位：原型现成 3 条

#### ④ 底部 CTA
`[查看我的作品 →]`（描边箭头按钮）

**无引用块**（已去掉）

**数据文件**：`src/data/about.js`
```js
{
  intro: "...",        // 自我介绍（可多段）
  timeline: [
    { date, content }
  ]
}
```

---

### 4.5 Now 页（Now） `/now`

**结构**（阅读型，窄栏居中）：

#### ① 页面标题
- 标签：NOW
- 标题：最近在做
- 副标题：此刻我正在忙什么

#### ② 最近更新时间
`最后更新：2026-07-01`（灰色小字）

#### ③ 正在忙的事（纯文字列表，无进度条）
```
· 学习 LangChain 开发
· 搭建个人网站
· 阅读《AI 产品经理》
```
每条前面红色小圆点（`w-1.5 h-1.5 rounded-full bg #E63946`），灰色文字。

#### ④ 当前关注 / 在思考的（可选块）
同上格式。可留空。

**数据文件**：`src/data/now.js`
```js
{
  lastUpdated: "2026-07-01",
  doing: ["...", "..."],
  thinking: ["...", "..."]  // 可选
}
```

**更新方式**：改数据文件后需重新部署一次 Vercel（静态站点）。若未来要"改了立即生效不部署"，需引入后端，当前不做。

---

## 5. 数据文件汇总

| 文件 | 用途 | 涉及页面 |
|---|---|---|
| `src/data/home.js` | Hero 文案、引用块、入口卡片 | 首页 |
| `src/data/contacts.js` | 联系卡片列表 | 首页底部 |
| `src/data/works.js` | 作品列表 | 作品页 |
| `src/data/aiTools.js` | AI 工具分类与列表 | AI 工具页 |
| `src/data/about.js` | 自我介绍 + 工作经历时间线 | 关于页 |
| `src/data/now.js` | Now 页全部内容 | Now 页 |

**用户更新内容的统一流程**：改对应数据文件 → 保存 → 重新部署 Vercel。

---

## 6. 组件清单（从原型迁移）

需实现的 React 组件：

| 组件 | 用在哪 |
|---|---|
| Navbar | 全站 |
| PageHeader | 作品/AI工具/关于/Now |
| HeroSection | 首页 |
| EntryCard（含 BorderGlow） | 首页入口卡片 |
| CTAButton（primary/outline/outline-arrow） | 多页 |
| Blockquote | 首页 |
| ContactCard | 首页底部 |
| Gallery3D（3D 轮播容器） | 作品页 |
| WorkCard | 作品页（3D 轮播内） |
| CarouselDots | 作品页 |
| CategoryHeader | AI 工具页 |
| ToolCard | AI 工具页 |
| Timeline | 关于页 |
| SectionDivider | 全站 |

**BorderGlow 交互**：可做成高阶组件或 Hook（`useMouseGlow`），供 EntryCard / ToolCard 等复用。

---

## 7. 占位内容说明

所有占位内容优先用原型 `design/ui-components.html` 里现成的文字：
- 名字：汤思远
- 头衔：Product Manager & AI Explorer / 用 AI 重新定义个人效率的产品经理
- 引用块：原型里的 AI 价值观段落
- 联系方式：微信 `Siyuan_Tang` / 邮箱 `siyuan@example.com`
- 时间线：原型现成 3 条
- 作品/AI 工具：用原型格式做模板，名字用"作品一/二/三/四"等通用占位

用户后续逐个替换为真实信息。

---

## 8. 部署

- 平台：Vercel
- 方式：连接 Git 仓库，push 自动部署
- 域名：先用 Vercel 默认子域名，后续可绑自定义域名

---

## 9. 范围边界（明确不做）

- ❌ 联系表单真实发送邮件（联系页已改为首页底部展示型）
- ❌ 后端 / 数据库 / CMS
- ❌ 暗/亮主题切换
- ❌ 国际化（i18n）
- ❌ 移动端专门优化
- ❌ SEO 深度优化（基础 meta 标签即可）
- ❌ 评论 / 分析 / 后台统计
