import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../Types/redux";
import { SchoolAdminProps } from "../../Types/schoolAdmin";


const initialState: SchoolAdminProps = {
    allAdmins: [],
}

export const schoolAdminSlice = createSlice({
    name: "schoolAdmin",
    initialState,
    reducers: {
        setAllAdmins: (state, action: PayloadAction<UserType[]>) => {
            state.allAdmins = action.payload
        },
        AddAdmin: (state, action: PayloadAction<UserType>) => {
            const index = state.allAdmins.findIndex((admin) => admin._id === action.payload._id)
            if (index === -1) {
                state.allAdmins.push(action.payload)
            }
        },
        updateAdmin: (state, action: PayloadAction<UserType>) => {
            const index = state.allAdmins.findIndex((admin) => admin._id === action.payload._id)
            if (index !== -1) {
                state.allAdmins[index] = action.payload
            }
        },
        deleteAdmin: (state, action: PayloadAction<string>) => {
            state.allAdmins = state.allAdmins.filter((admin) => admin._id !== action.payload)
        },
    }
})

export const { setAllAdmins, deleteAdmin, updateAdmin, AddAdmin } = schoolAdminSlice.actions;
export default schoolAdminSlice.reducer;