import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
// import sideImage from "../../assets/sideImage.webp";
import signin from "../../assets/signin.jpg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxSelector";
import { RootState } from "../../Redux/Store/store";
import { Helmet } from "react-helmet";
import { superAdminLogin } from "../../Redux/Slice/authSlice";


const Signin = () => {
  const { isLoading } = useAppSelector((state: RootState) => state?.auth);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ email: "", password: "", role: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [userType] = useState("superadmin"); const navigator = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newUserType = e.target.value;
  //   setUserType(newUserType);
  //   setFormData(prev => ({ ...prev, role: newUserType }));
  // };

  const validateForm = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Fill the required fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validateForm()) return;

    try {
      // Choose the appropriate login action based on user type
      const loginAction = superAdminLogin(formData)

      const res = await dispatch(loginAction);

      if (res?.payload?.success) {
        toast.success(res.payload.message);
        setFormData({ email: "", password: "", role: "" });
        // const redirectPath = userType === "superadmin" ? "/" : "/schooladmin";
                const redirectPath ="/";

        navigator(redirectPath);
      } else {
        toast.error(res?.payload?.message);
      }
    } catch (error) {
      toast.error("Error during login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-4">
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Sign in to your account" />
      </Helmet>
      <div className="flex flex-col md:flex-row w-full md:w-[80vw] lg:w-[85vw] h-auto md:h-[85vh] bg-surface shadow-lg rounded-lg overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="flex justify-center items-center w-full md:w-1/2 lg:w-2/5 p-4 md:p-8">
          <div className="w-full shadow-2xl flex flex-col justify-center p-4">
            <h2 className="text-2xl font-semibold text-center text-secondary mb-6">
              Sign In
            </h2>

            <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
              {/* User Type Selection */}
              {/* <div className="flex justify-center space-x-4 mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="superadmin"
                    checked={userType === "superadmin"}
                    onChange={handleUserTypeChange}
                    className="form-radio text-blue-600 cursor-pointer"
                  />
                  <span className="ml-2 text-secondary">Super Admin</span>
                </label>
              </div> */}

              <div>
                <label className="block text-secondary text-sm font-medium">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  className="w-full input-field mt-1 p-2 border rounded-md border-color focus:ring-1 outline-none"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>

              <div className="relative">
                <label className="block text-secondary text-sm font-medium">
                  Password <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full input-field mt-1 p-2 pr-10 border rounded-md border-color focus:ring-1 outline-none"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-secondary cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button className="btn-primary flex justify-center items-center gap-1 py-2 w-full rounded-md font-semibold transition mt-6">
                <span className="flex items-center justify-center w-4 h-4">
                  {isLoading && (
                    <LoaderCircle size={20} className="animate-spin text-primary" />
                  )}
                </span>
                <span>{isLoading ? "Signing..." : "Sign In"}</span>
              </button>
            </form>

            <div className="flex justify-end mt-4">
              <a
                href="/auth/forgot"
                className="text-sm text-secondary hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <p className="mt-4 text-center text-secondary">
              Don't have an account?{" "}
              <NavLink
                to="/auth/signup"
                className="text-blue-500 hover:text-blue-600"
              >
                Sign Up
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

export default Signin;
