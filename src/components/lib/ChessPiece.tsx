
import React from 'react';
import { motion } from 'framer-motion';

export interface ChessPieceProps {
    type: string; // e.g., 'WP', 'BN'
    squareSize?: number;
    draggable?: boolean;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ type, squareSize = 70, draggable = true }) => {
    if (!type) return null;

    const color = type[0] === 'W' ? 'white' : 'black';
    const pieceType = type[1].toLowerCase();

    // Construct asset path
    const src = `/src/assets/pieces/${type.toLowerCase()}.png`;

    return (
        <motion.div
            layoutId={type + '-' + Math.random()} // unique id per instance for animations
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-center justify-center pointer-events-none"
            style={{ width: squareSize, height: squareSize }}
        >
            <img
                src={src}
                alt={type}
                className="w-[85%] h-[85%] object-contain drop-shadow-xl select-none"
            />
        </motion.div>
    );
};

export default ChessPiece;
