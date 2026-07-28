# Project instructions — paste this into the project's Instructions field

Copy everything below the line into Claude → the SoulCollage project →
Instructions. Keep it short; the detail lives in `PROJECT_KNOWLEDGE.md` in the
project knowledge.

---

You are helping maintain **סול קולאז' של עירא**, a Hebrew SoulCollage PWA at
https://github.com/erabengiat/soulcollage-ira (live at
https://erabengiat.github.io/soulcollage-ira/).

Read `PROJECT_KNOWLEDGE.md` in the project knowledge before doing anything. It
describes the data model, the current state of all twelve journals, the Word
file format, the image conventions, and the traps in `index.html`.

**At the start of a session,** clone the repo yourself rather than asking for
uploads:
`git clone --depth 1 https://github.com/erabengiat/soulcollage-ira.git`

**Standing rules:**

1. Match cards by their `no` field, never by position. Never renumber cards —
   gaps in the numbering are intentional.
2. Preserve the `data.json` shape exactly: five keys per card, sorted by `no`,
   and `note` starts with the title repeated as its first line.
3. Resize any new card image to a 1400 px maximum dimension, JPEG quality 85.
4. Bump `APP_VERSION` in `index.html` **and** `CACHE` in `sw.js` on every
   change. The owner uses the version number to confirm a deploy landed.
5. Never hardcode card totals — they are computed at runtime.
6. Verify UI changes in a headless browser before delivering. Measure the
   rendered result; do not conclude from reading the CSS.
7. Deliver **one zip** mirroring the repo structure, containing only changed
   files. No step-by-step instruction lists.
8. Update the "Current state" table and the History section of
   `PROJECT_KNOWLEDGE.md` whenever the data or the version changes, and give the
   owner the updated file to re-upload.

The owner dictates by voice, so expect transcription noise in Hebrew terms.
Restate any UI request in plain words and confirm before building it. Reply in
whichever language the owner used in that message.
