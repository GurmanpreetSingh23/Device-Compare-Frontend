import React from "react";
import Header from "../components/Header";
import { useCompare } from "../contexts/useCompare";
import Footer from "../components/Footer";

function CompareProducts() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen px-2 py-4 flex flex-col items-center bg-linear-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="mt-16 rounded-3xl backdrop-blur-xl p-10 shadow-2xl border border-white/50">
          <h1 className="text-3xl font-light text-gray-700 tracking-wide">
            Add products to compare
          </h1>
        </div>
      </div>
    );
  }

  if (compareList.length === 1) {
    const a = compareList[0];
    return (
      <div className="min-h-screen p-6 flex flex-col items-center bg-linear-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="mt-14 bg-white/80 p-8 rounded-3xl backdrop-blur-xl shadow-2xl max-w-sm w-full text-center border border-white/50">
          <h1 className="text-xl font-light text-gray-700">
            Add{" "}
            <span className="text-[#F66435] underline font-medium">
              <a href="/device-compare/home">one more</a>
            </span>{" "}
            product
          </h1>
          <img
            src={a.image}
            className="h-36 w-full object-contain mx-auto mt-6 p-2 rounded-2xl shadow-lg"
            alt=""
          />
          <h2 className="text-2xl font-light mt-4 text-gray-800">
            {a.name || a.model}
          </h2>
          <p className="text-gray-500 mt-1">{a.type}</p>
          <p className="text-xl font-semibold text-[#F66435] mt-2">
            ₹{a.price || a.latest_price}
          </p>
          <button
            onClick={() => removeFromCompare(a._id)}
            className="mt-6 py-2.5 w-full bg-linear-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  const [a, b] = compareList;

  // ✅ FIXED: Universal specs parser for both mobile & laptop
  const parseSpecs = (product) => {
    if (product.specs?.length > 0) {
      // Mobile: parse specs array
      return product.specs.map((s) => {
        const [title, value] = s.split(":").map((x) => x.trim());
        return { title, value };
      });
    } else {
      // Laptop: generate specs from individual fields
      const specs = [];

      if (product.processor_brand || product.processor_name) {
        specs.push({
          title: "Processor",
          value:
            `${product.processor_brand || ""} ${product.processor_name || ""} ${product.processor_gnrtn || ""}`.trim(),
        });
      }

      if (product.ram_gb) {
        specs.push({ title: "RAM", value: product.ram_gb });
      }

      if (product.ssd && parseInt(product.ssd) > 0) {
        specs.push({ title: "Storage", value: product.ssd });
      } else if (product.hdd && product.hdd !== "No HDD") {
        specs.push({ title: "Storage", value: product.hdd });
      }

      if (product.display_size) {
        specs.push({ title: "Display", value: `${product.display_size}"` });
      }

      if (product.os) {
        specs.push({
          title: "OS",
          value: `${product.os} ${product.os_bit || ""}`.trim(),
        });
      }

      if (product.weight) {
        specs.push({ title: "Weight", value: product.weight });
      }

      if (product.graphics_card_gb && parseInt(product.graphics_card_gb) > 0) {
        specs.push({
          title: "Graphics",
          value: `${product.graphics_card_gb}GB`,
        });
      }

      return specs;
    }
  };

  const specA = parseSpecs(a);
  const specB = parseSpecs(b);
  const allTitles = Array.from(
    new Set([...specA, ...specB].map((s) => s.title)),
  );

  return (
    <>
      <main className="min-h-screen px-4 py-6 ">
        <Header />
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-6xl mx-auto mb-12 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-10 bg-linear-to-b from-[#F66435] to-orange-500 rounded-full shadow-lg" />
            <h1 className="text-xl md:text-2xl font-light text-gray-800 tracking-tight">
              Product Comparison
            </h1>
          </div>
          <button
            onClick={clearCompare}
            className="px-4 py-2 bg-linear-to-r from-gray-200 to-gray-300 text-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:from-gray-300 hover:to-gray-400 transition-all font-medium border border-gray-200 text-sm"
          >
            Clear All
          </button>
        </div>
        {/* Product Images & Info - Fixed name display */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 md:gap-20">
            {[a, b].map((p, i) => (
              <div
                key={i}
                className="flex flex-col items-center group w-full sm:w-auto hover:scale-105 transition-all"
              >
                <img
                  src={p.image}
                  className="h-40 w-60 sm:h-48 md:h-56 max-w-full object-contain rounded-3xl bg-white/70 p-3 sm:p-4 backdrop-blur-sm group-hover:shadow-3xl transition-all"
                  alt={p.name || p.model}
                />
                <h3 className="mt-4 text-sm sm:text-lg font-bold text-gray-800 text-center px-2 line-clamp-2">
                  {p.name || p.model}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {p.type}
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#F66435] mt-2">
                  ₹{p.price || p.latest_price}
                </p>
                <button
                  onClick={() => removeFromCompare(p._id)}
                  className="mt-3 py-1.5 px-3 sm:px-4 bg-linear-to-r from-red-500/90 to-red-600/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm font-medium border border-red-400/50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Better For Section */}
        {compareList.some((product) => product.type === "mobile") && (
          <section className="max-w-4xl mx-auto mb-16 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-800 text-center mb-6 tracking-wide">
              Better For
            </h2>
            <div className="bg-white/60 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/50 overflow-hidden">
              {/* Desktop: 3-column */}
              <div className="hidden sm:flex p-1">
                <div className="flex-1 py-4 px-4 sm:px-8 font-semibold text-gray-700 bg-linear-to-r from-white/80 to-white/50 border-b sm:border-b-0 sm:border-r border-white/60 text-sm sm:text-base min-w-0">
                  Category
                </div>
                <div className="flex-1 py-4 px-4 sm:px-8 font-semibold text-[#F66435] bg-white/70 text-sm sm:text-base min-w-0">
                  <span
                    className="truncate block sm:inline"
                    title={a.betterFor || "-"}
                  >
                    {a.betterFor || "-"}
                  </span>
                </div>
                <div className="flex-1 py-4 px-4 sm:px-8 font-semibold text-[#F66435] bg-white/70 text-sm sm:text-base min-w-0">
                  <span
                    className="truncate block sm:inline"
                    title={b.betterFor || "-"}
                  >
                    {b.betterFor || "-"}
                  </span>
                </div>
              </div>

              {/* Mobile: Stacked cards */}
              <div className="sm:hidden space-y-3 p-4">
                <div className="bg-white/70 rounded-2xl p-4 border border-white/60">
                  <div className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">
                    Device A
                  </div>
                  <div
                    className="font-semibold text-[#F66435] text-sm truncate"
                    title={a.betterFor || "-"}
                  >
                    {a.betterFor || "-"}
                  </div>
                </div>
                <div className="bg-white/70 rounded-2xl p-4 border border-white/60">
                  <div className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">
                    Device B
                  </div>
                  <div
                    className="font-semibold text-[#F66435] text-sm truncate"
                    title={b.betterFor || "-"}
                  >
                    {b.betterFor || "-"}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Specifications Section */}
        <section className="w-full max-w-6xl mx-auto px-2 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-800 text-center mb-8 tracking-wide">
            Specifications
          </h2>
          <div className="bg-white/60 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/50 overflow-hidden">
            {allTitles.map((title, i) => {
              const vA = specA.find((x) => x.title === title)?.value || "-";
              const vB = specB.find((x) => x.title === title)?.value || "-";

              return (
                <div
                  key={i}
                  className="border-b border-white/30 last:border-b-0 hover:bg-white/80 transition-all"
                >
                  <div className="sm:hidden py-4 px-4 space-y-3">
                    <div
                      className="font-semibold text-gray-700 text-base truncate"
                      title={title}
                    >
                      {title}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div
                        className="font-medium text-gray-800 bg-white/80 px-3 py-2 rounded-lg truncate text-center min-h-10 flex items-center justify-center"
                        title={vA}
                      >
                        {vA}
                      </div>
                      <div
                        className="font-medium text-gray-800 bg-white/80 px-3 py-2 rounded-lg truncate text-center min-h-10 flex items-center justify-center"
                        title={vB}
                      >
                        {vB}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex border-t first:border-t-0">
                    <div className="w-72 shrink-0 py-5 px-6 font-semibold text-sm md:text-base text-gray-700 bg-linear-to-r from-white/70 to-white/50 min-w-0">
                      <span
                        className="truncate block leading-tight"
                        title={title}
                      >
                        {title}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 py-5 px-4 sm:px-6 text-gray-800 font-medium text-sm md:text-base bg-white/80 flex items-center">
                      <span className="truncate w-full" title={vA}>
                        {vA}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 py-5 px-4 sm:px-6 text-gray-800 font-medium text-sm md:text-base bg-white/80 flex items-center">
                      <span className="truncate w-full" title={vB}>
                        {vB}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default CompareProducts;
