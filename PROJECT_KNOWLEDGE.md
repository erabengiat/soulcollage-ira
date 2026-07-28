# סול קולאז' של עירא — Project Knowledge

**Last updated:** 28 July 2026 · **App version:** v58 · **Status:** fully working ✅

This document is the single source of truth for the project. Anyone (or any new
chat) starting from zero should be able to read this file and continue the work
without asking the owner to re-explain anything.

---

## 1. What the project is

A personal SoulCollage® app in Hebrew. It holds twelve journals (יומנים) of
collage cards. Each card has a picture, a name, and a written note in the
owner's own voice — almost all of them begin with "אני זו ש…".

The app is a Progressive Web App: a single self-contained HTML file, served as a
static site from GitHub Pages, installable to an Android home screen.

- **Repository:** https://github.com/erabengiat/soulcollage-ira
- **Live site:** https://erabengiat.github.io/soulcollage-ira/
- The repo is public, so it can be cloned directly with
  `git clone --depth 1 https://github.com/erabengiat/soulcollage-ira.git`.
  Do this at the start of any work session — it is faster and more reliable than
  asking the owner to upload files, and it guarantees you are working against
  what is actually live. (The GitHub REST API is often rate-limited from the
  sandbox; `git clone` works.)

---

## 2. Repository layout

```
soulcollage-ira/
├── index.html          ← the entire app: HTML + CSS + JS in one file (~325 KB)
├── view.html           ← read-only sharing view
├── sw.js               ← service worker (network-first caching)
├── manifest.json       ← PWA manifest
├── data/
│   └── data.json       ← all card data (~600 KB)
├── images/
│   └── <no>.jpg        ← one image per card, named by card number
├── logo.png, icon-*.png
├── guide-full.md, guide-short.md
└── (assorted old .zip archives and a soulcollage-ira-v52/ folder — legacy, ignore)
```

---

## 3. Data model

`data/data.json` has exactly two top-level keys:

```json
{
  "books": [ { "id": 1, "name": "יומן 1" }, ... twelve entries ... ],
  "cards": [
    {
      "no":   283,
      "book": 3,
      "name": "אני הלוטרה שמוצאת שלווה",
      "note": "אני הלוטרה שמוצאת שלווה\nאני זו הלוטרה שהייתה חייבת לעצור…",
      "suit": "ועדה"
    }
  ]
}
```

Rules that must be preserved:

- **`no` is globally unique** across all twelve journals, never per-book.
- **`cards` is sorted ascending by `no`.**
- **Every card has all five keys** — `no`, `book`, `name`, `note`, `suit`.
- **`name`** is the card's title (the first paragraph of the Word cell).
- **`note`** is the title **plus** the body, joined with `\n`. The title is
  deliberately repeated as the first line of the note — this is the existing
  convention throughout, do not "clean it up".
- **`img` is not stored.** The app derives it: `function imgURL(no){ return 'images/'+no+'.jpg'; }`
  So a card only displays if `images/<no>.jpg` exists.
- **`suit`** is one of: `ועדה` (the default, ~85% of cards), `על-אישי`,
  `קהילה`, `מלווים`, `מועצה`.

### Counters are automatic
Total cards, per-journal counts, and the "cards with a note" figure in the
settings screen are all computed at runtime from `data.json`
(`totalCards()`, `renderCounter()`, `b.cards.length`). **Never hardcode a total
anywhere.** Adding cards updates every counter by itself.

---

## 4. Current state (v58)

| Journal | Cards | Number range | With notes | Blank notes |
|---|---|---|---|---|
| 1 | 139 | 1–142 | 132 | 7 |
| 2 | 134 | 143–282 | 130 | 4 |
| 3 | 107 | 283–390 | 106 | 1 |
| 4 | 104 | 400–505 | 103 | 1 |
| 5 | 110 | 506–615 | 109 | 1 |
| 6 | 112 | 616–729 | 112 | 0 |
| **7** | **120** | **731–850** | **0** | **120** |
| **8** | **113** | **851–963** | **0** | **113** |
| **9** | **112** | **964–1075** | **0** | **112** |
| 10 | 89 | 1076–1164 | 83 | 6 |
| 11 | 104 | 1165–1268 | 100 | 4 |
| 12 | 70 | 1269–1338 | 70 | 0 |

**Total: 1,314 cards — 945 with notes, 369 without.**

Every card has an image, and every image has a card. No orphans in either
direction.

