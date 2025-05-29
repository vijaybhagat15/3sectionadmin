import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


function ForgotPassword() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/forgot-password', {email})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/login')
               
            }
        }).catch(err => console.log(err))
    }

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
  </div>
</div>

    )
}

export default ForgotPassword;