import fs from 'node:fs'; import path from 'node:path';
const root=process.cwd(); const data=JSON.parse(fs.readFileSync(path.join(root,'src/data/airports.json'),'utf8').replace(/^\uFEFF/,'')); const required=['service_name','slug','summary']; const slugs=new Set(); const issues=[];
for(const [i,row] of data.entries()){for(const key of required)if(!row[key])issues.push(`row ${i+1}: missing ${key}`);if(slugs.has(row.slug))issues.push(`duplicate slug: ${row.slug}`);slugs.add(row.slug);if(row.affiliate_url && !/^https?:\/\//.test(row.affiliate_url))issues.push(`${row.service_name}: malformed affiliate_url`)}
for(const file of ['src/layouts/Base.astro','src/pages/index.astro','src/pages/airports/index.astro','src/pages/ip-check.astro'])if(!fs.existsSync(path.join(root,file)))issues.push(`missing required page: ${file}`);
if(issues.length){console.error(issues.join('\n'));process.exit(1)}console.log(`Validation passed: ${data.length} airport records, unique slugs, required pages present.`);
