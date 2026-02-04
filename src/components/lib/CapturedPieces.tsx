import React from 'react';

interface CapturedPiecesProps {
    captured: { W: string[], B: string[] };
}

const CapturedPieces: React.FC<CapturedPiecesProps> = ({ captured }) => {
    // Helper to render piece icons
    const getIcon = (piece: string) => {
        const map: Record<string, string> = {
            'WP': '♙', 'WN': '♘', 'WB': '♗', 'WR': '♖', 'WQ': '♕',
            'BP': '♟', 'BN': '♞', 'BB': '♝', 'BR': '♜', 'BQ': '♛'
        };
        return map[piece] || '';
    };

    // Value map for sorting
    const getValue = (piece: string) => {
        const type = piece[1];
        if (type === 'Q') return 9;
        if (type === 'R') return 5;
        if (type === 'B') return 3;
        if (type === 'N') return 3;
        return 1;
    };

    const whiteCaptured = [...captured.W].sort((a, b) => getValue(b) - getValue(a));
    const blackCaptured = [...captured.B].sort((a, b) => getValue(b) - getValue(a));

    return (
        <div className="flex flex-col gap-2 w-full">
            {/* White captured (Black pieces captured by White) */}
            <div className="flex items-center gap-2 h-8 px-2 bg-white/5 rounded border border-white/5 overflow-hidden">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-white/10 rounded-full text-[10px] font-bold text-white">
                    W
                </div>
                <div className="flex -space-x-1 overflow-x-auto no-scrollbar">
                    {whiteCaptured.map((p, i) => (
                        <span key={i} className="text-xl text-white/70 filter drop-shadow-md select-none" title={p}>
                            {getIcon(p)}
                        </span>
                    ))}
                </div>
            </div>

            {/* Black captured (White pieces captured by Black) */}
            <div className="flex items-center gap-2 h-8 px-2 bg-white/5 rounded border border-white/5 overflow-hidden">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-black/50 text-white rounded-full text-[10px] font-bold border border-white/10">
                    B
                </div>
                <div className="flex -space-x-1 overflow-x-auto no-scrollbar">
                    {blackCaptured.map((p, i) => (
                        <span key={i} className="text-xl text-white/70 filter drop-shadow-md select-none" title={p}>
                            {getIcon(p)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CapturedPieces;
