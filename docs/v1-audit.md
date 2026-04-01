# V1 Audit — HackManager

## Already fixed

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

## V1 status: STABLE — ready for demo

## Remaining known limitations (acceptable for V1)

- Session secret hardcoded (acceptable for student project)
- No hackathon or team edit/delete (planned V2)
- No task assignment to specific members (planned V2)
- No pagination (planned V2)
- No join request approval flow (planned V2)
