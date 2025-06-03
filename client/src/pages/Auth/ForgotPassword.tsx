import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FORGOT_PASSWORD } from "../../Utils/api";
import signin from "../../assets/signin.jpg";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(FORGOT_PASSWORD, { email })
      .then((res) => {
        if (res.data.Status === "Success") {
          setSuccessMessage("Reset link sent successfully to your email!");
          setTimeout(() => {
            navigate("/auth/signin");
          }, 6000);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setErrorMessage("This email does not exist in our records.");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-4">
      <Helmet>
        <title>Forgot Password</title>
        <meta name="description" content="Reset your password" />
      </Helmet>
      <div className="flex flex-col md:flex-row w-full md:w-[80vw] lg:w-[85vw] h-auto md:h-[85vh] bg-surface shadow-lg rounded-lg overflow-hidden">
        {/* Left Side: Forgot Password Form */}
        <div className="flex justify-center items-center w-full md:w-1/2 lg:w-2/5 p-4 md:p-8">
          <div className="w-full shadow-2xl flex flex-col justify-center p-4">
          <div className="flex items-center space-x-2 mx-auto">
            <img src="/tablogo.png" alt="" className="max-w-[30px]" />
            <h1 className="text-5xl">Sections</h1>
          </div>
            <h2 className="text-2xl font-semibold text-center text-secondary mb-6">
              Forgot Password
            </h2>

            <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
              <div>
                <label className="block text-secondary text-sm font-medium">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  className="w-full input-field mt-1 p-2 border rounded-md border-color focus:ring-1 outline-none"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                className="btn-primary flex justify-center items-center py-2 w-full rounded-md font-semibold transition mt-4"
              >
                Send Reset Link
              </button>
            </form>

            {successMessage && (
              <div className="mt-4 p-2 text-green-700 bg-green-100 border border-green-400 rounded text-sm">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mt-4 p-2 text-red-700 bg-red-100 border border-red-400 rounded text-sm">
                {errorMessage}
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
    </div>
  );
}

export default ForgotPassword;
