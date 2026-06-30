import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaBookOpen,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      alert(res.data.message);

      // Save Token
      localStorage.setItem("token", res.data.token);

      // Save User
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Go to Dashboard
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden w-250">
        {/* Left */}

        <div className="bg-blue-700 text-white p-14 flex flex-col justify-center">
          <FaBookOpen className="text-6xl mb-6" />

          <h1 className="text-5xl font-bold mb-4">Librarium</h1>

          <p className="text-blue-100 leading-8">
            AI Powered Library Management System
          </p>
        </div>

        {/* Right */}

        <form onSubmit={handleLogin} className="p-12">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>

          <p className="text-gray-500 mb-8">Login to continue</p>

          <label>Email</label>

          <div className="flex items-center border rounded-xl mt-2 mb-6 px-4">
            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              className="w-full p-4 outline-none"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label>Password</label>

          <div className="flex items-center border rounded-xl mt-2 px-4">
            <FaLock className="text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-4 outline-none"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-blue-700 text-white py-4 rounded-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
