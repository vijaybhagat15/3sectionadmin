// Define interfaces for form data structure
export interface NotificationSettings {
    email: boolean;
    push: boolean;
    marketing: boolean;
}

export interface PrivacySettings {
    profileVisibility: "public" | "private";
    dataSharing: boolean;
}

export interface FormDataType {
    firstName: string;
    lastName: string;
    email: string;
    userProfile: string | File | null;
    password: string;
}

export type TabOption = "account" | "security" | "notifications" | "privacy";