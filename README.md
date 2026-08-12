# סול קולאז' של עירא — מדריך מרכזי / Central Handout

**גרסה / Version:** v67 · **עודכן / Updated:** 12 באוגוסט 2026

*עברית למטה בחלק הראשון · English in the second half*

---
---

# 🇮🇱 עברית

## מה זו האפליקציה

בית דיגיטלי לאוסף קלפי הסול־קולאז' של עירא. כל קלף הוא יצירת קולאז' — תמונה, שם,
והערה שעירא כתבה בקולה שלה. האוסף מחולק ל־13 יומנים.

- **כתובת האפליקציה:** https://erabengiat.github.io/soulcollage-ira/
- **המאגר בגיטהאב:** https://github.com/erabengiat/soulcollage-ira

זו אפליקציית PWA — אפשר להתקין אותה על מסך הבית של הטלפון, והיא עובדת גם בלי
אינטרנט (מהזיכרון המקומי).

## מצב האוסף

| | |
|---|---|
| סה"כ קלפים | 1,344 |
| יומנים | 13 |
| קלפים עם הערה | 1,288 |
| תמונות | 1,314 — לכל קלף יש תמונה, ולכל תמונה יש קלף |

### קלפים לפי יומן

| יומן | קלפים | טווח מספרים | עם הערה |
|---|---|---|---|
| 1 | 139 | 1–142 | 132 |
| 2 | 134 | 143–282 | 130 |
| 3 | 107 | 283–390 | 106 |
| 4 | 104 | 400–505 | 103 |
| 5 | 110 | 506–615 | 109 |
| 6 | 112 | 616–729 | 112 |
| 7 | 120 | 731–850 | 119 |
| 8 | 113 | 851–963 | 112 |
| 9 | 112 | 964–1075 | 112 |
| 10 | 89 | 1076–1164 | 83 |
| 11 | 104 | 1165–1268 | 100 |
| 12 | 98 | 1269–1366 | 97 |
| 13 | 2 | 1367–1368 | 0 |

### הסדרות (Suits)

| סדרה | קלפים | משמעות |
|---|---|---|
| ועדה | 1,069 | ברירת המחדל |
| בני לוויה | 118 | קלפים שבתמונה שלהם יש **רק בעלי חיים** |
| שקט | 81 | |
| קהילה | 68 | |
| מועצה | 8 | |

**הכלל של בני לוויה:** ההחלטה היא לפי **התמונה**, לא לפי ההערה. קלף שייך לסדרה
רק אם בקולאז' מופיעים בעלי חיים ותו לא. נוף, ים, עצים ושמיים — בסדר. יותר מחיה
אחת — בסדר. אדם כלשהו בתמונה, או חפץ מעשה ידי אדם כנושא — מוציא את הקלף מהסדרה.

## מה אפשר לעשות באפליקציה

- **היומנים** — עיון בכל יומן, הקלפים מסודרים לפי מספר
- **חיפוש קלף** — לפי שם או הערה
- **שליפת קלף** — שליפה אקראית, כמו קריאה בקלפים
- **הוספת קלף** — צילום או בחירת תמונה, שם, הערה וסדרה
- **עריכת קלף** — שינוי שם, הערה, סדרה, יומן או תמונה
- **מחיקת קלף** — בתחתית מסך הקלף, מוגן בסיסמה. המחיקה מקומית למכשיר בלבד
- **קישור לצפייה** — קישור לחברים לצפייה בלבד, בלי אפשרות לערוך
- **גיבוי** — ייצוא וייבוא של כל השינויים לקובץ

## איפה נשמרים השינויים — חשוב להבין

יש **שתי שכבות**:

1. **`data/data.json` במאגר** — המקור הרשמי של האוסף. משם מגיעים כל 1,314
   הקלפים. שינוי כאן מגיע לכל מי שפותח את האפליקציה.
2. **הזיכרון המקומי של המכשיר** — כל עריכה או הוספה שנעשית **בתוך האפליקציה**
   נשמרת רק במכשיר הזה. היא מוצגת מעל הנתונים מהקובץ, אבל אינה מגיעה לאף אחד
   אחר, ותיעלם אם מנקים את נתוני האתר בדפדפן.

לכן: עריכות קטנות — בתוך האפליקציה. תוספות גדולות (יומן שלם, עשרות קלפים) —
דרך עדכון `data.json` ודחיפה לגיטהאב.

**כדאי לייצא גיבוי** (עזרה וגיבוי ← ייצוא) לפני ניקוי נתוני דפדפן או החלפת מכשיר.

## איך מוסיפים קלפים חדשים

1. מכינים קובץ Word עם טבלה של שתי עמודות: מספר הקלף מימין, ובתא השני —
   פסקה ראשונה = שם הקלף, הפסקאות הבאות = ההערה.
