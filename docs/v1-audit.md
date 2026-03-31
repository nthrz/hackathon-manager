\# V1 Audit — HackManager



\## Already fixed

\- \[x] Schema creation bug in `db/database.js` (`exec` instead of `run`)

\- \[x] Logout race condition in `authController.js`

\- \[x] Shared `api.js` now loaded in all HTML pages

\- \[x] `login.js` and `register.js` now use shared `apiFetch`

\- \[x] Duplicate frontend fetch helpers removed

\- \[x] Null guards added in `hackathon.js` and `team.js`

\- \[x] Error handling improved in key frontend pages

\- \[x] Submit buttons disabled during pending requests

\- \[x] Delete confirmation added in `team.js`



\## Remaining high-priority items

\- \[ ] Fix route order collision in `routes/hackathons.js` (`/:hackathonId/teams` before `/:id`)

\- \[ ] Fix duplicated event listeners in `js/team.js` after repeated `loadTasks()`



\## Remaining medium-priority items

\- \[ ] Add “already a member” indicator on `hackathon.html`

\- \[ ] Add “back to hackathon” navigation on `team.html`

\- \[ ] Add password confirmation on `register.html`

\- \[ ] Validate dates in `hackathonController.js`



\## Remaining low-priority items

\- \[ ] Add graceful DB save on process exit

\- \[ ] Improve mobile layout for `.two-col`

\- \[ ] Move session secret to `.env`

