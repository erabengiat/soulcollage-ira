# סול קולאז' של עירא — ידע הפרויקט / Project Knowledge

**עודכן / Last updated:** 12 באוגוסט 2026 · **גרסת אפליקציה / App version:** v75

מסמך זה הוא מקור האמת היחיד לפרויקט. החלק הראשון בעברית, החלק השני באנגלית —
שני החלקים מכסים את אותו תוכן.

*This document is the single source of truth for the project. Hebrew first,
English second — both halves cover the same material.*

---
---

# 🇮🇱 עברית

## 1. מה זה הפרויקט

אפליקציית סול־קולאז' אישית בעברית. שנים־עשר יומנים של קלפי קולאז'. לכל קלף
תמונה, שם, והערה בקולה של הבעלים — רובן פותחות ב"אני זו ש…".

זו אפליקציית PWA: קובץ HTML אחד עצמאי, מוגש כאתר סטטי מ־GitHub Pages, וניתן
להתקנה על מסך הבית באנדרואיד.

- **מאגר:** https://github.com/erabengiat/soulcollage-ira
- **אתר חי:** https://erabengiat.github.io/soulcollage-ira/
- המאגר ציבורי, ולכן אפשר לשכפל אותו ישירות:
  `git clone --depth 1 https://github.com/erabengiat/soulcollage-ira.git`
  כדאי לעשות זאת בתחילת כל מפגש עבודה — מהיר ואמין יותר מבקשת קבצים, ומבטיח
  עבודה מול מה שבאמת נמצא באוויר.

## 2. מבנה המאגר

```
soulcollage-ira/
├── index.html          ← כל האפליקציה: HTML + CSS + JS בקובץ אחד
├── view.html           ← תצוגת שיתוף לקריאה בלבד
├── sw.js               ← service worker (network-first)
├── manifest.json       ← מניפסט PWA
├── data/data.json      ← כל נתוני הקלפים
├── images/<מספר>.jpg   ← תמונה אחת לכל קלף, בשם המספר שלו
├── logo.png, icon-*.png
└── README.md, PROJECT_KNOWLEDGE.md, PROJECT_INSTRUCTIONS.md
```

## 3. מודל הנתונים

ל־`data/data.json` יש בדיוק שני מפתחות עליונים: `books` ו־`cards`.

```json
{
  "no":   283,
  "book": 3,
  "name": "אני הלוטרה שמוצאת שלווה",
  "note": "אני הלוטרה שמוצאת שלווה\nאני זו הלוטרה שהייתה חייבת לעצור…",
  "suit": "ועדה"
}
```

כללים שחייבים להישמר:

- **`no` ייחודי בכל האוסף**, לא לכל יומן בנפרד.
- **`cards` ממוין לפי `no` בסדר עולה.**
- **לכל קלף חמישה מפתחות** — `no`, `book`, `name`, `note`, `suit`.
- **`note` מכיל את השם כשורה ראשונה ואז את הגוף.** הכפילות מכוונת — זו המוסכמה
  לאורך כל האוסף, אין "לתקן" אותה.
- **`img` אינו נשמר.** האפליקציה מחשבת אותו: `images/<no>.jpg`. קלף יוצג רק אם
  הקובץ קיים.
- **`suit`** הוא אחד מ: `ועדה` (ברירת מחדל), `קהילה`, `בני לוויה`, `שקט`,
  `מועצה`.

### מונים אוטומטיים
סך הקלפים, הספירה לכל יומן ומספר הקלפים עם הערה מחושבים בזמן ריצה מתוך
`data.json`. **אין להצמיד מספרים קבועים בקוד** — הוספת קלפים מעדכנת הכול מעצמה.

## 4. מצב נוכחי (v62)

1,344 קלפים ב־13 יומנים, 953 עם הערה ב־data.json (ועוד 343 ליומנים 7–9 בתוך index.html). לכל קלף יש תמונה ולכל תמונה יש קלף.

חלוקת הסדרות: ועדה 1,043 · בני לוויה 114 · שקט 81 · קהילה 68 · מועצה 8.

