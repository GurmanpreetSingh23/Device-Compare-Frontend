import React, { useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/device-compare/user/me");
        setUser(res.data.user);
      } catch {
        console.log("err");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className=" w-full px-4 py-4">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <Header />

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-semibold">
              {user?.name?.charAt(0) || "U"}
            </div>

            {/* Name + Email */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {user?.name || "Your Name"}
              </h2>
              <p className="text-gray-500">{user?.email || "your@email.com"}</p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500 mb-2">Full Name</p>
            <p className="text-lg font-medium text-gray-900">
              {user?.name || "Not available"}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500 mb-2">Email Address</p>
            <p className="text-lg font-medium text-gray-900">
              {user?.email || "Not available"}
            </p>
          </div>

          <div
            className="bg-white cursor-pointer lg:border border-gray-200 rounded-xl lg:p-4"
            onClick={() => navigate("/device-compare/account/update")}
          >
            <button className="h-full text-xl p-6 lg:p-0 w-full border border-green-300 rounded-lg">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
