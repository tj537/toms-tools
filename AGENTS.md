# Working on Toms Tools

Guide for anyone – human or AI – who changes this repo. Read it before you edit `toms-tools.html`.

## Golden rules

- **One file.** The whole app is `toms-tools.html`: HTML, CSS and JavaScript, no framework, no dependencies, no build step. Keep it that way – users download exactly this file.
- **Offline, always.** A strict Content Security Policy (`default-src 'none'`, `connect-src data: blob:`) blocks every network request. Never add CDNs, external fonts, analytics or fetches to the internet. Libraries get embedded as dormant `<script type="text/plain">` blocks (see pdf-lib / pdf.js at the end of the file) and only run when needed.
- **German is the source language.** UI texts are written in German and translated via `T()` (see [Translations](#translations)). Code comments are in English.
- **Desktop first.** Target is Chrome/Edge on a work PC without admin rights. Folder features use the File System Access API (Chromium only).
- **Run `node tools/check.mjs` before you finish.** It must end with 0 errors.

## File layout (top to bottom)

1. `<head>` with the CSP and all CSS (each app's CSS uses a short prefix, e.g. `qlw-` for Quellenwerk, `mdw-` for Modellwerk).
2. Static HTML of the shell (top bar, views container).
3. **Embedded apps** Beatwerk and Gedankenwerk as `<script type="text/plain" id="app-beatwerk">` / `id="app-gedankenwerk"` – complete standalone HTML pages that run in an iframe.
4. **Main script** (one `<script>` block):
   helpers → `Store` & backup → settings `S` → language (`isEN`, `T`, `EN` map) → app shell `TT` → home page & settings → `APP_GROUPS` → the apps, one after another, each starting with a `/* ================= Name ================= */` header and ending with `TT.register({...})`.
5. Dormant libraries (pdf-lib, pdf.js, pdf.js worker) as text blocks at the very end.

Search for the section header comment to find an app; line numbers drift constantly.

## App API

```js
TT.register({
  id: 'quellenwerk', name: 'Quellenwerk', icon: 'quellenwerk', c: '#b3cffb', c2: '#b3cffb', fg: '#112548',
  full: true,              // optional: no padding, app fills the view
  deOnly: true,            // optional: not translated yet → hidden in the English interface
  tagline: '…', desc: '…', // German; English via the EN map (translated where they are shown)
  settings: [{ store: 'quellenwerk', key: 'x', label: '…', type: 'bool' | 'seg' | 'range' | 'text', default: … }],
  mount: mountQuellenwerk,
});

function mountQuellenwerk(view, { S, Store, toast, modal }) {
  // build the UI into `view` with h(); return optional hooks:
  return { destroy() {}, onShow() {}, onKey(e) {}, beforeClose() { /* return false to cancel */ } };
}
```

Apps are mounted lazily (first time they're shown) and fully destroyed on close – `destroy()` must remove global listeners, timers, object URLs and workers.

**Shared helpers** (use them instead of writing new ones): `h(tag, props, ...children)`, `icon(name)` + `ICONS`, `segEl(opts, value, onChange)`, `switchEl(checked, onChange)`, `toast(msg, type, { action, ms })`, `popMenu(anchor, items)`, `modal`, `download(name, data, type)`, `esc`, `debounce`, `uid`, `saveLater`.

## Storage

- `Store.get(key, default)` / `Store.set(key, value)` → `localStorage` under `tt:<key>`. Everything with the `tt:` prefix is included in backups and the folder sync automatically.
- **Delayed saving always via `saveLater(fn, ms)`**, never a plain `debounce`: pending saves are flushed when an app closes or the page is hidden, so the last keystrokes are never lost.
- The browser gives ~5 MB. Big binary data (images) goes to IndexedDB (`IDB`), not localStorage.
- Embedded iframe apps can't use localStorage (opaque origin) – `mountFrameApp` injects a shim that mirrors their storage to `tt:frame:<app>:<key>` via `postMessage`.

## Translations

- Wrap every visible German text in `T('…')`, including `title`, `placeholder` and toasts. Placeholders: `T('{n} Quellen', { n })` – never template strings inside `T()`.
- Add the English text to the `EN` map near the top of the main script, in a block commented with the app name. Write English the way English software says it, not word for word.
- **The `EN` map is global.** The same German key means the same English text in every app. If a word needs different translations (e.g. "Seiten" = "Pages" vs. "pages"), use a different German key or adjust case with `lc(T(…))` mid-sentence. Never call `.toLowerCase()` on translated text directly.
- **Never call `T()` in constants that are evaluated at load time** (`TT.register` blocks, top-level arrays like `MW_TEMPLATES`, `QW_TYPES`). Translate them where they're displayed, or make translated copies inside the mount function (see Modellwerk's `TPLS`). Functions that run at mount time (like `kzDefs()`) may call `T()` directly.
- Don't translate user data or anything that gets stored – saved filters, categories and keys must stay stable when the language changes.
- Number and date formats follow the language: `isEN() ? 'en-GB' : 'de-DE'` (or `'en-US'` for plain numbers). Only `deOnly` apps may hard-code `'de-DE'`.
- Some local names shadow `T` on purpose (e.g. Diagrammwerk's SVG builder, the decision helper's clock) – there, translations go through a local `tr`.
- Open apps switch language the next time they're opened.
- Embedded apps get the language as `window.TT_LANG` from the shim and have their own small tables (`GB_EN`, `GW_EN`) with a local `tr()`.
- To translate a `deOnly` app: translate it, then remove `deOnly: true`.

## Embedded apps (Beatwerk, Gedankenwerk)

- They live as readable text in `type="text/plain"` script blocks **before** the main script (the session restore opens apps while the page loads, so the blocks must already exist).
- Inside those blocks a closing script tag would end the block early, so the apps' own closing tags are stored as `<!/script>` and comment openers `<!--` as `<!!--`; `frameSrc(id)` turns them back.
- **Never write a closing script tag as text anywhere** – not in strings, not in comments. In strings use `'<\/script>'`. `check.mjs` reports it with the line number.

## Design conventions

- **App colors:** every app icon is single-colored (`c === c2`); light colors get a dark symbol color `fg`. Colors were spread out in OKLab (hue *and* lightness) so neighbors on the home grid look clearly different. Free colors for new apps are listed in the comment `// Still free for new apps:` right above `APP_GROUPS` – take one and update the comment. When none are left, redistribute the palette instead of reusing similar tones.
- **CSS prefixes** are short and can collide – grep before you pick one.
- **Labels readable in both languages** where possible: symbols and short forms (`→ WebP`, `−90° / +90°`, `PNG → 📋`), tooltips with just the shortcut when the button already has a label.
- Content (templates, snippets, example texts) can stay German, but new users in English mode should get an English example where it matters (see Quellenwerk, Gedankenwerk).

## Adding a new app – checklist

1. Section header comment + `mountX` function + `TT.register({...})`
2. Add the id to a group in `APP_GROUPS`
3. Icon in `ICONS` (or reuse one), a free color from the reserve comment
4. All texts via `T()` + English entries (incl. `tagline` and `desc`)
5. Add it to the app list in `.github/ISSUE_TEMPLATE/bug.yml`
6. README: app list entry and app counts (title, "Make it yours", group counter)
7. `node tools/check.mjs` → 0 errors

## Testing

```
node tools/check.mjs            # everything, ~1 minute
node tools/check.mjs --static   # quick checks only, < 1 second
```

It parses the main script, checks the script blocks and the `EN` map (conflicts, missing translations, hard-coded `'de-DE'`), then opens every app in both languages in headless Chrome/Edge and reports JavaScript errors and German leftovers in the English interface. Needs Node 22+.

When automating the browser yourself, use the DevTools protocol – `--screenshot` and `--dump-dom` hang because of endless animations. The page needs ~2 seconds to load; `S` is not reachable from outside (only `window.TT`), so set the language via `localStorage` key `tt:settings` and reload.

## Versions & releases

- `const VERSION = 'X.Y.Z'` in the main script is only changed for a release (new app = minor, otherwise patch). Normal commits don't touch it.
- Commit messages: a short German description of the change, e.g. `Quellenwerk: Löschen-Knopf in der Liste`. Release commits: `Version X.Y.Z: …`.
- Release flow: run the check → set `VERSION` → commit & **push** → then create the GitHub release with tag `vX.Y.Z` on `main` (a tag created before the push points to the old commit) and attach `toms-tools.html`.
- Release notes: English with a short German block, a big download button linking to `releases/download/vX.Y.Z/toms-tools.html`, and the file's SHA-256 at the end (`shasum -a 256 toms-tools.html`) – the README tells users to compare it.
- The README is English with a short German summary. Keep app counts in sync.
- Line endings are LF (`.gitattributes`).
