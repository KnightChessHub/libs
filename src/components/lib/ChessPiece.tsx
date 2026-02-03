import { getIcon } from '../../algorithms/iconselection';

interface ChessPieceProps {
    piece: string;
    isDragging?: boolean;
}

const ChessPiece = ({ piece, isDragging }: ChessPieceProps) => {
    if (!piece) return null;

    return (
        <div
            className={`w-full h-full flex items-center justify-center transition-transform duration-200 ease-in-out ${isDragging ? 'scale-110 opacity-70' : 'scale-100'
                }`}
        >
            <div className="w-[85%] h-[85%] flex items-center justify-center pointer-events-none">
                {getIcon(piece)}
            </div>
        </div>
    );
};

export default ChessPiece;
