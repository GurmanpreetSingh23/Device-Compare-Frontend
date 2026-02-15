import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useLocation, useParams, useNavigate } from "react-router";
import axios from "../utils/AxiosInstance";
import Header from "../components/Header";
import { Loader2 } from "lucide-react";

function FilterResult() {
  const { deviceType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Infinite scroll states
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  const observerTarget = useRef(null);
  const isMobile = deviceType.toLowerCase() === "mobile";

  // ✅ Stable filter params
  const filterParamsStr = useMemo(
    () => JSON.stringify(location.state?.filterParams || {}),
    [location.state?.filterParams],
  );

  // ✅ Fetch function
  const fetchData = useCallback(
    async (pageNum, reset = false) => {
      try {
        setLoading(true);
        setError("");

        const params = {
          type: deviceType.toLowerCase(),
          page: pageNum,
          limit: 20, // ✅ 20 products per page
          ...location.state?.filterParams,
        };

        const res = await axios.get(`/device-compare/devices/all-products`, {
          params,
          withCredentials: true,
        });

        console.log(`Page ${pageNum}:`, res.data);

        if (reset) {
          setData(res.data);
        } else {
          setData((prev) => [...prev, ...res.data]);
        }

        // ✅ Check if more data available
        setHasMore(res.data.length === 20);
      } catch (err) {
        console.error("❌ Fetch Error:", err.response?.data || err.message);
        setError("Failed to fetch more data");
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [deviceType, location.state?.filterParams],
  );

  // ✅ Initial load
  useEffect(() => {
    if (deviceType) {
      setPage(1);
      fetchData(1, true);
    }
  }, [deviceType, filterParamsStr, fetchData]);

  // ✅ Intersection Observer for infinite scroll
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, loading],
  );

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [handleObserver]);

  // ✅ Load more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchData(page, false);
    }
  }, [page, fetchData]);

  if (initialLoading) {
    return (
      <main className="h-screen flex flex-col items-center justify-center px-2 py-5">
        <Header />
        <div className="flex flex-col w-full h-full justify-center items-center gap-4 mt-[4vh]">
          <Loader2 className="h-8 w-8 animate-spin text-[#F66435]" />
          <p className="text-gray-600 text-sm">Loading {deviceType}...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col px-2 py-5">
      <Header />

      <section className="mt-[4vh] p-4 md:p-6 grow overflow-auto">
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-sm font-medium mb-4">{error}</p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-[#F66435] text-white rounded-lg text-sm font-medium hover:bg-[#e55a2b] transition-colors"
            >
              Go Back
            </button>
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-10">
            No {deviceType} found matching your filters.
          </p>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center pb-20">
              {data.map((item, index) => (
                <div
                  key={`${item._id}-${index}`}
                  className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-1 w-full max-w-[220px] cursor-pointer"
                  onClick={() =>
                    navigate(`/device-compare/product/${item._id}`)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    navigate(`/device-compare/product/${item._id}`)
                  }
                >
                  {/* ✅ Fixed gradient */}
                  <div className="relative bg-linear-to-b from-gray-50 to-gray-100 flex justify-center items-center p-2 h-36">
                    <img
                      src={
                        item.image ||
                        (isMobile
                          ? "https://via.placeholder.com/160x160?text=Mobile"
                          : "https://via.placeholder.com/160x160?text=Laptop")
                      }
                      alt={item.name || item.model}
                      className="object-contain w-28 h-28"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col text-center px-3 py-2">
                    <h2 className="text-sm font-semibold text-gray-900 leading-tight truncate">
                      {isMobile ? item.name : item.model || "Unnamed"}
                    </h2>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {item.brand || ""}
                    </p>
                    <p className="text-base font-bold text-[#F66435] mt-1">
                      {isMobile
                        ? `₹${item.price?.toLocaleString() || "N/A"}`
                        : `₹${item.latest_price?.toLocaleString() || "N/A"}`}
                    </p>

                    {!isMobile && (
                      <div className="flex justify-center items-center gap-2 text-[11px] text-gray-600 mt-1 flex-wrap">
                        {item.processor_brand && (
                          <span className="truncate max-w-[60px]">
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
              ))}
            </div>

            {/* ✅ Infinite scroll loader */}
            {hasMore && (
              <div ref={observerTarget} className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-[#F66435]" />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default FilterResult;
