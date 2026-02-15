import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/device-compare/user/login`, form, {
        withCredentials: true,
      });

      const { user } = res.data;

      if (user.isAdmin === true) {
        return navigate("/device-compare/admin/description");
      }

      return navigate("/device-compare/home");
    } catch (userErr) {
      const msg = userErr.response?.data?.message;

      // 2️⃣ If user not found → try ADMIN login
      if (msg === "User not found" || msg === "Invalid credentials") {
        try {
          // eslint-disable-next-line no-unused-vars
          const adminRes = await axios.post(
            `/device-compare/admin/login`,
            form,
            { withCredentials: true },
          );

          return navigate("/device-compare/admin/description");
        } catch (adminErr) {
          return alert(
            adminErr.response?.data?.message || "Admin login failed",
          );
        }
      }

      alert(msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-200/40 blur-[100px] rounded-full animate-lightFloat"></div>
      <div className="absolute bottom-[8%] right-[5%] w-64 h-64 bg-purple-200/40 blur-[100px] rounded-full animate-lightFloat delay-3000"></div>

      {/* Glass Card */}
      <div className="relative z-10 bg-white/60 backdrop-blur-2xl border border-white/70 shadow-xl rounded-3xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-slate-500 text-center text-sm mb-8">
          Login to access your dashboard and recommendations
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          autoComplete="off"
        >
          <div>
            <label className="text-slate-700 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-xl bg-white/80 border border-slate-300 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="text-slate-700 text-sm font-medium">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/80 border border-slate-300 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-md hover:bg-blue-500 hover:shadow-lg transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-slate-600 text-center text-sm mt-8">
          Don’t have an account?{" "}
          <Link
            to="/device-compare/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
