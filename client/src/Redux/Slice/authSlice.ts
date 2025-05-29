import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  UserApiResponse,
  InitialStateProps,
  UpdateProfileParams,
  UserType,
} from "../../Types/redux";
import {
  requestOptions,
  SUPERADMIN_SIGNUP,
  SUPERADMIN_LOGIN,
  SUPERADMIN_LOGOUT,
  SUPERADMIN_UPDATE_PROFILE,
} from "../../Utils/api";
import { RootState } from "../Store/store";
import Cookies from "js-cookie";

/************************************************************************************
 *  @description Initial state
 ************************************************************************************/
const initialState: InitialStateProps = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/************************************************************************************
 *  @description Error handler
 ************************************************************************************/
const handleError = (error: any): { success: false; message: string } => ({
  success: false,
  message: error.response?.data?.message || "Something went wrong",
});

/************************************************************************************
 *  @description Helper for cookie management
 ************************************************************************************/
const cookieManager = {
  clearAuthCookies: (isSuperAdmin = true) => {
    Cookies.remove("token");
    Cookies.remove(isSuperAdmin ? "user" : "schooladmin");
  },
  setAuthCookies: (token: string, user: UserType) => {
    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(user));
  },
};

/************************************************************************************
 *  @description login and register types data
 ************************************************************************************/
type LoginFormData = { email: string; password: string; role: string };
type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

/************************************************************************************
 *  @description Helper to create auth thunks with less code duplication
 ************************************************************************************/
const createAuthThunk = <T>(name: string, endpoint: string, options?: any) => {
  return createAsyncThunk<
    UserApiResponse,
    T,
    { rejectValue: { success: false; message: string } }
  >(name, async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(endpoint, data, options);
      return res.data as UserApiResponse;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  });
};

/************************************************************************************
 *  @description Superadmin Register
 ************************************************************************************/
export const superAdminRegister = createAuthThunk<RegisterFormData>(
  "superadmin/register",
  SUPERADMIN_SIGNUP
);

/************************************************************************************
 *  @description Superadmin Login
 ************************************************************************************/
export const superAdminLogin = createAuthThunk<LoginFormData>(
  "superadmin/login",
  SUPERADMIN_LOGIN,
  requestOptions
);

/************************************************************************************
 *  @description Superadmin Logout
 ************************************************************************************/
export const superAdminLogout = createAsyncThunk<
  UserApiResponse,
  void,
  { rejectValue: { success: false; message: string } }
>("superadmin/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(SUPERADMIN_LOGOUT, requestOptions);
    cookieManager.clearAuthCookies(true);
    return res.data as UserApiResponse;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

/************************************************************************************
 *  @description Superadmin Update Profile
 ************************************************************************************/
export const superAdminUpdateProfile = createAsyncThunk<
  UserApiResponse,
  UpdateProfileParams,
  { rejectValue: { success: false; message: string } }
>("superadmin/updateProfile", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const url = SUPERADMIN_UPDATE_PROFILE.replace(":id", id);
    const res = await axios.put(url, formData, requestOptions);
    return res.data as UserApiResponse;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

/************************************************************************************
 *  @description Helper for handling common reducer cases
 ************************************************************************************/
const addCommonCases = (builder: any) => {
  // Add common login/register success handling
  const handleAuthSuccess = (
    state: InitialStateProps,
    action: PayloadAction<UserApiResponse>
  ) => {
    if (!action.payload.success) {
      state.isLoading = false;
      state.error = action.payload.message;
      return;
    }
    state.isLoading = false;
    state.user = action.payload.user;
    state.isAuthenticated = true;
    state.error = null;
  };

  // Add common pending state handling
  const handlePending = (state: InitialStateProps) => {
    state.isLoading = true;
    state.error = null;
  };

  // Add common error handling
  const handleRejected = (
    state: InitialStateProps,
    action: PayloadAction<any>
  ) => {
    state.isLoading = false;
    state.error = action.payload?.message || "Operation failed";
  };

  const addStatusHandlers = (
    thunk: any,
    successHandler: Function = handleAuthSuccess
  ) => {
    builder
      .addCase(thunk.pending, handlePending)
      .addCase(thunk.fulfilled, successHandler)
      .addCase(thunk.rejected, handleRejected);
  };

  // Login cases for both admin types
  addStatusHandlers(superAdminLogin);

  // Register cases for both admin types
  addStatusHandlers(superAdminRegister);

  // Logout cases for both admin types
  const handleLogoutSuccess = (
    state: InitialStateProps,
    action: PayloadAction<UserApiResponse>
  ) => {
    if (!action.payload.success) {
      state.isLoading = false;
      state.error = action.payload.message;
      return;
    }
    state.isLoading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.error = null;
  };

  addStatusHandlers(superAdminLogout, handleLogoutSuccess);

  // Update profile cases for both admin types
  const handleProfileUpdateSuccess = (
    state: InitialStateProps,
    action: PayloadAction<UserApiResponse>
  ) => {
    if (!action.payload.success) {
      state.isLoading = false;
      state.error = action.payload.message;
      return;
    }
    state.isLoading = false;
    state.user = action.payload.user;
    state.error = null;
  };

  addStatusHandlers(superAdminUpdateProfile, handleProfileUpdateSuccess);
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: () => {
      cookieManager.clearAuthCookies();
      return { ...initialState };
    },
    persistLogin: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    addCommonCases(builder);
  },
});

export const { login, logout, persistLogin } = authSlice.actions;

// Selector to Access Auth State
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
