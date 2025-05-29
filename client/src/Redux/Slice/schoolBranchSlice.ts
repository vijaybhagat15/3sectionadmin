import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    initialStateSchoolBranch,
    SchoolBranch,
} from "../../Types/schoolBranch";

const initialState: initialStateSchoolBranch = {
    allSchoolBranches: [],
    schoolBranchDetails: null,
};

export const schoolBranchSlice = createSlice({
    name: "schoolBranch",
    initialState,
    reducers: {
        setAllSchoolBranches: (state, action: PayloadAction<SchoolBranch[]>) => {
            state.allSchoolBranches = action.payload;
        },
        setSchoolBranchDetails: (state, action: PayloadAction<SchoolBranch>) => {
            state.schoolBranchDetails = action.payload
        },

        addSchoolBranch: (state, action: PayloadAction<SchoolBranch>) => {
            const index = state.allSchoolBranches.findIndex((branch) => branch._id === action.payload._id)
            if (index === -1) {
                state.allSchoolBranches.push(action.payload)
            }
        },
        updateSchoolBranch: (state, action: PayloadAction<SchoolBranch>) => {
            const index = state.allSchoolBranches.findIndex((branch) => branch._id === action.payload._id)
            if (index !== -1) {
                state.allSchoolBranches[index] = action.payload
            }
        },
        deleteSchoolBranch: (state, action: PayloadAction<string>) => {
            state.allSchoolBranches = state.allSchoolBranches.filter((branch) => branch._id !== action.payload)
        }
    },
});

export const { setAllSchoolBranches,setSchoolBranchDetails, addSchoolBranch, updateSchoolBranch, deleteSchoolBranch } = schoolBranchSlice.actions;
export default schoolBranchSlice.reducer;
