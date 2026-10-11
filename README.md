# Memory Game

A classic memory card game built with Vanilla JavaScript, CSS and Vite.

## Features

- 16 cards forming 8 matching pairs
- Move and matched-pair counters
- New game and victory flows
- Leaderboard with the 10 best results saved in `localStorage`
- Persisted audio mute setting
- Background music and card sound effects
- Keyboard accessible cards and modal dialogs
- Responsive layout and card DOM reconciliation

## Tech Stack

- Vanilla JavaScript (ES modules)
- CSS
- Vite
- ESLint and Prettier
- Node.js built-in test runner

## Architecture

The application keeps game rules independent from the browser UI. The app layer
assembles services and controllers, while UI components receive translated
messages and render the state provided by controllers.

```text
src/
├── app/                   # App initialization and DOM event wiring
├── components/
│   ├── containers/        # Stateful UI composition and DOM reconciliation
│   ├── elements/          # Memory Game interface elements
│   └── ui/                # Small reusable visual components
├── controller/           # Connect game services and UI
├── core/
│   ├── game/              # Game state, actions, rules and logic
│   └── leaderboard/       # Result validation, sorting and leaderboard logic
├── i18n/                 # UI messages and locale definitions
├── infrastructure/
│   └── storage/           # Generic browser storage adapter
├── services/              # Game audio and domain-specific persistence
├── styles/                # Global and shared styles
└── utils/                 # Small domain-independent utilities
```

Persistent game data is stored under the single `memory-game` key. Its object
contains the schema `version`, `leaderboard` results and `settings.audioMuted`.

## Local Setup

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the URL printed by Vite.

## Checks

```bash
npm run lint
npm test
npm run build
```

Run `npm run format` to format project files.

## Production

```bash
npm run preview
```
