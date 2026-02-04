import ChessSquare from './ChessSquare';

export interface ChessBoardProps {
    board: string[][];
    turn: 'W' | 'B';
    selectedIndex: number;
    nextMoves: number[];
    onSquareClick: (index: number) => void;
    showCoordinates?: boolean;
    isCheck?: boolean;
    lastMove?: { from: number, to: number } | null;
}

const ChessBoard = ({
    board,
    turn,
    selectedIndex,
    nextMoves,
    onSquareClick,
    showCoordinates = true,
    isCheck,
    lastMove
}: ChessBoardProps) => {

    return (
        <div className="w-full max-w-[600px] aspect-square shadow-2xl rounded-sm overflow-hidden border-4 border-black/20 relative">
            <div className="grid grid-rows-8 w-full h-full">
                {board.map((rowArr, row: number) => (
                    <div key={row} className="grid grid-cols-8 w-full h-full">
                        {rowArr.map((piece, col: number) => {
                            const index = row * 8 + col;
                            // Highlight check
                            const isKing = piece === (turn === 'W' ? 'WK' : 'BK');
                            const inCheckHighlight = isKing && isCheck;

                            // Highlight last move
                            const isLastMoveFrom = lastMove?.from === index;
                            const isLastMoveTo = lastMove?.to === index;

                            return (
                                <ChessSquare
                                    key={index}
                                    index={index}
                                    piece={piece}
                                    isSelected={index === selectedIndex}
                                    isPossibleMove={nextMoves.includes(index)}
                                    isCheck={inCheckHighlight}
                                    isLastMove={isLastMoveFrom || isLastMoveTo}
                                    onClick={() => onSquareClick(index)}
                                    showCoordinates={showCoordinates}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChessBoard;
