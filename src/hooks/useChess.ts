import { useState, useCallback, useMemo } from 'react';
import { nextPossibleMoves } from '../algorithms/nextmove';

export type PieceColor = 'W' | 'B';
export type PieceType = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K';
export type BoardState = string[][];

export interface UseChessReturn {
    board: BoardState;
    turn: PieceColor;
    selectedIndex: number;
    nextMoves: number[];
    selectSquare: (index: number) => void;
    movePiece: (fromIndex: number, toIndex: number) => void;
    resetGame: () => void;
    isPieceAt: (index: number) => boolean;
    getPieceAt: (index: number) => string;
}

const INITIAL_BOARD: BoardState = [
    ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
    ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
    ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"]
];

export const useChess = (): UseChessReturn => {
    const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
    const [turn, setTurn] = useState<PieceColor>('W');
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const isPieceAt = useCallback((index: number) => {
        const r = Math.floor(index / 8);
        const c = index % 8;
        return board[r][c] !== "";
    }, [board]);

    const getPieceAt = useCallback((index: number) => {
        const r = Math.floor(index / 8);
        const c = index % 8;
        return board[r][c];
    }, [board]);

    const nextMoves = useMemo(() => {
        if (selectedIndex === -1) return [];
        const piece = getPieceAt(selectedIndex);
        if (!piece || piece[0] !== turn) return [];
        return nextPossibleMoves(selectedIndex, piece, board);
    }, [selectedIndex, board, turn, getPieceAt]);

    const movePiece = useCallback((fromIndex: number, toIndex: number) => {
        const fromR = Math.floor(fromIndex / 8);
        const fromC = fromIndex % 8;
        const toR = Math.floor(toIndex / 8);
        const toC = toIndex % 8;

        const newBoard = board.map(row => [...row]);
        newBoard[toR][toC] = newBoard[fromR][fromC];
        newBoard[fromR][fromC] = "";

        setBoard(newBoard);
        setTurn(prev => (prev === 'W' ? 'B' : 'W'));
        setSelectedIndex(-1);
    }, [board]);

    const selectSquare = useCallback((index: number) => {
        const piece = getPieceAt(index);

        // If clicking a valid move square, execute move
        if (nextMoves.includes(index)) {
            movePiece(selectedIndex, index);
            return;
        }

        // Handle selection
        if (piece && piece[0] === turn) {
            setSelectedIndex(index === selectedIndex ? -1 : index);
        } else {
            setSelectedIndex(-1);
        }
    }, [getPieceAt, nextMoves, selectedIndex, turn, movePiece]);

    const resetGame = useCallback(() => {
        setBoard(INITIAL_BOARD);
        setTurn('W');
        setSelectedIndex(-1);
    }, []);

    return {
        board,
        turn,
        selectedIndex,
        nextMoves,
        selectSquare,
        movePiece,
        resetGame,
        isPieceAt,
        getPieceAt
    };
};
