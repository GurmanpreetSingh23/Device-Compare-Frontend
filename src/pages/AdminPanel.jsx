import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { useState } from "react";
import Footer from "../components/Footer";
import AdminDevicesDashboard from "../components/AdminDevicesDashboard";

function AdminPanel() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`/device-compare/admin/logout`, {
        withCredentials: true,
      });
      navigate("/device-compare/login");
    } catch (err) {
      console.error(
        "Logout failed:",
        err.response?.data?.message || err.message,
      );
      alert("Logout failed. Try again.");
    }
  };

  const handleAddProduct = () => {
    navigate("/device-compare/admin/devices/register");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <main className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 lg:px-8">
        <header className="h-[9vh] min-h-[60px] px-3 sm:px-4 lg:px-6 rounded-3xl w-full bg-white/40 backdrop-blur-2xl flex justify-between items-center shadow-lg relative">
          {/* Title */}
          <h1 className="font-semibold text-lg sm:text-xl lg:text-2xl tracking-tight truncate">
            <span className="text-[#F66435]">Device Compare</span> - Admin Panel
          </h1>

          <button
            onClick={toggleMenu}
            className="sm:hidden p-2 rounded-xl bg-gray-200/50 hover:bg-gray-300/50 transition-all duration-200 active:scale-95"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className={
                  isMenuOpen
                    ? "opacity-0 rotate-90 transition-transform"
                    : "opacity-100 rotate-0 transition-transform"
                }
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handleAddProduct}
              className="py-2 px-4 text-sm bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 font-medium shadow-md active:scale-95 whitespace-nowrap"
              title="Add New Product"
            >
              ➕ Add Product
            </button>

            <button
              onClick={handleLogout}
              className="py-2 px-4 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium shadow-md active:scale-95 whitespace-nowrap"
              title="Logout"
            >
              🚪 Logout
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-[12vh] left-[5%] w-[90vw] rounded-3xl bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col p-4 space-y-2">
              <button
                onClick={handleAddProduct}
                className="w-full py-3 px-4 text-left bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all duration-200 font-medium text-sm shadow-sm active:scale-[0.98]"
              >
                ➕ Add New Product
              </button>

              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 text-left bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-all duration-200 font-medium text-sm shadow-sm active:scale-[0.98]"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className=" sm:mt-8 space-y-6 sm:space-y-8 pt-2 sm:pt-0">
          <AdminDevicesDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AdminPanel;