**סדרת בני לוויה** נקבעת לפי התמונה ולא לפי הטקסט: רק אם בקולאז' יש בעלי חיים
ותו לא. נוף מותר, כמה חיות יחד מותר, אדם או חפץ מעשה ידי אדם — פוסלים.

### הערות ריקות ידועות
יומן 1: 49, 76, 89, 103, 111, 113, 137 · יומן 2: 218, 228, 243, 262 ·
יומן 3: 350 · יומן 4: 430 · יומן 5: 563 · יומן 7: 788 · יומן 8: 901 ·
יומן 10: 1134, 1135, 1137, 1149, 1150, 1154 · יומן 11: 1222, 1253, 1258, 1268.

### מספרי קלפים שאינם קיימים בכוונה
132, 135, 138, 161, 165, 177, 215, 220, 272, 324, 391–399, 408–409, 625, 688, 730.

פערים במספור הם תקינים. **לעולם לא לחדש מספור כדי לסגור פער** — המספרים קשורים
לשמות קבצי התמונות וליומנים הפיזיים של הבעלים.

### עבודה פתוחה
- יומן 12 הושלם: 30 קלפים חדשים (1339–1368). שלושה ללא הערה: 1345, 1367, 1368.
- ההערות של יומנים 7–9 יושבות ב־`index.html` בתוך `CARD_TEXTS_7_9` במקום
  ב־`data.json` — אי־עקביות שכדאי לתקן.
- קבצים מיותרים למחיקה מהמאגר: `soulcollage-ira-v52/`,
  `soulcollage-ira-v55-complete.zip`, `pwa_files_v24.zip`,
  `soulcollage-index-v55.zip`, `guide-full.md`, `guide-short.md`.
  התיקייה `הכנת אפליקציה שלי/` מכילה את קובצי המקור של הבעלים — להעתיק החוצה
  לפני הסרה מהמאגר הציבורי.

## 5. הוספת הערות מקובץ Word

מבנה: טבלה אחת בת שתי עמודות. עמודה 1 — מספר הקלף. עמודה 2 — תא עם כמה פסקאות:
**הפסקה הראשונה היא השם, השאר הן הגוף.**

אין לפרסר עם `extract-text` — הוא משטח את התא לשורה אחת והגבול בין שם לגוף אובד.
יש להשתמש ב־`python-docx` ולקרוא פסקאות:

```python
from docx import Document
import re
doc = Document(path)
for row in doc.tables[0].rows:
    num = row.cells[0].text.strip()
    if not re.fullmatch(r'\d+', num):
        continue
    paras = [p.text.strip() for p in row.cells[1].paragraphs if p.text.strip()]
    card['name'] = paras[0]
    card['note'] = '\n'.join(paras)
```

**להתאים קלפים לפי `no`, לעולם לא לפי מיקום בקובץ.** בקבצים יש מספרים כפולים,
שורות ריקות ומספרים חסרים. התאמה לפי מספר הופכת את כל זה לבלתי מזיק. כשמספר
מופיע פעמיים — לשמור את השורה שיש בה טקסט.

## 6. הוספת תמונות

התמונות במאגר מוקטנות ל־**1400 פיקסל בממד הגדול**. קובצי המקור גדולים בהרבה.

```python
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
w, h = im.size
s = 1400 / max(w, h)
if s < 1:
    im = im.resize((round(w*s), round(h*s)), Image.LANCZOS)
im.save(dst, 'JPEG', quality=85, optimize=True, progressive=True)
```

## 7. מלכודות ב־index.html

### מיכל הגלילה אינו החלון
יש כלל CSS סביב שורה 180:

```css
.app, .screen, .add-form, .detail, .reading-area, .reading-list{
  max-width:100%;
  overflow-x:hidden;
  overflow-x:clip;   /* ← השורה השנייה קריטית */
}
```

`overflow-x: hidden` הופך אלמנט ל**מיכל גלילה**, וכך `.app` הפך לדבר שנגלל
והחלון עצמו לא זז — מה ששבר את `window.scrollTo()` וגם את `position: sticky`.
`overflow-x: clip` מונע גלישה לצדדים בלי ליצור מיכל גלילה. **אין להחזיר ל־hidden.**

