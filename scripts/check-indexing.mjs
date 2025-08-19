/*
  Demo indexing checker using "site:" queries against Google and Bing.
  - Extracts slugs from src/app/page.tsx
  - Builds canonical URLs as https://helloinnerwell.com/reflections/{slug}
  - Checks if results pages include the URL/slug
  - Writes statuses to public/indexing-status.json
*/

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve project root (innerwell-reflections) relative to this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');

const PAGE_FILE = path.join(PROJECT_ROOT, 'src', 'app', 'page.tsx');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'public', 'indexing-status.json');
const LOG_DIR = path.join(PROJECT_ROOT, 'logs');
const dateTag = new Date().toISOString().slice(0, 10);
const LOG_FILE = path.join(LOG_DIR, `indexing-${dateTag}.log`);

const BASE_URL = 'https://helloinnerwell.com/reflections/';
const CSE_API_KEY = process.env.GOOGLE_CSE_API_KEY;
const CSE_CX = process.env.GOOGLE_CSE_CX;

/** basic logger: prints to console and appends to file */
async function logLine(message) {
  const line = `[${new Date().toISOString()}] ${message}`;
  try {
    await fs.mkdir(LOG_DIR, { recursive: true });
    await fs.appendFile(LOG_FILE, line + '\n');
  } catch {}
  console.log(line);
}

/** Sleep helper */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Extract slugs from page.tsx via regex */
async function extractSlugs() {
  const content = await fs.readFile(PAGE_FILE, 'utf8');
  const regex = /slug:\s*"([^"]+)"/g;
  const slugs = new Set();
  let m;
  while ((m = regex.exec(content))) {
    slugs.add(m[1]);
  }
  return Array.from(slugs);
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Check Google "site:" result reliably */
async function checkGoogle(url, slug) {
  try {
    const q = `site:${encodeURIComponent(url)} ${encodeURIComponent(slug)}`;
    const res = await fetch(`https://www.google.com/search?q=${q}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; IndexDemoBot/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    const html = await res.text();
    console.log("html", html);
    // console.log("html", html);
    // const json = await res.json();
    // console.log("json", json);


    // Detect explicit "no results" states shown by Google
    const noResults = /did not match any documents/i.test(html)
      || /It looks like there aren\'t many great matches/i.test(html)
      || /No results found for/i.test(html);
    if (noResults) return false;

    // Look for an actual anchor in the results area, not just echoed text
    const exactUrlAnchor = new RegExp(`<a[^>]+href=["']${escapeRe(url)}["']`, 'i');
    const slugInResultAnchor = new RegExp(`<a[^>]+href=["']https?://[^"']*${escapeRe(slug)}["']`, 'i');
    return exactUrlAnchor.test(html) || slugInResultAnchor.test(html);
  } catch {
    return false;
  }
}

/** Check Bing "site:" result reliably */
async function checkBing(url, slug) {
  try {
    const q = `site:${encodeURIComponent(url)} ${encodeURIComponent(slug)}`;
    const res = await fetch(`https://www.bing.com/search?q=${q}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; IndexDemoBot/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    const html = await res.text();

    const noResults = /There are no results for/i.test(html)
      || /We didn\'t find any results/i.test(html);
    if (noResults) return false;

    const exactUrlAnchor = new RegExp(`<a[^>]+href=["']${escapeRe(url)}["']`, 'i');
    const slugInResultAnchor = new RegExp(`<a[^>]+href=["']https?://[^"']*${escapeRe(slug)}["']`, 'i');
    return exactUrlAnchor.test(html) || slugInResultAnchor.test(html);
  } catch {
    return false;
  }
}

/** Prefer Google Custom Search JSON API if credentials exist */
async function checkGoogleViaCSE(url, slug) {
  if (!CSE_API_KEY || !CSE_CX) return null; // signal not configured
  try {
    // Use a precise query: prefer exact URL match; fallback includes slug
    const q = `site:helloinnerwell.com "${slug}"`;
    const u = new URL('https://www.googleapis.com/customsearch/v1');
    u.searchParams.set('key', CSE_API_KEY);
    u.searchParams.set('cx', CSE_CX);
    u.searchParams.set('q', q);
    u.searchParams.set('num', '10');
    console.log("url", u.toString());

    const res = await fetch(u);
    if (!res.ok) return false;
    const data = await res.json();
    console.log("data", data);
    const items = data?.items && Array.isArray(data.items) ? data.items : [];
    const normalize = (s) => (s || '').replace(/\/$/, '');
    const target = normalize(url);

    for (const it of items) {
      const link = normalize(it?.link || '');
      if (link === target) return true;
      if (/^https?:\/\/helloinnerwell\.com\/reflections\//i.test(link) && link.includes(slug)) return true;
    }
    return false;
  } catch {
    return false;
  }
}

async function main() {
  const slugs = await extractSlugs();
  const results = [];
  await logLine(`Starting indexing check. Using CSE: ${Boolean(CSE_API_KEY && CSE_CX)}. Total slugs: ${slugs.length}`);

  for (const slug of slugs) {
    const url = `${BASE_URL}${slug}`;
    // Prefer JSON API if configured, else HTML fallback
    const viaCSE = await checkGoogleViaCSE(url, slug);
    const google = viaCSE === null ? await checkGoogle(url, slug) : viaCSE;
    await sleep(100); // be polite
    const bing = await checkBing(url, slug);
    await sleep(100);

    let status = 'not-indexed';
    if (google || bing) status = 'complete';

    results.push({ slug, url, engines: { google, bing }, status, checkedAt: new Date().toISOString() });
    await logLine(`Checked ${slug} → google=${google} bing=${bing} status=${status}`);
  }

  const outDir = path.dirname(OUTPUT_FILE);
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2));
  await logLine(`Wrote ${results.length} statuses → ${OUTPUT_FILE}. Log: ${LOG_FILE}`);
}

main().catch((e) => {
  console.error(e);
  // best-effort log
  try { fs.appendFile(LOG_FILE, `[${new Date().toISOString()}] ERROR: ${e?.message || e}\n`); } catch {}
  process.exit(1);
});


