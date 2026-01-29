import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeComponent = () => {
  const [theme, setTheme] = useState("light");

  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <FiSun className="w-5 h-5 text-amber-400" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeComponent;
