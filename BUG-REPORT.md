# Bug Report — Sprint 1

## CRITICAL

### BUG-1: Mobile hamburger menu has no backdrop overlay
- **Section:** All (navigation)
- **Severity:** CRITICAL
- **Description:** On mobile (375px), when hamburger menu opens, page content is visible behind it and scrollable. Menu items overlap with section content ("Communication" text bleeds through).
- **Fix:** Add a semi-transparent backdrop overlay behind the mobile menu that closes menu on click.

### BUG-2: Floating "N" button overlaps footer text
- **Section:** Footer (all sections)
- **Severity:** CRITICAL
- **Description:** The floating "N" button in bottom-left covers the footer copyright text. Footer reads "TSH DIWAN" instead of "MAHESH DIWAN" on Education/Contact sections.
- **Fix:** Either remove the "N" button or reposition it above the footer text.

## HIGH

### BUG-3: Hero light mode — stats bar and social links invisible during typing
- **Section:** Hero (light mode)
- **Severity:** HIGH
- **Description:** When typing effect is in progress, the stats bar, social links, and "Race Engineer" subtitle are completely invisible. On light mode especially this looks broken — large empty space below the name.
- **Fix:** Show stats bar and social links with a fade-in after typing completes, not hidden entirely.

### BUG-4: Projects section — Repo links show broken link icon
- **Section:** Projects
- **Severity:** HIGH
- **Description:** "Repo" links display as "🔗 Repo" with a broken/missing link icon character instead of a proper icon.
- **Fix:** Use lucide-react ExternalLink icon or SVG instead of the emoji character.

### BUG-5: Contact section — X channel shows Instagram handle
- **Section:** Contact
- **Severity:** HIGH
- **Description:** The X (Twitter) channel shows "@mahesh_diwan1" which is the same as the Instagram handle. This is likely incorrect data.
- **Note:** This is a portfolioConfig data issue — do NOT modify portfolioConfig. Flag to user.

## MEDIUM

### BUG-6: Education P3 card has no colored top border
- **Section:** Education
- **Severity:** MEDIUM
- **Description:** P1 (First) has yellow top border, P2 (Second) has orange, but P3 (Third) has no colored accent border. Looks inconsistent.
- **Fix:** Add a subtle accent color to P3 card (e.g., white or light gray).

### BUG-7: Skills DRS/OVERTAKE labels unclear
- **Section:** Skills
- **Severity:** MEDIUM
- **Description:** "DRS" and "OVERTAKE" labels are small and may confuse non-F1 fans. They serve as the easter egg trigger buttons but their purpose isn't clear.
- **Fix:** Keep as-is (intentional F1 theme), but consider adding a subtle tooltip or title attribute.

### BUG-8: Footer gradient lines too thin
- **Section:** Footer
- **Severity:** MEDIUM
- **Description:** The colored gradient lines in the footer are very thin (1-2px) and hard to see, especially in light mode.
- **Fix:** Increase line thickness to 2-3px for better visibility.

## LOW

### BUG-9: LAP progress bar — no clear purpose
- **Section:** Global (bottom right)
- **Severity:** LOW
- **Description:** "0% LAP" indicator in bottom right has no clear function. It shows scroll progress but labeled as "LAP" which is confusing.
- **Fix:** Either make it functional (show actual scroll %) or remove it.

### BUG-10: Mobile contact cards — X channel label very small
- **Section:** Contact (mobile)
- **Severity:** LOW
- **Description:** On mobile, the channel labels (GITHUB, LINKEDIN, etc.) are small and hard to read.
- **Fix:** Already scaled to 12px in text scale task. Acceptable.

### BUG-11: Online status indicator overlaps search icon (light mode)
- **Section:** Navigation (light mode)
- **Severity:** LOW
- **Description:** In light mode, the "ONLINE" status text appears to overlap slightly with the search (K) button area.
- **Fix:** Add proper spacing between search button and online indicator.
