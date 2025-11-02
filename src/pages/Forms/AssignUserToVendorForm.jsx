import React, { useState } from "react";
import { BaseUrl } from "../../App";

const DUMMY_DATA = {
  userId: "cmhgi0kl40001b95k8tgadnio",
  vendorId: "cmhgo64r90003b98o096apdaw",
  role: "contact",
};

export default function AssignUserToVendorForm() {
  const [formData, setFormData] = useState({
    userId: "",
    vendorId: "",
    role: "contact",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load dummy data
  const loadDummy = () => {
    setFormData(DUMMY_DATA);
    setMessage("");
  };

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  const token = localStorage.getItem("token");
  console.log("Token before request:", token);

  if (!token) {
    setMessage("Authentication token missing – please log in.");
    setLoading(false);
    return;
  }

  try {
    const res = await fetch(`${BaseUrl}/auth/vendor/assign-user`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("Server error:", res.status, text);
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);

    setMessage("User assigned to vendor successfully!");
    setFormData({ userId: "", vendorId: "", role: "contact" });
  } catch (error) {
    console.error("Submission error:", error);
    setMessage(error.message || "Failed to assign user. Check console.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full space-y-8">
      {/* Overview Cards */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Vendor User Assignments
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Assignments */}
          <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-900">Total Assignments</p>
              <p className="text-3xl font-bold text-black mt-1">156</p>
            </div>
            <div className="text-gray-500">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 21h3m-3 0h-3m3 0h3m-3 0a9.001 9.001 0 01-7.212-3.607M12 9.646a4 4 0 010-5.292M12 15v3m-3-3h6m-3 0v3m-3-3h6" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3" />
              </svg>
            </div>
          </div>

          {/* Active Contacts */}
          <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-900">Active Contacts</p>
              <p className="text-3xl font-bold text-black mt-1">142</p>
            </div>
            <div className="text-gray-500">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0A5.002 5.002 0 0122 12a5.002 5.002 0 01-9.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>

          {/* Vendor Admins */}
          <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-900">Vendor Admins</p>
              <p className="text-3xl font-bold text-black mt-1">8</p>
            </div>
            <div className="text-gray-500">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Assign User to Vendor
          </h2>

          {/* Load Dummy Data */}
          <button
            type="button"
            onClick={loadDummy}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
          >
            Load Dummy Data
          </button>
        </div>

        {/* User ID */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="cmhgi0kl40001b95k8tgadnio"
            required
          />
        </div>

        {/* Vendor ID */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vendor ID
          </label>
          <input
            type="text"
            name="vendorId"
            value={formData.vendorId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="cmhgo64r90003b98o096apdaw"
            required
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
          >
            <option value="contact">Contact</option>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
            <option value="billing">Billing</option>
          </select>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-5 p-3 rounded-lg text-center font-medium text-sm ${
              message.includes("successfully")
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Submit Button */}
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
              Assigning...
            </>
          ) : (
            "Assign User"
          )}
        </button>
      </form>
    </div>
  );
}