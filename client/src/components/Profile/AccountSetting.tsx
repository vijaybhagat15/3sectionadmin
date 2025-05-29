import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxSelector";
import { RootState } from "../../Redux/Store/store";
import { Save, AlertCircle, Camera } from "lucide-react";
import { ThemeToggle } from "../Header/ThemeToggle";
import { toast } from "react-toastify";
import { superAdminUpdateProfile } from "../../Redux/Slice/authSlice";

export default function AccountSetting() {
    const { user, isLoading } = useAppSelector((state: RootState) => state?.auth);
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        mobile: user?.mobile || "",
        gender: user?.gender || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        userProfile: user?.userProfile || "",
    });

    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        setIsEditing(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);

            // Show image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevData => ({ ...prevData, userProfile: reader.result as string }));
            };
            reader.readAsDataURL(file);
            setIsEditing(true);
        }
    };

    const validateForm = () => {
        const errors: string[] = [];

        if (!formData.firstName.trim()) errors.push("First Name is required");
        if (!formData.lastName.trim()) errors.push("Last Name is required");
        if (!formData.email.trim()) {
            errors.push("Email is required");
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.push("Invalid email format");
        }

        if (formData.newPassword) {
            if (!formData.currentPassword) errors.push("Current password is required to change password");
            if (formData.newPassword.length < 8) errors.push("New password must be at least 8 characters long");
            if (formData.newPassword !== formData.confirmPassword) errors.push("New password and confirm password do not match");
        }

        return errors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidationErrors([]);

        const errors = validateForm();
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }


        const updateData: any = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            gender: formData.gender,
        };


        if (profileImage) {
            updateData.userProfile = profileImage;
        }

        if (formData.newPassword) {
            updateData.currentPassword = formData.currentPassword;
            updateData.password = formData.newPassword;
        }

        try {
            const res = await dispatch(superAdminUpdateProfile({
                id: user?.id as string,
                formData: updateData
            }));

            if (res.payload?.success) {
                toast.success("Profile updated successfully!");
                setIsEditing(false);
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }));
            } else {
                toast.error(res.payload?.message || "Update failed");
            }
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    return (
        <section className="max-w-4xl mx-auto p-8 bg-surface rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Settings</h1>
                <ThemeToggle />
            </div>

            {validationErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md mb-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                        <AlertCircle className="mr-2" size={20} />
                        Please correct the following errors:
                    </h3>
                    <ul className="list-disc list-inside">
                        {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-2">Account Information</h2>

                    {/* Profile Image */}
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="relative">
                            <img
                                src={formData.userProfile || "/default-profile.png"}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <label
                                htmlFor="profileImage"
                                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600"
                            >
                                <Camera size={16} />
                                <input
                                    type="file"
                                    id="profileImage"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-color rounded-md input-field"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-color rounded-md input-field"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled
                                className="w-full p-2 border border-color rounded-md input-field disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium mb-1">
                                Mobile
                            </label>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-color rounded-md input-field"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-color rounded-md input-field"
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-color rounded-md input-field"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-color rounded-md input-field"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !isEditing}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        <Save size={16} className="inline-block mr-2" />
                        {isLoading ? "Updating..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </section>
    );
}