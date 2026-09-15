# Cardinal Volta — 品牌官网

React + Vite 静态官网，落实已确认的 `design-concepts/cardinal-layout` 排版。冷白、石墨黑、品牌红、深酒红与浅杏色；统一 Geist 字体。主标题为 “More power. From waste heat.”。

## 本地运行

需要 Node.js 22.12+（已在 Node.js 24 环境验证）。

```bash
npm install
npm run dev
```

打开 http://127.0.0.1:5173/ 。Windows PowerShell 如果阻止 `npm.ps1`，使用 `npm.cmd install`、`npm.cmd run dev`。

## 构建与部署

```bash
npm run build
npm run preview
```

生产预览：http://127.0.0.1:4173/ 。部署时只需上传 `dist/`。

构建会把首页预渲染为 HTML，标题、文案、团队信息直接存在于静态文件中。导航采用原生页内锚点；主要内容无需等待 JavaScript 加载。`src/entry-server.jsx` 仅在构建时运行，线上不需要 Node 服务、数据库或 API。

### Cloudflare 构建设置

Cloudflare Pages：构建命令 `npm run build`，输出目录 `dist`。项目根目录应指向包含 `package.json` 的目录。

Cloudflare Workers：构建命令仍为 `npm run build`；静态资源目录应指向 `dist`。保留现有 Worker 的名称和部署命令。

预渲染脚本通过 Vite JavaScript API 单独构建 Node 入口，并设置 `configFile: false`，避免 Cloudflare 自动加入的部署插件改变临时构建或将部署目标改为 `.prerender`。`.prerender` 只用于生成 HTML，不是部署目录。

若遇到 `Cannot find module .../.prerender/entry-server.js`，先确认已提交本次更新的 `package.json` 和 `scripts/prerender.mjs`，并让 Cloudflare 从该提交重新构建。

## 页面内容

- 首页：品牌首屏、技术概述、行业应用、创始人、最新三条新闻、联系入口。
- /news/：带主图的最新新闻，以及带缩略图的历史列表。
- /news/<slug>/：独立文章，包含日期、类别、标题、摘要、主图、正文目录、相关阅读与返回入口。

News 指向独立列表，其余主导航指向首页章节。文章标题和缩略图均可点击，详情支持直接打开和刷新。

## 修改位置

| 文件                  | 用途                                   |
| --------------------- | -------------------------------------- |
| src/App.jsx           | 首页与页面选择                         |
| src/SiteLayout.jsx    | 共用导航和页尾                         |
| src/News.jsx          | 首页新闻摘要、News 列表                |
| src/NewsArticle.jsx   | 新闻详情布局                           |
| src/content.js        | 新闻、缩略图、正文与示例标记           |
| src/pages.js          | 静态页面路径与标题                     |
| src/styles.css        | 配色、排版与响应式                     |
| scripts/prerender.mjs | 隔离的预渲染构建，保留 Cloudflare 修复 |

代码格式化：npm run format；检查：npm run format:check。

## 示例新闻与详情页

用户已授权使用占位新闻与复用素材。当前三条新闻、日期与正文均为示例，列表及详情页有 Sample article 标记。示例详情页带 noindex；录入真实内容后设置 sample: false。

每条新闻包含 slug、title、date、displayDate、category、sample、summary、image、sections。url 由 slug 生成，路径为 /news/<slug>/。image 的 src / thumbnail / alt / position / caption 控制主图与缩略图；sections 中的 id / title / paragraphs 组成正文与页内目录。

新闻按新到旧排列；首页最多展示三条，独立列表突出第一条，其余依次排列。清空 newsItems 后列表与首页恢复空状态。正文为普通文本，由 React 转义，不注入原始 HTML。

构建预渲染首页、新闻列表及三篇详情，不需要后台。修改新闻后重新构建即可。真实新闻到位后保留或有意修改 slug，替换正文、日期与图片说明。

## 素材

首页使用工厂视频首屏与连续的技术、行业叙事。示例新闻复用化工设施、模拟电压表与纸业图片；图注说明其为语境图片，不代表设备或客户项目。原始素材和历史设计稿保留。孵化器正式信息仍待补。

当前未部署。预览时使用 npm run preview，发布时上传整个 dist。

## 首页视频

factory.mp4 作为首屏全幅背景，播放 38–50 秒片段，导航、主标题和技术入口直接叠放在影像上。底部渐变延续到深酒红技术区。pipe.mp4 与原理步骤同屏排版，暂作工业语境影像；不代表 Cardinal Volta 的实拍设备。未来用真实装置或机制动画替换此位置。行业列表接在同一个深色章节中。

两个原文件均保持不变，本轮只做本地效果，未部署。AmbientVideo.jsx 提供静音播放、封面、播放 / 暂停按钮、离屏和标签隐藏暂停；手动暂停在滚动后仍保留。减少动态效果偏好默认显示封面，允许主动播放。首屏封面优先加载，技术视频接近视口才挂载源地址。循环通过开场封面淡化衔接。

usePageMotion.js 为进入视口的内容提供一次性淡入；减少动态效果时关闭。CSS 增强支持的浏览器中的首屏滚动位移；不支持时保留静态构图。未增加动画或播放器依赖。

## Expanded homepage chapters

The homepage now combines the factory hero, a scroll-led waste-heat statement, the pipe/ORC section, three overlapping perspective cards, four image-linked industry drawers, founders, a partner field, an editorial news layout and a contact invitation.

HomeSections.jsx contains the added chapters; home-sections.css contains their responsive layouts. home-content.js holds industry copy and image selection, perspective cards and seven partner slots. The first four slots use the supplied Foresight, MaRS, University of Toronto Entrepreneurship and Nett marks; three null entries render intentionally blank, without fake names or links. Replace those null entries with { name, src } when the remaining assets arrive, or remove one for a six-partner layout.

The perspective cards explain the approach, without claims of proprietary advantages, measured efficiency, commercial deployment or cost savings. Existing sample news labels remain until real articles are supplied. Industry pictures show context and materials, not Cardinal Volta customer projects. All four industry drawers support buttons, keyboard activation, aria-expanded, labelled panels and inert collapsed content. Images change with the selected industry and remain on the last selection when its drawer closes.

Motion includes scroll-linked text/line progress, native sticky card layering, image reveals, drawer expansion and editorial image hover. No animation dependency is added. Reduced-motion preferences disable those transitions and sticky stacking; plain server-rendered content stays readable.

On phones, each industry image moves inside its own drawer so it stays next to the explanation. Short landscape viewports use normal card flow to keep all text accessible.
