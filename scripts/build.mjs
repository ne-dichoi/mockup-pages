import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = 'mockups';
const OUT = '_site';

const entries = await readdir(SRC, { withFileTypes: true });
const mockups = [];

for (const entry of entries.filter((e) => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
  const html = await readFile(join(SRC, entry.name, 'index.html'), 'utf8').catch(() => null);
  if (html === null) {
    console.warn(`skip: ${entry.name}/index.html 없음`);
    continue;
  }
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim() || entry.name;
  const entryFile = (await readFile(join(SRC, entry.name, '.entry'), 'utf8').catch(() => null))?.trim() || null;
  mockups.push({ dir: entry.name, title, entryFile });
}

const escape = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const index = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>목업 페이지</title>
<style>
  body { font-family: -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif; margin: 0; background: #f7f7f8; color: #1a1a1a; }
  main { max-width: 720px; margin: 0 auto; padding: 48px 20px; }
  h1 { font-size: 24px; margin: 0 0 4px; }
  p.sub { color: #6b6b70; margin: 0 0 28px; font-size: 14px; }
  ul { list-style: none; padding: 0; margin: 0; }
  li + li { margin-top: 8px; }
  a { display: block; padding: 16px 18px; background: #fff; border: 1px solid #e4e4e7; border-radius: 8px; text-decoration: none; color: inherit; }
  a:hover { border-color: #a1a1aa; }
  .title { font-weight: 600; font-size: 15px; }
  .path { color: #8a8a90; font-size: 13px; margin-top: 2px; font-family: ui-monospace, monospace; }
  .empty { color: #8a8a90; font-size: 14px; }
</style>
</head>
<body>
<main>
  <h1>목업 페이지</h1>
  <p class="sub">서비스운영팀 · 총 ${mockups.length}건</p>
  ${
    mockups.length
      ? `<ul>
${mockups.map((m) => `    <li><a href="./mockups/${m.dir}/${m.entryFile ?? ''}"><div class="title">${escape(m.title)}</div><div class="path">mockups/${m.dir}</div></a></li>`).join('\n')}
  </ul>`
      : '<p class="empty">아직 등록된 목업이 없습니다. mockups/ 아래에 폴더를 만들고 index.html을 넣어주세요.</p>'
  }
</main>
</body>
</html>
`;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp(SRC, join(OUT, SRC), { recursive: true });
await writeFile(join(OUT, 'index.html'), index);
await writeFile(join(OUT, '.nojekyll'), '');

console.log(`built ${mockups.length} mockup(s) -> ${OUT}/`);
