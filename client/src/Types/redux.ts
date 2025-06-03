export type UserRole = "superadmin" | null;

export interface InitialStateProps {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checking: boolean; // ✅ NEW
}

export interface UserType {
    _id?: string;
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    userProfile: string,
    role: UserRole,
    mobile?: string;
    gender?: string;
    status?: string
    updatedAt?: string
    createdAt?: string
    lastLogin?: string
}

export type UpdateProfileParams = {
    id: string;
    formData: UserType;
};

export interface UserApiResponse {
    user: UserType;
    success: boolean;
    message: string;
}