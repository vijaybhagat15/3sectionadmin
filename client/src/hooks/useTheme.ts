import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeProvider";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    return context;
};