import type React from "react";

interface SquareProps {
    index: number;
    object: React.ReactNode;
    isSelected: boolean;
    isPosibleNextMove: boolean;
    onSquareClick: () => void;
}

const Square = ({ index, object, isSelected, isPosibleNextMove, onSquareClick }: SquareProps) => {
    const isDark = (index + Math.floor(index / 8)) % 2 === 0;

    return (
        <div
            onClick={onSquareClick}
            className={`w-full cursor-pointer aspect-square flex items-center justify-center relative text-xs md:text-sm ${isSelected ? "opacity-80" : ""}`}
            style={{ backgroundColor: `${isDark ? "#769656" : "#eeeed2"}` }}
        >
            {isSelected && <div className="absolute w-full h-full bg-yellow-500/40"></div>}
            <div className="z-10">{object}</div>
            {
                isPosibleNextMove && (
                    <div className="absolute w-full h-full flex items-center justify-center z-20 pointer-events-none">
                        <div className="h-4 w-4 bg-black/10 rounded-full"></div>
                    </div>
                )
            }
        </div>
    );
};

export default Square;