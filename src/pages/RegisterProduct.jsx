import React, { useState } from "react";
import axios from "../utils/AxiosInstance";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

function RegisterProduct() {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState("mobile");

  // MOBILE FORM STATE
  const [mobileForm, setMobileForm] = useState({
    name: "",
    price: "",
    specs: [""],
    image: "",
    betterFor: "",
    buyLinks: [{ site: "", url: "" }],
  });

  // LAPTOP FORM STATE
  const [laptopForm, setLaptopForm] = useState({
    brand: "",
    model: "",
    old_price: "",
    latest_price: "",
    discount: "",
    ratings: "",
    reviews: "",
    star_rating: "",
    processor_brand: "",
    processor_name: "",
    processor_gnrtn: "",
    os: "",
    os_bit: "",
    warranty: "",
    ram_gb: "",
    ram_type: "",
    ssd: "",
    hdd: "",
    graphic_card_gb: "",
    display_size: "",
    Touchscreen: "",
    msoffice: "",
    weight: "",
    image: "",
    buyLinks: [{ site: "", url: "" }],
  });

  // GENERIC CHANGE HANDLERS
  const handleMobileChange = (e) => {
    setMobileForm({ ...mobileForm, [e.target.name]: e.target.value });
  };

  const handleLaptopChange = (e) => {
    setLaptopForm({ ...laptopForm, [e.target.name]: e.target.value });
  };

  // SPECS HANDLER (MOBILE ONLY) - FIXED FORMAT
  const updateSpec = (index, value) => {
    const updated = [...mobileForm.specs];
    updated[index] = value;
    setMobileForm({ ...mobileForm, specs: updated });
  };

  const addSpec = () => {
    setMobileForm({
      ...mobileForm,
      specs: [...mobileForm.specs, ""],
    });
  };

  const removeSpec = (index) => {
    const updated = mobileForm.specs.filter((_, i) => i !== index);
    setMobileForm({ ...mobileForm, specs: updated });
  };

  // BUY LINKS HANDLER (BOTH)
  const updateBuyLink = (formType, index, field, value) => {
    const updated =
      formType === "mobile"
        ? [...mobileForm.buyLinks]
        : [...laptopForm.buyLinks];

    updated[index][field] = value;

    formType === "mobile"
      ? setMobileForm({ ...mobileForm, buyLinks: updated })
      : setLaptopForm({ ...laptopForm, buyLinks: updated });
  };

  const addBuyLink = (formType) => {
    formType === "mobile"
      ? setMobileForm({
          ...mobileForm,
          buyLinks: [...mobileForm.buyLinks, { site: "", url: "" }],
        })
      : setLaptopForm({
          ...laptopForm,
          buyLinks: [...laptopForm.buyLinks, { site: "", url: "" }],
        });
  };

  const removeBuyLink = (formType, index) => {
    const updated =
      formType === "mobile"
        ? [...mobileForm.buyLinks]
        : [...laptopForm.buyLinks];

    const filtered = updated.filter((_, i) => i !== index);

    formType === "mobile"
      ? setMobileForm({ ...mobileForm, buyLinks: filtered })
      : setLaptopForm({ ...laptopForm, buyLinks: filtered });
  };

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    try {
      let data = selectedDevice === "mobile" ? mobileForm : laptopForm;
      let url =
        selectedDevice === "mobile"
          ? `/device-compare/devices/register/mobile`
          : `/device-compare/devices/register/laptop`;

      // Console.log the exact form data being sent
      console.log("📤 Form Data Being Sent:", JSON.stringify(data, null, 2));
      console.log("📡 Sending to URL:", url);

      await axios.post(url, data);

      console.log("✅ Product registered successfully!");
      alert("Product registered successfully!");
      navigate("/device-compare/admin/dashboard");
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert("Failed to register product. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <header className="w-full h-[9vh] bg-white/40 rounded-4xl px-4 flex items-center">
          <h1 className="font-semibold">
            {" "}
            <span className="text-[#F66435]">Device-Compare</span> : Register
            Product
          </h1>
        </header>
        <div className="max-w-4xl mx-auto">
          {/* HEADER */}
          <div className="text-center my-4">
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Add mobiles or laptops to your comparison platform
            </p>
          </div>

          {/* TABS */}
          <div className="flex bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden mb-8">
            <button
              onClick={() => setSelectedDevice("mobile")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 ${
                selectedDevice === "mobile"
                  ? "bg-linear-to-r from-[#F66435] to-orange-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-[#F66435] hover:bg-orange-50"
              }`}
            >
              📱 Mobile
            </button>
            <button
              onClick={() => setSelectedDevice("laptop")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 ${
                selectedDevice === "laptop"
                  ? "bg-linear-to-r from-[#F66435] to-orange-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-[#F66435] hover:bg-orange-50"
              }`}
            >
              💻 Laptop
            </button>
          </div>

          {/* FORM CONTAINER */}
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-8 md:p-12">
            {/* MOBILE FORM */}
            {selectedDevice === "mobile" && (
              <>
                <div>
                  {/* SPECS FORMAT GUIDE - TOP SECTION */}
                  <div className="w-full bg-linear-to-r from-orange-50 to-pink-50 border-2 border-[#F66435]/20 rounded-3xl p-6 mb-8 shadow-lg">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-3 h-3 bg-[#F66435] rounded-full mt-2 shrink-0"></div>
                      <h3 className="text-2xl font-bold text-gray-800 flex-1">
                        📋 Mobile Specifications Format
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-4 font-medium">
                          Use this exact format in each spec field:
                        </p>
                        <div className="space-y-2">
                          <code className="block w-full bg-white p-3 rounded-xl border border-orange-200 text-sm font-mono text-[#F66435] leading-relaxed">
                            Display : 6.67-inch (1220x2712)
                          </code>
                          <code className="block w-full bg-white p-3 rounded-xl border border-orange-200 text-sm font-mono text-[#F66435] leading-relaxed">
                            Front Camera : 50MP
                          </code>
                          <code className="block w-full bg-white p-3 rounded-xl border border-orange-200 text-sm font-mono text-[#F66435] leading-relaxed">
                            Rear Camera : 50MP + 50MP + 10MP
                          </code>
                        </div>
                      </div>

                      <div>
                        <div className="space-y-2">
                          <code className="block w-full bg-white p-3 rounded-xl border border-orange-200 text-sm font-mono text-[#F66435] leading-relaxed">
                            RAM : 8GB, 12GB
                          </code>
                          <code className="block w-full bg-white p-3 rounded-xl border border-orange-200 text-sm font-mono text-[#F66435] leading-relaxed">
                            Storage : 256GB
                          </code>
                          <code className="block w-full bg-white p-3 rounded-xl border border-orange-200 text-sm font-mono text-[#F66435] leading-relaxed">
                            Battery Capacity : 6000mAh
                          </code>
                          <code className="block w-full bg-white p-3 rounded-xl border border-orange-200 text-sm font-mono text-[#F66435] leading-relaxed">
                            OS : Android 15
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-orange-100">
                      <p className="text-xs text-gray-500 text-center">
                        💡 <strong>Format:</strong> "Key : Value" |{" "}
                        <strong>One spec per line</strong>
                      </p>
                    </div>
                  </div>

                  {/* Your existing basic fields grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* ... rest of your existing form ... */}
                  </div>

                  {/* Your existing specifications section */}
                  {/* ... */}
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Product Name
                        </label>
                        <input
                          name="name"
                          value={mobileForm.name}
                          onChange={handleMobileChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F66435] focus:border-transparent transition-all duration-200 bg-white/50"
                          placeholder="iPhone 15 Pro Max"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Price
                        </label>
                        <input
                          name="price"
                          value={mobileForm.price}
                          onChange={handleMobileChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F66435] focus:border-transparent transition-all duration-200 bg-white/50"
                          placeholder="$1,199"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Better For
                        </label>
                        <input
                          name="betterFor"
                          value={mobileForm.betterFor}
                          onChange={handleMobileChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F66435] focus:border-transparent transition-all duration-200 bg-white/50"
                          placeholder="Photography, Gaming, etc."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        name="image"
                        value={mobileForm.image}
                        onChange={handleMobileChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F66435] focus:border-transparent transition-all duration-200 bg-white/50"
                        placeholder="https://example.com/mobile.jpg"
                      />
                    </div>
                  </div>

                  {/* SPECIFICATIONS - FIXED FORMAT */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#F66435] rounded-full"></span>
                        Specifications
                      </h3>
                      <button
                        onClick={addSpec}
                        className="px-4 py-2 bg-linear-to-r from-[#F66435] to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        + Add Spec
                      </button>
                    </div>

                    <div className="space-y-3">
                      {mobileForm.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex gap-3 items-end bg-white/50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all"
                        >
                          <input
                            placeholder="Display : 6.67-inch (1220x2712)"
                            value={spec}
                            onChange={(e) => updateSpec(i, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F66435] bg-white"
                          />
                          {mobileForm.specs.length > 1 && (
                            <button
                              onClick={() => removeSpec(i)}
                              className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PURCHASE LINKS */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#F66435] rounded-full"></span>
                        Purchase Links
                      </h3>
                      <button
                        onClick={() => addBuyLink("mobile")}
                        className="px-4 py-2 bg-linear-to-r from-[#F66435] to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        + Add Link
                      </button>
                    </div>

                    <div className="space-y-3">
                      {mobileForm.buyLinks.map((link, i) => (
                        <div
                          key={i}
                          className="flex gap-3 items-end bg-white/50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all"
                        >
                          <input
                            placeholder="Site Name (Amazon, Flipkart, etc.)"
                            value={link.site}
                            onChange={(e) =>
                              updateBuyLink("mobile", i, "site", e.target.value)
                            }
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F66435] bg-white"
                          />
                          <input
                            placeholder="Product URL"
                            value={link.url}
                            onChange={(e) =>
                              updateBuyLink("mobile", i, "url", e.target.value)
                            }
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F66435] bg-white"
                          />
                          {mobileForm.buyLinks.length > 1 && (
                            <button
                              onClick={() => removeBuyLink("mobile", i)}
                              className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="text-center">
                    <button
                      onClick={handleSubmit}
                      className="px-12 py-4 bg-linear-to-r from-[#F66435] to-orange-500 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl  w-full md:w-auto"
                    >
                      🚀 Register Mobile
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* LAPTOP FORM */}
            {selectedDevice === "laptop" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[
                    { key: "brand", label: "Brand" },
                    { key: "model", label: "Model" },
                    { key: "old_price", label: "Old Price" },
                    { key: "latest_price", label: "Latest Price" },
                    { key: "discount", label: "Discount %" },
                    { key: "ratings", label: "Ratings" },
                    { key: "reviews", label: "Reviews" },
                    { key: "star_rating", label: "Star Rating" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        name={key}
                        value={laptopForm[key]}
                        onChange={handleLaptopChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F66435] focus:border-transparent transition-all duration-200 bg-white/50"
                        placeholder={
                          label === "Discount %"
                            ? "15"
                            : label === "Star Rating"
                              ? "4.5"
                              : ""
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    { key: "processor_brand", label: "Processor Brand" },
                    { key: "processor_name", label: "Processor Name" },
                    { key: "processor_gnrtn", label: "Processor Generation" },
                    { key: "os", label: "Operating System" },
                    { key: "ram_gb", label: "RAM (GB)" },
                    { key: "ram_type", label: "RAM Type" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        name={key}
                        value={laptopForm[key]}
                        onChange={handleLaptopChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F66435] focus:border-transparent transition-all duration-200 bg-white/50"
                        placeholder={
                          label === "RAM (GB)"
                            ? "16"
                            : label === "RAM Type"
                              ? "DDR4"
                              : ""
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    { key: "ssd", label: "SSD (GB)" },
                    { key: "hdd", label: "HDD (GB)" },
                    { key: "graphic_card_gb", label: "Graphics Card (GB)" },
                    { key: "display_size", label: "Display Size" },
                    { key: "weight", label: "Weight (kg)" },
                    { key: "warranty", label: "Warranty" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        name={key}
                        value={laptopForm[key]}
                        onChange={handleLaptopChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F66435] focus:border-transparent transition-all duration-200 bg-white/50"
                        placeholder={
                          label === "SSD (GB)"
                            ? "512"
                            : label === "Display Size"
                              ? '15.6"'
                              : label === "Weight (kg)"
                                ? "1.8"
                                : ""
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {[
                    { key: "os_bit", label: "OS Bit" },
                    { key: "Touchscreen", label: "Touchscreen" },
                    { key: "msoffice", label: "MS Office" },
                    { key: "image", label: "Image URL" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        name={key}
                        value={laptopForm[key]}
                        onChange={handleLaptopChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F66435] focus:border-transparent transition-all duration-200 bg-white/50"
                        placeholder={
                          label === "Image URL"
                            ? "https://example.com/laptop.jpg"
                            : label === "Touchscreen"
                              ? "Yes/No"
                              : ""
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* PURCHASE LINKS FOR LAPTOP */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#F66435] rounded-full"></span>
                      Purchase Links
                    </h3>
                    <button
                      onClick={() => addBuyLink("laptop")}
                      className="px-4 py-2 bg-linear-to-r from-[#F66435] to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      + Add Link
                    </button>
                  </div>

                  <div className="space-y-3">
                    {laptopForm.buyLinks.map((link, i) => (
                      <div
                        key={i}
                        className="flex gap-3 items-end bg-white/50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all"
                      >
                        <input
                          placeholder="Site Name (Amazon, Flipkart, etc.)"
                          value={link.site}
                          onChange={(e) =>
                            updateBuyLink("laptop", i, "site", e.target.value)
                          }
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F66435] bg-white"
                        />
                        <input
                          placeholder="Product URL"
                          value={link.url}
                          onChange={(e) =>
                            updateBuyLink("laptop", i, "url", e.target.value)
                          }
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F66435] bg-white"
                        />
                        {laptopForm.buyLinks.length > 1 && (
                          <button
                            onClick={() => removeBuyLink("laptop", i)}
                            className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="px-12 py-4 bg-linear-to-r from-[#F66435] to-orange-500 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl w-full md:w-auto"
                  >
                    🚀 Register Laptop
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default RegisterProduct;
