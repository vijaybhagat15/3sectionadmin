import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxSelector";
import { RootState } from "../../Redux/Store/store";
import { ChevronDown, ChevronUp, LoaderCircle, LogOut, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { superAdminLogout } from "../../Redux/Slice/authSlice";
import { toast } from "react-toastify";

export default function Profile() {
    const { user, isLoading } = useAppSelector((state: RootState) => state?.auth);
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Fix role evaluation
    const isSuperAdmin = user?.role === "superadmin";

    const formatEmail = (email: string) => {
        if (!email) return "No email";
        return email.length > 10 ? `${email.slice(0, 10)}...` : email;
    };

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [isOpen]);

    const getMenuItems = () => {
        return [
            { icon: <Settings size={16} />, label: "Account Settings", path: `/${user?.role}/account-settings` }
        ];
    };

    const menuItems = getMenuItems();

    async function handleLogout() {
        try {

             if (isSuperAdmin) {
                console.log("Calling super admin logout");
                const res = await dispatch(superAdminLogout()).unwrap();
                if (res?.success) {
                    toast.success(res.message || "Super Admin logged out successfully");
                }
            } else {
                toast.error("Unable to determine user type for logout");
            }
        } catch (err: any) {
            console.error("Logout failed:", err);
            toast.error(err?.message || "Logout failed. Please try again.");
        }
    }

    return (
        <div className="relative cursor-pointer" ref={dropdownRef}>
            <button
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-surface-hover cursor-pointer"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {user?.userProfile ? (
                        <img src={user.userProfile} alt={`${user?.firstName}'s profile`} className="h-full w-full object-cover" />
                    ) : (
                        <User size={16} className="text-secondary" />
                    )}
                </div>
                <div className="flex flex-col items-start">
                    <span className="font-medium text-sm capitalize">{`${user?.firstName || "User"} ${user?.lastName || ""}`}</span>
                    <span className="text-xs text-gray-500">{user?.email ? formatEmail(user?.email) : "No email"}</span>
                </div>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Dropdown Menu with Smooth Animation */}
            <div
                className={`absolute right-1.5 mt-2 w-48 py-2 bg-surface rounded-md shadow-lg z-10 border border-color transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none"
                    }`}
            >
                {menuItems.map((item, index) => (
                    <NavLink
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        key={index}
                        className="px-4 py-2 text-sm text-primary bg-surface-hover w-full flex items-center space-x-2"
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
                <button
                    onClick={handleLogout}
                    className={`px-4 py-2 text-sm text-primary bg-surface-hover w-full flex items-center space-x-2 cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isLoading}
                >
                    <span className="flex items-center justify-center w-4 h-4">
                        {isLoading ? <LoaderCircle size={16} className="animate-spin text-primary" /> : <LogOut size={16} />}
                    </span>
                    <span>{isLoading ? "Logging out..." : "Logout"}</span>
                </button>
            </div>
        </div>
    );
}
