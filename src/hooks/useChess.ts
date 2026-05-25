
import { useState, useCallback, useMemo, useEffect } from 'react';
import { ChessGame } from '../engine/core/ChessGame';
import { Color, PieceType, PIECE_MASK, COLOR_MASK, MoveFlags } from '../engine/core/types';
import type { Move } from '../engine/core/types';

export type PieceColor = 'W' | 'B';
export type BoardState = string[][];

export interface UseChessReturn {
    board: BoardState;
    turn: PieceColor;
    selectedIndex: number;
    nextMoves: number[];
    history: { san: string }[];
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

export const useChess = (initialFen?: string, onMove?: (san: string) => void): UseChessReturn => {
    const [game, setGame] = useState(() => new ChessGame(initialFen));
    const [board, setBoard] = useState<BoardState>(() => engineBoardToState(game.position.board));
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [promotionPending, setPromotionPending] = useState<{ from: number, to: number } | null>(null);

    // Sync state helpers
    const updateLocalState = useCallback((newGame: ChessGame) => {
        setGame(newGame);
        setBoard(engineBoardToState(newGame.position.board));
        setSelectedIndex(-1);
        setPromotionPending(null);
    }, []);

    useEffect(() => {
        if (initialFen && initialFen !== game.position.getFen()) {
            updateLocalState(new ChessGame(initialFen));
        }
    }, [initialFen, updateLocalState, game]);

    const turn: PieceColor = game.position.turn === Color.WHITE ? 'W' : 'B';
    const isCheck = game.position.isAttacked(
        game.position.findKing(game.position.turn),
        game.position.turn === Color.WHITE ? Color.BLACK : Color.WHITE
    );

    const gameOver = game.isGameOver();
    const isCheckmate = gameOver.reason === 'checkmate';
    const isStalemate = gameOver.reason === 'stalemate';
    const isDraw = gameOver.over && !isCheckmate;
    const drawReason = gameOver.reason || null;

    const lastMove = game.history.length > 0 ? game.history[game.history.length - 1].move : null;

    const nextMoves = useMemo(() => {
        if (selectedIndex === -1) return [];
        return game.position.generateMoves()
            .filter(m => m.from === selectedIndex)
            .map(m => m.to);
    }, [selectedIndex, game]);

    const selectSquare = useCallback((index: number) => {
        if (gameOver.over) return;
        if (promotionPending) return;

        const piece = game.position.board[index];
        const color = piece & COLOR_MASK;

        // If clicking a valid move square, execute move
        if (nextMoves.includes(index)) {
            const move = game.position.generateMoves().find(m => m.from === selectedIndex && m.to === index);
            if (move) {
                if (move.flags & MoveFlags.PROMOTION) {
                    setPromotionPending({ from: selectedIndex, to: index });
                } else {
                    const san = game.moveToSan(move);
                    game.move(move);
                    updateLocalState(new ChessGame(game.position.getFen()));
                    if (onMove) onMove(san);
                }
            }
            return;
        }

        // Handle selection
        if (piece !== 0 && color === game.position.turn) {
            setSelectedIndex(index === selectedIndex ? -1 : index);
        } else {
            setSelectedIndex(-1);
        }
    }, [game, selectedIndex, nextMoves, promotionPending, gameOver.over, updateLocalState]);

    const movePiece = useCallback((fromIndex: number, toIndex: number, promotionPiece?: string) => {
        const moves = game.position.generateMoves();
        const move = moves.find(m => m.from === fromIndex && m.to === toIndex &&
            (!promotionPiece || (m.promotion === charToPieceType(promotionPiece))));

        if (move) {
            const san = game.moveToSan(move);
            game.move(move);
            updateLocalState(new ChessGame(game.position.getFen()));
            if (onMove) onMove(san);
        }
    }, [game, updateLocalState]);

    const cancelPromotion = useCallback(() => {
        setPromotionPending(null);
        setSelectedIndex(-1);
    }, []);

    const resetGame = useCallback(() => {
        const newGame = new ChessGame(initialFen);
        updateLocalState(newGame);
    }, [initialFen, updateLocalState]);

    const isPieceAt = (index: number) => game.position.board[index] !== 0;
    const getPieceAt = (index: number) => pieceToEngineString(game.position.board[index]);

    const capturedPieces = useMemo(() => {
        const white: string[] = [];
        const black: string[] = [];
        game.history.forEach(h => {
            if (h.move.captured) {
                const char = pieceToEngineString(h.move.captured);
                if (h.move.captured & Color.BLACK) white.push(char); // Captured by white
                else black.push(char); // Captured by black
            }
        });
        return { W: white, B: black };
    }, [game.history]);

    return {
        board,
        turn,
        selectedIndex,
        nextMoves,
        history: game.history.map(h => ({ san: h.san })),
        lastMove,
        isCheck,
        isCheckmate,
        isStalemate,
        isDraw,
        drawReason,
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

// Utilities
function engineBoardToState(board: Uint8Array): BoardState {
    const state: BoardState = [];
    for (let r = 0; r < 8; r++) {
        const row: string[] = [];
        for (let c = 0; c < 8; c++) {
            row.push(pieceToEngineString(board[r * 8 + c]));
        }
        state.push(row);
    }
    return state;
}

function pieceToEngineString(p: number): string {
    if (p === 0) return "";
    const color = (p & COLOR_MASK) === Color.WHITE ? 'W' : 'B';
    let type = "";
    switch (p & PIECE_MASK) {
        case PieceType.PAWN: type = 'P'; break;
        case PieceType.KNIGHT: type = 'N'; break;
        case PieceType.BISHOP: type = 'B'; break;
        case PieceType.ROOK: type = 'R'; break;
        case PieceType.QUEEN: type = 'Q'; break;
        case PieceType.KING: type = 'K'; break;
    }
    return color + type;
}

function charToPieceType(c: string): PieceType {
    switch (c.toUpperCase()) {
        case 'P': return PieceType.PAWN;
        case 'N': return PieceType.KNIGHT;
        case 'B': return PieceType.BISHOP;
        case 'R': return PieceType.ROOK;
        case 'Q': return PieceType.QUEEN;
        case 'K': return PieceType.KING;
        default: return PieceType.NONE;
    }
}
