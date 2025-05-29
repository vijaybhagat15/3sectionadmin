export interface Route {
    id: string;
    title: string;
    path: string;
    icons: any;
    category: string;
    allowedRoles?: string[];
    requiresPermission?: string;
}

export interface ToggleSidebarProps {
    toggleSidebar: () => void;
    userRole: string;
}