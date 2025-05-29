//client\src\hooks\useAuthCheck.tsimport axios from "axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxSelector";
import { persistLogin } from "../Redux/Slice/authSlice";
import { RootState } from "../Redux/Store/store";
import { CHECK_AUTH } from "../Utils/api";

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state?.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(CHECK_AUTH, { withCredentials: true });
        const data = res.data;
        if (data.success) {
          dispatch(persistLogin(data.user));
        }
      } catch (e) {
        dispatch(persistLogin(null));
      }
    }
    checkAuth();
  }, [dispatch]);
};
