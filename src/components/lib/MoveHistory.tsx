import React, { useEffect, useRef } from 'react';
import type { Move } from '../../hooks/useChess';

interface MoveHistoryProps {
    history: Move[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ history }) => {
    const listRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [history]);

    // Group moves into pairs (White, Black)
    const movePairs = [];
    for (let i = 0; i < history.length; i += 2) {
        movePairs.push({
            num: Math.floor(i / 2) + 1,
            white: history[i],
            black: history[i + 1]
        });
    }

    // Helper to generate algebraic notation (simplified)
    const getNotation = (move: Move) => {
        const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const toC = cols[move.to % 8];
        const toR = 8 - Math.floor(move.to / 8);
        const piece = move.piece[1];

        let notation = '';
        if (piece !== 'P') notation += piece;
        if (move.capturedPiece) notation += 'x';
        notation += `${toC}${toR}`;

        if (move.promotedTo) notation += `=${move.promotedTo}`;

        return notation;
    };

    return (
        <div className="w-full h-48 bg-[#151515] border border-white/5 rounded flex flex-col">
            <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Move History</span>
            </div>
            <div
                ref={listRef}
                className="flex-1 overflow-y-auto p-2 space-y-1 font-mono text-xs scroll-smooth custom-scrollbar"
            >
                {movePairs.length === 0 && (
                    <div className="text-center text-gray-600 italic py-4">No moves yet</div>
                )}
                {movePairs.map((pair, i) => (
                    <div key={i} className="flex items-center px-2 py-1 hover:bg-white/5 rounded">
                        <span className="w-8 text-gray-500">{pair.num}.</span>
                        <span className="flex-1 text-gray-300 font-medium">{getNotation(pair.white)}</span>
                        <span className="flex-1 text-gray-300 font-medium">{pair.black ? getNotation(pair.black) : ''}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoveHistory;
