import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../App";
import api from "../../api";

export default function VendorForm() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    email: "",
    phone: "",
    address: "",
    taxNumber: "",
    companyId: "",
    currencyId: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [companies, setCompanies] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      setLoadingData(true);
      const [companiesRes, currenciesRes] = await Promise.all([
        api.get('/directory/companies?all=true'),
        api.get('/directory/currencies?all=true')
      ]);
      setCompanies(companiesRes.data.data || companiesRes.data);
      setCurrencies(currenciesRes.data.data || currenciesRes.data);
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
      setMessage({ type: "error", text: "Failed to load form data" });
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({ type: "error", text: "Authentication token missing – please log in." });
      setLoading(false);
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.code || !formData.companyId) {
      setMessage({ type: "error", text: "Name, Code, and Company ID are required." });
      setLoading(false);
      return;
    }

    try {
const res = await fetch(`${BaseUrl}/directory/vendors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Server error: ${res.status}`);
      }

      setMessage({ type: "success", text: "Vendor created successfully!" });
      setFormData({
        name: "",
        code: "",
        email: "",
        phone: "",
        address: "",
        taxNumber: "",
        companyId: "",
        currencyId: "",
        isActive: true,
      });
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({ type: "error", text: error.message || "Failed to create vendor." });
    } finally {
      setLoading(false);
    }
  };

  const loadDemo = () => {
    if (companies.length > 0 && currencies.length > 0) {
      setFormData({
        companyId: companies[0]?.id || "",
        name: "Vendor Name",
        code: "VEND0021",
        email: "vendor@example.com",
        phone: "+1234567890",
        address: "123 Vendor St",
        taxNumber: "TAX123456",
        currencyId: currencies[0]?.id || "",
        isActive: true,
      });
    }
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="w-full space-y-8">
      {/* ── Overview Cards ─────────────────────────────────────── */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Vendor Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Vendors */}
          <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-700">Total Vendors</p>
              <p className="text-3xl font-bold text-black mt-1">248</p>
            </div>
            <div className="text-gray-500">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={loadDemo}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium mt-4"
        >
          Load Demo
        </button>
      </div>

      {/* ── Form ───────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl mt-2">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Add New Vendor</h2>

        {/* ── Message Toast ─────────────────────────────────────── */}
        {message.text && (
          <div
            className={`mb-5 p-3 rounded-lg text-center font-medium text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vendor Name <span className="text-red-500">*</span>
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

          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vendor Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="VEND001"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="vendor@acme.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="123 Industrial Ave, City, State 12345"
            />
          </div>

          {/* Tax Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Number</label>
            <input
              type="text"
              name="taxNumber"
              value={formData.taxNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="TAX-987654"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <select
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
              required
              disabled={loadingData}
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name} ({company.code})
                </option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              name="currencyId"
              value={formData.currencyId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
              disabled={loadingData}
            >
              <option value="">Select Currency</option>
              {currencies.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {currency.name} ({currency.code}) - {currency.symbol}
                </option>
              ))}
            </select>
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">Vendor is Active</label>
          </div>
        </div>

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
                Creating…
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
