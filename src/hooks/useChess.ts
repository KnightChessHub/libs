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
    san?: string; // Standard Algebraic Notation
    isCheck?: boolean;
    isCheckmate?: boolean;
    promotedTo?: string;
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
    isDraw: boolean;
    drawReason: string | null;
    capturedPieces: { W: string[], B: string[] };
    promotionPending: { from: number, to: number } | null;
    selectSquare: (index: number) => void;
    movePiece: (fromIndex: number, toIndex: number, promotionPiece?: string) => void;
    cancelPromotion: () => void;
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

// Simplified board hashing for repetition check
const hashBoard = (board: BoardState, turn: PieceColor): string => {
    return JSON.stringify(board) + turn;
};

const getMaterial = (board: BoardState) => {
    const pieces: string[] = [];
    board.forEach(row => row.forEach(p => { if (p) pieces.push(p); }));
    return pieces;
};

const isInsufficientMaterial = (board: BoardState): boolean => {
    const pieces = getMaterial(board);
    if (pieces.length === 2) return true; // K vs K
    if (pieces.length === 3) {
        // K + (N|B) vs K
        return pieces.some(p => p.includes('N') || p.includes('B'));
    }
    if (pieces.length === 4) {
        // KB vs KB (same color bishops? - simplified for now to just KB vs KB)
        // This is a basic check; full rules are complex (same color bishops)
        // For professional completeness, we'd check bishop square colors.
        return false;
    }
    return false;
};

