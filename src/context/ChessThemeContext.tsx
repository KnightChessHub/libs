import { createContext, useContext, useState, type ReactNode } from 'react';

export interface ChessTheme {
    name: string;
    darkSquare: string;
    lightSquare: string;
    selectedSquare: string;
    highlightSquare: string;
    lastMoveSquare?: string;
    coordinatesColor: string;
}

export const THEMES: Record<string, ChessTheme> = {
    classic: {
        name: 'Classic',
        darkSquare: '#739552', // Standard green
        lightSquare: '#ebecd0', // Standard off-white
        selectedSquare: 'rgba(235, 236, 208, 0.5)',
        highlightSquare: 'rgba(0, 0, 0, 0.14)',
        coordinatesColor: '#739552'
    },
    wood: {
        name: 'Wood',
        darkSquare: '#b58863', // Rich wood brown
        lightSquare: '#f0d9b5', // Light wood
        selectedSquare: 'rgba(247, 247, 105, 0.5)',
        highlightSquare: 'rgba(0, 0, 0, 0.14)',
        coordinatesColor: '#b58863'
    },
    ice: {
        name: 'Ice',
        darkSquare: '#8ca2ad', // Muted slate blue
        lightSquare: '#dee3e6', // Cool grey
        selectedSquare: 'rgba(100, 150, 200, 0.5)',
        highlightSquare: 'rgba(0, 0, 0, 0.1)',
        coordinatesColor: '#8ca2ad'
    },
    modern: {
        name: 'Modern',
        darkSquare: '#404040', // Deep charcoal
        lightSquare: '#a0a0a0', // Neutral grey
        selectedSquare: 'rgba(0, 120, 255, 0.3)',
        highlightSquare: 'rgba(255, 255, 255, 0.1)',
        coordinatesColor: '#404040'
    }
};

interface ChessThemeContextType {
    theme: ChessTheme;
    setTheme: (name: string) => void;
}

const ChessThemeContext = createContext<ChessThemeContextType | undefined>(undefined);

export const ChessThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<ChessTheme>(THEMES.classic);

    const setTheme = (name: string) => {
        if (THEMES[name]) {
            setCurrentTheme(THEMES[name]);
        }
    };

    return (
        <ChessThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
            {children}
        </ChessThemeContext.Provider>
    );
};

export const useChessTheme = () => {
    const context = useContext(ChessThemeContext);
    if (!context) {
        throw new Error('useChessTheme must be used within a ChessThemeProvider');
    }
    return context;
};