2. מכינים ZIP של התמונות, כל תמונה בשם מספר הקלף: `1339.jpg`, `1340.jpg`…
3. שולחים את שניהם. התמונות יוקטנו ל־1400 פיקסל, הנתונים ימוזגו, ותקבלו קובץ
   ZIP אחד לפריסה על תיקיית המאגר.
4. פותחים GitHub Desktop → **Commit to main** → **Push origin**.

**שתי הפעולות נחוצות.** בלי Push שום דבר לא מגיע לאוויר.

## איך יודעים שעדכון הצליח

בתחתית מסך הבית מופיע מספר הגרסה. אם כתוב שם המספר החדש — העדכון עלה.
אם מופיע המספר הישן, כנראה שה־Push לא בוצע.

בדיקה ישירה של מה שבאמת נמצא במאגר:
`https://raw.githubusercontent.com/erabengiat/soulcollage-ira/main/index.html`

## אם משהו משתבש

כל שינוי הפיך. בגיטהאב, בעמוד הקומיט, יש כפתור **Revert**. לחיצה עליו מחזירה
את המצב הקודם, והאפליקציה חוזרת לעצמה תוך דקה או שתיים.

---
---

# 🇬🇧 English

## What this application is

A digital home for Ira's SoulCollage card collection. Each card is a collage —
a picture, a name, and a note written in Ira's own voice. The collection is
divided into 13 journals.

- **Live app:** https://erabengiat.github.io/soulcollage-ira/
- **Repository:** https://github.com/erabengiat/soulcollage-ira

It is a Progressive Web App: installable to a phone's home screen, and it works
offline from its local cache.

## State of the collection

| | |
|---|---|
| Total cards | 1,344 |
| Journals | 13 |
| Cards with a note | 1,288 |
| Images | 1,314 — every card has one, every image has a card |

### Cards per journal

| Journal | Cards | Number range | With notes |
|---|---|---|---|
| 1 | 139 | 1–142 | 132 |
| 2 | 134 | 143–282 | 130 |
| 3 | 107 | 283–390 | 106 |
| 4 | 104 | 400–505 | 103 |
| 5 | 110 | 506–615 | 109 |
| 6 | 112 | 616–729 | 112 |
| 7 | 120 | 731–850 | 119 |
| 8 | 113 | 851–963 | 112 |
| 9 | 112 | 964–1075 | 112 |
| 10 | 89 | 1076–1164 | 83 |
| 11 | 104 | 1165–1268 | 100 |
| 12 | 98 | 1269–1366 | 97 |
| 13 | 2 | 1367–1368 | 0 |

### The suits

| Suit | Cards | Meaning |
|---|---|---|
| ועדה | 1,069 | the default |
| בני לוויה | 118 | cards whose picture shows **animals only** |
| שקט | 81 | |
| קהילה | 68 | |
| מועצה | 8 | |

**The Companions rule:** decided by the **picture**, not the note. A card
qualifies only if the collage shows animals and nothing else. Landscape — sea,
trees, sky — is fine. Any number of animals is fine. A person anywhere in the
image, or a man-made object as a subject, disqualifies it.

## What the app does

- **Journals** — browse each journal, cards ordered by number
- **Search** — by name or note text
- **Draw a card** — a random draw, like a reading
- **Add a card** — photo or gallery image, name, note, suit
- **Edit a card** — name, note, suit, journal, or picture
- **Delete a card** — at the bottom of the card screen, password-protected. The deletion is local to that device only
- **Share link** — a view-only link for friends; they cannot edit
- **Backup** — export and import all local changes as a file

## Where changes are saved — important

There are **two layers**:

1. **`data/data.json` in the repository** — the official source. All 1,314
   cards come from here. A change here reaches everyone who opens the app.
2. **The device's local storage** — any edit or addition made **inside the app**
   is saved on that device only. It is layered on top of the file data, but it
   never reaches anyone else, and it is lost if browser site data is cleared.

So: small corrections — inside the app. Large additions (a whole journal, dozens
of cards) — through a `data.json` update pushed to GitHub.

**Export a backup** (Help & Backup → Export) before clearing browser data or
changing devices.

## Adding new cards

1. Prepare a Word file with a two-column table: card number in the first column;
   in the second cell, the first paragraph is the card's name and the following
   paragraphs are the note.
2. Prepare a ZIP of images named by card number: `1339.jpg`, `1340.jpg`…
3. Send both. Images are downscaled to 1400 px, data is merged, and you get back
   a single ZIP to extract over the repository folder.
4. In GitHub Desktop: **Commit to main**, then **Push origin**.

**Both steps are required.** Without the push, nothing goes live.

## Confirming an update landed

The version number appears at the bottom of the home screen. If it shows the new
number, the update is live. If it still shows the old one, the push probably did
not happen.

To check what is genuinely in the repository:
`https://raw.githubusercontent.com/erabengiat/soulcollage-ira/main/index.html`

## If something breaks

Every change is reversible. On GitHub, open the commit and press **Revert**. The
previous state returns and the app follows within a minute or two.
