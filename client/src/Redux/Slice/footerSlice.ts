import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Footer, FooterColumn, FooterInitialState, SocialLink } from "../../Types/footer";

const initialState: FooterInitialState = {
    allFooter: [],
    footerDetails: null,
    links: { title: "", url: "" },
    socialLinks: { platform: "", url: "" },
    columns: { title: "" }
}

export const footerSlice = createSlice({
    name: "footer",
    initialState,
    reducers: {
        setAllFooter: (state, action: PayloadAction<Footer[]>) => {
            state.allFooter = action.payload
        },
        setFooterDetails: (state, action: PayloadAction<Footer | null>) => {
            state.footerDetails = action.payload
        },
        addFooter: (state, action: PayloadAction<Footer>) => {
            const footer = state.allFooter.find((footer) => footer._id === action.payload._id)
            if (!footer) {
                state.allFooter.push(action.payload)
            }
        },
        updateFooter: (state, action: PayloadAction<Footer>) => {
            const index = state.allFooter.findIndex((footer) => footer._id === action.payload._id)
            if (index !== -1) {
                state.allFooter[index] = { ...action.payload }
            }
        },
        deleteFooter: (state, action: PayloadAction<string>) => {
            state.allFooter = state.allFooter.filter((footer) => footer._id !== action.payload)
        },
        addSocialLinks: (state, action: PayloadAction<SocialLink>) => {
            state.socialLinks = action.payload
        },
        removeSocialLinks: (state, action: PayloadAction<string>) => {
            if (state.footerDetails?.socialLinks) {
                state.footerDetails.socialLinks = state.footerDetails.socialLinks.filter(
                    (link) => link._id !== action.payload
                );
            }
        },
        addColumns: (state, action: PayloadAction<FooterColumn>) => {
            state.columns = action.payload
        },
    }
})

export const {
    setAllFooter,
    setFooterDetails,
    addFooter,
    updateFooter,
    deleteFooter,
    addSocialLinks,
    removeSocialLinks,
    addColumns
} = footerSlice.actions;

export default footerSlice.reducer;
