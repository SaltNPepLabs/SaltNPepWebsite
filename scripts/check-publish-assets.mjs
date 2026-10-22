import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
const manifest = JSON.parse(readFileSync(new URL('../docs/PUBLISH_ASSETS.json', import.meta.url)));
const root = new URL('../', import.meta.url);
const failures = [];
for (const asset of manifest.assets) {
  for (const path of [asset.path, ...(process.argv.includes('--export') ? [asset.path.replace(/^public\//, 'out/')] : [])]) {
    const file = new URL(path, root);
    if (!existsSync(file)) { failures.push(`Missing: ${path}`); continue; }
    const hash = createHash('sha256').update(readFileSync(file)).digest('hex');
    if (hash !== asset.sha256) failures.push(`Changed since approved asset snapshot: ${path}`);
  }
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Verified ${manifest.assets.length} saved assets${process.argv.includes('--export') ? ' and their exported copies' : ''}.`);
