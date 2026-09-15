# Cardinal Volta — 官网设计初稿

React + Vite 单页品牌官网。暖白、炭黑、深红配色，以 “Waste heat. New power.” 为核心表达。

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

构建会把首页预渲染为 HTML，标题、文案、团队信息直接存在于静态文件中。React 加载后接管菜单、技术步骤和行业展开交互。`src/entry-server.jsx` 仅在构建时运行，线上不需要 Node 服务、数据库或 API。

以后部署到 Cloudflare Pages 时，构建命令为 `npm run build`，输出目录为 `dist`。本次仅制作本地初稿，尚未部署或修改域名。

## 页面内容

- 品牌首屏与原创热流雕塑视觉
- 现有官网列出的合作机构
- 工业余热机会与系统功率范围
- 可切换的 ORC 原理说明（支持键盘左右方向键、Home、End）
- 可展开的行业应用说明
- 两位创始人介绍
- 邮件联系入口

## 修改位置

| 文件                    | 用途                                         |
| ----------------------- | -------------------------------------------- |
| `src/App.jsx`           | 页面结构、文案、联系方式、技术步骤、行业列表 |
| `src/styles.css`        | 配色、排版、响应式、动效                     |
| `public/assets/`        | 本地图片、团队照、合作机构 Logo              |
| `index.html`            | 页面标题、描述、语言、favicon                |
| `scripts/prerender.mjs` | 构建时生成首页静态 HTML                      |

代码格式化：`npm run format`；检查：`npm run format:check`。

## 内容与素材说明

- 公司事实来自用户提供的 [原官网](https://www.cardinalvolta.com/)，包括 ORC 方向、100 kW–10 MW 范围、团队姓名与职务、合作机构、邮箱与地址。文案经过品牌表达重写。
- 孵化器名称尚未确认，因此没有加入新孵化器公告或 Logo，也没有新增融资、客户案例、效率或回报率数字。
- 首屏雕塑是本项目生成的概念性品牌图，不代表真实产品照片。使用 WebP 压缩后约 190 KB。
- 顶部文字标识和 favicon 是初稿中的排版探索，原 Logo 保留在 `public/assets/logo.png`，便于后续选择。
- 团队照、行业图与机构 Logo 沿用现有官网。原始素材地址见 `ASSETS.md`。
- 字体使用本地打包的 Manrope、IBM Plex Mono，不请求第三方字体服务。
- 联系按钮打开访客的邮件客户端，没有假表单、数据库、分析追踪或 Cookie 依赖。

## 交互与适配

包含移动端菜单、Escape 关闭与焦点返回、页内锚点、语义化标题、图片替代文本、键盘焦点样式，以及 `prefers-reduced-motion` 支持。

后续发布前应由公司确认品牌文案、合作机构展示和产品功率范围是否仍适用。