export const useChess = (): UseChessReturn => {
    const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
    const [turn, setTurn] = useState<PieceColor>('W');
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [history, setHistory] = useState<Move[]>([]);
    const [capturedPieces, setCapturedPieces] = useState<{ W: string[], B: string[] }>({ W: [], B: [] });
    // promotionPending stores the move details waiting for user selection
    const [promotionPending, setPromotionPending] = useState<{ from: number, to: number } | null>(null);
    const [halfMoveClock, setHalfMoveClock] = useState(0);
    const [boardHistory, setBoardHistory] = useState<string[]>([hashBoard(INITIAL_BOARD, 'W')]);

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
        if (kingPos === -1) return false;
        return isSquareAttacked(kingPos, turn === 'W' ? 'B' : 'W', board);
    }, [board, turn]);

    // Function to get truly legal moves
    const getLegalMoves = useCallback((index: number, piece: string, currentBoard: BoardState, lMove: Move | null, moveHistory: Move[]) => {
        const pseudoMoves = nextPossibleMoves(index, piece, currentBoard, lMove);
        const legalMoves: number[] = [];
        const color = piece[0] as PieceColor;
        const fromR = Math.floor(index / 8);
        const fromC = index % 8;

        for (const toIndex of pseudoMoves) {
            const toR = Math.floor(toIndex / 8);
            const toC = toIndex % 8;
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

        // Add Castling
        if (piece[1] === 'K' && !hasPieceMoved(index, moveHistory)) {
            const row = color === 'W' ? 7 : 0;
            const attackerColor = color === 'W' ? 'B' : 'W';
            const kingInCheck = isSquareAttacked(row * 8 + 4, attackerColor, currentBoard);

            if (!kingInCheck) {
                // Short castle
                if (!hasPieceMoved(row * 8 + 7, moveHistory) &&
                    currentBoard[row][5] === "" && currentBoard[row][6] === "" &&
                    !isSquareAttacked(row * 8 + 5, attackerColor, currentBoard) &&
                    !isSquareAttacked(row * 8 + 6, attackerColor, currentBoard)) {
                    legalMoves.push(row * 8 + 6);
                }
                // Long castle
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

    // Advanced Draw Conditions
    const drawState = useMemo(() => {
        if (isStalemate) return "Stalemate";
        if (halfMoveClock >= 100) return "50-Move Rule"; // 50 moves each = 100 half moves
        if (isInsufficientMaterial(board)) return "Insufficient Material";

        // Threefold Repetition
        const currentHash = hashBoard(board, turn);
        // We include current state, so count should be 3
        const count = boardHistory.filter(h => h === currentHash).length;
        if (count >= 3) return "Threefold Repetition";

        return null;
    }, [isStalemate, halfMoveClock, board, boardHistory, turn]);

    const movePiece = useCallback((fromIndex: number, toIndex: number, promotionPiece?: string) => {
        const fromR = Math.floor(fromIndex / 8);
        const fromC = fromIndex % 8;
        const toR = Math.floor(toIndex / 8);
        const toC = toIndex % 8;

        let piece = board[fromR][fromC];
        const targetPiece = board[toR][toC];

        // Handle Promotion Request
        if (piece[1] === 'P' && (toR === 0 || toR === 7) && !promotionPiece) {
            setPromotionPending({ from: fromIndex, to: toIndex });
            return;
        }

        // If we are here, essentially we are executing the move
        const newBoard = board.map(row => [...row]);
        let captured = targetPiece;
        let isPawnMoveOrCapture = piece[1] === 'P' || targetPiece !== "";

        // Castling
        if (piece[1] === 'K' && Math.abs(fromC - toC) === 2) {
            const rookFromCol = toC === 6 ? 7 : 0;
            const rookToCol = toC === 6 ? 5 : 3;
            newBoard[fromR][rookToCol] = newBoard[fromR][rookFromCol];
            newBoard[fromR][rookFromCol] = "";
        }

        // En Passant
        if (piece[1] === 'P' && fromC !== toC && targetPiece === "") {
            const captureRow = piece[0] === 'W' ? toR + 1 : toR - 1;
            captured = newBoard[captureRow][toC];
            newBoard[captureRow][toC] = "";
            isPawnMoveOrCapture = true;
        }

        // Apply Promotion
        if (promotionPiece) {
            piece = `${piece[0]}${promotionPiece}`;
        }

        newBoard[toR][toC] = piece;
        newBoard[fromR][fromC] = "";

        // Capture Tracking
        if (captured) {
            setCapturedPieces(prev => ({
                ...prev,
                [turn]: [...prev[turn], captured] // Track what 'turn' captured (so it's enemy piece)
            }));
        }

        // History
        const moveRecord: Move = {
            from: fromIndex,
            to: toIndex,
            piece,
            capturedPiece: captured || undefined,
            boardBefore: board,
            promotedTo: promotionPiece
        };
        const newHistory = [...history, moveRecord];
        setHistory(newHistory);
        setBoard(newBoard);

        // Update Game State
        const nextTurn = turn === 'W' ? 'B' : 'W';
        setTurn(nextTurn);
        setSelectedIndex(-1);
        setPromotionPending(null);

        // Clocks & History for Draws
        setHalfMoveClock(prev => isPawnMoveOrCapture ? 0 : prev + 1);
        setBoardHistory(prev => [...prev, hashBoard(newBoard, nextTurn)]);

    }, [board, history, turn, halfMoveClock]);

    const cancelPromotion = useCallback(() => {
        setPromotionPending(null);
        setSelectedIndex(-1);
    }, []);

    const selectSquare = useCallback((index: number) => {
        if (drawState || isCheckmate) return; // Game Over
        if (promotionPending) return; // Must finish promotion

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
    }, [getPieceAt, nextMoves, selectedIndex, turn, movePiece, drawState, isCheckmate, promotionPending]);

    const resetGame = useCallback(() => {
        setBoard(INITIAL_BOARD);
        setTurn('W');
        setSelectedIndex(-1);
        setHistory([]);
        setCapturedPieces({ W: [], B: [] });
        setBoardHistory([hashBoard(INITIAL_BOARD, 'W')]);
        setHalfMoveClock(0);
        setPromotionPending(null);
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
        isDraw: !!drawState,
        drawReason: drawState,
        capturedPieces,
        promotionPending,
        selectSquare,
        movePiece,
        cancelPromotion,
        resetGame,
        isPieceAt,
        getPieceAt
    };
};
