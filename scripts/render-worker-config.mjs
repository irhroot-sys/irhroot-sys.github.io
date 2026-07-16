import { readFile, writeFile } from 'node:fs/promises';

const required = ['D1_DATABASE_ID', 'KV_NAMESPACE_ID'];
for (const name of required) {
  if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
}

const templateUrl = new URL('../worker/wrangler.example.jsonc', import.meta.url);
const outputUrl = new URL('../worker/wrangler.jsonc', import.meta.url);
const template = await readFile(templateUrl, 'utf8');
const rendered = template
  .replace('REPLACE_WITH_D1_DATABASE_ID', process.env.D1_DATABASE_ID)
  .replace('REPLACE_WITH_KV_NAMESPACE_ID', process.env.KV_NAMESPACE_ID);
await writeFile(outputUrl, rendered, 'utf8');
