import type React from 'react';
import { useChess } from '../../hooks/useChess';
import ChessSquare from './ChessSquare';

export interface ChessBoardProps {
    showCoordinates?: boolean;
    onMove?: (from: number, to: number) => void;
}

const ChessBoard = ({
    showCoordinates = true,
    onMove
}: ChessBoardProps) => {
    const { board, selectedIndex, nextMoves, selectSquare } = useChess();

    const handleSquareClick = (index: number) => {
        const prevIndex = selectedIndex;
        selectSquare(index);

        // If a move happened (selectedIndex was set and now it's -1 or different piece)
        // Note: selectSquare handles the move internally, but we can hook into it
        if (prevIndex !== -1 && nextMoves.includes(index)) {
            onMove?.(prevIndex, index);
        }
    };

    return (
        <div className="w-full max-w-[600px] aspect-square shadow-2xl rounded-sm overflow-hidden border-4 border-black/20">
            <div className="grid grid-rows-8 w-full h-full">
                {board.map((rowArr, row) => (
                    <div key={row} className="grid grid-cols-8 w-full h-full">
                        {rowArr.map((piece, col) => {
                            const index = row * 8 + col;
                            return (
                                <ChessSquare
                                    key={index}
                                    index={index}
                                    piece={piece}
                                    isSelected={index === selectedIndex}
                                    isPossibleMove={nextMoves.includes(index)}
                                    onClick={() => handleSquareClick(index)}
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