### כותרת דביקה
`.subhead` היא `position: sticky; top: 0; z-index: 40`. חץ החזרה הוא שברון
המצביע **ימינה** — נכון לממשק מימין לשמאל, אין "לתקן" אותו לשמאל.

### פרסום שינויים (v73)
אין שרת מאחורי האפליקציה, ולכן עריכה נשמרת רק במכשיר שבו נעשתה. במסך "עזרה
וגיבוי" יש כפתור **הורדת data.json מעודכן** (`exportDataJson()`), הבונה קובץ
data.json שלם ממה שעל המסך — נתוני הקובץ בתוספת כל העריכות המקומיות — ומוריד
אותו. הבעלים מחליף בו את הקובץ שבתיקייה ומבצע Commit ו־Push, וכל המכשירים
מתעדכנים.

**הקובץ המיוצא זהה לקובץ הקיים פרט לעריכות עצמן.** `RAW_DATA` שומר עותק של
data.json כפי שהתקבל, ו־`buildDataJson()` בונה מתוכו ומחליף רק קלפים שנערכו,
נוספו או נמחקו בפועל. טקסטים שהאפליקציה רק מציגה — למשל אלה של יומנים 7–9
שנמצאים ב־index.html — אינם נכתבים לקובץ. כך ה־diff ב־GitHub Desktop קטן וברור. לאחר ההורדה מוצעת ניקוי העריכות המקומיות, כדי שהקובץ שבגיטהאב יהיה
המקור היחיד.

**טלפונים וטאבלטים הם לצפייה בלבד כברירת מחדל.** `isHandheld()` מזהה לפי
user-agent, מסך צר ומגע, ו־`editingAllowed()` מחזיר false כשלא נקבע אחרת
במפורש. במצב זה מוסתרים העיפרון, כפתור המחיקה, "הוספת קלף" וכל אזור הפרסום.
המתג **עריכה במכשיר זה** במסך עזרה וגיבוי דורס לשני הכיוונים ונשמר לכל מכשיר
בנפרד. הסיבה: עריכה בטלפון אינה ניתנת לפרסום — אין שם GitHub Desktop — ולכן
היא הייתה נשארת תקועה במכשיר.

**חשוב:** `applyCardTexts()` תוקן כך שימלא רק שם או הערה **ריקים**. קודם הוא
דרס תמיד, ולכן עריכה לקלף מיומנים 7–9 הייתה נמחקת בטעינה הבאה גם אחרי פרסום.

### מוזיקה
**Beloved** מאת **Sakura Girl**, מוזיקה חופשית לשימוש מ-chosic.com, שמורה
ב-`music/beloved.mp3`. הקובץ המקורי היה 11.85MB ב-320kbps וקודד מחדש ל-96kbps
(3.6MB). קרדיט מופיע במסך "עזרה וגיבוי".

מתנגנת **רק במצגת**. מתחילה בנקודה אקראית בתוך היצירה, עולה מאפס לעוצמה מלאה
במשך שתי שניות, חוזרת בלולאה עד ליציאה, ואז דועכת ב-1.2 שניות.

מנוגנת דרך אלמנט `<audio>` ולא דרך Web Audio API: פענוח יצירה של חמש דקות
לזיכרון היה עולה מעל 100MB בטלפון, בעוד שהאלמנט משדר אותה.

**ה-service worker מגיש את `/music/` מהמטמון קודם** ולא network-first, אחרת
3.6MB היו יורדים בכל הפעלת מצגת.

**דילוג לנקודה אקראית דורש תמיכת Range מהשרת.** GitHub Pages תומך. אם אין
תמיכה, הנגינה פשוט מתחילה מההתחלה — נפילה רכה, לא תקלה.

### מחיקת קלף
כפתור "מחיקת הקלף" בתחתית מסך הקלף מבקש סיסמה. `checkDeletePass()` משווה
לגיבוב ב־`DEL_PASS_HASH`. **זו הגנה מפני מחיקה בשוגג בלבד, לא אבטחה** —
`index.html` ציבורי וכל אחד יכול לקרוא את הקוד. אין לשים שם סוד אמיתי.
המחיקה נשמרת ב־localStorage תחת `deletedCards`, כלומר היא מקומית למכשיר בדיוק
כמו עריכה; `data.json` אינו משתנה. ניתן לבטל מיד דרך פעולת ה־Undo.

