<!--
This file guides AI coding agents (Copilot/GPT-based) to be productive in this repository.
If you see this file but parts are incorrect, update it to reflect the real project layout and commands.
-->
# Copilot / AI Agent Instructions

Summary
- Purpose: help an AI agent quickly understand the repository architecture, developer workflows, and conventions so suggestions and code changes are safe and useful.

What I found
- No existing AI instruction files were discovered when this helper was generated. Populate or correct the sections below with accurate paths/commands.

Quick orientation checklist
- Repo language(s): (fill in: e.g. `node`, `python`, `go`)
- Start points: common folders to inspect: `src/`, `app/`, `services/`, `packages/`, `backend/`, `frontend/`
- Primary entry files to look for: `package.json`, `pyproject.toml`, `requirements.txt`, `Dockerfile`, `README.md`

Architecture guidance (how to discover it)
- Look for independent services under `services/` or `packages/` to identify boundaries.
- Identify runtime and build targets from `package.json` scripts, `Dockerfile`, or CI config (e.g. `.github/workflows`).
- If the project is monorepo-style, prefer changing code in the package that owns a feature (search for feature-related imports).

Developer workflows (fill with real commands)
- Install deps: (example) `npm install` or `pip install -r requirements.txt`
- Build: (example) `npm run build` or `python -m build`
- Test: (example) `npm test` or `pytest`
- Run locally: describe how to run dev server(s) and common env vars.

Conventions and patterns to follow
- Code style: follow the repository linter config (search for `.eslintrc`, `pyproject.toml` [tool.black/md], `.prettierrc`).
- Error handling: follow the pattern used in the majority of modules (e.g., return error objects, raise exceptions, or middleware-based handling).
- API layers: prefer modifying controller/service/repository separation — keep business logic out of route handlers.

Integration points and external dependencies
- Look for `*.env`, `config/*.yaml|json`, `terraform/`, or `k8s/` directories to find external integrations (DBs, queues, SaaS).
- When adding secrets or config, do not hardcode credentials — use the repo's config pattern.

How to propose changes (PR etiquette for AI agents)
- Make minimal, focused changes with tests when possible.
- Update docs/README when adding or changing developer commands.
- If unsure about runtime impact, add a comment in the PR describing assumptions.

Examples (replace these with real examples from the repo)
- To add a new API endpoint, update `src/routes/*.ts`, add business logic to `src/services/*`, and add unit tests under `tests/`.
- To run unit tests for a package: `cd packages/foo && npm test`

If you are an AI agent reading this
- First step: list top-level files and `package.json` / `pyproject.toml` contents.
- Second: run the test command and report failures before changing code.
- If no tests present, prefer adding tests for new behavior.

Need help or corrections
- I created this from a quick scan and no discovered AI instruction files — please edit with precise commands, key files and patterns.

End of file.
