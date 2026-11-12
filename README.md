# Yunba Website & Docs

云巴（Yunba）官网复现 + 开发者文档中心，基于 [Astro 7](https://astro.build) + [Starlight](https://starlight.astro.build) 构建。

## 站点结构

```
/                    旧版官网首页（yunba.io 归档复现）
├── /products/push|realtime|analytics|presence/    产品介绍（消息推送 / 实时消息 / 实时统计 / 实时在线）
├── /usercases/…     用户案例（iReader / 即时通讯 / 共享单车 / 智能车位锁 / 智能门锁 / 视频直播互动）
├── /downloads/      SDK 下载（Android / iOS / JavaScript / Java Over Socket.IO / PHP / C）
├── /company/        关于我们
├── /contact/        联系我们
├── /careers/        人才招聘
├── /media-reports/  媒体报道
└── /docs/…          文档中心（Starlight，全部开发者文档）
```

官网内容复现自 Internet Archive 的 yunba.io 归档快照（2021-2024），文档链接均指向本站 `/docs/` 下的对应页面。

## 环境要求

- **Node.js ≥ 22.23.4**（Astro 7 要求）。当前使用 `~/Downloads/node-v26.0.0-darwin-arm64`，
  `package.json` 的 scripts 已自动把该目录加入 PATH，无需手动配置。
  > 建议把该目录移到稳定位置（如 `~/tools/node26`）并全局加入 PATH，避免清理 Downloads 后失效。
- 包管理器使用 pnpm（Cloudflare 构建使用 v9.10，本地 v12 亦可，`pnpm-workspace.yaml` 兼容两者）。

## 本地运行

```bash
pnpm install   # 安装依赖
pnpm dev       # 开发服务器，默认 http://localhost:4321
```

构建静态站点：

```bash
pnpm build     # 输出到 dist/（含 Pagefind 搜索索引、sitemap）
pnpm preview   # 本地预览构建结果
```

## 目录结构

```
├── astro.config.mjs            # Starlight 配置（含文档侧栏）
├── src/
│   ├── pages/                  # 官网页面（Astro）
│   ├── layouts/SiteLayout.astro
│   ├── components/site/        # 官网组件（导航/页脚/联系栏/案例卡片等）
│   ├── styles/site.css         # 官网样式（品牌色 #00A0E9）
│   ├── data/site.ts            # 案例与媒体报道数据
│   └── content/docs/docs/      # 全部开发者文档（URL 前缀 /docs/）
├── public/
│   ├── image/                  # 文档配图
│   ├── site/                   # 官网资源（复现自归档）
│   └── white_paper.pdf         # 云巴产品白皮书
├── scripts/
│   ├── migrate.mjs             # 一次性迁移脚本（旧平铺结构 → Starlight）
│   └── generate-sidebar.mjs    # 从 yunba_doc.yaml 生成文档侧栏
├── wrangler.jsonc              # Cloudflare 静态资产部署配置
├── yunba_doc.yaml              # 旧版文档导航结构定义（侧栏数据源）
└── setting/                    # 旧文档中心 CMS 配置（已不再使用）
```

## 文档约定

- 文档标题写在 frontmatter `title` 中，正文不使用 `#` 一级标题；
- 文档互链使用带前缀的绝对链接：`](/docs/slug/)`；
- 图片放在 `public/image/`，引用格式 `![描述](/image/xxx.png)`；
- 新增文档后需更新 `astro.config.mjs` 的 `sidebar`（或更新 `yunba_doc.yaml` 后运行 `pnpm sidebar` 重新生成）。

## 说明

- 归档中部分图片（内页正文截图、公司照片、微信二维码等）未被 Internet Archive 保存，相关位置已做文字降级处理；
- 官网"登录/注册"、在线视频等依赖后端的功能未复现。
