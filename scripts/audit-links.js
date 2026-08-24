const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const target = path.join(dir, entry.name);
  if (entry.isDirectory()) {
    return entry.name === 'node_modules' ? [] : walk(target);
  }
  return entry.name.endsWith('.html') ? [target] : [];
});

const files = walk(root);
const broken = [];
const placeholders = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const url = match[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(url)) {
      if (url === '#') placeholders.push([path.relative(root, file), url]);
      continue;
    }
    if (url.startsWith('javascript:')) {
      placeholders.push([path.relative(root, file), url]);
      continue;
    }

    const clean = url.split('#')[0].split('?')[0];
    if (!clean) continue;

    const resolved = path.resolve(path.dirname(file), clean);
    if (!fs.existsSync(resolved)) {
      broken.push([path.relative(root, file), url, path.relative(root, resolved)]);
    }
  }
}

console.log(`html files: ${files.length}`);
console.log(`broken links/assets: ${broken.length}`);
for (const item of broken.slice(0, 120)) console.log(item.join(' -> '));
console.log(`placeholder hrefs: ${placeholders.length}`);
for (const item of placeholders.slice(0, 120)) console.log(item.join(' -> '));

process.exit(broken.length || placeholders.length ? 1 : 0);