### שמירת שינויים
`saveEdit()` ו־`saveNewCard()` כותבים ל־localStorage תחת `cardEdits` ו־
`addedCards`. `restoreCardChanges()` מחיל אותם בסוף `loadData()`. `data.json`
נשאר מקור האמת; האחסון המקומי הוא שכבה מעליו בלבד.

### נקודות ציון
`APP_VERSION` (~שורה 798) · `imgURL(no)` · `openBook(id)` · `attachImgLoaders()` ·
`hideBootLoader()` · `CARD_TEXTS_7_9` (~שורה 807).

## 8. גרסאות — בכל שינוי

שני מספרים, שניהם חייבים לעלות:

1. **`APP_VERSION` ב־`index.html`** — מוצג בתחתית מסך הבית. כך הבעלים מוודא
   שהעדכון הגיע.
2. **`CACHE` ב־`sw.js`** — מאלץ עותקים מותקנים לזרוק קבצים מהמטמון.

ה־service worker הוא network-first: מי שמחובר לרשת מקבל תמיד את הגרסה החדשה.

## 9. מסירת עבודה

**תמיד קובץ ZIP אחד** שמבנה התיקיות שבתוכו זהה לשורש המאגר, כדי שאפשר יהיה
לחלץ ולהעתיק ישירות. לכלול רק קבצים שהשתנו.

**לאמת לפני מסירה.** יש דפדפן ללא ממשק, והוא תפס באגים אמיתיים שקריאת ה־CSS
פספסה. להגיש קובץ סטטי, לפתוח, לחכות ל־`books.length>0`, ולמדוד את התוצאה
בפועל.

## 10. עבודה מול הבעלים

- הבעלים דובר עברית ולרוב מכתיב בקול, ולכן מגיעים שיבושי תמלול. לקרוא דרכם;
  לשאול רק כשהמשמעות באמת משתנה.
- כשהבעלים מתאר התנהגות בממשק — לנסח מחדש במילים פשוטות ולאשר לפני בנייה.
- הבעלים אינו מפתח ואינו רוצה רשימות הוראות. לעשות את העבודה, לאמת, ולמסור
  קובץ אחד.
- להשיב בשפה שבה נכתבה ההודעה.

---
---

# 🇬🇧 English


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
- **`suit`** is one of: `ועדה` (the default), `קהילה`, `בני לוויה`,
  `שקט`, `מועצה`. The app's dropdown (`SUITS` in `index.html`) offers
  `ועדה`, `קהילה`, `בני לוויה`, `מועצה - ארכיטיפים`, `מועצה`, `שקט` — all
  five values in the data are selectable. Note that `מועצה` and
  `מועצה - ארכיטיפים` are two separate entries; the owner may want them merged
  one day.

### The Companions suit (`בני לוויה`)
Assigned by what the **picture** shows, not what the note says: a card is a
Companion only if the collage shows animals and nothing else. Landscape and
any number of animals are fine; a person anywhere in the image, or a man-made
object as a subject, disqualifies it. 114 cards currently carry it.

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
| 7 | 120 | 731–850 | 119 | 1 |
| 8 | 113 | 851–963 | 112 | 1 |
| 9 | 112 | 964–1075 | 112 | 0 |
| 10 | 89 | 1076–1164 | 83 | 6 |
| 11 | 104 | 1165–1268 | 100 | 4 |
| 12 | 98 | 1269–1366 | 97 |
| 13 | 2 | 1367–1368 | 0 | 0 |

**Total: 1,344 cards.**

Journals 7, 8 and 9 now have their notes, but they live in a `CARD_TEXTS_7_9`
constant inside `index.html` rather than in `data.json` — an inconsistency that
still wants fixing. `applyCardTexts()` merges them into `DATA` at load time.

Every card has an image, and every image has a card. No orphans in either
direction.

