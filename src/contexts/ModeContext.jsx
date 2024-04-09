import { createContext, useContext, useEffect, useState } from "react";

export const ModeContext = createContext();

export function ModeProvider({ children }) {
    const [mode, setMode] = useState("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");

        if (storedTheme) {
            setMode(storedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setMode("dark");
        }
    }, []);

    const handleDarkMode = () => {
        localStorage.setItem("theme", "dark");
        setMode("dark");
    };

    const handleLightMode = () => {
        localStorage.setItem("theme", "light");
        setMode("light");
    };

    const handleSystemDefaultMode = () => {
        localStorage.removeItem("theme");
        setMode(
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
        );
    };

    return (
        <ModeContext.Provider
            value={{
                mode,
                handleDarkMode,
                handleLightMode,
                handleSystemDefaultMode,
            }}
        >
            {children}
        </ModeContext.Provider>
    );
}

export const useMode = () => {
    return useContext(ModeContext);
};
