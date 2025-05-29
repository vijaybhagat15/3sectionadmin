import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxSelector";
import { RootState } from "../Redux/Store/store";

export const AuthLayout = () => {
  const { user, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (isAuthenticated && user && user.role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  if (location.pathname === "/auth/signup") {
    return <Outlet />;
  }

  return <Outlet />;
};