### Outstanding work
- Journal 12 is due ~30 new cards; images and a Word file are coming.
- Journals 7–9 notes should be migrated from `index.html` into `data.json`.
- Repo clutter to delete: `soulcollage-ira-v52/`, `soulcollage-ira-v55-complete.zip`,
  `pwa_files_v24.zip`, `soulcollage-index-v55.zip`, `guide-full.md`,
  `guide-short.md`. The `הכנת אפליקציה שלי/` folder holds the owner's source
  Word files — copy it out before removing it from the public repo.

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
- **10 Aug 2026** — **v59 / v60.** Fixed `saveEdit()`, which showed a "saved"
  toast but never persisted: edits and added cards now go to `localStorage`
  (`cardEdits`, `addedCards`) and are re-applied by `restoreCardChanges()` at
  the end of `loadData()`. `data.json` stays the source of truth; storage is an
  overlay. Also: new cards get a globally unique `no` instead of a per-book one
  (which could collide across journals); moving a card between journals keeps
  its number instead of renumbering it (renumbering broke the link to
  `images/<no>.jpg`); replacement photos are downscaled to 1400 px / q85 in the
  browser before storing.
- **10 Aug 2026** — Opening hourglass (`#bootLoader`, removed by
  `hideBootLoader()`) plus a per-image hourglass via `attachImgLoaders()`,
  called after every grid and detail render.
- **10 Aug 2026** — All 1,314 card images reviewed by eye; 92 cards set to
  `בני לוויה`, and the 27 older `מלווים` cards renamed to the same value so
  there is only one Companions suit. 114 cards total.
- **12 Aug 2026** — **v63.** Journal 12: cards 1339–1347 added from
  `הערות_ליומן_12.docx` + `1314.zip` (1345 has an image but its Word row was
  empty, so it carries a blank note). The loading indicator was changed from an
  hourglass to a circular ring with a wave sweeping round it (`.sc-spinner`).
  A further 21 images arrived numbered 1438–1458 while their notes were numbered
  1348–1366. **Two different offsets** reconciled them, confirmed by picture
  content rather than by position: images 1448–1458 → cards 1348–1358 (offset
  100; card 1352 "שטויות במיץ תפוזים" shows a boy with an orange, 1349 shows
  turtles, 1358 shows Jupiter), and images 1438–1444 → cards 1360–1366 (offset
  78; 1360 a tiger, 1363 a fairground ride, 1366 a snake). Image 1445 → card
  1359; images 1446–1447 became cards 1367–1368 with no note. Journal 12 is now
  100 cards, 1269–1368.
- **23 Aug 2026** — **v75.** The synthesised music was replaced with a real
  royalty-free track the owner supplied — "Beloved" by Sakura Girl from
  chosic.com — re-encoded from 320kbps/11.85MB to 96kbps/3.6MB and stored at
  `music/beloved.mp3`. Played through an `<audio>` element rather than Web Audio
  (decoding five minutes would cost a phone >100MB), starting at a random offset,
  fading in over two seconds, looping until the slideshow is left. `sw.js` now
  serves `/music/` cache-first so it is not re-downloaded on every run. A credit
  line was added to the Help screen. Note: the random start relies on HTTP range
  requests — a test server without them made every run begin at zero, which is
  what a plain `python3 -m http.server` will do.
- **23 Aug 2026** — **v74.** Handheld devices are now read-only by default via
  `isHandheld()`, rather than relying on the owner to flip the switch on each
  one. The publish section is hidden too, since a phone cannot commit anything.
  The per-device switch still overrides in both directions.
- **23 Aug 2026** — **v73.** The export was rewritten to produce a minimal diff.
  v72 built the file from the in-memory state, which silently pulled the 345
  journal 7–9 notes into data.json on the first publish; the owner wanted the
  data left exactly as it is. `RAW_DATA` now holds data.json as fetched and
  `buildDataJson()` replaces only cards that were genuinely edited, added or
  deleted. Verified: exporting with no edits reproduces the file byte-for-byte,
  and a single edit changes exactly one card.
- **23 Aug 2026** — **v72.** `exportDataJson()` builds a complete data.json from
  the in-memory state and downloads it, so an edit made on the computer can be
  committed and reach every device; it offers to clear the local overlay
  afterwards and warns about any card whose picture is an embedded data URL. A
  per-device `editingAllowed` switch hides the edit, add and delete controls.
  **Bug found while testing this:** `applyCardTexts()` overwrote name and note
  unconditionally, so once a journal 7–9 card's text lived in data.json — which
  the export puts there — any edit to it was silently reverted on the next load.
  It now fills in only empty values, making data.json authoritative.
