import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialWebsiteState, WebsiteType } from "../../Types/website";


const initialState: initialWebsiteState = {
    allWebsite: [],
}

export const websiteSlice = createSlice({
    name: "website",
    initialState,
    reducers: {
        setAllWebsite: (state, action: PayloadAction<WebsiteType[] | []>) => {
            state.allWebsite = action.payload
        },
        addWebsite: (state, action: PayloadAction<WebsiteType>) => {
            const index = state.allWebsite.findIndex((website) => website._id === action.payload._id)
            if (index === -1) {
                state.allWebsite.push(action.payload)
            }
        },
        updateWebsite: (state, action: PayloadAction<WebsiteType>) => {
            const index = state.allWebsite.findIndex((website) => website._id === action.payload._id)
            if (index !== -1) {
                state.allWebsite[index] = { ...action.payload }
            }
        },
        deleteWebsite: (state, action: PayloadAction<string>) => {
            state.allWebsite = state.allWebsite.filter((website) => website._id !== action.payload)
        },
    }
})

export const { setAllWebsite, addWebsite, updateWebsite, deleteWebsite } = websiteSlice.actions;
export default websiteSlice.reducer;