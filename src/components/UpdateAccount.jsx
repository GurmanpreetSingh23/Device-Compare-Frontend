import React, { useState } from "react";
import axios from "../utils/AxiosInstance";
import Header from "./Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/device-compare/user/me");

        let { user } = res.data;

        setForm({
          name: user.name,
          email: user.email,
          password: "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form };

    if (!payload) {
      delete payload.password;
    }

    try {
      await axios.post("/device-compare/user/update", payload);
      alert("Account Updated Successfully");
      navigate("/device-compare/user/account");
    } catch (err) {
      console.log(err);
      alert("Updation failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen w-full bg-gray-50 p-4">
      <Header />

      <section className="w-full flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Update Account
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Change your personal information below.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-2">
                Leave blank if you don’t want to change it.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/device-compare/user/account")}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                onClick={handleSubmit}
                className="px-3 py:2 lg:px-6 lg:py-3 rounded-lg bg-gray-900 text-md text-white hover:bg-black transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default UpdateAccount;
