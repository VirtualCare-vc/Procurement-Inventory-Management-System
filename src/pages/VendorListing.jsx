import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const vendors = [
  { status: 'Active', date: 'Apr 14, 2023', number: '#4345', vendor: 'Interlock' },
  { status: 'Pending', date: 'Apr 14, 2023', number: '#4346', vendor: 'BoltShift Creative' },
  { status: 'Unpaid', date: 'Apr 14, 2023', number: '#4347', vendor: 'Sisyphus Corporation' },
];

const totalVendors = vendors.length;
const activeVendors = vendors.filter(vendor => vendor.status !== 'Unpaid').length;
const pendingPayments = vendors.filter(vendor => vendor.status === 'Pending').length;

const VendorListing = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
      {/* Summary Cards */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-6 gap-4">
        {/* Total Vendors */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Total Vendors</p>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{totalVendors}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Active Vendors</p>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{activeVendors}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Pending Payments</p>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{pendingPayments}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 mb-4 gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">Vendor Bills</h2>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2 sm:gap-3">
          <Link to="/CreateVendorForm">
            <button className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-300 w-full sm:w-auto">
              + Create New Vendor
            </button>
          </Link>
          <Link to="/AssignUserToVendorForm">
            <button className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-300 w-full sm:w-auto">
              + Vendor User Assignments
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-auto">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Vendor</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Status</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Number</th>

              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{vendor.vendor}</td>
                <td
                  className={`py-3 px-4 sm:px-6 text-xs sm:text-sm ${
                    vendor.status === 'Paid'
                      ? 'text-green-600'
                      : vendor.status === 'Unpaid'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-lg ${
                      vendor.status === 'Paid'
                        ? 'bg-green-100'
                        : vendor.status === 'Unpaid'
                        ? 'bg-red-100'
                        : 'bg-yellow-100'
                    }`}
                  >
                    {vendor.status}
                  </span>
                </td>
                                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{vendor.number}</td>

                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm relative">
                  <button
                    className="text-gray-500 hover:text-blue-800"
                    onClick={() => toggleDropdown(index)}
                  >
                    <svg
                      fill="currentColor"
                      height="18"
                      width="18"
                      viewBox="0 -960 960 960"
                      className="cursor-pointer"
                    >
                      <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {openDropdown === index && (
                    <div className="absolute right-0 sm:right-60 top-8 bg-white shadow-lg rounded-lg w-28 h-fit sm:w-32 z-10 ">
                      <ul>
                        <li className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          View
                        </li>
                        <li className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          Add
                        </li>
                        <li className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorListing;
