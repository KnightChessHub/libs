import { ChessBoard } from './KnightChess';
import { ChessThemeProvider, useChessTheme, THEMES } from './context/ChessThemeContext';
import './App.css';

const GameContainer = () => {
  const { theme, setTheme } = useChessTheme();

  return (
    <div className="chess-container fade-in min-h-screen py-10 bg-[#121212]">
      <header className="text-center space-y-1 mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-white">
          KNIGHT CHESS
        </h1>
        <p className="text-gray-400 font-medium tracking-[0.2em] uppercase text-[10px]">
          Professional React Chess Library
        </p>
      </header>

      <main className="flex flex-col xl:flex-row gap-12 items-center xl:items-start justify-center w-full max-w-7xl px-4">
        {/* Chess Board Section */}
        <div className="flex-shrink-0">
          <div className="p-1 bg-[#1e1e1e] border border-white/5 shadow-2xl">
            <ChessBoard />
          </div>
        </div>

        {/* Control Panel */}
        <div className="w-full max-w-sm xl:w-[400px] space-y-6">
          <div className="bg-[#1e1e1e] border border-white/5 p-8 space-y-8">
            <section className="space-y-6">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-white/5 pb-2">
                Board Architecture
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(THEMES).map((themeKey) => (
                  <button
                    key={themeKey}
                    onClick={() => setTheme(themeKey)}
                    className={`px-4 py-2 text-[11px] font-bold transition-all duration-200 uppercase tracking-wider border ${theme.name.toLowerCase() === themeKey
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
                      }`}
                  >
                    {THEMES[themeKey].name}
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-white/5 pb-2">
                Library Engine
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/3 border border-white/5">
                  <span className="text-xs text-gray-400">Move Logic</span>
                  <span className="text-[10px] uppercase font-bold text-blue-400">Advanced</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/3 border border-white/5">
                  <span className="text-xs text-gray-400">Architecture</span>
                  <span className="text-[10px] uppercase font-bold text-purple-400">Modular</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/3 border border-white/5">
                  <span className="text-xs text-gray-400">Theming</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-400">Solid State</span>
                </div>
              </div>
            </section>
          </div>

          <div className="text-center pt-2">
            <button className="premium-button w-full">
              Documentation
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
