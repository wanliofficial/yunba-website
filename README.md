# Yunba Documentation（Starlight 版）

云巴（Yunba）产品文档，基于 [Astro 7](https://astro.build) + [Starlight](https://starlight.astro.build) 构建。

## 环境要求

- **Node.js ≥ 22.23.4**（Astro 7 要求）。当前使用 `~/Downloads/node-v26.0.0-darwin-arm64`，
  `package.json` 的 scripts 已自动把该目录加入 PATH，无需手动配置。
  > 建议把该目录移到稳定位置（如 `~/tools/node26`）并全局加入 PATH，避免清理 Downloads 后失效。
- 包管理器使用 pnpm（其他支持 Node 26 的管理器也可）。

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
├── astro.config.mjs          # Starlight 配置（含侧栏导航）
├── src/content/docs/         # 全部文档（Markdown，带 frontmatter title，index.md 为首页）
├── public/image/             # 文档配图
├── public/white_paper.pdf    # 云巴产品白皮书
├── scripts/
│   ├── migrate.mjs           # 一次性迁移脚本（从旧平铺结构迁入 Starlight）
│   └── generate-sidebar.mjs  # 从 yunba_doc.yaml 生成 astro.config.mjs 侧栏
├── yunba_doc.yaml            # 旧版导航结构定义（侧栏数据源，保留供参考）
└── setting/                  # 旧文档中心 CMS 配置（已不再使用）
```

## 文档约定

- 文档标题写在 frontmatter `title` 中，正文不再使用 `#` 一级标题；
- 文档之间用绝对链接互链：`](/slug/)`；
- 图片放在 `public/image/`，引用格式 `![描述](/image/xxx.png)`；
- 新增页面后需把 slug 加进 `astro.config.mjs` 的 `sidebar`（若沿用 `yunba_doc.yaml` 管理，则更新 yaml 后运行 `pnpm sidebar` 重新生成配置）。
