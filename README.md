# TextTools — Free Online Text Tools

[![100% client-side](https://img.shields.io/badge/client--side-100%25-22C55E)](https://salim-studio.github.io/text_tools/) [![71 tools](https://img.shields.io/badge/tools-71-blue)](https://salim-studio.github.io/text_tools/tools.html) [![English](https://img.shields.io/badge/language-English-blue)](https://salim-studio.github.io/text_tools/)

**Fast, Private, All-in-One Text Toolkit.**
Edit, format, convert, encode and generate text — 100% in your browser.

🌐 **Live demo:** https://salim-studio.github.io/text_tools/

---

## Why TextTools?

- **71 tools** in 6 categories: edit, format, convert, encode, language, smart writing — **all work fully in-browser**
- **100% private** — text never leaves your device, no account, no uploads
- **Offline smart writers**: summarizer, paraphraser, emails, articles, stories, hashtags and more — no AI server needed
- **Everyday essentials**: counters, cleaners, case converter, Base64, URL/HTML codecs, social fonts, extractors

## Brand Identity

| Element | Description |
|---|---|
| Name | TextTools |
| Tagline | Fast, Private, All-in-One Text Toolkit |
| Logo | `assets/logo.svg` — document + teal/violet T badge (also used as favicon) |
| Banner | `assets/banner.svg` — 1200×380 social / GitHub preview |
| Hero visual | `assets/hero.svg` — homepage illustration |
| Palette | Navy `#0B1220` • Teal `#06B6D4` • Violet `#8B5CF6` • Green `#22C55E` |
| Language | English |
| Owner | Salim Slimani |

## Quick Start

```bash
# Any static server, e.g.:
python -m http.server 8000
# Then open: http://localhost:8000
```

Or open `index.html` directly in a browser. To publish with GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `/(root)`.

## Project Structure

```
index.html        Home (categories + popular tools + search + hero visual)
tools.html        All 71 tools with search and filters
tool.html         Run any tool (?tool=word-counter)
assets/           logo.svg, banner.svg, hero.svg (brand identity)
css/style.css     Styles + branded header and footer
js/tools-data.js  Tool catalog (71 tools)
js/engine.js      Offline text processing engine
js/icons.js       Gradient tile icon system
```

## Privacy

All processing happens locally in your browser. Nothing is uploaded anywhere.

## License

MIT — Copyright © 2026 salim-slimani. All rights reserved.
