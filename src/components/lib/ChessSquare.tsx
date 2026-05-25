
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ChessSquareProps {
    index: number;
    piece: string;
    isSelected: boolean;
    isPossibleMove: boolean;
    isCheck: boolean;
    isLastMove: boolean;
    onClick: () => void;
    showCoordinates?: boolean;
}

const ChessSquare: React.FC<ChessSquareProps> = ({
    index,
    piece,
    isSelected,
    isPossibleMove,
    isCheck,
    isLastMove,
    onClick,
    showCoordinates = true,
}) => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    const isLight = (row + col) % 2 === 0;

    const files = 'abcdefgh';
    const ranks = '87654321';

    return (
        <div
            onClick={onClick}
            className={cn(
                "relative flex items-center justify-center transition-colors duration-200 cursor-pointer",
                isLight ? "bg-[#ebecd0]" : "bg-[#779556]",
                isSelected && "bg-[#f5f682]",
                isLastMove && "bg-[#f5f682]/80",
                isCheck && "bg-red-500/80 shadow-[inset_0_0_20px_rgba(255,0,0,0.5)]"
            )}
        >
            {/* Legal move indicator */}
            {isPossibleMove && (
                <div className={cn(
                    "rounded-full z-10",
                    piece ? "w-[90%] h-[90%] border-4 border-black/10" : "w-4 h-4 bg-black/10"
                )} />
            )}

            {/* Coordinates */}
            {showCoordinates && (
                <>
                    {col === 0 && (
                        <span className={cn(
                            "absolute top-0.5 left-0.5 text-[10px] font-bold select-none",
                            isLight ? "text-[#779556]" : "text-[#ebecd0]"
                        )}>
                            {ranks[row]}
                        </span>
                    )}
                    {row === 7 && (
                        <span className={cn(
                            "absolute bottom-0.5 right-0.5 text-[10px] font-bold select-none",
                            isLight ? "text-[#779556]" : "text-[#ebecd0]"
                        )}>
                            {files[col]}
                        </span>
                    )}
                </>
            )}
        </div>
    );
};

export default ChessSquare;