### The only outstanding work
**Journals 7, 8 and 9 have no notes at all** (345 cards). Their cards exist with
placeholder names of the form `קלף 731`, and their images are already in the
repo. They are waiting on Word files from the owner. When those arrive, the
process in section 5 handles them.

### Known blank notes in otherwise-finished journals
These are cards whose Word entry was empty — not errors, just gaps the owner may
fill later:

- Journal 1: 49, 76, 89, 103, 111, 113, 137
- Journal 2: 218, 228, 243, 262
- Journal 3: 350 · Journal 4: 430 · Journal 5: 563
- Journal 10: 1134, 1135, 1137, 1149, 1150, 1154
- Journal 11: 1222, 1253, 1258, 1268

### Card numbers that intentionally do not exist
132, 135, 138, 161, 165, 177, 215, 220, 272, 324, 391–399, 408–409, 625, 688, 730.

Gaps are normal. **Never renumber cards to close a gap** — the numbers are tied
to image filenames and to the owner's own physical journals.

---

## 5. How to add notes from a Word file

The owner writes notes in `.docx` files, one per journal, with names like
`תאור_קלפים_3.docx`, `דף_הסבר_קלפים_4.docx`, `הערות_ליומן_12.docx`. Naming is
inconsistent; the content structure is not.

**Structure:** one two-column table. Column 1 is the card number. Column 2 is a
cell containing several paragraphs — **the first paragraph is the title, the
rest are the body.**

Do **not** parse these with `extract-text`. It flattens the cell into one line
and the title/body boundary is lost. Use `python-docx` and read the paragraphs:

```python
from docx import Document
import re
doc = Document(path)
for row in doc.tables[0].rows:
    num = row.cells[0].text.strip()
    if not re.fullmatch(r'\d+', num):
        continue                       # skip header and spacer rows
    paras = [p.text.strip() for p in row.cells[1].paragraphs if p.text.strip()]
    card['name'] = paras[0]
    card['note'] = '\n'.join(paras)
```

**Match cards by `no`, never by position in the file.** The Word files contain
duplicated numbers, blank rows, and missing numbers. Matching by number makes
all of that harmless.

**When a number appears twice**, keep the row that has text and drop the empty
one. This exactly reproduced the card list for journal 4, where the Word file
looked broken but in fact matched the app perfectly once deduplicated.

Always report afterwards: how many were updated, which Word rows had no matching
card, and which cards got no note.

---

## 6. How to add new card images

The owner sends a `.zip` of images named `<no>.jpg`. It usually contains the
**whole** journal, not just the new cards — compare against `images/` first and
only take what is genuinely new.

Existing repo images are **downscaled to a 1400 px maximum dimension**. The zips
contain full-resolution originals (often 2400 px+). Match the existing
convention or the repo will bloat:

```python
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
w, h = im.size
s = 1400 / max(w, h)
if s < 1:
    im = im.resize((round(w*s), round(h*s)), Image.LANCZOS)
im.save(dst, 'JPEG', quality=85, optimize=True, progressive=True)
```

Then add a card entry for each new image, or it will not appear in the app.

---

## 7. The app's UI — things that will bite you

`index.html` is one file with all CSS in a `<style>` block at the top and all JS
in `<script>` blocks lower down. Roughly: CSS lines 1–500, markup 500–800,
JavaScript 800 onwards.

### The scroll container is not the window
`html, body` have `height: 100%`, and there is a rule around line 180:

```css
.app, .screen, .add-form, .detail, .reading-area, .reading-list{
  max-width:100%;
  overflow-x:hidden;
  overflow-x:clip;   /* ← this second line is load-bearing */
}
```

`overflow-x: hidden` silently turns an element into a **scroll container**. With
it, `.app` became the thing that scrolled and the window never moved at all —
which broke `window.scrollTo()` **and** broke `position: sticky` (the header was
pinned to a container that never scrolled).

`overflow-x: clip` still prevents sideways spill but does **not** create a
scroll container. **Do not change it back to `hidden`.** If sticky positioning
or scrolling ever misbehaves again, check this rule first.

### Sticky header
`.subhead` — the bar holding the back arrow and the screen title — is
`position: sticky; top: 0; z-index: 40` with a translucent cream background and
a blur. It appears on 13 screens and is styled once, globally. `#cardDetail
.subhead` needs its own sticky rule because the back arrow inside it is
absolutely positioned against it.

