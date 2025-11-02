// CreateCompanyForm.jsx
import React, { useState } from "react";
import { BaseUrl } from "../../App";


const DUMMY_DATA = {
    name: "Acme Corp2asasdadsddssd",
    code: "ACMEASDwasdsdasds",
    description: "Main company",
};

export default function CreateCompanyForm() {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Load dummy data on button click
    const loadDummy = () => {
        setFormData(DUMMY_DATA);
        setMessage("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
                const res = await fetch(`${BaseUrl}/auth/create-company`, {

                    method: "POST",
                    headers: { "Content-Type": "application/json" ,Authorization: `Bearer ${localStorage.getItem("token")}`},
                    body: JSON.stringify(formData),

                });

                const data = await res.json();

                if(res.ok) {
                    setMessage("Company created successfully!");
            setFormData({ name: "", code: "", description: "" }); // Reset to empty
        } else {
            setMessage(data.message || "Failed to create company");
        }
    } catch (error) {
        console.error("Error creating company:", error);
        setMessage("Error connecting to the server");
    } finally {
        setLoading(false);
    }
};

return (
    <div className="w-full space-y-8">
        {/* Overview Cards */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Company Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Companies */}
                <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200">
                    <div>
                        <p className="text-sm font-medium text-gray-900">Total Companies</p>
                        <p className="text-3xl font-bold text-black mt-1">42</p>
                    </div>
                    <div className="text-gray-500">
                        <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                </div>

                {/* Active Companies */}
                <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200">
                    <div>
                        <p className="text-sm font-medium text-gray-900">Active Companies</p>
                        <p className="text-3xl font-bold text-black mt-1">38</p>
                    </div>
                    <div className="text-gray-500">
                        <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                {/* With Vendors */}
                <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200">
                    <div>
                        <p className="text-sm font-medium text-gray-900">With Vendors</p>
                        <p className="text-3xl font-bold text-black mt-1">29</p>
                    </div>
                    <div className="text-gray-500">
                        <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        {/* Company Form */}
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-xl mx-auto"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Company</h2>

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
                {/* Company Name */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Acme Corp2asasdadsddssd"
                        required
                    />
                </div>

                {/* Company Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Code
                    </label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="ACMEASDwasdsdasds"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Main company"
                    />
                </div>
            </div>

            {/* Feedback Message */}
            {message && (
                <div
                    className={`mt-6 p-3 rounded-lg text-center font-medium text-sm ${message.includes("successfully")
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
                            Creating Company...
                        </>
                    ) : (
                        "Create Company"
                    )}
                </button>
            </div>
        </form>
    </div>
);
}