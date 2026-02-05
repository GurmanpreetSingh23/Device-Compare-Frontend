import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDescription() {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="min-h-screen w-full flex justify-center items-center p-4 bg-[#0b0b0c]">
      <div className="w-full max-w-[90vw] bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-6 border border-white/10">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-2 text-white tracking-tight">
          Admin Overview
        </h1>
        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Review the admin powers & responsibilities before entering the
          dashboard.
        </p>

        {/* Grid Layout to Fit Everything in One Page */}
        <div className="grid grid-cols-1 gap-4">
          {/* What is an Admin */}
          <section className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <h2 className="text-sm font-semibold mb-1 text-white">
              What Is an Admin?
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Admin manages the platform, maintains product accuracy, monitors
              activity, and ensures everything works smoothly.
            </p>
          </section>

          {/* Capabilities */}
          <section className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <h2 className="text-sm font-semibold mb-2 text-white">
              Admin Capabilities
            </h2>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>Monitor entire website activity.</li>
              <li>
                View & filter products by:
                <ul className=" pl-4 mt-1 space-y-0.5 flex gap-1">
                  <li>Price range,</li>
                  <li>Brand,</li>
                  <li>Type</li>
                </ul>
              </li>
              <li>Add new products.</li>
              <li>Edit/update product data.</li>
              <li>Delete products.</li>
              <li>View and manage users.</li>
              <li>Delete any user account.</li>
            </ul>
          </section>

          {/* Responsibilities */}
          <section className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <h2 className="text-sm font-semibold mb-2 text-white">
              Admin Responsibilities
            </h2>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>Maintain accurate product listings.</li>
              <li>Keep database clean and organized.</li>
              <li>Prevent misuse of admin tools.</li>
              <li>Monitor suspicious user behavior.</li>
            </ul>
          </section>
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2 mt-5">
          <input
            type="checkbox"
            id="terms"
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
            className="h-4 w-4 accent-[#F66435] cursor-pointer"
          />
          <label
            htmlFor="terms"
            className="text-xs text-gray-300 cursor-pointer"
          >
            I agree to the Admin Terms & Conditions.
          </label>
        </div>

        {/* Continue */}
        <button
          disabled={!accepted}
          onClick={() => navigate("/device-compare/admin/dashboard")}
          className={`mt-4 w-full py-2 rounded-xl text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-md ${
            accepted
              ? "bg-[#F66435] hover:bg-[#e75629]"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </main>
  );
}

export default AdminDescription;
