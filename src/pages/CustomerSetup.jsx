import React, { useState } from "react";
import { Users, UserCheck, UserPlus, AlertTriangle, Edit2, Trash2 } from "lucide-react";

const CustomerSetup = () => {
  const [customers, setCustomers] = useState([
    { name: "Global Retailers Inc.", contact: "+1-234-5678", category: "Retailer", credit: "$50,000", terms: "Net 30" },
    { name: "Apex Distributors Ltd.", contact: "+44-207-1234", category: "Distributor", credit: "$100,000", terms: "Net 60" },
    { name: "City Supermart", contact: "+61-2-9676-5432", category: "Retailer", credit: "$25,000", terms: "Net 15" },
    { name: "Wholesale Hub", contact: "+91-11-2233-4455", category: "Wholesaler", credit: "$75,000", terms: "Net 45" },
    { name: "Tech Solutions LLC", contact: "+1-800-555-0000", category: "Retailer", credit: "$30,000", terms: "Net 30" },
    { name: "Mega Supply Co.", contact: "+86-10-8765-4321", category: "Wholesaler", credit: "$120,000", terms: "Net 60" },
  ]);

  return (
    <div className=" bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-5 text-gray-900">Customer Setup</h1>
      <p className="font-bold text-gray-600 text-lg mb-8">Overview</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Customers", value: "1,245", icon: <Users className="w-7 h-7 text-gray-500" /> },
          { label: "Active Retailers", value: "890", icon: <UserCheck className="w-7 h-7 text-gray-500" /> },
          { label: "New This Month", value: "32", icon: <UserPlus className="w-7 h-7 text-gray-500" /> },
          { label: "High Credit Risk", value: "15", icon: <AlertTriangle className="w-7 h-7 text-gray-500" /> },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 text-sm">{card.label}</p>
              <h2 className="text-2xl font-bold text-gray-800">{card.value}</h2>
            </div>
            <div className="">{card.icon}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Add New Customer</h2>
        <p className="text-sm text-gray-600 mb-8">Fill in the details to create a new customer profile.</p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Customer Name</label>
            <input
              type="text"
              placeholder="Acme Corporation"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Contact Number</label>
            <input
              type="text"
              placeholder="+1 (555) 123-4567"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Billing Address</label>
            <input
              type="text"
              placeholder="123 Main St, Anytown, USA"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email Address (Optional)</label>
            <input
              type="email"
              placeholder="contact@acme.com"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Customer Category</label>
            <select className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <option>Retailer</option>
              <option>Distributor</option>
              <option>Wholesaler</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Credit Limit (Optional)</label>
            <input
              type="text"
              placeholder="50000"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Shipping Address (Optional)</label>
            <input
              type="text"
              placeholder="456 Oak Ave, Anytown, USA"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Payment Terms</label>
            <select className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <option>Select payment terms</option>
              <option>Net 15</option>
              <option>Net 30</option>
              <option>Net 45</option>
              <option>Net 60</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Existing Customers</h2>
        <p className="text-sm text-gray-600 mb-6">
          Manage your customer profiles here. Click on a customer to edit their details.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 font-medium">Customer Name</th>
                <th className="py-3 px-4 font-medium">Contact</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Credit Limit</th>
                <th className="py-3 px-4 font-medium">Payment Terms</th>
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-5 px-4 border-b border-gray-200">{cust.name}</td>
                  <td className="py-5 px-4 border-b border-gray-200">{cust.contact}</td>
                  <td className="py-5 px-4 border-b border-gray-200">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border-b border-gray-200" ${
                        cust.category === "Retailer"
                          ? "bg-blue-100 text-blue-700"
                          : cust.category === "Distributor"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {cust.category}
                    </span>
                  </td>
                  <td className="py-5 px-4 border-b border-gray-200">{cust.credit}</td>
                  <td className="py-5 px-4 border-b border-gray-200">{cust.terms}</td>
                  <td className="py-5 px-4 flex items-center gap-8 border-b border-gray-200">
                    <Edit2 className="w-5 h-5  text-gray-500 hover:text-blue-600 cursor-pointer" />
                    <Trash2 className="w-5 h-5  text-red-500 hover:text-red-600 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerSetup;
