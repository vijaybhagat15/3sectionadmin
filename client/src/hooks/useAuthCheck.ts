// client/src/hooks/useAuthCheck.ts
import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxSelector";
import { persistLogin, setChecking } from "../Redux/Slice/authSlice"; // ✅ ADDED setChecking
import { RootState } from "../Redux/Store/store";
import { CHECK_AUTH } from "../Utils/api";

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state?.auth);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setChecking(true)); // ✅ START checking

      try {
        const res = await axios.get(CHECK_AUTH, { withCredentials: true });
        const data = res.data;
        if (data.success) {
          dispatch(persistLogin(data.user));
        } else {
          dispatch(persistLogin(null));
        }
      } catch (e) {
        dispatch(persistLogin(null));
      } finally {
        dispatch(setChecking(false)); // ✅ END checking
      }
    };

    checkAuth();
  }, [dispatch]);
};
