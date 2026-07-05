# Bundle Builder

A 4-step accordion "bundle builder" (security-camera system, Wyze-branded placeholder data) with a live order-review panel, built from a Figma design as a working React + Express prototype.

## Quick start

```
npm install
npm run dev
```

This runs both workspaces via `concurrently`:
- **frontend** — Vite + React + TypeScript + Tailwind, `http://localhost:5173`
- **backend** — Express + TypeScript, `http://localhost:4000` (`GET /api/catalog`, `GET /api/health`)

The frontend dev-proxies `/api` to the backend, so the product catalog is fetched over a real HTTP request rather than statically imported.

To run one workspace at a time: `npm run dev -w frontend` or `npm run dev -w backend`.

## Stack

- **Frontend**: Vite, React, TypeScript, Tailwind CSS v4 (custom tokens in `frontend/tailwind.config.ts`), React Context + `useReducer` for state.
- **Backend**: Express + TypeScript, serving `backend/src/data/catalog.json` as the product catalog API.
- **Persistence**: `localStorage`, written only on explicit "Save my system for later," read once at bootstrap.

