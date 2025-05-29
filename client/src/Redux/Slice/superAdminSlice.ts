import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SuperAdminProps } from "../../Types/superAdmin";
import { UserType } from "../../Types/redux";


const initialState: SuperAdminProps = {
    allUsers: [],
}

export const superAdminSlice = createSlice({
    name: "superAdmin",
    initialState,
    reducers: {
        setAllUsers: (state, action: PayloadAction<UserType[]>) => {
            state.allUsers = action.payload
        },
    }
})

export const { setAllUsers } = superAdminSlice.actions;
export default superAdminSlice.reducer;