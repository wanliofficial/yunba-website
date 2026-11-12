/**
 * 一次性迁移脚本：把根目录的平铺 Markdown 文档迁移为 Starlight 内容集合。
 *
 * 处理内容：
 * 1. 移动 *.md → src/content/docs/（README.md → readme.md）
 * 2. 提取首个 H1 作为 frontmatter title，并从正文移除该行（Starlight 会渲染 title）
 * 3. 图片远程 URL（github.com/yunba/docs）→ 本地 /image/xxx
 * 4. 文档间 .md 相对互链 → /slug/ 绝对链接（按归一化文件名容错匹配）
 * 5. 白皮书 PDF 外链 → /white_paper.pdf
 * 6. image/ → public/image/，white_paper.pdf → public/white_paper.pdf
 * 7. 输出每个文件的 slug→title 映射到 tmp/titles.json，供侧栏生成脚本使用
 */
import { readFileSync, writeFileSync, mkdirSync, renameSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dump } from 'js-yaml';

const root = fileURLToPath(new URL('..', import.meta.url));
const docsDir = fileURLToPath(new URL('../src/content/docs/', import.meta.url));
const tmpDir = fileURLToPath(new URL('../tmp/', import.meta.url));
mkdirSync(docsDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

const mdFiles = readdirSync(root).filter((f) => f.endsWith('.md'));
console.log(`发现 ${mdFiles.length} 个 markdown 文件`);

// 归一化（小写 + 去下划线）→ slug 映射，用于容错匹配文档互链
const normMap = new Map();
for (const f of mdFiles) {
	const slug = f === 'README.md' ? 'readme' : f.replace(/\.md$/, '');
	normMap.set(slug.toLowerCase().replace(/_/g, ''), slug);
}

/** 把单个 title 安全序列化为一行 YAML */
function yamlTitle(title) {
	const line = dump({ title }, { lineWidth: -1 }).trim(); // "title: xxx"
	return line;
}

const titles = {};
const warnings = [];

for (const f of mdFiles) {
	const srcPath = root + f;
	const destName = f === 'README.md' ? 'readme.md' : f;
	let content = readFileSync(srcPath, 'utf8');

	// --- 2. 提取并移除首个 H1 ---
	const h1 = content.match(/^#\s+(.+?)[ \t]*$/m);
	let title;
	if (h1) {
		title = h1[1].trim();
		// 移除 H1 行本身
		content = content.slice(0, h1.index) + content.slice(h1.index + h1[0].length);
		// 移除其后遗留的首部空行
		content = content.replace(/^\s*\n/, '');
	} else {
		title = destName.replace(/\.md$/, '');
		warnings.push(`[无H1] ${f} 使用文件名作为标题`);
	}
	title = title.replace(/`/g, '');

	// --- 3. 图片远程 URL → 本地 ---
	content = content.replace(
		/https?:\/\/(?:raw\.githubusercontent\.com|github\.com)\/yunba\/docs\/(?:blob\/)?master\/image\/([^)\s"'<>]+)/g,
		(_m, path) => '/image/' + path.replace(/\?raw=true$/, ''),
	);

	// --- 4. 文档互链 .md → /slug/ ---
	content = content.replace(
		/\]\(([^)#\s]+\.md)(#[^)]*)?\)/g,
		(_m, path, anchor) => {
			const norm = path.split('/').pop().toLowerCase().replace(/\.md$/, '').replace(/_/g, '');
			const slug = normMap.get(norm);
			if (!slug) {
				warnings.push(`[坏链] ${f} → ${path}（找不到对应文件）`);
				return `](${path}${anchor ?? ''})`;
			}
			return `](/${slug}/${anchor ?? ''})`;
		},
	);

	// --- 5. 白皮书 PDF → 本地 ---
	content = content.replace(
		/https?:\/\/yunba\.github\.io\/docs\/white_paper\.pdf/g,
		'/white_paper.pdf',
	);

	// --- 1. 写入 frontmatter 并删除原文件 ---
	const out = `---\n${yamlTitle(title)}\n---\n\n${content.trim()}\n`;
	writeFileSync(docsDir + destName, out);
	rmSync(srcPath);

	const slug = destName.replace(/\.md$/, '');
	titles[slug] = title;
}

// --- 6. 静态资源 ---
mkdirSync(root + 'public', { recursive: true });
if (existsSync(root + 'image')) {
	renameSync(root + 'image', root + 'public/image');
	console.log('已移动 image/ → public/image/');
}
if (existsSync(root + 'white_paper.pdf')) {
	renameSync(root + 'white_paper.pdf', root + 'public/white_paper.pdf');
	console.log('已移动 white_paper.pdf → public/white_paper.pdf');
}

writeFileSync(tmpDir + 'titles.json', JSON.stringify(titles, null, 2));
console.log(`已迁移 ${mdFiles.length} 个文件，slug→title 映射输出到 tmp/titles.json`);

if (warnings.length) {
	console.log('\n⚠️  警告：');
	for (const w of warnings) console.log('  ' + w);
}