The back arrow is a chevron pointing **right** (`polyline points="9 6 15 12 9 18"`),
which is correct for a right-to-left interface. Don't "fix" it to point left.

### Screen switching and scroll reset
`showScreen(id)` swaps the `.active` class between `.screen` divs, then calls
`resetScroll()`, which forces an instant jump to the top four times: immediately,
on the next animation frame, on the next tick, and after 120 ms. The repetition
is deliberate — card images load asynchronously and reflow the page, which
otherwise leaves the list part-way scrolled. `scrollTopNow()` temporarily
overrides the global `scroll-behavior: smooth`, because a smooth scroll here
reads as a bug.

The `@keyframes fade` animation deliberately animates **opacity only**. A
transform on `.screen` would make it a containing block and disturb the sticky
header.

### Other landmarks
- `APP_VERSION` — a `const` around line 798 of `index.html`.
- `imgURL(no)` — around line 801.
- `openBook(id)` — builds the card grid, splits portrait and landscape cards
  into two sections by probing each image's natural dimensions, then calls
  `showScreen('bookCards')`.
- Browser storage (`localStorage` etc.) is used by the app itself for saved
  readings; readings are in-memory only and reset on reload.

---

## 8. Versioning — do this on every change

Two numbers, both must be bumped, or the owner cannot tell whether the update
landed:

1. **`APP_VERSION` in `index.html`** — e.g. `'v58'` → `'v59'`. Shows as
   `גרסה v58` on the home screen footer and in the settings box. This is how the
   owner confirms a deploy worked.
2. **`CACHE` in `sw.js`** — e.g. `'sole-collage-era-v24'` → `'…-v25'`. Forces
   installed home-screen copies to discard cached files.

The service worker is **network-first**: online users always get the newest
version, and the cache is only an offline fallback. So a bad deploy is never
"stuck" — a revert propagates within a minute or two.

---

## 9. How to deliver work to the owner

The owner does not want a list of manual steps. **Always deliver one zip** whose
internal folder structure mirrors the repo root, so it can be extracted and
copied straight over the repo folder:

```
index.html
sw.js
data/data.json
images/1332.jpg …
```

Include only files that actually changed. Name it after the new version, e.g.
`soulcollage-v58.zip`.

### Verify before delivering — do not skip this
A headless browser is available and it has caught real bugs that reading the CSS
did not:

```bash
pip install playwright --break-system-packages -q
python3 -m playwright install chromium
```

Then serve a clean clone with `python3 -m http.server`, extract the delivery zip
over it, open `index.html`, wait for
`typeof books!=='undefined' && books.length>0`, and check the actual rendered
result — `getBoundingClientRect()` values, `window.scrollY`, `totalCards()`,
console errors. The sticky-header fix was shipped once on reasoning alone and
was wrong; measuring found the real cause in minutes.

### Reassure about safety
Every change is reversible: `git revert HEAD` and push, or the Revert button on
the commit in GitHub's web interface. Suggest keeping a local copy of any file
before replacing it.

---

## 10. Working with the owner

- The owner is a Hebrew speaker and often dictates by voice, so messages arrive
  with transcription noise — "circleage" for SoulCollage, "Yeomanim" for
  יומנים, "book form" for "book four". Read through it; ask only if the meaning
  genuinely changes.
- When the owner describes a UI behaviour, restate it in plain words and confirm
  before building. This has prevented rework.
- The owner is not a developer and does not want step-by-step instructions. Do
  the work, verify it, hand over one file.
- Reply in the language the owner is using in that message.

---

## 11. History

- **27 Jul 2026** — Journal 3 notes imported (107 cards) from
  `תאור_קלפים_3.docx`.
- **28 Jul 2026** — Journals 4, 5, 6 and 12 imported (385 cards). Journal 4's
  apparent numbering corruption turned out to match the app exactly once
  duplicates were resolved.
- **28 Jul 2026** — Sticky header added across all screens; scroll-to-top on
  opening a journal fixed. First attempt failed because of the
  `overflow-x: hidden` scroll-container trap; fixed with `overflow-x: clip` and
  verified in a headless browser.
- **28 Jul 2026** — Journal 12 completed: cards 1330–1338 added with notes,
  seven new images resized and imported. Total 1,305 → 1,314.
- **28 Jul 2026** — Released as **v58** (service worker cache v24). First
  release the owner considered fully working and fully up to date.
