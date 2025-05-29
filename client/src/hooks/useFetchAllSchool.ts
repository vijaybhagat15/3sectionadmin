import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./reduxSelector";
import axios from "axios";
import { GET_ALL_SCHOOLS, GET_SCHOOL, requestOptions } from "../Utils/api";
import { setAllSchools } from "../Redux/Slice/schoolSlice";
import { RootState } from "../Redux/Store/store";
import { useLocation } from "react-router-dom";

export function useFetchAllSchools(): any {
    const { user } = useAppSelector((state: RootState) => state?.auth);
    const { schools } = useAppSelector((state: RootState) => state?.school)
    const dispatch = useAppDispatch();
    const location = useLocation();

    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchSchools = async (showRefreshing = false) => {
        if (showRefreshing) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }

        try {
            const url = user?.role === "superadmin" ? GET_ALL_SCHOOLS : `${GET_SCHOOL}/${user?._id}`;
            const response = await axios.get(url, requestOptions);
            const data = response.data;

            if (data?.success) {
                if (user?.role === "superadmin") {
                    dispatch(setAllSchools(data.allSchools));
                } else if (user?.role === "schooladmin" && data.school) {
                    dispatch(setAllSchools([data.school])); // wrap in array for consistency
                }
                if (!location.pathname.includes("dashboard") && !location.pathname.includes("add-promotion")) {
                    toast.success(showRefreshing ? "Schools list refreshed successfully" : data.message || "Schools loaded successfully");
                }
            }
        } catch (error) {
            setError("Failed to load schools. Please try again.");
            dispatch(setAllSchools([]));
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const allSchoolsLength = schools && schools.length;

    useEffect(() => {
        fetchSchools();
    }, []);

    return { loading, refreshing, error, fetchSchools, allSchoolsLength };
}
