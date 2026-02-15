import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../components/Header";
import axios from "../utils/AxiosInstance";

function SearchResult() {
  const { query } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchQuery = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/device-compare/devices/search/${query}`);
        setResults(res.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch results. Please try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchQuery();
  }, [query]); // Remove 'results' from dependency array

  // Skeleton/Wireframe Card Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm w-full max-w-[220px] animate-pulse">
      <div className="relative flex justify-center items-center p-2 h-36 bg-gray-200">
        <div className="w-28 h-28 bg-gray-300 rounded"></div>
      </div>
      <div className="flex flex-col text-center px-3 py-2">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mt-2"></div>
        <div className="h-5 bg-orange-200 rounded w-1/3 mx-auto mt-2"></div>
        <div className="h-2 bg-gray-200 rounded w-2/3 mx-auto mt-2"></div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen flex flex-col p-2 md:p-6">
      <Header />

      <section className="mt-4 md:mt-6">
        {loading ? (
          // Loading State - Skeleton Cards
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          // Error State
          <div className="text-center py-10">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : results.length === 0 ? (
          // No Results State
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">
              No devices found for "{query}". Try a different search.
            </p>
          </div>
        ) : (
          // Results State
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center">
            {results.map((item) => {
              const isMobile = item.name && item.specs;
              const isLaptop = item.model && item.brand;

              return (
                <div
                  key={item._id}
                  onClick={() =>
                    navigate(`/device-compare/product/${item._id}`)
                  }
                  className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-1 w-full max-w-[220px] cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative flex justify-center items-center p-2 h-36 bg-linear-to-b from-gray-50 to-gray-100">
                    <img
                      src={
                        item.image ||
                        (isMobile
                          ? "https://via.placeholder.com/160x160?text=Mobile"
                          : "https://via.placeholder.com/160x160?text=Laptop")
                      }
                      alt={item.name || item.model}
                      className="object-contain w-28 h-28 mix-blend-multiply"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col text-center px-3 py-2">
                    <h2 className="text-sm font-semibold text-gray-800 leading-tight truncate">
                      {isMobile ? item.name : item.model || "Unnamed"}
                    </h2>

                    {isLaptop && (
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {item.brand}
                      </p>
                    )}

                    <p className="text-base font-bold text-[#F66435] mt-1">
                      {isMobile
                        ? `₹${item.price?.toLocaleString() || "N/A"}`
                        : `₹${item.latest_price?.toLocaleString() || "N/A"}`}
                    </p>

                    {isLaptop && (
                      <div className="flex justify-center items-center gap-2 text-[11px] text-gray-600 mt-1">
                        {item.processor_brand && (
                          <span>
                            {item.processor_brand.replace("Processor", "")}
                          </span>
                        )}
                        {item.ram_gb && <span>{item.ram_gb}</span>}
                        {item.ssd && parseInt(item.ssd) > 0 && (
                          <span>{item.ssd} SSD</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default SearchResult;
