import { NavLink } from "react-router-dom";
import {Settings} from "lucide-react";
import logo from "../../../public/logo.png"

import { ToggleSidebarProps } from "../../Types/sidebar";

const Sidebar = ({ toggleSidebar, userRole }: ToggleSidebarProps) => {
  const getRolePath = (path: string) => `/${userRole}${path}`;

  return (
    <section className="w-full h-full bg-surface text-primary flex flex-col">

      {/*  Header Section */}
      <div className="hidden sticky top-0 z-10 md:flex justify-between items-center bg-surface border-b border-color shadow-sm">
        <NavLink to={getRolePath("/dashboard")} className="flex items-center group px-4 py-[11.5px]">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-2 border border-color transition-transform duration-200">
            <img
              src={logo}
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
        </NavLink>

        {/* Right border with reduced height */}
        <div className="h-10 border-1 border-color"></div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-2 py-1 scrollbar-hide hover:scrollbar-show">
        {/* settings - Always show this for now */}
        <NavLink
          to={getRolePath("/settings")}
          className={`block p-2 text-sm rounded-md bg-surface-hover`}
          onClick={toggleSidebar}
        >
          <Settings size={18} className="inline-block mr-2" /> Settings
        </NavLink>
      </div>
    </section>
  );
};

export default Sidebar;
