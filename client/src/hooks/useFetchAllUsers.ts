import { useEffect } from "react";
import { RootState } from "../Redux/Store/store";
import { useAppDispatch, useAppSelector } from "./reduxSelector";
import axios from "axios";
import { GET_ALL_USERS, requestOptions } from "../Utils/api";
import { setAllUsers } from "../Redux/Slice/superAdminSlice";
import { UserType } from "../Types/redux";

export default function useFetchAllUsers() {
    const { allUsers } = useAppSelector((state: RootState) => state.superadmin);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(GET_ALL_USERS, requestOptions);
                const data = response.data;
                if (data?.success) {
                    dispatch(setAllUsers(data.allUsers));
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [dispatch]);

    const allUserLength = allUsers.length;
    const activeUserLength = allUsers.filter((user: UserType) => user?.status === "active").length;
    const inactiveUserLength = allUsers.filter((user: UserType) => user?.status === "inactive").length;

    return { allUserLength, activeUserLength, inactiveUserLength };
}
