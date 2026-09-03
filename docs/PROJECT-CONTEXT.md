# Clean-Cycle — Project Context

> Persistent source of truth for future Claude Code sessions.
> Keep this concise and current. Update it whenever a meaningful decision changes
> architecture, scope, file structure, technology, or project status.
> **Do not** put secrets, passwords, API keys, or credentials in this file.

---

## 1. Project Identity

**Title:** "Clean-Cycle: A Web-Based Laundry Booking System with Pick-up and Delivery Service for D'Cassini Laundry Shop"

Clean-Cycle is a **frontend-only web prototype** for D'Cassini Laundry Shop. It is a
student project. There is no backend at this stage.

## 2. Group and Roles

**Group:** SYNAPSE

| Member | Role |
|---|---|
| Jerson E. Tomas | Project Manager / UI/UX |
| Chadwick | UI/UX |
| Jayrence | Researcher |
| Jhon Jhon | Researcher |
| Lian | Developer |
| Andrey | Developer |

This context document is maintained by Lian (developer).

## 3. Current Milestone / Deadline

**Week 5 — "Frontend Project Setup and Code Repository"**
**Deadline: September 5, 2026.**

The PM (Jerson) prepares the PDF submission (screenshots, project info, member
contributions, repo link). Prioritize practical completion of the actual Week 5
requirements over polish or over-engineering.

## 4. Project Purpose and Scope

Provide D'Cassini Laundry Shop with an online booking experience covering:

- Online booking
- Pickup & delivery scheduling
- Order status tracking
- Digital record-keeping
- Admin dashboard
- Transaction & sales summary

**Scope now:** a frontend prototype using static / dummy / mock data. The UI may
*visually represent* advanced features, but they remain mock/non-functional.

## 5. Approved Technology Stack

- HTML5, CSS3, JavaScript
- Vue.js (Vue 3)
- Figma (design)

**Current implementation:** Vue 3 + Vite + JavaScript + Vue Router + plain CSS
(scoped styles in components).

## 6. Explicitly Out of Scope

Do **not** introduce or implement any of the following at this stage:

- React, Angular, or other UI frameworks
- Laravel, PHP, Node.js backend/runtime architecture
- Firebase, Supabase, MySQL, or any database
- Real APIs / backend APIs
- Real authentication or real customer accounts
- Real payment processing or payment gateways
- Real GPS / live tracking / logistics tracking
- Real booking persistence
- State-management library (Vuex/Pinia) — not needed yet
- Extra dependencies/libraries without a clear need **and** approval

Node.js is present only because Vite/npm require it for frontend tooling.

## 7. Figma Source

- File: SYNAPSE__Week4_HighFidelityDesign (Copy)
- URL: https://www.figma.com/design/bUdiQKT2JDZ6IcgpYHT4Zj/SYNAPSE__Week4_HighFidelityDesign--Copy-
- fileKey: `bUdiQKT2JDZ6IcgpYHT4Zj`
- Access: Figma MCP server (`https://mcp.figma.com/mcp`) is configured and
  authenticated. Inspect the real design with MCP tools — do not guess from the URL.
- Figma account in use: handle `99lian`, seat = **View** (read-only; write/edit
  operations to Figma may be restricted).
- **No Figma Variables or shared styles are defined** in the file — all values are
  raw hex / absolute positioning.

### Homepage / landing frame (immediate design target)

| | |
|---|---|
| Homepage frame node ID | `117:236` |
| Frame name in Figma | `Dash Board Admin/Customer` (misnamed — this **is** the public landing page) |
| Actual purpose | public homepage / landing page (unauthenticated) |
| Size | 1280 × 1516 px, desktop only (no mobile/tablet frame) |
| Identifier | contains hero headline "Quality Laundry Service, Delivered." |
| Header / Top Nav Bar node | `117:237` |
| Hero Section node | `117:255` |
| Services Section node | `117:288` |
| Wash & Fold card node | `117:296` |
| Dry Cleaning card node | `117:314` |

This is **not** the authenticated `Dashboard - Customer` screen (`117:350`).

## 8. Planned Features / Screens

~18 screens in Figma. **Not all are in scope for Week 5.**

**Customer / public:** Home / Landing, Login, Signup, Customer Dashboard, Services,
Booking, Payment, Service Tracking, Profile/Settings, Notifications.

