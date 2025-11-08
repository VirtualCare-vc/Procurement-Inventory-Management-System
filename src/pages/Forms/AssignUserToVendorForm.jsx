import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../App";
import api from "../../api";

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
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      setLoadingData(true);
      const [usersRes, vendorsRes] = await Promise.all([
        api.get('/directory/users?all=true'),
        api.get('/directory/vendors?all=true')
      ]);
      setUsers(usersRes.data.data || usersRes.data);
      setVendors(vendorsRes.data.data || vendorsRes.data);
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
      setMessage('Failed to load form data');
    } finally {
      setLoadingData(false);
    }
  };

  // Load dummy data
  const loadDummy = () => {
    if (users.length > 0 && vendors.length > 0) {
      setFormData({
        ...DUMMY_DATA,
        userId: users[0]?.id || "",
        vendorId: vendors[0]?.id || ""
      });
    }
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

        {/* User */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User *
          </label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
            required
            disabled={loadingData}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullName} ({user.email})
              </option>
            ))}
          </select>
        </div>

        {/* Vendor */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vendor *
          </label>
          <select
            name="vendorId"
            value={formData.vendorId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
            required
            disabled={loadingData}
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name} ({vendor.code})
              </option>
            ))}
          </select>
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