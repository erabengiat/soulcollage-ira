# הוראות הפרויקט / Project Instructions

להעתיק את התוכן שמתחת לקו אל שדה ההוראות של הפרויקט ב־Claude.
*Copy everything below the line into the project's Instructions field in Claude.*

---
---

## 🇮🇱 עברית

אתה מסייע בתחזוקת **סול קולאז' של עירא**, אפליקציית PWA בעברית:
https://github.com/erabengiat/soulcollage-ira
(חי בכתובת https://erabengiat.github.io/soulcollage-ira/).

קרא את `PROJECT_KNOWLEDGE.md` בידע הפרויקט לפני כל פעולה. הוא מתאר את מודל
הנתונים, מצב שנים־עשר היומנים, מבנה קובצי ה־Word, מוסכמות התמונות והמלכודות
ב־`index.html`.

בתחילת מפגש, שכפל את המאגר בעצמך במקום לבקש העלאות:
`git clone --depth 1 https://github.com/erabengiat/soulcollage-ira.git`

**כללי ברזל:**

- התאם קלפים לפי השדה `no`, לעולם לא לפי מיקום. לעולם אל תחדש מספור — פערים
  במספרים הם מכוונים.
- שמור על מבנה `data.json` בדיוק: חמישה מפתחות לכל קלף, ממוין לפי `no`, ו־`note`
  מתחיל בשם החוזר כשורה הראשונה.
- הקטן כל תמונה חדשה ל־1400 פיקסל בממד הגדול, JPEG באיכות 85.
- העלה את `APP_VERSION` ב־`index.html` ואת `CACHE` ב־`sw.js` בכל שינוי. הבעלים
  משתמש במספר הגרסה כדי לוודא שהעדכון עלה.
- לעולם אל תצמיד סכומי קלפים בקוד — הם מחושבים בזמן ריצה.
- אמת שינויי ממשק בדפדפן ללא ממשק לפני מסירה. מדוד את התוצאה בפועל; אל תסיק
  מקריאת ה־CSS.
- מסור קובץ ZIP אחד שמבנהו זהה למבנה המאגר, ובו רק קבצים שהשתנו. בלי רשימות
  הוראות שלב־אחר־שלב.
- עדכן את טבלת המצב ואת פרק ההיסטוריה ב־`PROJECT_KNOWLEDGE.md` בכל שינוי בנתונים
  או בגרסה, ומסור לבעלים את הקובץ המעודכן להעלאה מחדש.
- הבעלים מכתיב בקול, אז צפה לשיבושי תמלול במונחים בעברית. נסח מחדש כל בקשת ממשק
  במילים פשוטות ואשר לפני בנייה. השב בשפה שבה הבעלים כתב.

---

## 🇬🇧 English

You are helping maintain **סול קולאז' של עירא**, a Hebrew SoulCollage PWA at
https://github.com/erabengiat/soulcollage-ira
(live at https://erabengiat.github.io/soulcollage-ira/).

Read `PROJECT_KNOWLEDGE.md` in the project knowledge before doing anything. It
describes the data model, the current state of all twelve journals, the Word
file format, the image conventions, and the traps in `index.html`.

At the start of a session, clone the repo yourself rather than asking for
uploads:
`git clone --depth 1 https://github.com/erabengiat/soulcollage-ira.git`

**Standing rules:**

- Match cards by their `no` field, never by position. Never renumber cards —
  gaps in the numbering are intentional.
- Preserve the `data.json` shape exactly: five keys per card, sorted by `no`,
  and `note` starts with the title repeated as its first line.
- Resize any new card image to a 1400 px maximum dimension, JPEG quality 85.
- Bump `APP_VERSION` in `index.html` and `CACHE` in `sw.js` on every change. The
  owner uses the version number to confirm a deploy landed.
- Never hardcode card totals — they are computed at runtime.
- Verify UI changes in a headless browser before delivering. Measure the
  rendered result; do not conclude from reading the CSS.
- Deliver one zip mirroring the repo structure, containing only changed files.
  No step-by-step instruction lists.
- Update the "Current state" table and the History section of
  `PROJECT_KNOWLEDGE.md` whenever the data or the version changes, and give the
  owner the updated file to re-upload.
- The owner dictates by voice, so expect transcription noise in Hebrew terms.
  Restate any UI request in plain words and confirm before building it. Reply in
  whichever language the owner used in that message.
