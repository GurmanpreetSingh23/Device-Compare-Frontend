import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.get(
        `/device-compare/devices/search/${searchText}`,
        { withCredentials: true },
      );
      navigate(`/device-compare/filter/products/search/${searchText}`);
      setSearchText("");
      setMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`/device-compare/user/logout`, {
        withCredentials: true,
      });
      navigate("/device-compare/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <header className="vibrant top-0 left-0 w-full h-[7vh] md:h-[9vh] flex justify-between items-center px-6 md:px-14 z-50 shadow-sm">
        <div className="flex items-center h-full gap-5 w-full justify-between">
          <a href="/device-compare/home" className="fshrink-0">
            <h1
              className="text-xl md:text-2xl font-semibold text-[#F66435] tracking-tight cursor-pointer"
              onClick={() => navigate("/device-compare/home")}
            >
              Device<span className="text-gray-900">Compare</span>
            </h1>
          </a>

          <div className="flex gap-2">
            {/* Desktop search */}
            <div className="hidden md:flex items-center border border-black/40 rounded-full px-2 py-2 w-[30vw] max-w-lg">
              <input
                type="text"
                placeholder="Search devices..."
                className="bg-transparent outline-none text-gray-900 placeholder-gray-500 text-sm w-full px-3"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-[#F66435] text-white text-sm font-medium px-4 py-1 rounded-full hover:text-white transition-all duration-200"
              >
                Search
              </button>
            </div>

            <button
              onClick={() => navigate("/device-compare/user/account")}
              className="hidden md:inline-block  text-blue-300 text-sm font-medium px-5 py-2 rounded-full border border-blue-500 transition-colors duration-200"
              aria-label="Account"
              title="Account"
            >
              Account
            </button>

            {/* Desktop Logout Button */}
            <button
              onClick={handleLogout}
              className="hidden md:inline-block  text-red-400 text-sm font-medium px-5 py-2 rounded-full border border-red-400 transition-colors duration-200"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center space-y-[5px] cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 rounded-full bg-gray-900 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 rounded-full bg-gray-900 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 rounded-full bg-gray-900 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            ></span>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className=" absolute w-[98%] top-[10vh] left-1/2 -translate-x-1/2 bg-white/30  backdrop-blur-sm border border-black/20 rounded-3xl flex flex-col md:hidden py-6 px-6 z-40 shadow-sm transition-all duration-500 ease-in-out">
          {/* Mobile search */}
          <div className="flex items-center border border-black/90 rounded-full px-2 py-2 mb-4">
            <input
              type="text"
              placeholder="Search devices..."
              className="bg-transparent outline-none text-black/90 placeholder-black text-sm w-full px-3"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-[#F66435] text-white text-sm font-medium px-4 py-1 rounded-full hover:bg-[#795C65] transition-colors duration-200"
            >
              Search
            </button>
          </div>
          <button
            onClick={() => navigate("/device-compare/user/account")}
            className=" text-blue-300 mb-4 text-sm font-medium w-full py-2 rounded-full border border-blue-300 transition-colors duration-200"
            aria-label="account"
          >
            Account
          </button>
          {/* Mobile Logout button */}
          <button
            onClick={handleLogout}
            className=" text-red-500 text-sm font-medium w-full py-2 rounded-full border border-red-500 transition-colors duration-200"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
