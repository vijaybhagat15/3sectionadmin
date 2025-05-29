import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
// import sideImage from "../../assets/sideImage.webp";
import signin from "../../assets/signin.jpg";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxSelector";
import { superAdminRegister } from "../../Redux/Slice/authSlice";
import { RootState } from "../../Redux/Store/store";
import { Helmet } from "react-helmet";

const Signup = () => {
  const { isLoading } = useAppSelector((state: RootState) => state?.auth);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
  });

  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[@$!%*?&]/;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordValidations({
        length: value.length >= 8,
        uppercase: uppercaseRegex.test(value),
        lowercase: lowercaseRegex.test(value),
        number: numberRegex.test(value),
        specialCharacter: specialCharRegex.test(value),
      });
    }
  };

  const isPasswordStrong = Object.values(passwordValidations).every(Boolean);

  const validateForm = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      toast.error("Fill the required fields");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form Validation failed!");
      return;
    }

    try {
      const res = await dispatch(superAdminRegister(formData));
      if (res?.payload?.success) {
        toast.success(res.payload.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        navigator("/auth/signin"); // Redirect after success
      } else {
        toast.error(res?.payload?.message || "Signup failed");
      }
    } catch (error: any) {
      toast.error(error?.message || "Error during signup");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-4">
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Sign up for an account." />
      </Helmet>
      <div className="flex flex-col md:flex-row w-full md:w-[80vw] lg:w-[85vw] h-auto md:h-[85vh] bg-surface shadow-lg rounded-lg overflow-hidden">
        {/* Left Side: Signup Form */}
        <div className="flex justify-center items-center w-full md:w-1/2 lg:w-2/5 p-4 md:p-8">
          {" "}
          {/* UPDATED: Adjusted widths */}
          <div className="w-full shadow-2xl flex flex-col justify-center p-4">
            <h2 className="text-2xl font-semibold text-center text-secondary mb-6">
              Create Account
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-secondary text-sm font-medium">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-md border-color focus:ring-1 outline-none"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-secondary text-sm font-medium">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-md border-color focus:ring-1 outline-none"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-secondary text-sm font-medium">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border rounded-md border-color focus:ring-1 outline-none"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jonhdoe@gmail.com"
                />
              </div>

              <div className="relative">
                <label className="block text-secondary text-sm font-medium">
                  Password <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full mt-1 p-2 pr-10 border rounded-md border-color focus:ring-1 outline-none"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-secondary "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {/* Password strength indicator */}
                {formData.password && !isPasswordStrong && (
                  <div className="mt-1 text-sm text-secondary">
                    <p>Password must include:</p>
                    {!passwordValidations.length && (
                      <p>At least 8 characters</p>
                    )}
                    {!passwordValidations.uppercase && (
                      <p>One uppercase letter</p>
                    )}
                    {!passwordValidations.lowercase && (
                      <p>One lowercase letter</p>
                    )}
                    {!passwordValidations.number && <p>One number</p>}
                    {!passwordValidations.specialCharacter && (
                      <p>One special character (@$!%*?&)</p>
                    )}
                  </div>
                )}

                {isPasswordStrong && (
                  <p className="mt-1 text-sm text-green-500">
                    ✅ Password Accepted
                  </p>
                )}
              </div>

              <button className="btn-primary flex justify-center items-center gap-1 btn-primary:hover py-2 w-full rounded-md font-semibold transition mt-8">
                <span className="flex items-center justify-center w-4 h-4">
                  {isLoading && (
                    <LoaderCircle size={20} className="animate-spin text-primary" />
                  )}
                </span>
                <span>{isLoading ? "Signing Up..." : "Sign Up"}</span>
              </button>
            </form>

            <p className="mt-4 text-center text-secondary">
              Already have an account?{" "}
              <NavLink to="/auth/signin" className="text-blue-500 hover:text-blue-600">
                Sign In
              </NavLink>
            </p>
          </div>
        </div>

        {/* Right Side Image */}
        <div
          className="w-full md:w-1/2 lg:w-3/5 h-[40vh] md:h-full hidden md:block bg-cover bg-center"
          style={{ backgroundImage: `url(${signin})` }}
        ></div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;
