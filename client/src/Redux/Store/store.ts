import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../../Redux/Slice/authSlice"
import newsReducer from "../../Redux/Slice/newsSlice";
import schoolSlice from "../../Redux/Slice/schoolSlice";
import superAdminSlice from "../../Redux/Slice/superAdminSlice";
import websiteSlice from "../../Redux/Slice/websiteSlice";
import themeSlice from "../Slice/themeSlice";
import schoolAdminSlice from "../Slice/schoolAdminSlice";
import footerSlice from "../../Redux/Slice/footerSlice";
import headerSlice from "../../Redux/Slice/headerSlice";
import promotionSlice from "../../Redux/Slice/promotionSlice";
import blogSlice from "../../Redux/Slice/blogSlice";
import schoolBranchSlice from "../../Redux/Slice/schoolBranchSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice,
        school: schoolSlice,
        superadmin: superAdminSlice,
        schooladmin: schoolAdminSlice,
        news: newsReducer,
        theme: themeSlice,
        header: headerSlice,
        footer: footerSlice,
        website: websiteSlice,
        promotion: promotionSlice,
        blog: blogSlice,
        schoolBranch: schoolBranchSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;