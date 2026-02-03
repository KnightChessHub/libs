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
        darkSquare: '#769656',
        lightSquare: '#eeeed2',
        selectedSquare: 'rgba(255, 255, 0, 0.5)',
        highlightSquare: 'rgba(0, 0, 0, 0.1)',
        coordinatesColor: '#769656'
    },
    wood: {
        name: 'Wood',
        darkSquare: '#b58863',
        lightSquare: '#f0d9b5',
        selectedSquare: 'rgba(205, 210, 106, 0.8)',
        highlightSquare: 'rgba(0, 0, 0, 0.1)',
        coordinatesColor: '#b58863'
    },
    ice: {
        name: 'Ice',
        darkSquare: '#a9c7d3',
        lightSquare: '#e3ecf0',
        selectedSquare: 'rgba(121, 169, 191, 0.6)',
        highlightSquare: 'rgba(0, 0, 0, 0.05)',
        coordinatesColor: '#a9c7d3'
    },
    modern: {
        name: 'Modern',
        darkSquare: '#4b7399',
        lightSquare: '#eae9d2',
        selectedSquare: 'rgba(255, 255, 50, 0.4)',
        highlightSquare: 'rgba(0, 0, 0, 0.15)',
        coordinatesColor: '#4b7399'
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