- **23 Aug 2026** — **v70/v71.** Each play now picks a random transposition,
  arpeggio pattern and starting point, so the same screen never sounds the same
  twice, and every note is scaled by a `soft` factor that rises over the first
  nine seconds so the opening is quiet regardless of the pattern. Then the piano
  was replaced at the owner's request with a marimba-and-hand-drum piece
  (`_marimba()`, `_drum()`) evoking southern African marimba music, and the
  music was **restricted to the slideshow alone** — the card screen and single
  draw are silent again, and the card-header speaker was removed. The owner
  linked a YouTube video as a reference; it was not used, since copying a
  recording is a copyright matter and the sandbox cannot reach YouTube anyway.
- **18 Aug 2026** — **v69.** The music was rewritten from an ambient drone to an
  original piano piece: `_piano()` synthesises a struck tone from five partials
  with a closing filter, and `_tick()` sequences a D-major progression whose
  tempo climbs 66→92 BPM while note density roughly quadruples over the first
  fifty seconds. Extended to the slideshow and the single draw via
  `MUSIC_SCREENS`; switching between those screens does not restart it. A second
  mute button was added over the slideshow. **The brief referenced a well-known
  song — the piece is an original written for the mood, not a reproduction.**
- **12 Aug 2026** — **v68.** Ambient music while a card is open, synthesised
  with the Web Audio API rather than shipped as a file: a low four-note chord
  through a low-pass filter plus sparse random bell tones, fading in over about
  sixteen seconds. Started from `showScreen('cardDetail')` and stopped on every
  other screen and on `visibilitychange`. A speaker button in the card header
  and a toggle in Settings both write `ambientMusic` to localStorage. The first
  fade curve was a single exponential ramp and left it inaudible for six
  seconds, which read as broken — measured in the browser and split into two
  ramps.
- **12 Aug 2026** — **v67.** A "מחיקת הקלף" button on the card screen, gated by
  a prompt checked against `DEL_PASS_HASH`. Deletions persist in localStorage
  under `deletedCards` and are re-applied at the end of `restoreCardChanges()`;
  `data.json` is never touched, so the deletion is per-device and reversible via
  Undo. The button is hidden in read-only share mode. **The gate is a deterrent,
  not security** — the check runs in public client-side code.
- **12 Aug 2026** — **v66.** Journal 13 opened; cards 1367 and 1368 moved into
  it from journal 12, keeping their numbers (numbers are tied to
  `images/<no>.jpg` and are never reassigned). Three things that had been
  hardcoded to twelve journals were made data-driven at the same time: the build
  loop now derives the journal count from `DATA.books` and `DATA.cards`, the
  "N יומנים" label is computed in `renderBooks()`, and `bookColor(id)` wraps the
  palette modulo its length, so a fourteenth journal needs no code change at
  all. A thirteenth colour (`#7A6A4F`) was added.
- **12 Aug 2026** — **v65.** The owner then supplied a correctly numbered image
  set (1269–1366), which confirmed 17 of the 19 inferred placements and
  corrected two: card 1339 is the girl with a turtle flying over a pyramid
  (its note is "הלוואי שצב יעוף"), and card 1354 is the hot-air balloons
  ("אורחים מן השמיים"). The two pictures displaced by that correction became
  1367 and 1368, which carry no note. **Lesson: infer a mapping only to unblock
  work, and re-verify against a numbered set when one arrives.** Companions in
  journal 12 after the correction: 1360, 1362, 1366, 1367.
- **10 Aug 2026** — **v62.** The `על-אישי` suit renamed to `שקט` across all 81
  cards, and the dropdown updated to match. Only the `suit` field changed.
- **10 Aug 2026** — **v61.** `על-אישי` and `מועצה` added to the `SUITS` list so
  every suit present in the data can be chosen from the edit screen. No card
  data changed — before this, opening one of those 89 cards for editing pushed
  the suit into the free-text "custom" box.
