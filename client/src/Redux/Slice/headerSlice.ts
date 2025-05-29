import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeaderConfig } from "../../Types/header";

const initialState = {
    allHeaders: [] as HeaderConfig[],
    headerDetails: null as HeaderConfig | null
}

export const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        setAllHeaders: (state, action: PayloadAction<HeaderConfig[]>) => {
            state.allHeaders = action.payload
        },
        addHeader: (state, action: PayloadAction<HeaderConfig>) => {
            const existingThemeIndex = state.allHeaders.findIndex((hed) => hed._id === action.payload._id)
            if (existingThemeIndex === -1) {
                state.allHeaders.push(action.payload)
            }
        },
        updateHeader: (state, action: PayloadAction<HeaderConfig>) => {
            const index = state.allHeaders.findIndex((header) => header._id === action.payload._id)
            if (index !== -1) {
                state.allHeaders[index] = { ...action.payload }
            }
        },
        deleteHeader: (state, action: PayloadAction<string>) => {
            state.allHeaders = state.allHeaders.filter((hed) => hed._id !== action.payload)
        },
        setHeaderDetails: (state, action: PayloadAction<HeaderConfig | null>) => {
            state.headerDetails = action.payload
        }
    }
})

export const { setAllHeaders, addHeader, updateHeader, deleteHeader, setHeaderDetails } = headerSlice.actions;

export default headerSlice.reducer;