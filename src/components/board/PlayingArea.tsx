import { useEffect, useState, useCallback } from "react";
import Square from "../square/Square";
import { nextPossibleMoves } from "../../algorithms/nextmove";
import { getIcon } from "../../algorithms/iconselection";

const initialPositions = [
    ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
    ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
    ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"]
];

const PlayingArea = () => {
    const [board, setBoard] = useState<string[][]>(initialPositions);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [nextMoves, setNextMoves] = useState<number[]>([]);
    const [turn, setTurn] = useState<"W" | "B">("W");

    useEffect(() => {
        if (selectedIndex !== -1) {
            const row = Math.floor(selectedIndex / 8);
            const col = selectedIndex % 8;
            const piece = board[row][col];
            if (piece && piece[0] === turn) {
                setNextMoves(nextPossibleMoves(selectedIndex, piece, board));
            } else {
                setNextMoves([]);
            }
        } else {
            setNextMoves([]);
        }
    }, [selectedIndex, board, turn]);

    const handleSquareClick = useCallback((index: number) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        const piece = board[row][col];

        // If clicking a possible move, execute it
        if (nextMoves.includes(index)) {
            const newBoard = board.map(r => [...r]);
            const prevRow = Math.floor(selectedIndex / 8);
            const prevCol = selectedIndex % 8;

            newBoard[row][col] = board[prevRow][prevCol];
            newBoard[prevRow][prevCol] = "";

            setBoard(newBoard);
            setSelectedIndex(-1);
            setTurn(turn === "W" ? "B" : "W");
            return;
        }

        // Handle selection
        if (piece && piece[0] === turn) {
            setSelectedIndex(index === selectedIndex ? -1 : index);
        } else {
            setSelectedIndex(-1);
        }
    }, [board, nextMoves, selectedIndex, turn]);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="text-lg font-bold">
                {turn === "W" ? "White's Turn" : "Black's Turn"}
            </div>
            <div className="w-full border aspect-square grid grid-rows-8">
                {
                    board.map((rowArr, row) => (
                        <div key={row} className="w-full grid grid-cols-8">
                            {
                                rowArr.map((piece, col) => {
                                    const index = 8 * row + col;
                                    return (
                                        <Square
                                            key={index}
                                            index={index}
                                            object={getIcon(piece)}
                                            isSelected={index === selectedIndex}
                                            isPosibleNextMove={nextMoves.includes(index)}
                                            onSquareClick={() => handleSquareClick(index)}
                                        />
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </div>
            <button
                onClick={() => {
                    setBoard(initialPositions);
                    setSelectedIndex(-1);
                    setTurn("W");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Reset Game
            </button>
        </div>
    );
};

export default PlayingArea;