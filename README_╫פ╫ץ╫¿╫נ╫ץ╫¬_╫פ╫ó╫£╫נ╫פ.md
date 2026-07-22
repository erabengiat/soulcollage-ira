# העלאת "סול קולאז' של עירא" ל-GitHub Pages
# Uploading the app to GitHub Pages

## מה יש בחבילה / What's in the package
- `index.html` — האפליקציה (קלה, ~40KB)
- `data/data.json` — כל הנתונים: שמות, הערות, סדרות (466 קלפים)
- `images/` — כל 466 התמונות (קבצים נפרדים, נטענות לפי הצורך)
- `manifest.json`, `icon-192.png`, `icon-512.png` — קבצי PWA (להתקנה בטלפון)
- `.nojekyll` — קובץ טכני שגורם ל-GitHub להגיש את הקבצים כמו שהם

---

## שלב-אחר-שלב / Step by step

### 1. פתיחת חשבון GitHub (אם אין)
- היכנסו ל-https://github.com והירשמו (חינם).

### 2. יצירת מאגר חדש (repository)
- לחצו על **+** בפינה הימנית העליונה → **New repository**
- שם המאגר: למשל `sole-collage-era`
- סמנו **Public**
- לחצו **Create repository**

### 3. העלאת הקבצים
- במאגר החדש, לחצו **Add file → Upload files**
- **גררו את כל התוכן של תיקיית `github_site`** (index.html, data/, images/, manifest.json, האייקונים, .nojekyll)
- חשוב: לשמור על מבנה התיקיות — `data/data.json` ו-`images/1.jpg` וכו'
- לחצו **Commit changes**
- (אם יש הרבה תמונות, אפשר להעלות בקבוצות — קודם index.html + manifest + icons + data/, ואז את images/ בכמה קבוצות)

### 4. הפעלת GitHub Pages
- במאגר → **Settings** → בתפריט הצד **Pages**
- תחת **Source** בחרו **Deploy from a branch**
- **Branch:** `main` , תיקייה `/ (root)` → **Save**
- המתינו כ-1–2 דקות

### 5. הכתובת שלכם
- GitHub ייתן כתובת כמו:
  `https://<שם-המשתמש>.github.io/sole-collage-era/`
- זו הכתובת של האפליקציה! פתחו אותה בדפדפן.

### 6. התקנה על אנדרואיד
- פתחו את הכתובת ב-**Chrome** בטלפון
- יופיע פס "להתקין את האפליקציה?" → **התקנה**
- (או תפריט Chrome → **התקן אפליקציה / הוסף למסך הבית**)
- האפליקציה תופיע כאייקון על מסך הבית, במסך מלא.

### 7. שיתוף
- פשוט שלחו את הכתובת (מסעיף 5) לכל אחד — הם יוכלו לפתוח ולהתקין גם כן.

---

## הוספת ספרים בעתיד / Adding more books later
כשנוסיף ספרים חדשים:
1. נוסיף את התמונות ל-`images/`
2. נעדכן את `data/data.json`
3. תעלו מחדש את שני אלה ל-GitHub — וזהו.

**אין צורך לגעת ב-index.html** — הוא טוען הכל אוטומטית מ-data.json.

---

## English quick version
1. Create a free GitHub account and a new **public** repo (e.g. `sole-collage-era`).
2. **Upload files** — drag the entire contents of the `github_site` folder (keep the `data/` and `images/` subfolders intact).
3. **Settings → Pages → Deploy from branch → main → / (root) → Save.**
4. Your app is live at `https://<username>.github.io/sole-collage-era/`.
5. On Android Chrome, open it and tap **Install** to add it to your home screen.
6. Share the URL with anyone.

To add books later: add images to `images/`, update `data/data.json`, re-upload. No need to touch `index.html`.
