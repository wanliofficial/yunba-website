/**
 * 从根目录 yunba_doc.yaml 的导航定义生成 astro.config.mjs（含完整 sidebar）。
 * 文档位于 src/content/docs/docs/，URL 前缀为 /docs/。
 * yaml 中未收录的孤儿文档（以及迁移后的 readme）统一放进「其他」分组。
 * 依赖 migrate.mjs 先运行（读取 tmp/titles.json 中的 slug→title 映射）。
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';

const root = fileURLToPath(new URL('..', import.meta.url));
const titlesPath = root + 'tmp/titles.json';
if (!existsSync(titlesPath)) {
	console.error('请先运行 pnpm migrate 生成 tmp/titles.json');
	process.exit(1);
}
const titles = JSON.parse(readFileSync(titlesPath, 'utf8'));
const nav = load(readFileSync(root + 'yunba_doc.yaml', 'utf8'));

/** 文档集合中的路径前缀（src/content/docs/docs/） */
const P = 'docs/';
const sidebar = [];
const referenced = new Set();

// 文档中心首页（src/content/docs/docs/index.md → slug "docs"）
sidebar.push({ label: '文档中心', slug: 'docs' });
referenced.add('index');

for (const group of nav) {
	const items = [];
	for (const doc of group.docs ?? []) {
		const slug = doc.markdown.replace(/\.md$/, '');
		referenced.add(slug);
		items.push({ label: doc.name, slug: P + slug });
	}
	if (items.length > 0) {
		sidebar.push({ label: group.name, items });
	} else if (group.markdown) {
		// 顶层单页条目（无 docs 子列表）
		const slug = group.markdown.replace(/\.md$/, '');
		referenced.add(slug);
		sidebar.push({ label: group.name, slug: P + slug });
	}
}

// 孤儿文档：迁移了但 yaml 未收录
const orphans = Object.keys(titles).filter((slug) => !referenced.has(slug) && slug !== 'readme' && slug !== 'index');
const extras = orphans.map((slug) => ({ label: titles[slug], slug: P + slug }));
if (titles['readme']) {
	extras.push({ label: '文档仓库说明', slug: P + 'readme' });
}
if (extras.length > 0) {
	sidebar.push({ label: '其他', items: extras });
}

// 返回官网首页
sidebar.push({ label: '← 返回云巴官网', link: '/' });

const config = `// 由 scripts/generate-sidebar.mjs 根据根目录 yunba_doc.yaml 生成，勿手改；
// 导航结构变化时运行 pnpm sidebar 重新生成。
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const sidebar = ${JSON.stringify(sidebar, null, '\t')};

export default defineConfig({
	site: 'https://yunba.github.io',
	integrations: [
		starlight({
			title: '云巴 Yunba 文档',
			description: '云巴（Yunba）跨平台双向实时通信系统开发者文档',
			locales: {
				// root locale：文档平铺在 src/content/docs/ 根目录，URL 不带语言前缀，UI 为简体中文
				root: { label: '简体中文', lang: 'zh-CN' },
			},
			// 文档中的 iOS 代码块使用 objective-c，expressive-code 默认语言包不含它
			expressiveCode: {
				langs: ['objective-c'],
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/yunba/docs',
				},
			],
			sidebar,
		}),
	],
});
`;

writeFileSync(root + 'astro.config.mjs', config);
console.log(`已生成 astro.config.mjs：${sidebar.length} 个分组`);
console.log(`孤儿文档（yaml 未收录）：${orphans.length ? orphans.join(', ') : '无'}`);
