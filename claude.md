# Project Overview

University project: collaborative web platform for managing remote hackathons.

Main goals:
- realistic student project
- maintainable architecture
- clear separation of responsibilities
- academically credible scope

Core constraints:
- front-end: HTML, CSS, JavaScript only
- no React, no Vue.js, no front-end framework
- REST API
- relational database
- architecture must stay simple and maintainable

Core logic:
- hackathon = global level
- team = local level inside a hackathon
- do not mix global and local administration

Development rule:
- always reason by versions
- V1 = minimal and functional
- V2 = improvements
- V3 = advanced features
- V4 = optional bonus features

Skills rule:
- prefer internal project skills first
- external skills are limited and must not increase complexity
- maximum 1 external skill per task unless strongly justified

Repository rule:
- `docs/` contains human project documentation
- `.claude/skills/` contains reusable skills
- detailed project rules are stored in `.claude/rules/`

Git rule:
- NEVER include "Co-Authored-By" or any Claude reference in commit messages
- commits are authored solely by the user
- keep commit messages concise and factual

Please also follow:
- `.claude/rules/project-context.md`
- `.claude/rules/repository-rules.md`
- `.claude/rules/skills-policy.md`
- `.claude/rules/development-strategy.md`