export interface DropdownProps {
    label: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

export interface ToggleSidebarProps {
    toggleSidebar: () => void;
    userRole: string;
}