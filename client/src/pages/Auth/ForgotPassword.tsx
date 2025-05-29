import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { FORGOT_PASSWORD } from "../../Utils/api";

function ForgotPassword() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(FORGOT_PASSWORD, {email})
        .then(res => {
      if (res.data.Status === "Success") {
        setSuccessMessage("Reset link sent successfully to your email!");
        setTimeout(() => {
          navigate("/auth/signin");
        }, 6000); // ⏳ 3 seconds delay
      }
        }).catch(err => {
      if (err.response && err.response.status === 404) {
        setErrorMessage("This email does not exist in our records.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    });
};

    return(
<div className="flex justify-center items-center bg-gray-600 min-h-screen">
  <div className="bg-gray-500 p-6 rounded-lg w-full max-w-sm shadow-lg">
    <h4 className="text-xl font-semibold mb-4 text-gray-950">Forgot Password</h4>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold mb-1">
          Email
        </label> 
        <input
          type="email"
          placeholder="Enter Email"
          autoComplete="off"
          name="email"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
      >
        Send
      </button>
    </form>
    {successMessage && (
      <div className="mb-4 p-2 text-green-700 bg-green-100 border border-green-400 rounded">
        {successMessage}
      </div>
    )}

    {errorMessage && (
      <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-400 rounded">
        {errorMessage}
      </div>
    )}
  </div>
</div>

    )
}

export default ForgotPassword;