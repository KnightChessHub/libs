# KnightChess - World Class Chess Library

KnightChess is a professional-grade React chess library designed for beauty, flexibility, and performance.

## Key Features
- **Hooks-First Architecture**: Access game state and theme engine via `useChess` and `useChessTheme`.
- **Premium Themes**: Support for artistic themes including Classic, Wood, Ice, and Modern.
- **Glassmorphism UI**: Stunning modern design with blur effects and vibrant gradients.
- **Fully Customizable**: Modular components (`ChessBoard`, `ChessSquare`, `ChessPiece`) allow you to build any chess UI.
- **Move Precision**: High-quality move indicators and capture rings for perfect UX.
- **Type Safe**: Written in TypeScript with full type definitions.

## Usage

### 1. Wrap your app with Providers
```tsx
import { ChessThemeProvider } from './KnightChess';

function App() {
  return (
    <ChessThemeProvider>
      <MyChessGame />
    </ChessThemeProvider>
  );
}
```

### 2. Use the ChessBoard component
```tsx
import { ChessBoard, useChessTheme } from './KnightChess';

const MyChessGame = () => {
  const { setTheme } = useChessTheme();

  return (
    <div>
      <ChessBoard />
      <button onClick={() => setTheme('wood')}>Switch to Wood</button>
    </div>
  );
};
```

### 3. Custom Logic with Hooks
```tsx
import { useChess } from './KnightChess';

const CustomUI = () => {
  const { board, turn, movePiece } = useChess();
  // Build your own custom UI using the game state
};
```

## Themes Supported
- **Classic**: The gold standard green/white board.
- **Wood**: Premium wooden aesthetic.
- **Ice**: Cool and refreshing blue tones.
- **Modern**: Sleek slate professional palette.

## Installation
Currently available as a local library in `src/KnightChess`.

---
*Created with ♥ by the KnightChess Team.*
