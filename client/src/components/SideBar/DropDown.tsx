import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DropdownProps } from "../../Types/sidebar";

const Dropdown: React.FC<DropdownProps> = ({ label, icon, children, defaultOpen = false, className = "" }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const dropdownId = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      <div
        className={`flex items-center justify-between px-2 py-2 text-sm rounded-md cursor-pointer bg-surface-hover mt-1`}
        onClick={toggleDropdown}
        role="button"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
      >
        <div className="flex items-center space-x-2 text-md ">
          <span>{icon && icon}</span>
          <span className="font-semibold text-md capitalize tracking-wider">{label}</span>
        </div>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180 text-blue-600" : ""}`}
        />
      </div>
      {isOpen && (
        <div id={dropdownId} className="pl-6 text-secondary">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
