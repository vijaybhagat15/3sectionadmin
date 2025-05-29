export const BASE_URL = "http://localhost:8000/api/v1";

export const requestOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// check auth
export const CHECK_AUTH = `${BASE_URL}/auth/check-auth`;

// superadmin
export const SUPERADMIN_SIGNUP = `${BASE_URL}/superadmin/auth/signup`;
export const SUPERADMIN_LOGIN = `${BASE_URL}/superadmin/auth/signin`;
export const SUPERADMIN_LOGOUT = `${BASE_URL}/superadmin/auth/logout`;
export const SUPERADMIN_FORGET_PASSWORD = `${BASE_URL}/superadmin/auth/forget-password`;
export const SUPERADMIN_RESET_PASSWORD = `${BASE_URL}/superadmin/auth/reset-password/:token`;
export const SUPERADMIN_UPDATE_PROFILE = `${BASE_URL}/superadmin/update-profile`;
export const GET_ALL_SCHOOLADMINS = `${BASE_URL}/schooladmin/all-school-admins`;
export const GET_ALL_USERS = `${BASE_URL}/superadmin/get-all-users`;
export const GET_ACTIVE_USERS = `${BASE_URL}/superadmin/get-active-users`;
export const GET_INACTIVE_USERS = `${BASE_URL}/superadmin/get-inactive-users`;
