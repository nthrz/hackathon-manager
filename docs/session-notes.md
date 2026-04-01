# Session Notes

## Current state

V1 is complete, stable, and demo-ready. No further changes planned for V1.

V2 direction has been decided. V2 is NOT started yet.

---

## V1 — What is working

- Authentication: register (with password confirmation), login, logout
- Hackathons: create, list, view, join — member badge indicator — auto-join on create
- Teams: create (hackathon members only), list, view, join — back link to hackathon — auto-join on create
- Tasks: create (team members only), list, update status, delete (leader only with confirm)
- Roles: implicit — hackathon owner, team leader, member — enforced in backend
- CORS: localhost:5500 and 127.0.0.1:5500 both allowed
- Database: sql.js, no native compilation, persists to hackathon.db
- Graceful shutdown: SIGINT/SIGTERM saves DB before exit
- Mobile layout: responsive, single column below 640px
- Language: French default + English toggle, localStorage persistence, full coverage

---

## V2 — Decided direction

### Backend rebuild
- Replace Node.js + Express with **C# + FastEndpoints**
- Replace sql.js with **Entity Framework Core + SQLite** (or SQL Server)
- Reasons: type safety, proper ACID transactions, REPR pattern, FluentValidation, real MVC structure

### Architecture
- Backend: **MVC** — Models (EF Core entities + repositories), one FastEndpoints class per route (replaces controllers), response DTOs
- Add a **service layer** between endpoints and repositories to handle business logic atomically
- Frontend: same HTML/CSS/JS, but with cleaner separation of data-fetching vs rendering per page

### Repository
- Create a **fresh repository** for V2
- Do NOT carry over the current commit history
- Do NOT include `.claude/` in the new repo
- Keep `docs/` and `frontend/` structure
- New repo structure:
  ```
  /backend/    ← C# + FastEndpoints solution
  /frontend/   ← HTML, CSS, JS (unchanged structure)
  /docs/       ← updated documentation
  .gitignore
  CLAUDE.md
  ```

### V2 features (functional scope)
- Hackathon and team edit/delete (owners and leaders only)
- Task assignment to specific team members
- Join request approval flow (request → approve/reject)
- Task filters by status
- Pagination on lists

---

## Last completed work

Pre-meeting preparation session:
- V1 feature list compiled
- Demo script written
- Talking points prepared
- V2 technical direction decided (C# + FastEndpoints, MVC, fresh repo)
- Documentation updated

Previous: i18n commit (360b0de) — French/English language support, all strings translated.

---

## Next session

1. Create fresh V2 repository
2. Initialize C# + FastEndpoints backend project
3. Define domain models and EF Core schema
4. Port V1 API surface to FastEndpoints endpoints
5. Keep frontend unchanged initially — validate API compatibility first
