import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialSchoolState, SchoolProps } from "../../Types/school";


const initialState: initialSchoolState = {
    schools: [],
    schoolDetails: null
}

export const schoolSlice = createSlice({
    name: "school",
    initialState,
    reducers: {
        setAllSchools: (state, action: PayloadAction<SchoolProps[]>) => {
            state.schools = action.payload
        },
        addSchool: (state, action: PayloadAction<SchoolProps>) => {
            const index = state.schools.findIndex((school) => school._id === action.payload._id)
            if (index === -1) {
                state.schools.push(action.payload)
            }
        },
        updateSchool: (state, action: PayloadAction<SchoolProps>) => {
            const index = state.schools.findIndex((school) => school._id === action.payload._id)
            if (index !== -1) {
                state.schools[index] = action.payload
            }
        },
        deleteSchool: (state, action: PayloadAction<string>) => {
            state.schools = state.schools.filter((school) => school._id !== action.payload)
        },
        setSchoolDetails: (state, action: PayloadAction<SchoolProps>) => {
            state.schoolDetails = action.payload
        }
    }
})

export const { setAllSchools, setSchoolDetails, addSchool, updateSchool, deleteSchool } = schoolSlice.actions;
export default schoolSlice.reducer;