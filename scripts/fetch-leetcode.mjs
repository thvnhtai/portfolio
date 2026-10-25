import { mkdirSync, renameSync, writeFileSync } from 'node:fs';
import { QUERY, transform } from './leetcode-transform.mjs';

const OUT = new URL('../public/data/leetcode.json', import.meta.url);

try {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({ query: QUERY, variables: { u: 'thvnhtai' } }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = await res.json();
  const stats = transform(body.data, body.errors);
  mkdirSync(new URL('./', OUT), { recursive: true });
  const tmp = new URL('leetcode.json.tmp', OUT);
  writeFileSync(tmp, JSON.stringify(stats));
  renameSync(tmp, OUT);
  console.log(`leetcode.json updated: ${stats.total} solved`);
} catch (e) {
  console.warn(`fetch-leetcode: keeping previous data (${e.message})`);
}
