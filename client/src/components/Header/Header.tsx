import { Bell, Menu, MessageSquare, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Sidebar from "../SideBar/SideBar";
import { NavLink } from "react-router-dom";
import Profile from "../Profile/Profile";

export const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(5);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarElement = document.getElementById("sidebar-container");
      if (isSidebarOpen && sidebarElement && !sidebarElement.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  // For demo purposes - clear notifications
  const clearNotifications = (type: "notifications" | "messages") => {
    if (type === "notifications") setNotifications(0);
    else setMessages(0);
  };

  return (
    <>
      <header className="h-full stickey inset-x-0 top-0 z-50 flex items-center justify-between p-2 bg-surface shadow-md border-b border-color transition-all duration-200">
        {/* Left Section: Logo and Menu */}
        <div className="flex items-center md:hidden">
          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary/10 text-secondary transition-colors duration-200 mr-2"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Center Section: Search Bar */}
        <div
          className={`hidden md:block relative flex-grow max-w-md transition-all duration-200`}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 rounded-full border border-color bg-surface text-primary placeholder:text-secondary/70 outline-none focus:ring-[1px] focus:ring-primary/20 transition-all duration-200 input-field"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/70"
            />
          </div>
        </div>

        {/* Right Section: Actions and Profile */}
        <div className="flex items-center space-x-1 md:space-x-3">
          {/* <ThemeToggle /> */}

          {/* Notification Button */}
          <button
            className="relative p-2 rounded-full hover:bg-secondary/10 transition-colors duration-200"
            onClick={() => clearNotifications("notifications")}
          >
            <Bell size={20} className="text-secondary" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-5 h-5 px-1 text-xs font-semibold text-white bg-red-500 rounded-full border-2 border-surface">
                {notifications}
              </span>
            )}
          </button>

          {/* Messages Button */}
          <button
            className="relative p-2 rounded-full hover:bg-secondary/10 transition-colors duration-200"
            onClick={() => clearNotifications("messages")}
          >
            <MessageSquare size={20} className="text-secondary" />
            {messages > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-5 h-5 px-1 text-xs font-semibold text-white bg-red-500 rounded-full border-2 border-surface">
                {messages}
              </span>
            )}
          </button>

          {/* User Profile */}
          <Profile />
        </div>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300">
          <div
            id="sidebar-container"
            className={`bg-surface text-secondary w-64 fixed top-0 left-0 h-full shadow-lg rounded-r-lg transform transition-transform duration-500 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            {/* Header Section */}
            <div className="flex justify-between items-center px-4 py-3 bg-surface/90 backdrop-blur border-b border-color">
              <NavLink
                to={"/"}
                onClick={toggleSidebar}
                className="flex items-center"
              >
          <div className="flex items-center space-x-2 mx-auto">
            <img src="/tablogo.png" alt="" className="max-w-[30px]" />
            <h1 className="text-4xl">Sections</h1>
          </div>
              </NavLink>

              {/* Close Button */}
              <button
                className="p-1 rounded-full hover:bg-secondary/10 transition-colors duration-200"
                onClick={toggleSidebar}
                aria-label="Close Sidebar"
              >
                <X size={20} />
              </button>
            </div>
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>
        </div>
      )}

      {/* Space for fixed header */}
      <div className="pt-16"></div>
    </>
  );
};
