# The Arboretum

A Vite + React playground that visualizes AVL trees in 3D with React Three Fiber.

## Features
- AVL tree implementation with rotations and positional layout
- 3D node visualization using Three.js via React Three Fiber
- Vitest test suite covering balancing + layout

## Quick start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (typically http://localhost:5173).

## Tests

```bash
npm run test
```

## Demo data
The scene currently inserts demo values in `src/components/Scene.jsx`:

```js
const demoValues = [30, 20, 10, 25, 40, 50, 22];
```

Update the list to visualize different AVL structures.
