import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState.js";

const ThemeModeContext = createContext();

function ThemeModeProvider({ children }) {
  const [themeMode, setThemeMode] = useLocalStorageState("system", "themeMode");

  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === "light") {
      html.classList.add("light");
      html.classList.remove("dark");
    } else if (themeMode === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        html.classList.add("dark");
        html.classList.remove("light");
      } else {
        html.classList.add("light");
        html.classList.remove("dark");
      }
    }
  }, [themeMode]);


  function handleThemeMode(isDark){
    setThemeMode(isDark);
  }

  return (
    <ThemeModeContext.Provider value={{ themeMode, handleThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (context === undefined)
    throw new Error("useThemeMode must be used inside ThemeModeProvider");
  return context;
}

export { ThemeModeProvider, useThemeMode };
