import axios from "../utils/AxiosInstance";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin logic
    const isAdmin =
      form.name.toLowerCase().startsWith("admin") &&
      form.password.toLowerCase().startsWith("adminpass");

    const apiURL = isAdmin
      ? `/device-compare/admin/register`
      : `/device-compare/user/register`;

    try {
      const res = await axios.post(apiURL, form, {
        withCredentials: true,
      });

      alert(res.data.message || "Registration Successful");
      navigate("/device-compare/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-[10%] left-[5%] w-60 h-60 bg-blue-200/40 blur-[100px] rounded-full animate-lightFloat"></div>
      <div className="absolute bottom-[8%] right-[5%] w-52 h-52 bg-purple-200/40 blur-[100px] rounded-full animate-lightFloat delay-3000"></div>

      {/* Glass Card */}
      <div
        className="relative z-10 bg-white/60 backdrop-blur-2xl border border-white/70 shadow-xl 
        rounded-3xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-extrabold text-center text-slate-800 mb-1">
          Create Account
        </h2>

        <p className="text-slate-500 text-center text-sm mb-5">
          Join Device-Compare and explore smarter.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          autoComplete="off"
        >
          {/* Name */}
          <div>
            <label className="text-slate-700 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full mt-1 p-2.5 rounded-xl bg-white/80 border border-slate-300
              text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-300
              outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-slate-700 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full mt-1 p-2.5 rounded-xl bg-white/80 border border-slate-300
              text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-300
              outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-slate-700 text-sm font-medium">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-2.5 rounded-xl bg-white/80 border border-slate-300
                text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-300
                outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 
                hover:text-slate-700 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 py-2.5 rounded-xl bg-blue-600 text-white font-bold shadow-md
            hover:bg-blue-500 hover:shadow-lg transition-all"
          >
            Register
          </button>
        </form>

        <p className="text-slate-600 text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/device-compare/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes lightFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }
        .animate-lightFloat {
          animation: lightFloat 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default RegisterPage;
