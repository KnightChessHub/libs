import { useChessTheme } from '../../context/ChessThemeContext';
import ChessPiece from './ChessPiece';

interface ChessSquareProps {
    index: number;
    piece: string;
    isSelected: boolean;
    isPossibleMove: boolean;
    onClick: () => void;
    showCoordinates?: boolean;
}

const ChessSquare = ({
    index,
    piece,
    isSelected,
    isPossibleMove,
    onClick,
    showCoordinates = true
}: ChessSquareProps) => {
    const { theme } = useChessTheme();
    const row = Math.floor(index / 8);
    const col = index % 8;
    const isDark = (row + col) % 2 !== 0;

    const squareColor = isDark ? theme.darkSquare : theme.lightSquare;
    const file = String.fromCharCode(97 + col);
    const rank = 8 - row;

    return (
        <div
            onClick={onClick}
            className="relative w-full aspect-square flex items-center justify-center cursor-pointer select-none group transition-colors duration-200"
            style={{ backgroundColor: squareColor }}
        >
            {/* Selection Highlight */}
            {isSelected && (
                <div
                    className="absolute inset-0 z-0"
                    style={{ backgroundColor: theme.selectedSquare }}
                />
            )}

            {/* Possible Move Indicator */}
            {isPossibleMove && (
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    {piece ? (
                        // Capture indicator
                        <div className="w-[90%] h-[90%] border-4 border-black/10 rounded-full" />
                    ) : (
                        // Move indicator
                        <div className="w-4 h-4 bg-black/10 rounded-full" />
                    )}
                </div>
            )}

            {/* Coordinates */}
            {showCoordinates && (
                <>
                    {col === 0 && (
                        <span
                            className="absolute top-0.5 left-0.5 text-[10px] font-bold pointer-events-none"
                            style={{ color: isDark ? theme.lightSquare : theme.darkSquare, opacity: 0.6 }}
                        >
                            {rank}
                        </span>
                    )}
                    {row === 7 && (
                        <span
                            className="absolute bottom-0.5 right-0.5 text-[10px] font-bold pointer-events-none"
                            style={{ color: isDark ? theme.lightSquare : theme.darkSquare, opacity: 0.6 }}
                        >
                            {file}
                        </span>
                    )}
                </>
            )}

            {/* Chess Piece */}
            <div className="z-10 w-full h-full">
                <ChessPiece piece={piece} />
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
        </div>
    );
};

export default ChessSquare;
