
import React, { useMemo } from 'react';
import ChessSquare from './ChessSquare';
import ChessPiece from './ChessPiece';
import { motion, AnimatePresence } from 'framer-motion';

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

    // Flatten board to easily map pieces for animation
    const pieces = useMemo(() => {
        const result: { id: string, type: string, index: number }[] = [];
        board.forEach((rowArr, r) => {
            rowArr.forEach((piece, c) => {
                if (piece) {
                    const index = r * 8 + c;
                    // We need a stable ID for the piece if possible.
                    // For now, let's use type + index, but that changes.
                    // Ideally we'd track pieces with unique IDs in the engine.
                    // Since we don't have unique IDs, let's use index if it's the same piece type.
                    // Framer motion's 'layout' prop on an absolute layer is better.
                    result.push({ id: `${piece}-${index}`, type: piece, index });
                }
            });
        });
        return result;
    }, [board]);

    return (
        <div className="w-full max-w-[640px] aspect-square shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border-[8px] border-[#2c2c2c] relative select-none">
            {/* Squares Layer */}
            <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                {Array.from({ length: 64 }).map((_, index) => {
                    const row = Math.floor(index / 8);
                    const col = index % 8;
                    const piece = board[row][col];

                    const isKing = piece === (turn === 'W' ? 'WK' : 'BK');
                    const inCheckHighlight = isKing && isCheck;
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

            {/* Pieces Layer */}
            <div className="absolute inset-0 pointer-events-none">
                <AnimatePresence>
                    {pieces.map((piece) => {
                        const row = Math.floor(piece.index / 8);
                        const col = piece.index % 8;
                        return (
                            <motion.div
                                key={piece.id}
                                layout
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: `${col * 100}%`,
                                    y: `${row * 100}%`
                                }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    layout: { duration: 0.25 }
                                }}
                                className="absolute top-0 left-0 w-[12.5%] h-[12.5%] flex items-center justify-center"
                            >
                                <ChessPiece type={piece.type} squareSize={70} />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ChessBoard;
