import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-700 via-indigo-600 to-blue-500 text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* floating gradient shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-400/20 blur-3xl rounded-full animate-ping"></div>

      {/* main hero */}
      <div className="z-10 text-center max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight font-sans drop-shadow-lg">
          Compare. Choose. <span className="text-yellow-300">Buy Smart.</span>
        </h1>

        <p className="text-sm md:text-base text-white/90 mb-8 font-light leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-yellow-300">Device Compare</span>{" "}
          — your platform to explore, compare, and find the best{" "}
          <span className="text-yellow-200 font-medium">smartphones</span> and{" "}
          <span className="text-yellow-200 font-medium">laptops</span>{" "}
          effortlessly.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/device-compare/login"
            className="px-6 py-2 border-2 border-yellow-300 text-yellow-300 text-sm font-semibold rounded-full hover:bg-yellow-300 hover:text-gray-900 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/device-compare/register"
            className="px-6 py-2 border-2 border-yellow-300 text-yellow-300 text-sm font-semibold rounded-full hover:bg-yellow-300 hover:text-gray-900 transition-all duration-300"
          >
            Register
          </Link>
        </div>
      </div>

      {/* features */}
      <div className="mt-14 grid md:grid-cols-3 gap-6 max-w-5xl w-full z-10 px-4">
        {[
          {
            title: "🔍 Smart Comparison",
            text: "Compare devices side-by-side and analyze specs like performance, battery, and display instantly.",
          },
          {
            title: "💡 Personalized Picks",
            text: "Smart suggestions for students, gamers, or professionals — tailored to your usage style.",
          },
          {
            title: "💬 Honest Reviews",
            text: "Read real user feedback and reviews — unbiased and transparent for confident choices.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/20"
          >
            <h2 className="text-lg font-semibold mb-2 text-yellow-300">
              {feature.title}
            </h2>
            <p className="text-sm text-white/85 font-light leading-relaxed">
              {feature.text}
            </p>
          </div>
        ))}
      </div>

      {/* footer */}
      <footer className="mt-16 text-xs text-white/70">
        © {new Date().getFullYear()} Device Compare — Crafted for smart tech
        lovers.
      </footer>
    </div>
  );
}

export default LandingPage;
