import axios from "../utils/AxiosInstance";
import gsap from "gsap";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function DevicesMenu() {
  const [mobiles, setMobiles] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [loadingMobiles, setLoadingMobiles] = useState(true);
  const [loadingLaptops, setLoadingLaptops] = useState(true);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const productCardsRef = useRef([]);

  // ✅ FIXED: Memoized constants - No more ESLint warnings
  const bestMobileDevices = useMemo(
    () => [
      "Samsung Galaxy S25+",
      "iPhone 16 Pro Max",
      "Samsung Galaxy Z Flip 7",
      "iPhone 16 Pro",
      "Samsung Galaxy Z Fold 6",
      "iPhone 16",
      "Google Pixel 9 Pro XL",
      "Samsung Galaxy S25",
      "OnePlus 13",
      "Google Pixel 10 Pro",
      "iPhone 16 Plus",
      "Samsung Galaxy Z Fold 7",
      "Xiaomi 14",
      "OnePlus Open 2",
      "iPhone 17 Pro",
      "Google Pixel Fold 2",
      "Xiaomi 15 Ultra",
      "Samsung Galaxy S25 Ultra",
      "ASUS ROG Phone 8 Pro",
      "Google Pixel 9 Pro",
      "Xiaomi 15 Pro",
      "Vivo X200 Pro",
      "Vivo X100 Pro",
      "Xiaomi 14 Pro",
      "ASUS Zenfone 11 Ultra",
      "Oppo Find X7 Ultra",
      "Samsung Galaxy Z Flip 6",
      "Vivo X200",
      "ASUS Zenfone 12 Ultra",
      "Nothing Phone 3a",
    ],
    [],
  );

  const validGens = useMemo(() => ["12th", "11th", "13th", "14th"], []);

  // ✅ FIXED: Memoized fetch functions
  const fetchMobiles = useCallback(async () => {
    try {
      const res = await axios.get(
        `/device-compare/devices/all-products?type=mobile`,
        { withCredentials: true },
      );
      const filtered = res.data.filter((item) =>
        bestMobileDevices.includes(item.name),
      );
      setMobiles(filtered.slice(0, 12));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMobiles(false);
    }
  }, [bestMobileDevices]);

  const fetchLaptops = useCallback(async () => {
    try {
      const res = await axios.get(
        `/device-compare/devices/all-products?type=laptop`,
        { withCredentials: true },
      );
      const filtered = res.data
        .filter(
          (item) =>
            validGens.some((gen) =>
              item.processor_gnrtn?.toLowerCase().includes(gen.toLowerCase()),
            ) &&
            item.brand &&
            item.model &&
            item.latest_price,
        )
        .slice(0, 12);
      setLaptops(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLaptops(false);
    }
  }, [validGens]);

  // Fetch mobiles - ✅ ESLint fixed
  useEffect(() => {
    fetchMobiles();
  }, [fetchMobiles]);

  // Fetch laptops - ✅ ESLint fixed
  useEffect(() => {
    fetchLaptops();
  }, [fetchLaptops]);

  // ✅ FIXED: Entrance animation when data loads
  useEffect(() => {
    if (
      (mobiles.length > 0 || laptops.length > 0) &&
      productCardsRef.current.length > 0
    ) {
      gsap.fromTo(
        productCardsRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
      );
    }
  }, [mobiles.length, laptops.length]);

  // ✅ FIXED: ScrollTrigger animation
  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".product-card");
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false,
          },
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          force3D: true,
        });
      }
    },
    { scope: containerRef },
  );

  const SkeletonCard = () => (
    <div className="w-full h-40 bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl shadow-xl animate-pulse">
      <div className="w-16 h-16 bg-black/5 border border-black/20 rounded-xl mx-auto mt-4" />
      <div className="h-4 bg-black/10 rounded-full w-3/4 mx-auto mt-3" />
      <div className="h-3 bg-black/5 rounded-full w-1/3 mx-auto mt-2" />
      <div className="h-8 bg-black/10 rounded-lg w-2/5 mx-auto mt-auto mb-4" />
    </div>
  );

  const ProductCard = React.forwardRef(({ device, type }, ref) => {
    const price =
      type === "mobile"
        ? device.price
        : `₹${device.latest_price?.toLocaleString()}`;
    const title =
      type === "mobile"
        ? device.name
        : `${device.brand} ${device.model === "Missing" ? "" : device.model}`;

    return (
      <div
        ref={ref}
        className="product-card w-42 md:w-46 lg:w-[250px] border border-black/15 rounded-2xl cursor-pointer p-3 flex flex-col justify-between group relative overflow-hidden hover:shadow-xl transition-all duration-300"
        onClick={() => navigate(`/device-compare/product/${device._id}`)}
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/40 to-black/3 group-hover:from-black/8 transition-all duration-300" />

        <div className="h-40 w-full bg-white/60 backdrop-blur-sm border border-black/15 rounded-xl flex items-center justify-center mx-auto mt-3 z-10">
          <img
            src={device.image}
            alt={title}
            className="w-full h-full object-contain p-4"
            loading="lazy"
          />
        </div>

        <h3 className="font-bold text-black text-center line-clamp-2 text-sm mt-2 px-2 z-10 bg-white/70 backdrop-blur rounded-lg">
          {title}
        </h3>

        {device.betterFor && (
          <span className="px-3 text-black/60 py-1 text-xs font-bold rounded-full mx-auto z-10">
            {device.betterFor}
          </span>
        )}

        <div className="text-center mt-auto mb-3 z-10">
          <div className="text-black/80 px-4 py-2 rounded-xl font-bold text-xl mx-auto w-fit">
            {price}
          </div>
        </div>
      </div>
    );
  });

  ProductCard.displayName = "ProductCard";

  const SeeMoreButton = ({ type }) => (
    <button
      onClick={() =>
        navigate(
          `/device-compare/filter/products/${type === "mobile" ? "mobile" : "laptop"}`,
        )
      }
      className="py-2 px-3 bg-black text-white text-xs uppercase tracking-wide rounded-2xl shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 transition-all duration-300 border border-black flex items-center gap-2 group"
    >
      See More
      <svg
        className="w-3 h-3 group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </button>
  );

  return (
    <main className="w-full py-5" ref={containerRef}>
      {/* Mobiles */}
      <section>
        <div className="flex items-center justify-between mb-6 gap-4">
          <h1 className="text-xl md:text-4xl font-black bg-linear-to-r from-black to-gray-900 bg-clip-text text-transparent">
            📱 Top Mobiles
          </h1>
          {mobiles.length > 0 && <SeeMoreButton type="mobile" />}
        </div>

        {loadingMobiles ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(12)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : mobiles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No mobiles found</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-5">
            {mobiles.map((device, index) => (
              <ProductCard
                key={device._id}
                device={device}
                type="mobile"
                ref={(el) => {
                  if (el && index < 12) {
                    productCardsRef.current[index] = el;
                  }
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Laptops */}
      <section className="mt-[4vh]">
        <div className="flex items-center justify-between mb-6 gap-4">
          <h1 className="text-xl md:text-4xl font-black bg-linear-to-r from-black to-gray-900 bg-clip-text text-transparent">
            💻 Latest Laptops
          </h1>
          {laptops.length > 0 && <SeeMoreButton type="laptop" />}
        </div>

        {loadingLaptops ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(12)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : laptops.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No laptops found</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-5">
            {laptops.map((device, index) => (
              <ProductCard
                key={device._id}
                device={device}
                type="laptop"
                ref={(el) => {
                  if (el) {
                    productCardsRef.current[12 + index] = el;
                  }
                }}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default DevicesMenu;
