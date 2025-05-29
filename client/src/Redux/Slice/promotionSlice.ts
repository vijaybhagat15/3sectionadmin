import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormattedReport, initialPromotionsState, PromotionType } from "../../Types/promotions";

const initialState: initialPromotionsState = {
    allPromotions: [],
    promotionDetails: null,
    promotionHistory: [],
    promotionReports: []
}

export const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {
        setAllPromotion: (state, action: PayloadAction<PromotionType[]>) => {
            state.allPromotions = action.payload
        },
        setPromotionDetails: (state, action: PayloadAction<PromotionType>) => {
            state.promotionDetails = action.payload
        },
        setAllPromotionHistory: (state, action: PayloadAction<PromotionType[]>) => {
            state.promotionHistory = action.payload
        },
        setPromotionReports: (state, action: PayloadAction<FormattedReport[]>) => {
            state.promotionReports = action.payload
         }
    }
})

export const { setAllPromotion, setPromotionDetails, setAllPromotionHistory,setPromotionReports } = promotionSlice.actions;
export default promotionSlice.reducer;