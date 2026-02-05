import React from "react";

function PageNotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-6 bg-linear-to-br from-gray-50 via-white to-slate-50 overflow-hidden">
      {/* Animated Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-2 h-2 bg-linear-to-r from-blue-300 to-indigo-400 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-32 right-20 w-3 h-3 bg-linear-to-r from-purple-300 to-pink-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-linear-to-r from-emerald-300 to-teal-400 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-32 w-2 h-2 bg-linear-to-r from-amber-300 to-orange-400 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Main Glass Container */}
      <div className="relative bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl max-w-md w-full p-8 text-center group hover:shadow-3xl hover:border-white/70 transition-all duration-500">
        {/* Animated SVG 404 */}
        <div className="relative mx-auto mb-8">
          <svg
            className="w-24 h-24 mx-auto text-gray-400 opacity-80 group-hover:opacity-100 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              className="animate-spin-slow"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10A10 10 0 0 1 12 2z"
              opacity="0.3"
            />
            <circle
              cx="12"
              cy="12"
              r="8"
              className="stroke-gray-300 stroke-1 animate-pulse"
              fill="none"
            />
            <text
              x="12"
              y="15"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              className="text-gray-500 fill-current drop-shadow-sm"
            >
              404
            </text>
          </svg>

          {/* Floating SVG Elements */}
          <svg
            className="absolute -top-2 -right-2 w-12 h-12 text-indigo-200 animate-float"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2L13.09 8.26L19 9L15.91 14.74L17 21L12 17.27L7 21L8.09 14.74L5 9L10.91 8.26L12 2Z"
            />
          </svg>
          <svg
            className="absolute -bottom-2 -left-2 w-10 h-10 text-emerald-200 animate-pulse-slow"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <path stroke="white" strokeWidth="1" d="M8 12h8M12 8v8" />
          </svg>
        </div>

        {/* Clean Typography */}
        <h1 className="text-3xl md:text-4xl font-light bg-linear-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent mb-3 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
