import axios from "../utils/AxiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../components/Header";
import "remixicon/fonts/remixicon.css";
import { useCompare } from "../contexts/useCompare";
import Footer from "../components/Footer";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { addToCompare } = useCompare();

  const [data, setData] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/device-compare/devices/product/${id}`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!data) return;
    const fetchSimilars = async () => {
      try {
        const priceValue =
          data.type === "mobile"
            ? data.product.price
            : data.product.latest_price;
        const res = await axios.get(
          `/device-compare/devices/all-products?type=${
            data.type
          }&minPrice=${priceValue - 5000}&maxPrice=${priceValue + 5000}&limit=30`,
          { withCredentials: true },
        );
        setSimilarProducts(res.data || []);
      } catch (error) {
        console.error("Error fetching similars:", error);
      }
    };
    fetchSimilars();
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading)
    return (
      <div className="h-screen w-full flex justify-center items-center bg-neutral-50">
        <p className="text-gray-700 text-2xl">Loading...</p>
      </div>
    );

  if (!data) return <div className="p-10 text-lg">No product found</div>;

  const p = data.product;

  // --------- Highlights Logic
  const autoHighlightsMobile =
    Array.isArray(p.specs) && p.specs.length
      ? p.specs.slice(0, 4).map((s) => {
          const [t, v] = s.split(":");
          return `${t.trim()} — ${v.trim()}`;
        })
      : [];

  const highlightsToShowMobile = p.highlights?.length
    ? p.highlights
    : autoHighlightsMobile;

  const laptopSpecs = [
    [
      "Processor",
      `${p.processor_brand} ${p.processor_name} (${p.processor_gnrtn} Gen)`,
    ],
    ["RAM", `${p.ram_gb} ${p.ram_type}`],
    ["Storage", `${p.ssd} / ${p.hdd}`],
    ["OS", `${p.os} ${p.os_bit}`],
    ["Display", p.display_size],
    ["Graphics", `${p.graphic_card_gb} GB`],
    ["Weight", p.weight],
    ["Warranty", `${p.warranty} Year`],
    ["MS Office", p.msoffice],
    ["Touchscreen", p.Touchscreen],
  ];

  const laptopHighlights = [
    `${p.processor_brand} ${p.processor_name}`,
    `RAM: ${p.ram_gb}`,
    `Storage: ${p.ssd} / ${p.hdd}`,
    `OS: ${p.os}`,
  ];

  return (
    <>
      <main className="min-h-screen w-full  p-2 md:py-6 md:px-6 ">
        <Header />

        {/* MOBILE VIEW */}
        {data.type === "mobile" && (
          <>
            {/* TOP SECTION */}
            <section className="mt-4 w-full flex flex-col md:flex-row gap-6 min-h-[300px]">
              <div className="md:w-1/3 w-full bg-white p-4 md:p-6 rounded-xl shadow flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="object-contain h-40 md:max-h-64 w-auto rounded-lg"
                />
              </div>
              <div className="md:w-2/3 w-full bg-white p-4 md:p-6 rounded-xl shadow flex flex-col justify-between">
                <div>
                  <div className="flex flex-col md:flex-row md:justify-between gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                      {p.name}
                    </h1>
                    <button
                      onClick={() => {
                        addToCompare({ ...p, type: data.type, _id: p._id });
                        navigate("/device-compare/products/compare");
                      }}
                      className="bg-[#38bdf8] hover:bg-[#2563eb] px-4 py-1.5 h-11 text-white rounded-lg font-medium transition"
                    >
                      Compare
                    </button>
                  </div>
                  <p className="text-slate-400 text-xs md:text-sm mt-1">
                    Mobile
                  </p>
                  {p.price && (
                    <p className="text-xl font-semibold text-[#6c63ff] mt-2">
                      ₹{p.price}
                    </p>
                  )}
                </div>
                <div className="mt-3">
                  <h2 className="text-lg font-semibold text-slate-700 mb-1">
                    Highlights
                  </h2>
                  <ul className="text-slate-600 text-sm space-y-0.5">
                    {highlightsToShowMobile.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* SPECIFICATIONS */}
            <section className="w-full py-5 mt-6">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                Specifications
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {p.specs?.map((item, idx) => {
                  const [title, value] = item.split(":").map((s) => s.trim());
                  return (
                    <div
                      key={idx}
                      className="bg-white border border-slate-100 rounded-xl p-4 shadow hover:shadow-lg transition"
                    >
                      <h2 className="text-base font-semibold text-slate-700">
                        {title}
                      </h2>
                      <p className="text-sm text-slate-600">{value}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* AVAILABLE ON */}
            <section className="w-full py-5 mt-4">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                Available On
              </h1>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                {(p.buyLinks || []).map((el, i) => (
                  <a
                    key={i}
                    href={el.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:w-1/2 bg-white border border-slate-100 rounded-xl p-4 flex flex-col transition hover:shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 bg-[#e0e8fc] rounded-full flex items-center justify-center text-[#6c63ff]">
                        <i className="ri-shopping-bag-3-line text-lg"></i>
                      </div>
                      <h2 className="text-base font-semibold capitalize">
                        {el.site}
                      </h2>
                    </div>
                    <button className="mt-2 py-2 bg-[#6c63ff] hover:bg-[#514ac3] text-white rounded-lg font-medium">
                      Visit Store
                    </button>
                  </a>
                ))}
              </div>
            </section>

            {/* SIMILAR PRODUCTS */}
            <section className="w-full py-5">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                Similar Products
              </h1>
              <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
                {similarProducts.map((el, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      navigate(`/device-compare/product/${el._id}`)
                    }
                    className="min-w-[150px] bg-white shadow rounded-xl p-3 flex flex-col items-center transition cursor-pointer hover:scale-105 hover:shadow-lg"
                  >
                    <img
                      src={el.thumbnail || el.image}
                      className="h-20 w-20 object-contain"
                    />
                    <h1 className="mt-2 text-sm font-semibold text-slate-700 text-center line-clamp-2">
                      {el.name || el.model}
                    </h1>
                    <p className="text-sm font-bold text-[#38bdf8] mt-1">
                      ₹{el.price || el.latest_price}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* LAPTOP VIEW */}
        {data.type === "laptop" && (
          <>
            {/* TOP SECTION */}
            <section className="mt-4 w-full flex flex-col md:flex-row gap-6 min-h-[300px]">
              <div className="md:w-1/3 w-full bg-white p-4 md:p-6 rounded-xl shadow flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.brand + " " + p.model}
                  className="object-contain max-h-56 w-auto rounded-lg"
                />
              </div>
              <div className="md:w-2/3 w-full bg-white p-4 md:p-6 rounded-xl shadow flex flex-col justify-between">
                <div>
                  <div className="flex flex-col md:flex-row md:justify-between gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                      {p.brand} {p.model}
                    </h1>
                    <button
                      onClick={() => {
                        addToCompare({ ...p, type: data.type, _id: p._id });
                        navigate("/device-compare/products/compare");
                      }}
                      className="bg-[#38bdf8] hover:bg-[#2563eb] px-4 py-1.5 h-11 text-white rounded-lg font-medium transition"
                    >
                      Compare
                    </button>
                  </div>
                  <p className="text-slate-400 text-xs md:text-sm mt-1">
                    Laptop
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <p className="text-xl font-semibold text-[#6c63ff]">
                      ₹{p.latest_price}
                    </p>
                    {p.old_price && (
                      <p className="text-sm text-gray-400 line-through">
                        ₹{p.old_price}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <h2 className="text-lg font-semibold text-slate-700 mb-1">
                    Highlights
                  </h2>
                  <ul className="text-slate-600 text-sm space-y-0.5">
                    {laptopHighlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* LAPTOP SPECIFICATIONS */}
            <section className="w-full py-5 mt-6">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                Specifications
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {laptopSpecs.map(([title, value], idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 rounded-xl p-4 shadow hover:shadow-lg transition"
                  >
                    <h2 className="text-base font-semibold text-slate-700">
                      {title}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {value === "0 GB" ? "No" : value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* AVAILABLE ON */}
            <section className="w-full py-5 mt-4">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                Available On
              </h1>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                {(p.buyLinks || []).map((el, i) => (
                  <a
                    key={i}
                    href={el.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:w-1/2 bg-white border border-slate-100 rounded-xl p-4 flex flex-col transition hover:shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 bg-[#e0e8fc] rounded-full flex items-center justify-center text-[#6c63ff]">
                        <i className="ri-shopping-bag-3-line text-lg"></i>
                      </div>
                      <h2 className="text-base font-semibold capitalize">
                        {el.site}
                      </h2>
                    </div>
                    <button className="mt-2 py-2 bg-[#6c63ff] hover:bg-[#514ac3] text-white rounded-lg font-medium">
                      Visit Store
                    </button>
                  </a>
                ))}
              </div>
            </section>

            {/* SIMILAR PRODUCTS */}
            <section className="w-full py-5">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                Similar Products
              </h1>
              <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
                {similarProducts.map((el, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      navigate(`/device-compare/product/${el._id}`)
                    }
                    className="min-w-[150px] bg-white shadow rounded-xl p-3 flex flex-col items-center transition cursor-pointer hover:scale-105 hover:shadow-lg"
                  >
                    <img
                      src={el.thumbnail || el.image}
                      className="h-20 w-20 object-contain"
                    />
                    <h1 className="mt-2 text-sm font-semibold text-slate-700 text-center line-clamp-2">
                      {el.name || el.model}
                    </h1>
                    <p className="text-sm font-bold text-[#38bdf8] mt-1">
                      ₹{el.price || el.latest_price}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default ProductDetails;
