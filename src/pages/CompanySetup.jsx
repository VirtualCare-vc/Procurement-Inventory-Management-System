import React, { useState } from "react";

const CompanySetup = () => {
  const [company, setCompany] = useState({
    name: "",
    code: "",
    regNo: "",
    taxId: "",
    email: "",
    website: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    baseCurrency: "",
    timezone: "",
    description: "",
  });

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Company created successfully!");
    console.log(company);
  };

  return (
    <div className=" bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Company Setup</h1>
      <p className="text-base text-gray-600 mb-8">
        Manage multiple companies and configure their basic settings, currencies, and timezones.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <div className="bg-white shadow rounded-2xl p-6 border border-gray-300 h-fit">
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2 h-5 w-5"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg></span> Existing Companies
          </h2>
          <p className="text-sm text-gray-600 mb-6">Your organization's companies</p>

          <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition">
            <div>
              <h3 className="font-medium text-gray-800 text-lg">Main Distribution Co.</h3>
              <p className="text-sm text-gray-500">USD</p>
              <p className="text-sm text-gray-500">Eastern Time (ET)</p>
            </div>
            <p className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-full">Active</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white shadow rounded-2xl p-8 border border-gray-300">
          <h2 className="text-2xl font-semibold mb-2">+ Add New Company</h2>
          <p className="text-gray-600 mb-8">Create a new company within your organization</p>

          <form onSubmit={handleSubmit} className="space-y-10">

            <div>
              <h3 className="font-semibold mb-5 text-gray-900 text-xl">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Company Name", name: "name", placeholder: "Enter company name" },
                  { label: "Company Code", name: "code", placeholder: "e.g. DIST001" },
                  { label: "Registration Number", name: "regNo", placeholder: "Company registration number" },
                  { label: "Tax ID", name: "taxId", placeholder: "Tax identification number" },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                    <input
                      name={field.name}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-5 text-gray-900 text-xl">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <input
                    name="email"
                    onChange={handleChange}
                    placeholder="company@example.com"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <input
                    name="phone"
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Website</label>
                  <input
                    name="website"
                    onChange={handleChange}
                    placeholder="https://www.company.com"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-5 text-gray-900 text-xl">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Street Address</label>
                  <input
                    name="street"
                    onChange={handleChange}
                    placeholder="Enter street address"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {[
                  { label: "City", name: "city", placeholder: "City name" },
                  { label: "State/Province", name: "state", placeholder: "State or province" },
                  { label: "ZIP/Postal Code", name: "zip", placeholder: "ZIP or postal code" },
                  { label: "Country", name: "country", placeholder: "Country name" },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-600">{f.label}</label>
                    <input
                      name={f.name}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-5 text-gray-900 text-xl">System Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Base Currency</label>
                  <select
                    name="baseCurrency"
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select base currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PKR">PKR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Timezone</label>
                  <select
                    name="timezone"
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select timezone</option>
                    <option value="EST">Eastern Time (ET)</option>
                    <option value="PST">Pacific Time (PT)</option>
                    <option value="GMT">Greenwich Mean Time (GMT)</option>
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-600">Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  placeholder="Brief description of the company..."
                  rows="3"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                type="submit"
                className="w-full md:w-1/2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                + Create Company
              </button>
              <button
                type="button"
                className="w-full md:w-1/2 border border-gray-300 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Save as Draft
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;
