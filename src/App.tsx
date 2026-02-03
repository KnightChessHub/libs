import { ChessBoard } from './KnightChess';
import { ChessThemeProvider, useChessTheme, THEMES } from './context/ChessThemeContext';
import './App.css';

const GameContainer = () => {
  const { theme, setTheme } = useChessTheme();

  return (
    <div className="chess-container fade-in min-h-screen py-10">
      <header className="text-center space-y-2 mb-8">
        <h1 className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 pb-2">
          KNIGHT CHESS
        </h1>
        <p className="text-blue-200/40 font-bold tracking-[0.3em] uppercase text-[10px]">
          World Class React Library
        </p>
      </header>

      <main className="flex flex-col xl:flex-row gap-12 items-center xl:items-start justify-center w-full max-w-7xl px-4">
        {/* Chess Board Section */}
        <div className="flex-shrink-0">
          <div className="p-1 glass-panel ring-1 ring-white/20 shadow-2xl">
            <ChessBoard />
          </div>
        </div>

        {/* Control Panel */}
        <div className="w-full max-w-md xl:w-96 space-y-6">
          <div className="glass-panel p-8 space-y-8">
            <section className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-300/60 border-b border-white/10 pb-2">
                Artistic Themes
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(THEMES).map((themeKey) => (
                  <button
                    key={themeKey}
                    onClick={() => setTheme(themeKey)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-500 ease-out border ${theme.name.toLowerCase() === themeKey
                        ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/50 shadow-[0_0_20px_rgba(96,165,250,0.2)] text-white scale-[1.02]'
                        : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10 text-white/60 hover:text-white'
                      }`}
                  >
                    {THEMES[themeKey].name}
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-300/60 border-b border-white/10 pb-2">
                Library Engine
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-sm text-blue-100/60">Type Safety</span>
                  <span className="text-xs font-mono px-2 py-1 bg-green-500/20 text-green-400 rounded">Full TS</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-sm text-blue-100/60">Architecture</span>
                  <span className="text-xs font-mono px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Hooks-First</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-sm text-blue-100/60">Bundle Size</span>
                  <span className="text-xs font-mono px-2 py-1 bg-blue-500/20 text-blue-400 rounded">&lt; 10kB</span>
                </div>
              </div>
            </section>
          </div>

          <div className="text-center">
            <button className="premium-button w-full group overflow-hidden relative">
              <span className="relative z-10">Get Started with KnightChess</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
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
