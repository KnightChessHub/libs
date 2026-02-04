import { ChessBoard } from './KnightChess';
import { ChessThemeProvider, useChessTheme, THEMES } from './context/ChessThemeContext';
import { useChess } from './hooks/useChess';
import PromotionModal from './components/lib/PromotionModal';
import MoveHistory from './components/lib/MoveHistory';
import CapturedPieces from './components/lib/CapturedPieces';
import './App.css';

const GameContainer = () => {
  const { theme, setTheme } = useChessTheme();

  // Initialize Game Logic Here
  const {
    board,
    turn,
    selectedIndex,
    nextMoves,
    history,
    lastMove,
    isCheck,
    isCheckmate,
    isDraw,
    drawReason,
    promotionPending,
    capturedPieces,
    selectSquare,
    movePiece,
    cancelPromotion,
    resetGame
  } = useChess();

  // Combine selection + move logic for the board
  const handleSquareClick = (index: number) => {
    selectSquare(index);
  };

  const handlePromotionSelect = (piece: string) => {
    if (promotionPending) {
      movePiece(promotionPending.from, promotionPending.to, piece);
    }
  };

  return (
    <div className="chess-container fade-in min-h-screen py-10 bg-[#121212] font-sans selection:bg-blue-500/30">

      {/* Promotion Modal */}
      <PromotionModal
        isOpen={!!promotionPending}
        color={turn}
        onSelect={handlePromotionSelect}
        onCancel={cancelPromotion}
      />

      <header className="text-center space-y-2 mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-xl">
          KNIGHT CHESS
        </h1>
        <p className="text-gray-400 font-medium tracking-[0.3em] uppercase text-[10px]">
          Professional React Chess Library
        </p>
      </header>

      <main className="flex flex-col xl:flex-row gap-8 items-start justify-center w-full max-w-7xl px-4 mx-auto">

        {/* Left Panel: Captured & Info */}
        <div className="hidden xl:flex flex-col gap-6 w-64 pt-4">
          <div className="bg-[#1e1e1e] border border-white/5 p-4 rounded-lg shadow-lg">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Captured Material</h3>
            <CapturedPieces captured={capturedPieces} />
          </div>

          <div className="bg-[#1e1e1e] border border-white/5 p-4 rounded-lg shadow-lg space-y-2 text-center">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Game Status</div>
            {isCheckmate ? (
              <div className="text-xl font-bold text-red-500 animate-pulse">CHECKMATE</div>
            ) : isDraw ? (
              <div className="text-xl font-bold text-yellow-500">DRAW ({drawReason})</div>
            ) : (
              <div className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <span className={`w-3 h-3 rounded-full ${turn === 'W' ? 'bg-white' : 'bg-gray-600 border border-white/20'}`}></span>
                {turn === 'W' ? 'White' : 'Black'}'s Turn
              </div>
            )}
            {isCheck && !isCheckmate && (
              <div className="text-sm font-bold text-red-400">CHECK!</div>
            )}
          </div>

          <button
            onClick={resetGame}
            className="py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded font-bold uppercase text-xs tracking-widest transition-all"
          >
            Reset Game
          </button>
        </div>

        {/* Center: Board */}
        <div className="flex-shrink-0 relative group">
          <div className="absolute -inset-1bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative p-1 bg-[#1e1e1e] border border-white/5 shadow-2xl rounded-sm">
            <ChessBoard
              board={board}
              turn={turn}
              selectedIndex={selectedIndex}
              nextMoves={nextMoves}
              onSquareClick={handleSquareClick}
              isCheck={isCheck}
              lastMove={lastMove ? { from: lastMove.from, to: lastMove.to } : null}
            />
          </div>

          {/* Mobile Status Bar */}
          <div className="xl:hidden mt-6 flex flex-col gap-4">
            <div className="flex justify-between items-center bg-[#1e1e1e] p-4 rounded border border-white/5">
              <span className="text-white font-bold">{turn === 'W' ? 'White' : 'Black'}'s Turn</span>
              {isCheck && <span className="text-red-500 font-bold animate-pulse">CHECK!</span>}
            </div>
            <button onClick={resetGame} className="w-full py-3 bg-gray-800 text-white rounded font-bold text-sm">Reset Game</button>
          </div>
        </div>

        {/* Right Panel: Controls & History */}
        <div className="w-full max-w-sm xl:w-[350px] space-y-6 pt-1">

          {/* Move History */}
          <div className="bg-[#1e1e1e] border border-white/5 p-4 rounded-lg shadow-lg">
            <MoveHistory history={history} />
          </div>

          {/* Theme Controls */}
          <div className="bg-[#1e1e1e] border border-white/5 p-6 rounded-lg shadow-lg space-y-6">
            <section className="space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-white/5 pb-2">
                Board Theme
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(THEMES).map((themeKey) => (
                  <button
                    key={themeKey}
                    onClick={() => setTheme(themeKey)}
                    className={`px-3 py-2 text-[10px] font-bold transition-all duration-200 uppercase tracking-wider border rounded ${theme.name.toLowerCase() === themeKey
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
                      }`}
                  >
                    {THEMES[themeKey].name}
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-xs font-bold text-gray-300">Knight Engine v2.0</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Features enabled: 50-Move Rule, En Passant, Promotions, 3-fold Repetition.
                </p>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <ChessThemeProvider>
      <GameContainer />
    </ChessThemeProvider>
  );
}

export default App;
