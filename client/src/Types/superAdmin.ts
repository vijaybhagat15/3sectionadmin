import { UserType } from "./redux";

export interface SuperAdminProps {
    allUsers: UserType[];
}

export interface AllAdminApiResponse {
    data: UserType[];
    success: boolean;
    message: string;
}

export interface DeleteApiResponse {
    success: boolean;
    message: string;
}


export interface Permission {
    id: number;
    name: string;
    required: boolean;
    description: string;
}

export interface RolePreset {
    id: string;
    name: string;
    description: string;
    permissions: number[];
}

export interface AuditLog {
    id: number;
    adminName: string;
    action: string;
    timestamp: string;
    details?: string;
    severity: "low" | "medium" | "high";
    ipAddress: string;
}