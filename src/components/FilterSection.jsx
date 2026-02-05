import React, { useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { useNavigate } from "react-router";

function FilterSection() {
  const [deviceOpen, setDeviceOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const [selectedDevice, setSelectedDevice] = useState("Mobile");
  const [price, setPrice] = useState("₹20,000");

  const navigate = useNavigate();

  const deviceOptions = ["Mobile", "Laptop"];

  const mobilePriceOptions = [
    "₹10,000",
    "₹15,000",
    "₹20,000",
    "₹25,000",
    "₹30,000",
    "₹40,000",
    "₹50,000",
    "₹60,000",
    "₹80,000",
    "₹1,00,000",
    "₹1,20,000",
  ];

  const laptopPriceOptions = [
    "₹20,000",
    "₹30,000",
    "₹40,000",
    "₹50,000",
    "₹60,000",
    "₹80,000",
    "₹1,00,000",
    "₹1,20,000",
    "₹1,50,000",
    "₹1,80,000",
    "₹2,00,000",
    "₹2,50,000",
  ];

  const priceOptions =
    selectedDevice === "Laptop" ? laptopPriceOptions : mobilePriceOptions;

  const trendingMobiles = [
    "iPhone 17 Pro",
    "Samsung Galaxy S25 Ultra",
    "Google Pixel 10 Pro",
    "Xiaomi 15 Ultra",
    "Vivo X200 Pro",
  ];

  const trendingLaptops = [
    "MacBook Pro M4 Max",
    "Asus ROG Zephyrus G16",
    "Dell XPS 16",
    "HP Spectre x360",
    "Lenovo Yoga 9i",
  ];

  const trendingList =
    selectedDevice === "Laptop" ? trendingLaptops : trendingMobiles;

  const handleSearch = () => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ""), 10);

    const params = {
      type: selectedDevice.toLowerCase(),
      maxPrice: numericPrice,
    };

    // Navigate with filter parameters in state instead of fetching data
    navigate(
      `/device-compare/filter/products/${selectedDevice.toLowerCase()}`,
      {
        state: {
          filterParams: params,
        },
      },
    );
  };

  return (
    <main className="relative mb-[4vh] flex flex-col items-center justify-start overflow-hidden pt-6">
      {/* Glass Container */}
      <div className="relative z-10 w-full max-w-full rounded-[30px] border border-white/25 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble-dark.png')] backdrop-blur-[14px] saturate-140 shadow-[0_8px_40px_rgba(0,0,0,0.1)] p-6 md:p-8 overflow-hidden">
        <h1 className="relative text-2xl md:text-3xl font-semibold text-center mb-6 z-10 text-white/80">
          Make the smart choice without the confusion.
        </h1>

        <div className="relative w-full flex flex-wrap justify-center items-center gap-4 md:gap-6 z-10">
          {[
            {
              label: "I’m looking for",
              value: selectedDevice,
              options: deviceOptions,
              open: deviceOpen,
              setOpen: setDeviceOpen,
              setValue: setSelectedDevice,
            },
            {
              label: "Price Under",
              value: price,
              options: priceOptions,
              open: priceOpen,
              setOpen: setPriceOpen,
              setValue: setPrice,
            },
          ].map(({ label, value, options, open, setOpen, setValue }) => (
            <div key={label} className="relative w-40 text-sm md:text-lg">
              <button
                onClick={() => {
                  setDeviceOpen(label === "I’m looking for" ? !open : false);
                  setPriceOpen(label === "Price Under" ? !open : false);
                }}
                className="w-full px-5 py-1 bg-white/60 rounded-2xl border border-white/40 backdrop-blur-md transition-all shadow-sm flex flex-col"
              >
                <span className="text-[13px] text-black/80 font-medium text-left">
                  {label}
                </span>
                <span className="text-black/80 font-semibold flex justify-between items-center">
                  {value}
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                    size={18}
                  />
                </span>
              </button>

              <div
                className={`absolute top-full left-0 mt-2 w-full rounded-2xl shadow-lg overflow-y-auto border border-white/50 bg-white/80 backdrop-blur-xl transition-all duration-300 no-scrollbar ${
                  open
                    ? label === "Price Under" || label === "Features"
                      ? "max-h-[120px] opacity-100"
                      : "max-h-[200px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="max-h-64 overflow-y-auto">
                  {options.map((opt) => (
                    <li
                      className="hover:bg-white/50 transition-colors duration-200"
                      key={opt}
                    >
                      <button
                        onClick={() => {
                          setValue(opt);
                          setOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-[14px] flex justify-between items-center rounded-xl transition-all ${
                          opt === value
                            ? "bg-white/70 font-semibold"
                            : "hover:bg-white"
                        }`}
                      >
                        {opt}
                        {opt === value && (
                          <Check size={16} className="text-indigo-500" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <button
            onClick={handleSearch}
            className="px-8 py-3.5 bg-white/60 text-black/80 cursor-pointer rounded-2xl font-semibold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Search size={20} />
            <span className="text-[16px] hidden md:block">Search</span>
          </button>
        </div>

        {/* Trending Section */}
        <div className="mt-10 text-center z-10 flex flex-col items-center">
          <h2 className="text-base md:text-lg font-semibold mb-3 text-white/80">
            {selectedDevice === "Laptop"
              ? "Trending Laptops"
              : "Trending Mobiles"}
          </h2>
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
            {trendingList.map((item, i) => (
              <button
                key={i}
                className="px-2.5 py-0.5 text-[10px] md:text-[12px] bg-white/60 hover:bg-white/45 rounded-lg border border-white/40 backdrop-blur-md transition-all text-black/80 shadow-sm"
                onClick={() =>
                  navigate(
                    `/device-compare/filter/products/search/${item.toLocaleLowerCase()}`,
                  )
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}

export default FilterSection;
