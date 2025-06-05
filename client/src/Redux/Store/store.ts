//client\src\Redux\Store\store.ts
import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../../Redux/Slice/authSlice"
import superAdminSlice from "../../Redux/Slice/superAdminSlice";
import jobReducer from '../../Redux/Slice/jobSlice';
import subBrandReducer from "../../Redux/Slice/subBrandSlice"; 
 import partnerReduce from "../../Redux/Slice/partnerSlice";



export const store = configureStore({
    reducer: {
        auth: authSlice,
        superadmin: superAdminSlice,
        jobs: jobReducer,
        subbrands: subBrandReducer,
        partners:partnerReduce
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;