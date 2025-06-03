import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { RESET_PASSWORD } from "../../Utils/api";
import signin from "../../assets/signin.jpg";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
          const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    toast.error(
      "Password must be at least 8 characters and include an uppercase letter, a number, and a special character."
    );
    return;
  }
        axios.post(`${RESET_PASSWORD}/${id}/${token}`, {password})
        .then(res => {
      if (res.data.Status === "Success") {
        setSuccessMessage("Password Reseted successfully to your email!");
        setTimeout(() => {
          navigate("/auth/signin");
        }, 3000); // ⏳ 3 seconds delay
      }
        }).catch(err => console.log(err))
    }

    return(
      <div>
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-4">
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Sign in to your account" />
      </Helmet>
      <div className="flex flex-col md:flex-row w-full md:w-[80vw] lg:w-[85vw] h-auto md:h-[85vh] bg-surface shadow-lg rounded-lg overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="flex justify-center items-center w-full md:w-1/2 lg:w-2/5 p-4 md:p-8">
          <div className="w-full shadow-2xl flex flex-col justify-center p-4">
          <div className="flex items-center space-x-2 mx-auto">
            <img src="/tablogo.png" alt="" className="max-w-[30px]" />
            <h1 className="text-4xl">Sections</h1>
          </div>

    <h4 className="text-xl font-semibold mb-4 text-center">Reset Password</h4>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          New Password
        </label>
<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter Password"
    autoComplete="off"
    name="password"
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
    onChange={(e) => setPassword(e.target.value)}
  />
  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute inset-y-0 right-2 flex items-center text-gray-500 text-sm"
    tabIndex={-1}
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        Update
      </button>
    </form>
        {successMessage && (
  <div className="mb-4 p-2 text-green-700 bg-green-100 border border-green-400 rounded">
    {successMessage}
  </div>
)}

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
</div>
    )
}

export default ResetPassword;