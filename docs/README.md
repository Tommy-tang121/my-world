# 汤思远个人网站

个人作品集网站，5 页（首页/作品/AI工具/关于/Now）+ 首页底部联系区。

## 技术栈

- **框架**：Next.js 14.2.35（App Router，静态导出）
- **语言**：JavaScript（.jsx，不用 TypeScript）
- **样式**：Tailwind CSS 3.4.7
- **背景动画**：SoftAurora（原生 WebGL，零依赖）
- **点击动画**：ClickSpark（Canvas 2D，零依赖）
- **启动脚本**：start.bat（Windows）
- **CI/CD**：GitHub Actions → GitHub Pages（自动部署）

## 目录结构

```
e:\My world\
├── app/                      # 页面
│   ├── layout.jsx            # 根布局（背景 + 点击火花 + 导航）
│   ├── page.jsx              # 首页
│   ├── works/page.jsx        # 作品页
│   ├── ai-tools/page.jsx     # AI 工具页
│   ├── about/page.jsx        # 关于页
│   ├── now/page.jsx          # Now 页
│   └── globals.css           # 全局样式 + CSS 变量
├── components/               # 组件
│   ├── SoftAurora.jsx        # 背景极光动画（WebGL）
│   ├── ClickSpark.jsx        # 点击火花动画（Canvas）
│   ├── Navbar.jsx            # 右上角导航
│   ├── HeroSection.jsx       # 首页头像+名字区
│   ├── PageHeader.jsx        # 页面标题三段式
│   ├── EntryCard.jsx         # 首页入口卡片（含鼠标光晕）
│   ├── WorkCard.jsx          # 作品卡片
│   ├── WorkDetail.jsx        # 作品详情浮层（翻页动画）
│   ├── ToolCard.jsx          # AI 工具卡片
│   ├── CTAButton.jsx         # 按钮三变体
│   └── icons.jsx             # SVG 图标库
├── data/                     # 内容数据（非程序员改这里）
│   ├── home.js               # 首页：名字、标签、副标题、4个入口
│   ├── contacts.js           # 联系方式：微信、电话、邮箱
│   ├── works.js              # 4个作品数据（含视频、技术栈、GitHub）
│   ├── ai-tools.js           # AI 工具列表（Model/Agent/Video 三分类）
│   ├── about.js              # 关于页：自我介绍 + 工作经历
│   └── now.js                # Now 页：正在忙 + 在思考
├── hooks/
│   └── useMouseGlow.js       # 鼠标光晕 Hook
├── public/
│   ├── avatar.jpg            # 首页头像（HeroSection）
│   └── videos/               # 演示视频（mp4）
│       ├── chishane.mp4      # 吃啥呢小程序
│       └── ai-daily.mp4      # AI Daily
├── .github/workflows/
│   └── deploy.yml            # GitHub Actions 自动部署到 Pages
├── design/
│   └── ui-components.html    # UI 设计文档（36 个 section）
├── docs/
│   ├── README.md             # 本文件
│   └── superpowers/          # 历史规划文档（已过时，仅供参考）
├── start.bat                 # 启动脚本（双击运行）
├── AGENTS.md                 # 项目规则
├── tailwind.config.js        # 设计 tokens
├── next.config.js
└── package.json
```

## 已实现功能

- ✅ 首页：真实头像+名字+副标题+4入口卡片+底部联系区（一屏不滚动）
- ✅ 作品页：3 列错落平铺 + 详情浮层（翻页动画）+ 视频提示卡 + 底部「End」提示
- ✅ AI 工具页：左右两栏（左：AI 工具分类 grid-cols-3 + 右：技能栈胶囊），锁一屏不滚动
- ✅ 关于页：自我介绍 3 段 + 工作经历时间线（真实经历，date/company/role/duties 结构）
- ✅ Now 页：锁一屏 + flex-1 自适应分布（正在忙 + 在思考，真实内容）
- ✅ 全局背景：SoftAurora 极光动画（鼠标交互视差）
- ✅ 全局点击：ClickSpark 火花动画
- ✅ 右上角导航（所有页面统一）
- ✅ 鼠标光晕（EntryCard / ToolCard hover 边框跟随）
- ✅ 演示视频（吃啥呢、AI Daily，点击展开自动播放）
- ✅ 作品按 createdAt 倒序排列（最新在前）
- ✅ start.bat 启动脚本（清理残留进程 + 重启）
- ✅ GitHub Pages 自动部署（GitHub Actions，push 到 master 自动构建发布）

## 未实现 / 待办

- ❌ coding-pm、AI 商品分析工作流的演示视频

## 启动方式

双击 `start.bat`，浏览器访问 http://localhost:3000

## 部署

每次 push 到 `master` 分支，GitHub Actions 自动构建并部署到 GitHub Pages：
- **线上地址**：https://tommy-tang121.github.io/my-world/
- **构建配置**：`.github/workflows/deploy.yml`
- **静态导出**：`next.config.js` 中 `output: 'export'`，构建产物在 `out/` 目录

> 图片和视频路径使用 `NEXT_PUBLIC_BASE_PATH` 环境变量适配子目录（线上 `/my-world/`，本地为空）。

## 内容修改指南（非程序员）

所有文字内容都在 `data/` 文件夹下，直接用记事本打开改文字保存即可，不用动代码。

- 改联系方式 → `data/contacts.js`
- 改首页名字/标签 → `data/home.js`
- 加新作品 → `data/works.js`（加一个对象，填 `createdAt` 日期控制排序）
- 改 AI 工具列表 → `data/ai-tools.js`
- 改关于页内容 → `data/about.js`
- 改 Now 页内容 → `data/now.js`
- 加演示视频 → 放进 `public/videos/`，在 `data/works.js` 对应作品的 `videoHtml` 字段引用
- 换头像 → 覆盖 `public/avatar.jpg`（建议方形 200×200 或更大）

## 历史文档

`docs/superpowers/` 下的规划文档是项目启动时的方案，部分内容已过时（如 `src/` 目录结构、3D 轮播方案）。当前真实状态以本 README 和 `design/ui-components.html` 为准。
