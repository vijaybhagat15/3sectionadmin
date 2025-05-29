import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType, InitialThemeState } from "../../Types/themeType";

const initialState: InitialThemeState = {
    allThemes: [],
    themeDetails: null
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setAllThemes: (state, action: PayloadAction<ThemeType[]>) => {
            state.allThemes = action.payload;
        },
        addTheme: (state, action: PayloadAction<ThemeType>) => {
            const existingThemeIndex = state.allThemes.findIndex(theme => theme._id === action.payload._id);

            if (existingThemeIndex === -1) {
                state.allThemes.push(action.payload);
            }
        },
        updateTheme: (state, action: PayloadAction<ThemeType>) => {
            const index = state.allThemes.findIndex(
                theme => theme._id === action.payload._id
            );

            if (index !== -1) {
                state.allThemes[index] = { ...action.payload };
            }
        },
        deleteTheme: (state, action: PayloadAction<string>) => {
            state.allThemes = state.allThemes.filter(theme => theme._id !== action.payload);
        },
        setDefaultTheme: (state, action: PayloadAction<string>) => {
            state.allThemes = state.allThemes.map(theme => ({
                ...theme,
                isDefault: theme._id === action.payload
            }));
        },
        setThemeDetails: (state, action: PayloadAction<ThemeType | null>) => {
            state.themeDetails = action.payload;
        }
    }
})

export const { setAllThemes, addTheme, updateTheme, deleteTheme, setDefaultTheme, setThemeDetails } = themeSlice.actions;

export default themeSlice.reducer;