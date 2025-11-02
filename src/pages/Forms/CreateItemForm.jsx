// CreateItemForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../App";

const DUMMY_PAYLOAD = {
    companyId: "cmhgnppki0001b9k8afhf2ihn",
    name: "Laptop Computer",
    code: "ITEM-001",
    description: "High-performance laptop",
    category: "Electronics",
    uomId: "cmhhgj0gg0003b988eibo7htm",
    isService: false,
    unitPrice: "1200.00",
    costPrice: "900.00",
    currencyId: "cmhgo5i4d0001b98ooo7d8y7o",
    taxRate: "10.00",
    trackInventory: true,
    minStockLevel: "5",
    maxStockLevel: "50",
    reorderPoint: "10",
    preferredVendorId: "cmhhgkamz0005b988u95lfym6",
    barcode: "123456789",
    manufacturer: "Dell",
    brand: "Dell",
    specifications: '{"ram":"16GB","storage":"512GB SSD"}', // JSON string
    isActive: true,
};

export default function CreateItemForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyId: "",
        name: "",
        code: "",
        description: "",
        category: "",
        uomId: "",
        isService: false,
        unitPrice: "",
        costPrice: "",
        currencyId: "",
        taxRate: "",
        trackInventory: true,
        minStockLevel: "",
        maxStockLevel: "",
        reorderPoint: "",
        preferredVendorId: "",
        barcode: "",
        manufacturer: "",
        brand: "",
        specifications: "", // plain string – will hold JSON
        isActive: true,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    // -----------------------------------------------------------------
    // Load dummy data (one-click fill)
    // -----------------------------------------------------------------
    const loadDummy = () => {
        setFormData(DUMMY_PAYLOAD);
        setErrors({});
        setMessage("");
    };

    // -----------------------------------------------------------------
    // Generic change handler – works for text, number, checkbox
    // -----------------------------------------------------------------
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // -----------------------------------------------------------------
    // Validation
    // -----------------------------------------------------------------
    const validateForm = () => {
        const newErrors = {};

        if (!formData.companyId) newErrors.companyId = "Company ID is required";
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.code) newErrors.code = "Code is required";
        if (!formData.unitPrice || isNaN(formData.unitPrice))
            newErrors.unitPrice = "Valid unit price is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // -----------------------------------------------------------------
    // Submit
    // -----------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setMessage("");

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Authentication token missing. Please log in again.");
            setLoading(false);
            setTimeout(() => navigate("/login"), 1500);
            return;
        }

        const payload = {
            ...formData,
            unitPrice: parseFloat(formData.unitPrice) || 0,
            costPrice: parseFloat(formData.costPrice) || 0,
            taxRate: parseFloat(formData.taxRate) || 0,
            minStockLevel: parseInt(formData.minStockLevel) || 0,
            maxStockLevel: parseInt(formData.maxStockLevel) || 0,
            reorderPoint: parseInt(formData.reorderPoint) || 0,
            // specifications is already a JSON string in state
        };

        try {
            const res = await fetch(`${BaseUrl}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Item created successfully!");

                // Reset to empty form after success
                setFormData({
                    companyId: "",
                    name: "",
                    code: "",
                    description: "",
                    category: "",
                    uomId: "",
                    isService: false,
                    unitPrice: "",
                    costPrice: "",
                    currencyId: "",
                    taxRate: "",
                    trackInventory: true,
                    minStockLevel: "",
                    maxStockLevel: "",
                    reorderPoint: "",
                    preferredVendorId: "",
                    barcode: "",
                    manufacturer: "",
                    brand: "",
                    specifications: "",
                    isActive: true,
                });

                setTimeout(() => navigate("/ItemMasterSetup"), 1500);
            } else {
                if (res.status === 401) {
                    setMessage("Session expired. Redirecting to login...");
                    localStorage.removeItem("token");
                    setTimeout(() => navigate("/login"), 1500);
                } else {
                    setMessage(data.message || "Failed to create item");
                }
            }
        } catch (error) {
            console.error("API Error:", error);
            setMessage("Network error. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------
    return (
        <div className="w-full space-y-8">
            {/* Overview Cards – unchanged */}
             <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Item Overview
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
                                <p className="text-3xl font-bold  mt-1">7</p>
                            </div>

                            <div className="text-red-500">
                                <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={loadDummy}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Load Dummy Data
                        </button>
                    </div>
                </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl">

               


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ---------- Company ID ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company ID *</label>
                        <input
                            type="text"
                            name="companyId"
                            value={formData.companyId}
                            onChange={handleChange}
                            className={`w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.companyId ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="cmhgnppki0001b9k8afhf2ihn"
                        />
                        {errors.companyId && <p className="text-red-500 text-xs mt-1">{errors.companyId}</p>}
                    </div>

                    {/* ---------- Name ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Laptop Computer"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* ---------- Code ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            className={`w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.code ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="ITEM-001"
                        />
                        {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                    </div>

                    {/* ---------- Description ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="High-performance laptop"
                        />
                    </div>

                    {/* ---------- Category ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Electronics"
                        />
                    </div>

                    {/* ---------- UOM ID ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">UOM ID</label>
                        <input
                            type="text"
                            name="uomId"
                            value={formData.uomId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="cmhhgj0gg0003b988eibo7htm"
                        />
                    </div>

                    {/* ---------- Unit Price ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price *</label>
                        <input
                            type="number"
                            name="unitPrice"
                            value={formData.unitPrice}
                            onChange={handleChange}
                            step="0.01"
                            className={`w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.unitPrice ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="1200.00"
                        />
                        {errors.unitPrice && <p className="text-red-500 text-xs mt-1">{errors.unitPrice}</p>}
                    </div>

                    {/* ---------- Cost Price ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
                        <input
                            type="number"
                            name="costPrice"
                            value={formData.costPrice}
                            onChange={handleChange}
                            step="0.01"
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="900.00"
                        />
                    </div>

                    {/* ---------- Currency ID ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency ID</label>
                        <input
                            type="text"
                            name="currencyId"
                            value={formData.currencyId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="cmhgo5i4d0001b98ooo7d8y7o"
                        />
                    </div>

                    {/* ---------- Tax Rate ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                        <input
                            type="number"
                            name="taxRate"
                            value={formData.taxRate}
                            onChange={handleChange}
                            step="0.01"
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="10.00"
                        />
                    </div>

                    {/* ---------- Barcode ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                        <input
                            type="text"
                            name="barcode"
                            value={formData.barcode}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="123456789"
                        />
                    </div>

                    {/* ---------- Manufacturer ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                        <input
                            type="text"
                            name="manufacturer"
                            value={formData.manufacturer}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Dell"
                        />
                    </div>

                    {/* ---------- Brand ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Dell"
                        />
                    </div>

                    {/* ---------- Preferred Vendor ID ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Vendor ID</label>
                        <input
                            type="text"
                            name="preferredVendorId"
                            value={formData.preferredVendorId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="cmhhgkamz0005b988u95lfym6"
                        />
                    </div>

                    {/* ---------- Specifications (JSON string) ---------- */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Specifications (JSON)
                        </label>
                        <textarea
                            name="specifications"
                            value={formData.specifications}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder='{"ram":"16GB","storage":"512GB SSD"}'
                        />
                    </div>

                    {/* ---------- Stock Levels ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level</label>
                        <input
                            type="number"
                            name="minStockLevel"
                            value={formData.minStockLevel}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="5"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock Level</label>
                        <input
                            type="number"
                            name="maxStockLevel"
                            value={formData.maxStockLevel}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
                        <input
                            type="number"
                            name="reorderPoint"
                            value={formData.reorderPoint}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="10"
                        />
                    </div>

                    {/* ---------- Toggles ---------- */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="isService"
                                checked={formData.isService}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-sm font-medium text-gray-900">Is Service</label>
                        </div>

                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="trackInventory"
                                checked={formData.trackInventory}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-sm font-medium text-gray-900">Track Inventory</label>
                        </div>

                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-sm font-medium text-gray-900">Item is Active</label>
                        </div>
                    </div>
                </div>

                {/* ---------- Message ---------- */}
                {message && (
                    <div
                        className={`mt-6 p-3 rounded-lg text-center font-medium text-sm ${message.includes("successfully") || message.includes("Session")
                                ? "bg-green-100 text-green-800 border border-green-300"
                                : "bg-red-100 text-red-800 border border-red-300"
                            }`}
                    >
                        {message}
                    </div>
                )}

                {/* ---------- Submit ---------- */}
                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full font-semibold py-3 px-6 rounded-lg shadow-md transition flex items-center justify-center ${loading
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
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Creating Item...
                            </>
                        ) : (
                            "Create Item"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}