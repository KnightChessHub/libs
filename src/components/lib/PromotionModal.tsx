import React from 'react';

interface PromotionModalProps {
    isOpen: boolean;
    color: 'W' | 'B';
    onSelect: (piece: string) => void;
    onCancel: () => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, color, onSelect, onCancel }) => {
    if (!isOpen) return null;

    const pieces = ['Q', 'R', 'B', 'N'];
    const pieceNames: Record<string, string> = { Q: 'Queen', R: 'Rook', B: 'Bishop', N: 'Knight' };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1e1e1e] border border-white/10 p-6 rounded-lg shadow-2xl max-w-sm w-full mx-4">
                <h3 className="text-white text-lg font-bold text-center mb-6 uppercase tracking-widest">
                    Promote Pawn
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {pieces.map((p) => (
                        <button
                            key={p}
                            onClick={() => onSelect(p)}
                            className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all rounded group"
                        >
                            {/* We can use the actual SVG or an icon here. For now text/emoji */}
                            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                                {color === 'W' ?
                                    (p === 'Q' ? '♕' : p === 'R' ? '♖' : p === 'B' ? '♗' : '♘') :
                                    (p === 'Q' ? '♛' : p === 'R' ? '♜' : p === 'B' ? '♝' : '♞')
                                }
                            </span>
                            <span className="text-[10px] uppercase text-gray-400 font-bold group-hover:text-white">
                                {pieceNames[p]}
                            </span>
                        </button>
                    ))}
                </div>
                <button
                    onClick={onCancel}
                    className="mt-6 w-full py-3 text-xs font-bold text-red-400 hover:text-red-300 uppercase tracking-wider"
                >
                    Cancel Move
                </button>
            </div>
        </div>
    );
};

export default PromotionModal;
