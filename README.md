# To-Do List

A to-do list app in React and TypeScript using IndexedDB to persist data.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- IndexedDB via [idb](https://github.com/jakearchibald/idb)
- Vitest + fake-indexeddb for tests

## Setup

You need Node.js 22+ and npm, yarn or pnpm.

```bash
pnpm install
pnpm dev
```

Then open http://localhost:5173.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Serve the production build |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run tests once |
| `pnpm lint` | Run ESLint |
