import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-3">
      <label className="text-sm font-medium text-primary select-none"
      >
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"} :
      </label>
      <button
        onClick={toggleTheme}
        className={`cursor-pointer relative w-16 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors duration-300
          ${theme === "light" ? "bg-gray-300" : "bg-gray-600"}
        `}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <span
          className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-md transition-all duration-300 ease-in-out flex items-center justify-center
            ${theme === "light" ? "translate-x-0 bg-white" : "translate-x-8 bg-gray-800"}`}
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4 text-gray-600" />
          ) : (
            <Sun className="w-4 h-4 text-yellow-500" />
          )}
        </span>
      </button>

    </div>
  );
};

export default ThemeToggle;