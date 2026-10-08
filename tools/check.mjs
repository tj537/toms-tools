#!/usr/bin/env node
// Toms Tools – pre-release check
//   node tools/check.mjs            all checks (static + browser)
//   node tools/check.mjs --static   only the quick checks without a browser
// Needs Node 22+ and Chrome or Edge. Nothing to install. Exit code 1 = something to fix.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILE = path.join(ROOT, 'toms-tools.html');
const STATIC_ONLY = process.argv.includes('--static');
const src = fs.readFileSync(FILE, 'utf8');
const lines = src.split('\n');
const lineOf = idx => src.slice(0, idx).split('\n').length;

let errors = 0, warnings = 0;
const err = (msg, more = []) => { errors++; console.log(`  ❌ ${msg}`); more.slice(0, 15).forEach(m => console.log(`     ${m}`)); if (more.length > 15) console.log(`     … and ${more.length - 15} more`); };
const warn = (msg, more = []) => { warnings++; console.log(`  ⚠️  ${msg}`); more.slice(0, 10).forEach(m => console.log(`     ${m}`)); if (more.length > 10) console.log(`     … and ${more.length - 10} more`); };
const ok = msg => console.log(`  ✅ ${msg}`);
const head = t => console.log(`\n▶ ${t}`);

/* ================= Static checks ================= */
head('Script blocks');
// Split the file the strict way (any "</script" ends a block – that's how VS Code and many tools read it)
const blocks = [];
for (const m of src.matchAll(/<script\b([^>]*)>/gi)) {
  const start = m.index + m[0].length, end = src.toLowerCase().indexOf('</script', start);
  if (blocks.length && m.index < blocks.at(-1).end) continue;   // "<script" text inside a previous block
  blocks.push({ attrs: m[1], start, end, line: lineOf(m.index), endLine: lineOf(end), plain: /type="text\/plain"/.test(m[1]) });
}
// A real closing tag is always "</script>" – anything else (e.g. "</script" in a comment or string) cuts a block early
const strayTags = [...src.matchAll(/<\/script(?!>)/gi)].map(m => `line ${lineOf(m.index)}: ${lines[lineOf(m.index) - 1].trim().slice(0, 90)}`);
if (strayTags.length) err('"</script" without ">" – this ends the script early for VS Code and other tools; write it differently', strayTags);
const jsBlocks = blocks.filter(b => !b.plain);
if (jsBlocks.length !== 1) err(`expected exactly 1 JavaScript block, found ${jsBlocks.length} – a "</script" text probably cuts the main script in two`, jsBlocks.map(b => `line ${b.line}–${b.endLine}`));
const main = jsBlocks.sort((a, b) => (b.end - b.start) - (a.end - a.start))[0];
try { new vm.Script(src.slice(main.start, main.end), { filename: 'main-script' }); ok(`main script parses (lines ${main.line}–${main.endLine})`); }
catch (e) { err(`main script has a syntax error: ${e.message}`); }
const tagText = [...src.slice(main.start, main.end).matchAll(/<\/script/gi)].map(m => `line ${lineOf(main.start + m.index)}`);
if (tagText.length) err('"</script" appears as text inside the main script – write "<\\/script" in strings and avoid it in comments', tagText);
const appBlocks = blocks.filter(b => /id="app-/.test(b.attrs));
for (const b of appBlocks) if (/<\/script|<!--/i.test(src.slice(b.start, b.end))) err(`${b.attrs.match(/id="([^"]+)"/)[1]} contains "</script" or "<!--" – store them as "<!/script" / "<!!--"`);
if (appBlocks.length && appBlocks.every(b => b.end < main.start)) ok(`${appBlocks.length} embedded apps sit before the main script`);
else if (appBlocks.length) err('embedded app blocks must come before the main script (session restore opens apps while loading)');

head('Version');
const ver = src.match(/const VERSION = '(\d+\.\d+\.\d+)'/)?.[1];
if (ver) ok(`VERSION = ${ver}`); else err('VERSION constant not found');

head('Translations (EN map)');
const ea = lines.findIndex(l => l.startsWith('const EN = {')), eb = lines.findIndex((l, i) => i > ea && l === '};');
let EN = {};
if (ea < 0 || eb < 0) err('EN map not found');
else {
  try { EN = (0, eval)('({' + lines.slice(ea + 1, eb).join('\n') + '})'); ok(`${Object.keys(EN).length} entries`); }
  catch (e) { err(`EN map doesn't parse: ${e.message}`); }
  // The map is global: the same German key with two different English values means one app gets the wrong text
  const seen = new Map(), conflicts = [];
  for (let i = ea + 1; i < eb; i++) for (const m of lines[i].matchAll(/'((?:[^'\\]|\\.)*)'\s*:\s*'((?:[^'\\]|\\.)*)'/g)) {
    const [, k, v] = m;
    if (seen.has(k) && seen.get(k).v !== v && !seen.get(k).reported && (seen.get(k).reported = true)) conflicts.push(`"${k}": "${seen.get(k).v}" (line ${seen.get(k).line}) vs "${v}" (line ${i + 1}, wins)`);
    if (!seen.has(k)) seen.set(k, { v, line: i + 1 });
  }
  if (conflicts.length) err('same German text with different translations – the last one wins everywhere', conflicts); else ok('no conflicting entries');
}
const code = src.slice(main.start, main.end).split('\n').filter((_, i) => i < ea - main.line || i > eb - main.line).join('\n');
const GERMAN = /[äöüßÄÖÜ]|\b(der|die|das|und|oder|nicht|mit|für|ist|ein|eine|wird|kein|keine|bitte|alle)\b/i;
const missing = [...new Set([...code.matchAll(/\bT\('((?:[^'\\]|\\.)*)'/g)].map(m => { try { return (0, eval)("'" + m[1] + "'"); } catch { return m[1]; } }))]   // eval turns \n, \' … into the real characters
  .filter(k => !(k in EN) && GERMAN.test(k));
if (missing.length) warn('T() texts with German words but no English entry', missing.map(k => `"${k}"`)); else ok('every German T() text has an English entry');
// Apps marked deOnly (German-only for now) may use German formats. A line belongs to an app via the nearest
// "function mountX(" above it or the nearest "/* ===== Name" section header above it.
const regs = [...src.matchAll(/TT\.register\(\{\s*id: '([^']+)', name: '([^']+)'([\s\S]*?)\n\}\);/g)]
  .map(m => ({ id: m[1], name: m[2], deOnly: /\bdeOnly: true/.test(m[3]), mount: m[3].match(/mount: (\w+)/)?.[1] }));
const deApps = regs.filter(r => r.deOnly);
const inDeOnlyApp = n => {
  let mount = null, section = '';
  for (let i = n - 1; i >= 0 && (!mount || !section); i--) {
    if (!mount) mount = lines[i].match(/^function (mount\w+)\(/)?.[1] || null;
    if (!section && /^\/\* =====/.test(lines[i])) section = lines[i];
  }
  return deApps.some(a => a.mount === mount || section.includes(a.name));
};
const fixedDe = lines.map((l, i) => [i + 1, l]).filter(([n, l]) => n > main.line && n < main.endLine
  && /'de-DE'/.test(l) && !/isEN\(\)|\bLOC\b|EN_UI|\bloc\b/.test(l) && !inDeOnlyApp(n));
if (fixedDe.length) warn("'de-DE' without a language check – English users get German number/date formats", fixedDe.map(([n, l]) => `line ${n}: ${l.trim().slice(0, 90)}`));
else ok(`number & date formats follow the language${deApps.length ? ` (German-only apps skipped: ${deApps.map(a => a.name).join(', ')})` : ''}`);

/* ================= Browser checks ================= */
if (STATIC_ONLY) finish();
else await browserChecks().then(finish, e => { err(`browser check failed: ${e.message}`); finish(); });

async function browserChecks() {
  head('Browser');
  const candidates = {
    darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'],
    win32: [`${process.env['PROGRAMFILES']}\\Google\\Chrome\\Application\\chrome.exe`, `${process.env['PROGRAMFILES(X86)']}\\Google\\Chrome\\Application\\chrome.exe`, `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`, `${process.env['PROGRAMFILES(X86)']}\\Microsoft\\Edge\\Application\\msedge.exe`, `${process.env['PROGRAMFILES']}\\Microsoft\\Edge\\Application\\msedge.exe`],
    linux: ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge'],
  }[process.platform] || [];
  const exe = process.env.CHROME || candidates.find(p => p && fs.existsSync(p));
  if (!exe) { warn('no Chrome/Edge found – set CHROME=/path/to/browser or run with --static'); return; }
  if (typeof WebSocket === 'undefined') { warn('Node 22+ needed for the browser checks'); return; }
  console.log(`  using ${path.basename(exe)}`);

  const port = 9400 + Math.floor(Math.random() * 400);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'tt-check-'));
  const browser = spawn(exe, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', '--window-size=1400,1000', 'about:blank'], { stdio: 'ignore' });
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  try {
    let ws;
    for (let i = 0; i < 60 && !ws; i++) {
      try { const page = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === 'page'); if (page) ws = new WebSocket(page.webSocketDebuggerUrl); } catch {}
      if (!ws) await sleep(250);
    }
    if (!ws) throw new Error('browser did not start');
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    let id = 0; const pending = new Map(), jsErrors = [];
    ws.onmessage = e => {
      const m = JSON.parse(e.data);
      if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
      if (m.method === 'Runtime.exceptionThrown') jsErrors.push(m.params.exceptionDetails.exception?.description?.split('\n').slice(0, 2).join(' ') || m.params.exceptionDetails.text);
      if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') jsErrors.push('console.error: ' + m.params.args.map(a => a.value ?? a.description).join(' ').slice(0, 200));
    };
    const cmd = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
    const ev = async expr => { const r = await cmd('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); return r.result?.exceptionDetails ? { __error: r.result.exceptionDetails.exception?.description } : r.result?.result?.value; };
    await cmd('Runtime.enable'); await cmd('Page.enable');
    const url = pathToFileURL(FILE).href;
    const ready = async () => { for (let i = 0; i < 80; i++) { if (await ev("typeof TT !== 'undefined' && document.readyState === 'complete'") === true) return; await sleep(250); } throw new Error('app did not load'); };

    // German texts that are allowed in the English interface (examples, brand names …)
    const ALLOW = [/ä → ae/, /ß → ss/];
    for (const lang of ['de', 'en']) {
      // fresh storage per language, no welcome dialog, nothing restored
      await cmd('Page.navigate', { url }); await ready();
      await ev(`Storage.prototype.setItem = () => {}; true`);   // keep the page from saving while we wipe it
      await ev(`localStorage.clear(); true`);
      await cmd('Page.navigate', { url: 'about:blank' }); await sleep(300);
      await cmd('Page.navigate', { url }); await ready();
      await ev(`localStorage.setItem('tt:settings', JSON.stringify({ lang: '${lang}', start: 'home' })); location.reload(); true`);
      await sleep(500); await ready(); await sleep(800);
      jsErrors.length = 0;
      const res = await ev(`(async () => {
        const wait = ms => new Promise(r => setTimeout(r, ms)), out = {};
        const DE = ${GERMAN.toString()};
        const ids = [...TT.apps.values()].filter(a => !a.soon && !(a.deOnly && ${lang === 'en'})).map(a => a.id);
        for (const id of ids) {
          TT.openApp(id); await wait(900);
          const v = document.querySelector('.view[data-id="' + id + '"]'), found = new Set();
          if (v && ${lang === 'en'}) {
            const tw = document.createTreeWalker(v, NodeFilter.SHOW_TEXT);
            for (let n; (n = tw.nextNode());) { const t = n.nodeValue.trim(); if (t && DE.test(t) && !n.parentElement.closest('textarea,input,[contenteditable],pre,code,svg')) found.add(t.slice(0, 80)); }
            v.querySelectorAll('[title],[placeholder],[aria-label]').forEach(e => { for (const a of ['title', 'placeholder', 'aria-label']) { const t = e.getAttribute(a); if (t && DE.test(t)) found.add(a + ': ' + t.slice(0, 80)); } });
          }
          out[id] = [...found];
          TT.closeApp(id); await wait(120);
        }
        return out;
      })()`);
      if (res?.__error) throw new Error(res.__error);
      const appsChecked = Object.keys(res).length;
      const leftovers = Object.entries(res).flatMap(([id, list]) => list.filter(t => !ALLOW.some(r => r.test(t))).map(t => `${id}: ${t}`));
      head(`${lang === 'de' ? 'German' : 'English'} interface – ${appsChecked} apps opened`);
      if (jsErrors.length) err(`${jsErrors.length} JavaScript error(s)`, [...new Set(jsErrors)]); else ok('no JavaScript errors');
      if (lang === 'en') { if (leftovers.length) warn('German text left in the English interface', leftovers); else ok('no German leftovers'); }
    }
    ws.close();
  } finally {
    browser.kill();
    await sleep(300);
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
  }
}

function finish() {
  console.log(`\n${errors ? '❌' : warnings ? '⚠️ ' : '✅'} ${errors} error(s), ${warnings} warning(s)${errors ? ' – fix these before a release' : ''}\n`);
  process.exit(errors ? 1 : 0);
}
