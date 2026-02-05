import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ allowedRole }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/device-compare/user/me",
          { withCredentials: true },
        );

        const { role } = res.data;

        if (allowedRole && role !== allowedRole) {
          setAuthorized(false);
          setError(true);
        } else {
          setAuthorized(true);
        }
      } catch {
        setError(true);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [allowedRole]);

  if (loading) return null;

  if (error) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center p-6 bg-linear-to-br from-gray-50 to-slate-50">
        {/* Minimal Glass Container */}
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl max-w-sm w-full p-8 text-center group hover:shadow-2xl hover:border-white/80 transition-all duration-300">
          {/* Subtle Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/70 flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Compact Text */}
          <h2 className="text-2xl font-light text-gray-800 mb-2 tracking-tight">
            Not Authorized
          </h2>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed max-w-88 mx-auto">
            You need to log in to access this page.
          </p>

          {/* Small Elegant Button */}
          <button
            onClick={() => navigate("/device-compare/login", { replace: true })}
            className="px-8 py-2.5 bg-linear-to-r from-slate-600 to-gray-800 hover:from-slate-700 hover:to-gray-900 text-white text-sm font-medium rounded-xl backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center mx-auto group-hover:scale-[1.02]"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return authorized ? (
    <Outlet />
  ) : (
    <Navigate to="/device-compare/login" replace />
  );
};

export default ProtectedRoute;
