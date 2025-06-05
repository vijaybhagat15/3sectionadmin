import { NavLink } from "react-router-dom";
import {Settings} from "lucide-react";
import { ToggleSidebarProps } from "../../Types/sidebar";

const Sidebar = ({ toggleSidebar, userRole }: ToggleSidebarProps) => {
  const getRolePath = (path: string) => `/${userRole}${path}`;

  return (
    <section className="w-full h-full bg-surface text-primary flex flex-col">

      {/*  Header Section */}
      <div className="hidden sticky top-0 z-10 md:flex justify-between items-center bg-surface border-b border-color shadow-sm">
        <NavLink to={getRolePath("/dashboard")} className="flex items-center group px-4 py-[11.5px]">
          <div className="flex items-center space-x-2 mx-auto">
            <img src="/tablogo.png" alt="" className="max-w-[30px]" />
            <h1 className="text-4xl">Sections</h1>
          </div>
        </NavLink>

        {/* Right border with reduced height */}
        <div className="h-10 border-1 border-color"></div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-2 py-1 scrollbar-hide hover:scrollbar-show">
        {/* settings - Always show this for now */}
        <NavLink
          to={getRolePath("/jobs")}
          className={`block p-2 text-sm rounded-md bg-surface-hover`}
          onClick={toggleSidebar}
        >
          <Settings size={18} className="inline-block mr-2" /> Jobs
        </NavLink>
                {/* settings - Always show this for now */}
        <NavLink
          to={getRolePath("/subbrand")}
          className={`block p-2 text-sm rounded-md bg-surface-hover`}
          onClick={toggleSidebar}
        >
          <Settings size={18} className="inline-block mr-2" /> Our Sub Brands
        </NavLink>
                {/* settings - Always show this for now */}
        <NavLink
          to={getRolePath("/partner")}
          className={`block p-2 text-sm rounded-md bg-surface-hover`}
          onClick={toggleSidebar}
        >
          <Settings size={18} className="inline-block mr-2" /> Our Partners
        </NavLink>
      </div>
    </section>
  );
};

export default Sidebar;