**Admin:** Admin Login, Admin Dashboard, New Record, Booking Management, Customer
Management, Logistics Management, Payment Management, Reports Overview,
Notifications, Admin Profile/Settings.

**Week 5 immediate priority:** the public homepage/landing page plus enough
navigation and reusable components to satisfy the Week 5 checklist.

## 9. Current Implementation Status

**Week 5 public homepage + navigation foundation: IMPLEMENTED (2026-09-04),
not yet committed.**

- Vue 3 project scaffolded with `create-vue` (TypeScript: No, Vue Router: Yes,
  Linter: Yes / oxlint + eslint, experimental: No). Starter/example code was
  cleaned up and committed ("Clean up Vue starter project") and pushed.
- **Public homepage** (`src/views/HomeView.vue`) built from Figma frame `117:236`:
  hero section (headline, supporting text, "Book Now" CTA, hero image) + "Our
  Core Services" section with two `ServiceCard`s (Wash & Fold, Dry Cleaning).
  Social-proof row omitted by decision (empty in Figma).
- **`AppNavbar.vue`** (renamed from `Navbar.vue` to satisfy the
  `vue/multi-word-component-names` lint rule) reworked to match Figma: logo icon
  + `CLEAN-CYCLE` wordmark,
  center links (Home / Services / Book Now), right actions (Login / Sign Up).
  Public landing nav uses "Home" (not Figma's "Dashboard"). Responsive: stacks
  under 768px.
- **New reusable components:** `ServiceCard.vue`, `BaseButton.vue` (router-link
  styled as filled/outline button, sm/lg), `PagePlaceholder.vue` (shared shell
  for the placeholder pages).
- **Placeholder views** (Week 5 navigation demo only, no real logic):
  `ServicesView.vue`, `BookNowView.vue`, `LoginView.vue`, `SignUpView.vue`.
- **Router** (`src/router/index.js`): routes `/`, `/services`, `/book`, `/login`,
  `/signup` (placeholders lazy-loaded) + scroll-to-top behavior.
- **CSS:** `base.css` replaced with Clean-Cycle design tokens (verified Figma
  colors, radii, shadows, layout vars) + reset; `main.css` replaced with a
  `.container` helper and base heading styles. create-vue default theme /
  dark-mode / two-column `#app` grid removed.
- **Fonts:** Inter + Lexend Tera loaded via Google Fonts `<link>` in
  `index.html` (no npm dependency). `index.html` `<title>` and `<html lang>`
  fixed.
- **Assets:** real Figma assets downloaded via Figma MCP and committed under
  `src/assets/images/` (logo icon, hero photo, two service photos) and
  `src/assets/icons/` (washer + hanger glyphs). "Learn More" arrow is inline SVG.
- `App.vue` renders `<AppNavbar />` + `<RouterView />`.
- Leftover `src/assets/logo.svg` (Vue logo) is unreferenced; left in place.

## 10. Current Folder Structure

```
clean-cycle/
├─ docs/
│  └─ PROJECT-CONTEXT.md        (this file)
├─ public/
│  └─ favicon.ico
├─ src/
│  ├─ assets/
│  │  ├─ base.css               (Clean-Cycle design tokens + reset)
│  │  ├─ main.css               (.container helper + base headings)
│  │  ├─ logo.svg               (leftover Vue logo — unreferenced)
│  │  ├─ images/                (Figma assets: logo-icon.png, hero-laundry.jpg,
│  │  │                          wash-and-fold.jpg, dry-cleaning.jpg)
│  │  └─ icons/                 (wash-fold.svg, dry-cleaning.svg — from Figma)
│  ├─ components/
│  │  ├─ AppNavbar.vue          (reusable — site header)
│  │  ├─ BaseButton.vue         (reusable — filled/outline router-link button)
│  │  ├─ ServiceCard.vue        (reusable — homepage service cards)
│  │  └─ PagePlaceholder.vue    (reusable — shell for placeholder pages)
│  ├─ views/
│  │  ├─ HomeView.vue           (public homepage: hero + services)
│  │  ├─ ServicesView.vue       (placeholder)
│  │  ├─ BookNowView.vue        (placeholder)
│  │  ├─ LoginView.vue          (placeholder)
│  │  └─ SignUpView.vue         (placeholder)
│  ├─ router/
│  │  └─ index.js               (/ , /services, /book, /login, /signup)
│  ├─ App.vue                   (AppNavbar + RouterView)
│  └─ main.js                   (createApp + router)
├─ index.html                   (Clean-Cycle title, Google Fonts link)
├─ vite.config.js               (vue + vueDevTools plugins, "@" -> /src alias)
├─ eslint.config.js / .oxlintrc.json
├─ jsconfig.json
├─ package.json / package-lock.json
└─ README.md
```

Convention: page-level layout lives in `src/views/`, reusable UI in
`src/components/`, routing in `src/router/`.

## 11. Dependencies / Environment

**Runtime deps:** `vue ^3.5.40`, `vue-router ^5.2.0`.
**Dev deps:** vite ^8, @vitejs/plugin-vue, vite-plugin-vue-devtools, eslint 10 +
eslint-plugin-vue + oxlint + eslint-plugin-oxlint, npm-run-all2, globals.

**Environment:**

- Windows 11, VS Code
- Node.js v24.20.0, npm v11.19.0

**PowerShell note:** `npm.ps1` hits an execution-policy error. Use the `.cmd`
shims in PowerShell:

```
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

(The Bash tool can run plain `npm` if needed.)

## 12. Git / Repository

- GitHub: https://github.com/Iyani99/Clean-Cycle.git
- Local: `C:\Users\User\clean-cycle`
- Branch: `main` (tracks `origin/main`, in sync)
- Git identity configured (user: Lian).

Commit history (do **not** rewrite):

```
e61b5a3  Clean up Vue starter project
d52faad  Merge GitHub repository history
a9e4a10  Initialize Clean-Cycle Vue frontend
5ba88ac  Initial commit
```

`.gitignore` excludes `node_modules/`, `dist/`, `.vscode/*` (except
`extensions.json`), logs, `*.local`, caches. `dist/` exists locally as a build
artifact and is untracked (correct).

Commit attribution for AI-assisted commits:
`Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.

## 13. Architecture / Conventions

- Simple, understandable, student-level Vue 3 `<script setup>` SFCs.
- Modular but **not** over-componentized. Create a reusable component only when
  there is a genuine repeated pattern or a clear single responsibility.
- Pages/layout in `views/`, reusable UI in `components/`.
- Scoped `<style>` per component; shared tokens/theme in `src/assets/`.
- No global state library. No backend. No invented features beyond Figma + reqs.
- Mock/static data lives in the frontend (e.g. plain JS objects/arrays), clearly
  marked as dummy data.

## 14. Important Decisions

1. **Frontend-only** for the foreseeable milestones; advanced features are mock UI.
2. Stack locked to Vue 3 + Vite + JS + Vue Router + plain CSS. No additions
   without explicit approval.
3. Reusable components: `AppNavbar`, `BaseButton`, `ServiceCard`, `PagePlaceholder`.
   (`ServiceCard` justified by the two repeated homepage cards; `BaseButton` by
   reuse in navbar + hero + placeholder pages; `PagePlaceholder` by the four
   near-identical placeholder pages.)
4. Homepage implementation target = Figma frame `117:236` (public landing page),
   desktop layout, adapted responsively.
5. Public landing nav label is **"Home"**, not Figma's "Dashboard".
6. **Placeholder routes** for Services / Book Now / Login / Sign Up — demonstrate
   working navigation only; no auth / booking / payment logic.
7. Hero **social-proof row omitted** (empty placeholder in Figma, no content).
8. Fonts (Inter, Lexend Tera) loaded via **Google Fonts `<link>`** — not an npm
   dependency.
9. Figma image/icon assets are **downloaded and committed** into `src/assets/`
   (MCP URLs expire ~7 days).
10. Git history is preserved; no force-push / hard reset without prior discussion.

## 15. Known / Resolved Issues

- **Resolved:** create-vue starter code removed and committed.
- **Resolved:** PowerShell npm execution-policy issue — use `npm.cmd`.
- **Resolved:** `index.html` title/lang fixed.
- **Resolved:** create-vue default theme replaced with Clean-Cycle tokens.
- **Note:** Figma seat is View-only; cannot push edits back to Figma.
- **Note:** Fonts load from Google Fonts CDN — needs network on first load;
  acceptable for a student prototype, has a system-font fallback stack.
- **Open (minor):** `src/assets/logo.svg` (Vue logo) is unreferenced; can be
  removed in a later cleanup.
- **Open (minor):** `public/favicon.ico` is still the default Vite favicon.

## 16. Open Questions

- Confirm GitHub collaborators (PM + members + instructor) have been added — this
  is a Week 5 checklist item handled outside the codebase.
- README still needs updating (install/run instructions, project info, screenshots).
- PM to collect screenshots of the working homepage and project structure.
- Decide whether member contributions need specific commit authorship split.

## 17. Week 5 Requirements (Checklist)

- [ ] GitHub repository (exists: Iyani99/Clean-Cycle)
- [ ] PM and members added as collaborators
- [ ] Instructor access confirmed
- [x] Frontend initialized with approved technology (Vue 3 + Vite)
- [x] Organized folder/file structure
- [x] Working homepage/landing screen based on the approved Figma design
- [x] Functional navigation between completed pages/sections (Home + 4 placeholders)
- [x] At least 2 reusable components (AppNavbar, BaseButton, ServiceCard, PagePlaceholder)
- [ ] Updated README (installation/run instructions, project info)
- [ ] Screenshots of working homepage and project structure (PM collects)
- [ ] Meaningful commits (implementation done locally, not yet committed)
- [ ] Member contributions through their own accounts where possible
- [x] No secrets / API keys in the repo
- [ ] PM prepares PDF submission

## 18. Current Stopping Point

**As of 2026-09-04:**

- Figma homepage (`117:236`) inspected via MCP; assets downloaded and committed.
- Public homepage + navbar + `BaseButton` / `ServiceCard` / `PagePlaceholder`
  + 4 placeholder views + router + Clean-Cycle CSS theme implemented.
- `npm.cmd run build` passes; lint passes.
- **Changes are NOT committed or pushed** — awaiting Lian's review.
- Remaining for Week 5: update README, collect screenshots (PM), make meaningful
  commits, confirm collaborators/instructor access.

## 19. Future Development Phases

1. **Week 5 (now, remaining):** Update README; screenshots; meaningful commits;
   confirm GitHub collaborators + instructor access.
2. **Next:** Flesh out public pages (Services, Booking, Login/Signup) with mock
   data and mock interactions.
3. **Later:** Customer dashboard and tracking screens (mock).
4. **Later:** Admin side (dashboard, management screens, reports) with mock data.
5. **Throughout:** Keep this document updated on meaningful decisions.

---

## Appendix A — Figma Homepage Findings (frame `117:236`)

Verified via Figma MCP (`get_metadata`, `get_screenshot`, `get_variable_defs`,
`get_design_context`) on 2026-09-04.

### Layout / section order

1. **Header / Top Nav Bar** (`117:237`) — 1280 × 74, white, 1px bottom border
   `#C3C6D5`, drop shadow `0 1px 1px rgba(0,0,0,0.05)`.
2. **Hero Section** (`117:255`) — 1280 × 760, padding `80px 24px`, two columns,
   40px gap.
3. **Services Section** (`117:288`) — 1280 × 682, white, 1px top border
   `#E0E3E5`, padding `62px` top / `100px` bottom.

No footer, testimonials, or "how it works" section in this frame.

### Header / navigation

- **Logo:** `CLEAN-CYCLE` wordmark + droplet/cycle icon. "CLEAN" `#2B78B3`,
  "-" `#003C90`, "CYCLE" `#3199C1`. Font **Lexend Tera Black**, 16px/24px.
- **Center nav** (Inter 12px, letter-spacing 0.6px):
  - `Dashboard` — active state (bold, `#003C90`, 2px bottom border)
  - `Services`
  - `Book Now`
  - (a 4th empty link node — likely placeholder)
- **Right actions:**
  - `Login` — outline button, `#003C90` border + text, radius 8px, padding `9px 17px`
  - `Sign Up` — filled `#003C90`, white text, radius 8px, padding `8px 16px`

> Note: the visible active nav label is "Dashboard", but the frame is the public
> landing page. For our public homepage the equivalent should read "Home".

### Hero section

| Element | Detail |
|---|---|
| Headline | "Quality Laundry Service, Delivered." — Inter Bold, 48px / 56px line, tracking −0.96px, color `#191C1E`, container 596px |
| Supporting text | "Experience the convenience of professional wash, fold, and dry cleaning services right at your doorstep. We handle the dirty work so you don't have to." — Inter Regular 16px / 26px, `#434653`, max-width 512px |
| CTA | "Book Now" — filled `#003C90`, white Inter Bold 16px, radius 8px, ~169 × 60px, shadow `0 4px 10px rgba(15,23,42,0.05)` |
| Social-proof row | Divider (1px top border `#E0E3E5`) + two overlapping 40px avatar circles + a caption line. **Empty placeholders in the design.** |
| Hero image | Folded white towels + pastel laundry stacks on wood. Card 596 × 600, radius 12px, 1px border `#E0E3E5`, shadow `0 4px 20px rgba(15,23,42,0.05)`. |

### Services section

Header (centered, max-width 672px):

- Title "Our Core Services" — Inter SemiBold 32px / 32px, tracking −0.24px, `#000`.
- Subtitle "We take care of your clothes with reliable cleaning services that keep
  them fresh, clean, and ready to wear." — Inter Regular 16px / 26px, `#434653`.

Two cards, 480px wide, 24px gap, height 406px. Card: bg `#F7F9FB`, 1px border
`#E0E3E5`, radius 12px. Internal layout uses absolute positioning in Figma —
rebuild with normal flow.

| | Wash & Fold | Dry Cleaning |
|---|---|---|
| Icon tile | 48px, radius 8px, bg `#2B78B3`, white washer glyph | 48px, radius 8px, bg `#3199C1`, white hanger glyph |
| Title | "Wash & Fold" — Inter SemiBold 24px / 32px, `#191C1E` | "Dry Cleaning" |
| Body | "Everyday laundry washed, expertly dried, and neatly folded. Perfect for t-shirts, jeans, socks, and regular wear." — Inter Regular 14px / 20px, `#434653` | "Professional stain removal and specialized care for delicate fabrics, suits, dresses, and formal wear." |
| Image | 128px tall, radius 8px (folded pastel clothes) | 128px tall, radius 8px (suits on hangers) |
| Link | "Learn More" + arrow icon, Inter Medium 12px, `#2B78B3` | "Learn More" + arrow, `#3199C1` |

### Color tokens (no Figma variables — raw hex)

| Role | Hex |
|---|---|
| Primary brand blue (buttons, active nav) | `#003C90` |
| Secondary blue (logo "CLEAN", Wash & Fold icon, link) | `#2B78B3` |
| Tertiary cyan (logo "CYCLE", Dry Cleaning icon, link) | `#3199C1` |
| Heading text | `#191C1E` |
| Body / muted text | `#434653` |
| Page background | `#F7F9FB` |
| Card background | `#F7F9FB` |
| Section surface | `#FFFFFF` |
| Light border | `#E0E3E5` |
| Header border | `#C3C6D5` |

### Typography

- **Inter** — Bold / SemiBold / Medium / Regular.
  Sizes seen: 48/56, 32/32, 24/32, 16/26, 16/16, 14/20, 12/16.
  Buttons/nav/links use letter-spacing 0.6px; headings use negative tracking.
- **Lexend Tera Black** — logo wordmark only (16/24).
- Neither font is currently loaded in the project.

### Spacing / sizing

- Max content width 1280px; horizontal page padding 24px.
- Hero: padding `80px 24px`, column gap 40px, inner stack gap 24px.
- Services: padding-top 62px, padding-bottom 100px, header→cards gap 40px,
  card gap 24px.
- Radii: 8px (buttons, icon tiles, card images), 12px (hero image, service cards).
- Only a 1280px desktop frame exists — responsive behavior is our decision.

### Candidate reusable components

| Component | Justification |
|---|---|
| `AppNavbar` | Header used across pages |
| `ServiceCard` | Repeated service card (Wash & Fold, Dry Cleaning) — clear repeat |
| `BaseButton` (optional) | Filled + outline button styles repeat (CTA, Login, Sign Up) |
| `HeroSection` / `SectionHeading` (optional) | Only if reused elsewhere; otherwise keep inline in the view |

Keep it minimal for Week 5: `ServiceCard` is the clear win; add `BaseButton` only
if it genuinely reduces duplication.

### Assets retrievable via Figma MCP (`download_assets` on `117:236`)

- Raster (PNG/JPG): logo icon; hero photo (towels/laundry); Wash & Fold card
  photo; Dry Cleaning card photo. (Hero avatar images are empty placeholders.)
- SVG icons: washer glyph, hanger glyph, two "Learn More" arrow icons.
- MCP asset URLs expire (~7 days) — download and commit bytes when implementing.
