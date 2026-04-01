# V1 Audit — HackManager

## V1 status: COMPLETE AND STABLE — demo-ready, no further changes planned

---

## All fixed issues

- [x] Schema creation bug in `db/database.js` (`exec` instead of `run`)
- [x] Logout race condition in `authController.js`
- [x] Shared `api.js` now loaded in all HTML pages
- [x] `login.js` and `register.js` now use shared `apiFetch`
- [x] Duplicate frontend fetch helpers removed
- [x] Null guards added in `hackathon.js` and `team.js`
- [x] Error handling improved in key frontend pages
- [x] Submit buttons disabled during pending requests
- [x] Delete confirmation added in `team.js`
- [x] Route param inconsistency fixed (`hackathonId` → `id` everywhere)
- [x] Route ordering: specific paths before generic `/:id`
- [x] Date validation on hackathon creation (YYYY-MM-DD required)
- [x] Graceful DB save on SIGINT/SIGTERM
- [x] "You are a member" badge on hackathon page
- [x] "Back to hackathon" link on team page
- [x] Password confirmation field on register page
- [x] Mobile layout: `.two-col` and `.card-grid` collapse to 1 column on small screens
- [x] Language support: French (default) + English toggle, localStorage persistence
- [x] All static UI text uses `data-i18n` attributes
- [x] All dynamic JS strings use `t(key)` — no hardcoded English in UI
- [x] Language toggle button on all pages
- [x] Fixed loop variable `t` → `team` in `hackathon.js` (was shadowing global `t()`)
- [x] Fixed `delete` key missing from i18n (button showed raw key name)
- [x] Fixed team form Name label key (`title` → `name` in `hackathon.html`)

---

## Known limitations — acceptable for V1, planned for V2

- Session secret hardcoded (acceptable for student project)
- sql.js in-memory DB with manual persistence (replaced in V2 by EF Core + SQLite)
- No hackathon or team edit/delete → V2
- No task assignment to specific members → V2
- No pagination → V2
- No join request approval flow → V2
- No search or filtering → V2
- Frontend JS mixes data-fetching and rendering (no service layer) → V2

---

## V2 direction decided

Backend: C# + FastEndpoints + EF Core
Architecture: MVC with service layer
Repository: fresh repo (do not carry V1 commit history)

See `docs/session-notes.md` for full V2 plan.
