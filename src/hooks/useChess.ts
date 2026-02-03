import { useState, useCallback, useMemo } from 'react';
import { nextPossibleMoves } from '../algorithms/nextmove';

export type PieceColor = 'W' | 'B';
export type BoardState = string[][];

export interface Move {
    from: number;
    to: number;
    piece: string;
    capturedPiece?: string;
    boardBefore: BoardState;
}

export interface UseChessReturn {
    board: BoardState;
    turn: PieceColor;
    selectedIndex: number;
    nextMoves: number[];
    history: Move[];
    lastMove: Move | null;
    isCheck: boolean;
    isCheckmate: boolean;
    isStalemate: boolean;
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

/**
 * Helper to check if a square is attacked by a given color
 */
const isSquareAttacked = (targetIndex: number, attackerColor: PieceColor, board: BoardState) => {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece && piece[0] === attackerColor) {
                // For checking attacks, we consider all pseudo-legal moves,
                // as a piece can still attack even if its own king is in check.
                // However, for simplicity and to avoid infinite recursion, we pass null for lastMove here.
                // This might need refinement for specific edge cases like pinned pieces attacking.
                const moves = nextPossibleMoves(r * 8 + c, piece, board, null);
                if (moves.includes(targetIndex)) return true;
            }
        }
    }
    return false;
};

/**
 * Find the king's position
 */
const findKing = (color: PieceColor, board: BoardState) => {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (board[r][c] === `${color}K`) return r * 8 + c;
        }
    }
    return -1;
};

const hasPieceMoved = (index: number, history: Move[]) => {
    return history.some(move => move.from === index || move.to === index);
};

