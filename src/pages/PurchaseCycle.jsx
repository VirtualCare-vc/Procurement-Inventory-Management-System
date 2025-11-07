import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PurchaseCycle = () => {
  const purchases = [
    {
      poNo: 'PO-001',
      date: '2025-11-01',
      vendor: 'ABC Supplies',
      country: 'USA',
      status: 'Open',
      totalAmount: 1550.75,
    },
    {
      poNo: 'PO-002',
      date: '2025-11-02',
      vendor: 'Global Traders',
      country: 'UK',
      status: 'Pending',
      totalAmount: 980.0,
    },
    {
      poNo: 'PO-003',
      date: '2025-11-04',
      vendor: 'Delta Manufacturing',
      country: 'Germany',
      status: 'Closed',
      totalAmount: 3120.5,
    },
    {
      poNo: 'PO-004',
      date: '2025-11-05',
      vendor: 'Sunrise Imports',
      country: 'UAE',
      status: 'Pending',
      totalAmount: 450.0,
    },
  ];

  const totalPOs = purchases.length;
  const openPOs = purchases.filter((po) => po.status === 'Open').length;
  const pendingPOs = purchases.filter((po) => po.status === 'Pending').length;

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
      {/* Summary Cards */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-6 gap-4">
        {/* Total POs */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Total POs</p>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{totalPOs}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 7h6m-6 4h6m-6 4h6M5 5a2 2 0 012-2h10a2 2 0 012 2v14l-3-2-3 2-3-2-3 2-3-2-3 2V5z"
              />
            </svg>
          </div>
        </div>

        {/* Open POs */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Open POs</p>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{openPOs}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Pending POs */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Pending POs</p>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{pendingPOs}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 mb-4 gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">
          Purchase Orders
        </h2>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2 sm:gap-3">
          <Link to="/PurchaseOrderForm">
            <button className="bg-blue-500 cursor-pointer text-white px-4 sm:px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-300 w-full sm:w-auto">
              + Create Purchase Order
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-auto">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">PO No</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Date</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Vendor</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Country</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Status</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">
                Total Amount
              </th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((po, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">
                  {po.poNo}
                </td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">
                  {po.date}
                </td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">
                  {po.vendor}
                </td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">
                  {po.country}
                </td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">
                  {po.status}
                </td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">
                  ${po.totalAmount.toLocaleString()}
                </td>

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

                  {openDropdown === index && (
                    <div className="absolute right-0 sm:right-60 top-8 bg-white shadow-lg rounded-lg w-28 h-fit sm:w-32 z-10">
                      <ul>
                        <li className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          View
                        </li>
                        <li className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          Edit
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

export default PurchaseCycle;
