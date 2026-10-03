# Memory Game

Classic memory card game built with Vanilla JavaScript, CSS and Vite.

## Features

- Classic memory card matching game
- Card flip animations
- Move counter
- Matched pairs counter
- Victory modal
- Leaderboard with `localStorage`
- Background music and sound effects
- Responsive design
- DOM reconciliation for card rendering
- Accessible card labels

## Tech Stack

- Vanilla JavaScript
- CSS
- Vite
- ESLint
- Prettier
- Husky
- lint-staged

## Architecture

The project uses a layered UI architecture:

```text
Core
  ↓
Controllers
  ↓
Containers
  ↓
Elements
  ↓
UI
```

### Core

Contains the game and leaderboard logic without any DOM dependencies.

```text
core/
├── game/
│   ├── game.actions.js
│   ├── game.constants.js
│   ├── game.service.js
│   └── game.state.js
└── leaderboard/
    ├── leaderboard.actions.js
    └── leaderboard.service.js
```

### Controllers

Coordinate application behavior and connect the core with the UI layer.

```text
controller/
├── game.controller.js
└── leaderboard.controller.js
```

### Containers

Compose larger parts of the interface and prepare data for Elements.

```text
components/containers/
├── game/
├── match-counter/
└── moves-counter/
```

### Elements

Represent concrete parts of the Memory Game interface.

```text
components/elements/
├── game-board/
├── header/
├── leaderboard/
├── leaderboard-modal/
├── match-counter/
├── moves-counter/
└── victory-modal/
```

### UI

Contains small reusable visual components.

```text
components/ui/
├── button/
├── card/
├── heading-2/
├── modal/
└── paragraph/
```

### Events

Connect DOM events with application controllers.

```text
events/
└── game.events.js
```

## Project Structure

```text
src/
├── audio/
├── components/
│   ├── containers/
│   ├── elements/
│   └── ui/
├── constants/
├── controller/
├── core/
├── events/
├── styles/
└── utils/
```

## Local Setup

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal.

## Code Quality

Run ESLint:

```bash
npm run lint
```

Format the project:

```bash
npm run format
```

The project uses Husky and lint-staged to run checks before commits.

## Production

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```