export const useChess = (): UseChessReturn => {
    const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
    const [turn, setTurn] = useState<PieceColor>('W');
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [history, setHistory] = useState<Move[]>([]);

    const lastMove = useMemo(() => (history.length > 0 ? history[history.length - 1] : null), [history]);

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

    const inCheck = useMemo(() => {
        const kingPos = findKing(turn, board);
        if (kingPos === -1) return false; // Should not happen in a valid game
        return isSquareAttacked(kingPos, turn === 'W' ? 'B' : 'W', board);
    }, [board, turn]);

    // Function to get truly legal moves (that don't leave king in check)
    const getLegalMoves = useCallback((index: number, piece: string, currentBoard: BoardState, lMove: Move | null, moveHistory: Move[]) => {
        const pseudoMoves = nextPossibleMoves(index, piece, currentBoard, lMove);
        const legalMoves: number[] = [];

        const color = piece[0] as PieceColor;
        const fromR = Math.floor(index / 8);
        const fromC = index % 8;

        for (const toIndex of pseudoMoves) {
            const toR = Math.floor(toIndex / 8);
            const toC = toIndex % 8;

            // Simulate move
            const tempBoard = currentBoard.map(row => [...row]);

            // Handle en passant simulation
            if (piece[1] === 'P' && fromC !== toC && tempBoard[toR][toC] === "") {
                const captureRow = color === 'W' ? toR + 1 : toR - 1;
                tempBoard[captureRow][toC] = "";
            }

            tempBoard[toR][toC] = piece;
            tempBoard[fromR][fromC] = "";

            const kingPos = findKing(color, tempBoard);
            if (kingPos !== -1 && !isSquareAttacked(kingPos, color === 'W' ? 'B' : 'W', tempBoard)) {
                legalMoves.push(toIndex);
            }
        }

        // Add Castling moves if piece is a King
        if (piece[1] === 'K' && !hasPieceMoved(index, moveHistory)) {
            const row = color === 'W' ? 7 : 0;
            const attackerColor = color === 'W' ? 'B' : 'W';

            // Check if king is in check
            const kingInCheck = isSquareAttacked(row * 8 + 4, attackerColor, currentBoard);

            if (!kingInCheck) {
                // Short castle (King side)
                if (!hasPieceMoved(row * 8 + 7, moveHistory) &&
                    currentBoard[row][5] === "" && currentBoard[row][6] === "" &&
                    !isSquareAttacked(row * 8 + 5, attackerColor, currentBoard) &&
                    !isSquareAttacked(row * 8 + 6, attackerColor, currentBoard)) {
                    legalMoves.push(row * 8 + 6);
                }
                // Long castle (Queen side)
                if (!hasPieceMoved(row * 8 + 0, moveHistory) &&
                    currentBoard[row][1] === "" && currentBoard[row][2] === "" && currentBoard[row][3] === "" &&
                    !isSquareAttacked(row * 8 + 3, attackerColor, currentBoard) &&
                    !isSquareAttacked(row * 8 + 2, attackerColor, currentBoard)) {
                    legalMoves.push(row * 8 + 2);
                }
            }
        }

        return legalMoves;
    }, []);

    const nextMoves = useMemo(() => {
        if (selectedIndex === -1) return [];
        const piece = getPieceAt(selectedIndex);
        if (!piece || piece[0] !== turn) return [];
        return getLegalMoves(selectedIndex, piece, board, lastMove, history);
    }, [selectedIndex, board, turn, getPieceAt, lastMove, history, getLegalMoves]);

    const allLegalMoves = useMemo(() => {
        const moves: { from: number, to: number }[] = [];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];
                if (piece && piece[0] === turn) {
                    const lMoves = getLegalMoves(r * 8 + c, piece, board, lastMove, history);
                    lMoves.forEach(to => moves.push({ from: r * 8 + c, to }));
                }
            }
        }
        return moves;
    }, [board, turn, lastMove, history, getLegalMoves]);

    const isCheckmate = inCheck && allLegalMoves.length === 0;
    const isStalemate = !inCheck && allLegalMoves.length === 0;

    const movePiece = useCallback((fromIndex: number, toIndex: number) => {
        const fromR = Math.floor(fromIndex / 8);
        const fromC = fromIndex % 8;
        const toR = Math.floor(toIndex / 8);
        const toC = toIndex % 8;

        let piece = board[fromR][fromC];
        const targetPiece = board[toR][toC];
        const newBoard = board.map(row => [...row]);

        let capturedPiece = targetPiece;

        // Castling move execution
        if (piece[1] === 'K' && Math.abs(fromC - toC) === 2) {
            const rookFromCol = toC === 6 ? 7 : 0;
            const rookToCol = toC === 6 ? 5 : 3;
            newBoard[fromR][rookToCol] = newBoard[fromR][rookFromCol];
            newBoard[fromR][rookFromCol] = "";
        }

        // En Passant logic
        if (piece[1] === 'P' && fromC !== toC && targetPiece === "") {
            // This is an en passant capture
            const captureRow = piece[0] === 'W' ? toR + 1 : toR - 1;
            capturedPiece = newBoard[captureRow][toC];
            newBoard[captureRow][toC] = "";
        }

        // Pawn Promotion (Auto-promote to Queen for professional simplicity)
        if (piece[1] === 'P' && (toR === 0 || toR === 7)) {
            piece = `${piece[0]}Q`;
        }

        newBoard[toR][toC] = piece;
        newBoard[fromR][fromC] = "";

        setHistory(prev => [...prev, {
            from: fromIndex,
            to: toIndex,
            piece: piece,
            capturedPiece: capturedPiece || undefined,
            boardBefore: board
        }]);

        setBoard(newBoard);
        setTurn(prev => (prev === 'W' ? 'B' : 'W') as PieceColor);
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
        setHistory([]);
    }, []);

    return {
        board,
        turn,
        selectedIndex,
        nextMoves,
        history,
        lastMove,
        isCheck: inCheck,
        isCheckmate,
        isStalemate,
        selectSquare,
        movePiece,
        resetGame,
        isPieceAt,
        getPieceAt
    };
};
