# Sprint 2 Bug Report

## Overall Summary

All sections render correctly across both themes (dark/light) and mobile view. Navigation works properly. The only confirmed bug is a missing favicon causing a 404 console error. All other sections display correctly with no visual glitches, overlap issues, or broken interactions.

---

## Bug 1: Missing favicon.svg — 404 Console Error
- **Severity:** LOW
- **Section:** Header / Browser Tab
- **Description:** The browser fails to load `favicon.svg` at the path `/f1-portfolio/favicon.svg`, resulting in a 404 error on every page load. This also triggers a PWA manifest warning: "Error while trying to use the following icon from the Manifest."
- **Console Output:**
  ```
  [ERROR] Failed to load resource: the server responded with a status of 404 (Not Found) @ http://localhost:3000/f1-portfolio/favicon.svg
  [WARNING] Error while trying to use the following icon from the Manifest: http://localhost:3000/f1-portfolio/favicon.svg (Download error or resource isn't a valid image)
  ```
- **Fix:** Either add a `favicon.svg` file to the `public/` directory, or update the manifest and `<link rel="icon">` reference in `layout.tsx` to point to an existing favicon file (e.g., `favicon.ico` or a different SVG path).

---

## Bug 2: Education Section — Duplicate "CGPA:" Label
- **Severity:** LOW
- **Section:** Education — Bachelor of Engineering card
- **Description:** The CGPA display reads `"CGPA: CGPA: 8.7 / 10"` — the word "CGPA:" is duplicated. This is visible in the snapshot at ref `e202`.
- **Fix:** Remove one instance of the "CGPA:" prefix in the education data or component template. Either the data includes the label and the component adds it, or vice versa — only one should be present.

---

## Sections Tested — No Issues Found

| Section | Desktop Dark | Desktop Light | Mobile Dark |
|---------|-------------|---------------|-------------|
| Profile (Hero) | OK | OK | OK |
| Experience | OK | OK | OK |
| Education | OK | OK | — |
| Projects (incl. Details expand) | OK | OK | OK |
| Skills | OK | OK | — |
| Contact | OK | OK | OK |
| Theme Toggle | OK | OK | OK |
| Hamburger Menu | — | — | OK |
| Footer | OK | OK | OK |

## Notes
- All animations and transitions are smooth
- Progress bars and stats render correctly
- Project "Details" expand/collapse works as expected
- Mobile navigation opens/closes properly
- Theme persistence works across navigation
- No contrast issues or readability problems detected
- All external links (GitHub, LinkedIn, Instagram, email) have correct URLs
- Resume PDF link points to correct file
