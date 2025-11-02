import React, { useState } from "react";
import { BaseUrl } from "../../App";

const DUMMY_DATA = {
  companyId: "cmhgnppki0001b9k8afhf2ihn",
  name: "Vendor Name",
  code: "VEND0021",
  email: "vendor@example.com",
  phone: "+1234567890",
  address: "123 Vendor St",
  taxNumber: "TAX123456",
  currencyId: "cmhgo5i4d0001b98ooo7d8y7o",
  isActive: true,
};

export default function CreateVendorForm() {
  const [formData, setFormData] = useState({
    companyId: "",
    name: "",
    code: "",
    email: "",
    phone: "",
    address: "",
    taxNumber: "",
    currencyId: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // -----------------------------------------------------------------
  // 1. Load dummy data
  // -----------------------------------------------------------------
  const loadDummy = () => {
    setFormData(DUMMY_DATA);
    setMessage("");
  };

  // -----------------------------------------------------------------
  // 2. Input handler (checkbox vs text)
  // -----------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // -----------------------------------------------------------------
  // 3. Submit – relative URL + token
  // -----------------------------------------------------------------
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  const token = localStorage.getItem("token");
  if (!token) {
    setMessage("Authentication token missing – please log in.");
    setLoading(false);
    return;
  }

  try {
    const res = await fetch(`${BaseUrl}/vendors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    // ---- 1. Inspect raw text first (helps debugging) ----
    const text = await res.text();               // ← never throws
    console.log("Raw response:", text);          // <-- check console

    // ---- 2. Try to parse only if there is content ----
    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        console.error("Invalid JSON:", jsonErr);
        setMessage("Server returned invalid JSON");
        setLoading(false);
        return;
      }
    }

    // ---- 3. Handle HTTP status ----
    if (res.ok || res.status === 204) {
      setMessage("Vendor created successfully!");
      // reset form …
    } else {
      // data may contain { message: "…" } from backend
      setMessage(data.message || `Error ${res.status}`);
    }
  } catch (err) {
    console.error("Network / fetch error:", err);
    setMessage("Error connecting to server");
  } finally {
    setLoading(false);
  }
};
  // -----------------------------------------------------------------
  // 4. UI
  // -----------------------------------------------------------------
  return (
    <div className="w-full space-y-8">
      {/* ------------------- Overview Cards ------------------- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Vendor Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Vendors */}
          <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-700">Total Vendors</p>
              <p className="text-3xl font-bold text-black mt-1">248</p>
            </div>
            <div className="text-gray-500">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>

          {/* Active Vendors */}
          <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-700">Active Vendors</p>
              <p className="text-3xl font-bold text-black mt-1">192</p>
            </div>
            <div className="text-gray-500">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Pending Payments */}
          <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-700">Pending Payments</p>
              <p className="text-3xl font-bold text-black mt-1">$12.4k</p>
            </div>
            <div className="text-gray-500">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Overdue Invoices */}
          <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-700">Overdue Invoices</p>
              <p className="text-3xl font-bold mt-1">7</p>
            </div>
            <div className="text-red-500">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------- Vendor Form ------------------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Create New Vendor
          </h2>

          {/* Load Dummy Data Button */}
          <button
            type="button"
            onClick={loadDummy}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
          >
            Load Dummy Data
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company ID
            </label>
            <input
              type="text"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="cmhgnppki0001b9k8afhf2ihn"
              required
            />
          </div>

          {/* Vendor Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vendor Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Acme Supplies Inc."
              required
            />
          </div>

          {/* Vendor Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vendor Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="VEND0021"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="vendor@example.com"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="+1234567890"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="123 Vendor St"
              required
            />
          </div>

          {/* Tax Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Number
            </label>
            <input
              type="text"
              name="taxNumber"
              value={formData.taxNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="TAX123456"
            />
          </div>

          {/* Currency ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency ID
            </label>
            <input
              type="text"
              name="currencyId"
              value={formData.currencyId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="cmhgo5i4d0001b98ooo7d8y7o"
              required
            />
          </div>

          {/* Is Active */}
          <div className="md:col-span-2 flex items-center space-x-3">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Vendor is Active
            </label>
          </div>
        </div>

        {/* Feedback Message */}
        {message && (
          <div
            className={`mt-6 p-3 rounded-lg text-center font-medium text-sm ${
              message.includes("successfully")
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 px-6 rounded-lg shadow-md transition flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Creating Vendor...
              </>
            ) : (
              "Create Vendor"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}