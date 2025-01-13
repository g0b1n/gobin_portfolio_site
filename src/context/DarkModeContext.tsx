'use client'

import React, { createContext, useContext, useState, useEffect, Children } from 'react';

interface DarkModeContextProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

export const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isInitalized, setIsInitilized] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("isDarkMode", JSON.stringify(newMode));
            return newMode;
        });
    };

    useEffect(() => {
        const storedMode = localStorage.getItem("isDarkMode");
        if (storedMode !== null) {
            setIsDarkMode(JSON.parse(storedMode));
        }
        setIsInitilized(true);
    }, []);

    useEffect(() => {
        if (isInitalized) {
            document.documentElement.classList.toggle("dark", isDarkMode);
            document.documentElement.classList.toggle("light", !isDarkMode);
        }   
    }, [isDarkMode, isInitalized]);

    if (!isInitalized) {
        return <div>Loading...</div>
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error("useDarkMode must be used within a DarkModeProvider");
    }
    return context;
}