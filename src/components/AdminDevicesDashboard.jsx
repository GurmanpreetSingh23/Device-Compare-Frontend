import React, { useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

function AdminDevicesDashboard() {
  const navigate = useNavigate();

  const [allData, setAllData] = useState([]); // all devices
  const [visibleData, setVisibleData] = useState([]); // visible devices
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [deviceType, setDeviceType] = useState(
    localStorage.getItem("deviceType") || "mobile",
  );
  const [brand, setBrand] = useState(localStorage.getItem("brand") || "");
  const [minPrice, setMinPrice] = useState(
    parseInt(localStorage.getItem("minPrice")) || 20000,
  );
  const [maxPrice, setMaxPrice] = useState(
    parseInt(localStorage.getItem("maxPrice")) || 100000,
  );

  const ITEMS_PER_LOAD = 20;

  // 🔥 CUSTOM GLASS DROPDOWN
  const GlassDropdown = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);

    const options = [
      { value: "mobile", label: "📱 Mobile" },
      { value: "laptop", label: "💻 Laptop" },
    ];

    return (
      <div className="relative w-32">
        <div
          onClick={() => setOpen(!open)}
          className="px-3 py-2 rounded-xl bg-white/60 backdrop-blur-lg 
                     border border-gray-300 text-[13px] cursor-pointer shadow 
                     flex items-center justify-between"
        >
          {options.find((o) => o.value === value)?.label}
          <span
            className={`transition text-xs ${open ? "rotate-180" : "rotate-0"}`}
          >
            ▼
          </span>
        </div>

        {open && (
          <div
            className="absolute left-0 mt-2 w-full bg-white/40 backdrop-blur-xl 
                       rounded-2xl shadow-xl border border-white/30 z-50 animate-fade"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="px-3 py-2 text-[12px] cursor-pointer 
                           hover:bg-white/60 rounded-xl"
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // SAVE filters/search to localStorage
  useEffect(() => {
    localStorage.setItem("deviceType", deviceType);
    localStorage.setItem("brand", brand);
    localStorage.setItem("minPrice", minPrice);
    localStorage.setItem("maxPrice", maxPrice);
    localStorage.setItem("search", search);
  }, [deviceType, brand, minPrice, maxPrice, search]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await axios.get(`/device-compare/devices/all-products`, {
          params: { type: deviceType, brand, minPrice, maxPrice },
          withCredentials: true,
        });

        const devices = res.data;

        setAllData(devices);
        setVisibleData(devices.slice(0, ITEMS_PER_LOAD));
      } catch (err) {
        console.error(err);
      }
    };

    fetchDevices();
  }, [deviceType, brand, minPrice, maxPrice]);

  const loadMore = () => {
    const next = visibleData.length + ITEMS_PER_LOAD;
    setVisibleData(allData.slice(0, next));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this device?")) return;

    try {
      await axios.delete(`/device-compare/devices/delete/${id}`, {
        withCredentials: true,
      });

      setAllData((prev) => prev.filter((item) => item._id !== id));
      setVisibleData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/device-compare/admin/devices/update/${id}`);
  };

  const filteredData = allData.filter((item) => {
    const text = search.toLowerCase();

    if (deviceType === "mobile")
      return (item?.name || "").toLowerCase().includes(text);
    if (deviceType === "laptop")
      return (item?.model || "").toLowerCase().includes(text);

    return true;
  });

  const finalList = filteredData.slice(0, visibleData.length);

  return (
    <section className="w-full mt-6 bg-white/40 backdrop-blur-xl p-6 rounded-3xl shadow-lg">
      <h2 className="text-lg font-semibold mb-5">Device Management</h2>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-6">
        <GlassDropdown value={deviceType} onChange={setDeviceType} />

        <input
          type="text"
          placeholder="Brand"
          className="px-3 py-2 text-sm outline-none rounded-xl bg-white/60"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Price"
          className="px-3 py-2 text-sm outline-none rounded-xl bg-white/60 w-24"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="px-3 py-2 text-sm outline-none rounded-xl bg-white/60 w-24"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder={
            deviceType === "mobile"
              ? "Search mobile name"
              : "Search laptop model"
          }
          className="px-3 py-2 text-sm outline-none rounded-xl bg-white/60 w-48"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {finalList.map((item) => (
          <div key={item._id} className="bg-white p-3 rounded-2xl shadow-md">
            <img
              src={item.image}
              className="w-full h-28 object-contain"
              alt={item.model || item.name}
            />
            <h3 className="text-sm mt-2 font-semibold">
              {item.brand} {item.model || item.name}
            </h3>
            <p className="text-xs text-gray-600">
              ₹{item.latest_price || item.price}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleUpdate(item._id)}
                className="flex-1 bg-blue-500 text-white py-1 rounded-lg text-xs cursor-pointer"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="flex-1 bg-red-500 text-white py-1 rounded-lg text-xs cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {finalList.length < filteredData.length && (
        <button
          onClick={loadMore}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm shadow hover:bg-blue-500"
        >
          Load More
        </button>
      )}
    </section>
  );
}

export default AdminDevicesDashboard;
