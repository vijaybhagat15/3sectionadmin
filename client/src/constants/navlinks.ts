import { Home, Users, Globe, Shield, FileText, UploadCloud, Bell, Database, BarChart2, School, BookOpen, Palette, UserPlus, UserCheck, Lock, Eye, PenTool, FileImage, FileText as Document, Award, Activity, Calendar, DollarSign, Book, Clipboard, FileCheck, Layers, MapPin, Settings, Layout, Edit, Code, Monitor, Server, Image, List, Plus } from "lucide-react";
import { Route } from "../Types/navRoutes";

export const allRoutes: Route[] = [
    //dashboard
    {
        id: "dashboard-1",
        title: "Dashboard",
        path: "/dashboard",
        icons: Home,
        category: "Dashboard",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    // School Management
    {
        id: "school-1",
        title: "Add School",
        path: "/add-school",
        icons: School,
        category: "School Management",
        allowedRoles: ["superadmin"]
    },
    {
        id: "school-2",
        title: "View Schools",
        path: "/view-schools",
        icons: Eye,
        category: "School Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "school-4",
        title: "School Types",
        path: "/schools-types",
        icons: Layers,
        category: "School Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "school-5",
        title: "School Branches",
        path: "/schools-branches",
        icons: MapPin,
        category: "School Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },

    // User Management
    {
        id: "user-1",
        title: "Add School Admin",
        path: "/add-school-admin",
        icons: UserPlus,
        category: "User Management",
        allowedRoles: ["superadmin"]
    },
    {
        id: "user-2",
        title: "Manage Admins",
        path: "/manage-admins",
        icons: UserCheck,
        category: "User Management",
        allowedRoles: ["superadmin"]
    },
    {
        id: "user-3",
        title: "Permissions",
        path: "/permissions",
        icons: Lock,
        category: "User Management",
        allowedRoles: ["superadmin"]
    },
    {
        id: "user-4",
        title: "Audit Logs",
        path: "/audit-logs",
        icons: FileCheck,
        category: "User Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },

    // Announcements Management
    {
        id: "announcement-1",
        title: "Create Announcements",
        path: "/create-announcements",
        icons: UploadCloud,
        category: "Announcements Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "announcement-2",
        title: "View Announcements",
        path: "/view-announcements",
        icons: Eye,
        category: "Announcements Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "announcement-4",
        title: "Notification Templates",
        path: "/announcements/templates",
        icons: Bell,
        category: "Announcements Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "blog-1",
        title: "Blog List",
        path: "/blog-list",
        icons: List,
        category: "Blog Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "blog-2",
        title: "Add Blog Post",
        path: "/add-blog",
        icons: UploadCloud,
        category: "Blog Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    // Admission Management
    {
        id: "admission-1",
        title: "Create Admissions",
        path: "/admissions/create",
        icons: UploadCloud,
        category: "Admission Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "admission-2",
        title: "View Admissions",
        path: "/admissions/view",
        icons: Eye,
        category: "Admission Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "admission-3",
        title: "Media Library",
        path: "/admissions/media",
        icons: FileImage,
        category: "Admission Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "admission-4",
        title: "Application Forms",
        path: "/admissions/forms",
        icons: Clipboard,
        category: "Admission Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "admission-5",
        title: "Fee Configuration",
        path: "/admissions/fees",
        icons: DollarSign,
        category: "Admission Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "admission-6",
        title: "Entrance Exams",
        path: "/admissions/exams",
        icons: BookOpen,
        category: "Admission Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "admission-7",
        title: "Interview Scheduling",
        path: "/admissions/interviews",
        icons: Calendar,
        category: "Admission Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },

    // Promotion Management
    {
        id: "promotion-1",
        title: "Add Promotion",
        path: "/add-promotion",
        icons: Plus,
        category: "Promotion Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "promotion-2",
        title: "Promotion List",
        path: "/promotion-list",
        icons: List,
        category: "Promotion Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "promotion-4",
        title: "Batch Promotion",
        path: "/promotion-batch",
        icons: Users,
        category: "Promotion Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "promotion-5",
        title: "Promotion History",
        path: "/promotion-history",
        icons: FileText,
        category: "Promotion Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "promotion-6",
        title: "Promotion Reports",
        path: "/promotion-reports",
        icons: BarChart2,
        category: "Promotion Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },


    // Exam Management
    {
        id: "exam-1",
        title: "Global Exam Templates",
        path: "/exams/templates",
        icons: Document,
        category: "Exam Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "exam-2",
        title: "Result Settings",
        path: "/exams/results/settings",
        icons: Award,
        category: "Exam Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "exam-3",
        title: "Statistics & Reporting",
        path: "/exams/reports",
        icons: BarChart2,
        category: "Exam Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "exam-4",
        title: "Question Bank",
        path: "/exams/questions",
        icons: Book,
        category: "Exam Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "exam-5",
        title: "Report Card Designer",
        path: "/exams/report-cards",
        icons: PenTool,
        category: "Exam Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },

    // Academic Management
    {
        id: "academic-1",
        title: "Curriculum Management",
        path: "/academics/curriculum",
        icons: Book,
        category: "Academic Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "academic-2",
        title: "Subject Configuration",
        path: "/academics/subjects",
        icons: BookOpen,
        category: "Academic Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "academic-3",
        title: "Grade Levels",
        path: "/academics/grades",
        icons: Layers,
        category: "Academic Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "academic-4",
        title: "Academic Calendar",
        path: "/academics/calendar",
        icons: Calendar,
        category: "Academic Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },

    // Security and Backup
    {
        id: "security-1",
        title: "Security Logs",
        path: "/security/logs",
        icons: Shield,
        category: "Security and Backup",
        allowedRoles: ["superadmin"]
    },
    {
        id: "security-2",
        title: "Data Backups",
        path: "/security/backups",
        icons: Database,
        category: "Security and Backup",
        allowedRoles: ["superadmin"]
    },
    {
        id: "security-3",
        title: "Security Settings",
        path: "/security/settings",
        icons: Shield,
        category: "Security and Backup",
        allowedRoles: ["superadmin"]
    },

    // Analytics and SEO
    {
        id: "analytics-1",
        title: "Website Analytics",
        path: "/web-analytics",
        icons: BarChart2,
        category: "Analytics and SEO",
        allowedRoles: ["superadmin"]
    },
    {
        id: "analytics-2",
        title: "SEO Settings",
        path: "/seo-settings",
        icons: Globe,
        category: "Analytics and SEO",
        allowedRoles: ["superadmin"]
    },
    {
        id: "analytics-3",
        title: "Performance Metrics",
        path: "/performance-analytics",
        icons: Activity,
        category: "Analytics and SEO",
        allowedRoles: ["superadmin"]
    },
    // website management
    {
        id: "website-1",
        title: "Create Website",
        path: "/create-website",
        icons: Globe,
        category: "Website Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "website-3",
        title: "Header Configuration",
        path: "/create-header",
        icons: Layout,
        category: "Website Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "website-4",
        title: "Footer Configuration",
        path: "/create-footer",
        icons: Layout,
        category: "Website Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "website-6",
        title: "Theme Settings",
        path: "/website-theme-setting",
        icons: Palette,
        category: "Website Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },
    {
        id: "website-8",
        title: "Domain Settings",
        path: "/website-domain",
        icons: Server,
        category: "Website Management",
        allowedRoles: ["superadmin"]
    },
    {
        id: "website-9",
        title: "Website Preview",
        path: "/website-preview",
        icons: Monitor,
        category: "Website Management",
        allowedRoles: ["superadmin", "schooladmin"]
    },

];

// Helper function to get routes by role and category
export const getRoutesByRoleAndCategory = (role: string, category: string) => {
    const routes = allRoutes.filter((route) =>
        route.category === category && (route.allowedRoles ? route.allowedRoles.includes(role) : false)
    );
    return routes;
};

// Get categories available to a specific role
export const getCategoriesByRole = (role: string) => {
    const routesForRole = allRoutes.filter((route) =>
        route.allowedRoles ? route.allowedRoles.includes(role) : false
    );
    const categories = [...new Set(routesForRole.map(route => route.category))];
    return categories;
};
