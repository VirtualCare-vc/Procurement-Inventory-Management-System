import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../App";
import api from "../../api";

export default function TenantUserForm() {
  const [formData, setFormData] = useState({
    email: "demo.user@example.com",
    password: "Demo@123",
    fullName: "Demo User",
    tenantId: "cmhm8g82000000c9t79qf92db",
    companyIds: [""],
    roleId: "cmhm8g82700010c9td1o0rsny",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState("");
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      setLoadingData(true);
      const [companiesRes, rolesRes, tenantsRes] = await Promise.all([
        api.get('/directory/companies?all=true'),
        api.get('/directory/roles?all=true'),
        api.get('/directory/my-tenant-info')
      ]);
      setCompanies(companiesRes.data.data || companiesRes.data);
      setRoles(rolesRes.data.data || rolesRes.data);
      // Handle tenant response - it's an array directly
      setTenants(Array.isArray(tenantsRes.data) ? tenantsRes.data : [tenantsRes.data]);
      
      // Auto-select tenant if only one exists
      if (tenantsRes.data && tenantsRes.data.length === 1) {
        setFormData(prev => ({ ...prev, tenantId: tenantsRes.data[0].id }));
      }
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
      setMessage('Failed to load form data');
    } finally {
      setLoadingData(false);
    }
  };

  // ✅ Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle company field change
  const handleCompanyChange = (index, value) => {
    const updated = [...formData.companyIds];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, companyIds: updated }));
  };

  const addCompanyField = () => {
    setFormData((prev) => ({
      ...prev,
      companyIds: [...prev.companyIds, ""],
    }));
  };

  const removeCompanyField = (index) => {
    setFormData((prev) => ({
      ...prev,
      companyIds: prev.companyIds.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setResponse(null);

    // ✅ Get token
    const token = localStorage.getItem("token");
    console.log("Token before request:", token);

    if (!token) {
      setMessage("Authentication token missing – please log in.");
      setLoading(false);
      return;
    }

    try {
     // const res = await fetch("http://localhost:3000/auth/tenant/users", {
            const res = await fetch(`${BaseUrl}/auth/tenant/users`, { 
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          tenantId: formData.tenantId,
          companyIds: formData.companyIds.filter((id) => id.trim() !== ""),
          roleId: formData.roleId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Error ${res.status}`);
      }

      setResponse(data);
      setMessage("✅ Tenant User created successfully!");
    } catch (err) {
      console.error(err);
      setResponse({ error: err.message });
      setMessage(`❌ Failed to create tenant user: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Add New Tenant User
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="John Doe"
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="user@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Tenant */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenant *
            </label>
            <select
              name="tenantId"
              value={formData.tenantId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
              required
              disabled={loadingData}
            >
              <option value="">Select Tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name} ({tenant.code})
                </option>
              ))}
            </select>
          </div>

          {/* Companies */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Companies *
            </label>
            {formData.companyIds.map((companyId, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <select
                  value={companyId}
                  onChange={(e) => handleCompanyChange(index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                  disabled={loadingData}
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name} ({company.code})
                    </option>
                  ))}
                </select>
                {formData.companyIds.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCompanyField(index)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCompanyField}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              + Add another company
            </button>
          </div>

          {/* Role */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <select
              name="roleId"
              value={formData.roleId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
              required
              disabled={loadingData}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Create Tenant User"}
          </button>

          <button
            type="button"
            onClick={() =>
              setFormData({
                email: "demo.user@example.com",
                password: "Demo@123",
                fullName: "Demo User",
                tenantId: "cmhgi0kl40001b95k8tgadnio",
                companyIds: ["cmhgo64r90003b98o096apdaw"],
                roleId: "contact",
              })
            }
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
          >
            Reset to Demo Data
          </button>
        </div>

        {/* ✅ Feedback Messages */}
        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {response && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
            <pre className="text-sm text-gray-700 overflow-auto max-h-60">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </div>
  );
}
