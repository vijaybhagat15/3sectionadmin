import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'


function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/reset-password/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/login')
               
            }
        }).catch(err => console.log(err))
    }

    return(
<div className="flex justify-center items-center bg-gray-600 min-h-screen">
  <div className="bg-gray-500 p-6 rounded-lg w-full max-w-sm shadow-md">
    <h4 className="text-xl font-semibold mb-4 text-center">Reset Password</h4>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          New Password
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          autoComplete="off"
          name="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        Update
      </button>
    </form>
  </div>
</div>

    )
}

export default ResetPassword;