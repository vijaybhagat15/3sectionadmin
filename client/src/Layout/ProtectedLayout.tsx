import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "../Types/redux";
import { useAppSelector } from "../hooks/reduxSelector";
import { RootState } from "../Redux/Store/store";
import Sidebar from "../components/SideBar/SideBar";
import { useState } from "react";
import { Header } from "../components/Header/Header";

export const ProtectedLayout = ({ allowedRoles }: { allowedRoles: UserRole[] }) => {
    const { user, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    if (!isAuthenticated || !user || !user.role) {
        return <Navigate to="/auth/signin" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    if (location.pathname === "/" || location.pathname === user.role) {
        return <Navigate to={`/${user.role}/dashboard`} replace />;
    }
    

    return (
        <section className="w-full h-screen flex">
            <div className="hidden md:block w-72 h-screen flex-shrink-0 overflow-y-auto">
                <Sidebar toggleSidebar={toggleSidebar} userRole={user?.role} />
            </div>

            {/* Main content and outlet */}
            <div className="flex flex-col flex-1">
                <div className="h-16 flex-shrink-0">
                    <Header />
                </div>

                <div className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto px-4 py-5">
                    {<Outlet />}
                </div>
            </div>
        </section>
    );
};