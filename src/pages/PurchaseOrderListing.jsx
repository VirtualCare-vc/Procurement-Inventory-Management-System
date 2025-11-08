import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const PurchaseOrderListing = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/po');
      setPurchaseOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch purchase orders');
      console.error('Error fetching purchase orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleView = (po) => {
    console.log('View PO:', po);
    navigate(`/po/${po.id}`);
  };

  const handleEdit = (po) => {
    console.log('Edit PO:', po);
    navigate('/PurchaseOrderForm', { state: { po } });
  };

  const handleChangeStatus = async (po, action) => {
    try {
      await api.post(`/po/${po.id}/action`, { action });
      fetchPurchaseOrders();
      setOpenDropdown(null);
      alert(`Purchase Order status changed to ${action}`);
    } catch (err) {
      alert('Failed to change status: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (po) => {
    if (window.confirm(`Are you sure you want to delete PO ${po.number}?`)) {
      try {
        await api.delete(`/po/${po.id}`);
        fetchPurchaseOrders();
        setOpenDropdown(null);
      } catch (err) {
        alert('Failed to delete purchase order: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'DRAFT': 'bg-gray-100 text-gray-600',
      'SUBMITTED': 'bg-blue-100 text-blue-600',
      'APPROVED': 'bg-green-100 text-green-600',
      'REJECTED': 'bg-red-100 text-red-600',
      'CANCELLED': 'bg-red-100 text-red-600',
      'COMPLETED': 'bg-purple-100 text-purple-600'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-600';
  };

  const totalPOs = purchaseOrders.length;
  const submittedPOs = purchaseOrders.filter(po => po.status === 'SUBMITTED').length;
  const approvedPOs = purchaseOrders.filter(po => po.status === 'APPROVED').length;
  const totalAmount = purchaseOrders.reduce((sum, po) => sum + parseFloat(po.grandTotal || 0), 0);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">
          <p className="font-medium">Error loading purchase orders</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Summary Cards */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-6 gap-4 mb-6">
            {/* Total POs */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-700">Total POs</p>
                <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{totalPOs}</p>
              </div>
              <div className="text-gray-500">
                <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>

            {/* Submitted POs */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-700">Submitted</p>
                <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{submittedPOs}</p>
              </div>
              <div className="text-gray-500">
                <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Approved POs */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-700">Approved</p>
                <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{approvedPOs}</p>
              </div>
              <div className="text-gray-500">
                <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-700">Total Amount</p>
                <p className="text-2xl sm:text-3xl font-bold text-black mt-1">${totalAmount.toFixed(2)}</p>
              </div>
              <div className="text-gray-500">
                <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">Purchase Orders</h2>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2 sm:gap-3">
              <Link to="/CreatePurchaseOrder">
                <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-300 w-full sm:w-auto shadow-md">
                  + Create New PO
                </button>
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-auto">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">PO Number</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Vendor</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Company</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Order Date</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Status</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Grand Total</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Currency</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Items</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((po, index) => (
                  <tr key={po.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700 font-medium">{po.number}</td>
                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{po.vendor?.name || po.vendorBusinessName || 'N/A'}</td>
                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{po.company?.name || po.companyName || 'N/A'}</td>
                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{new Date(po.orderDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm">
                      <span className={`px-2 sm:px-3 py-1 rounded-lg ${getStatusColor(po.status)}`}>
                        {po.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700 font-semibold">${parseFloat(po.grandTotal).toFixed(2)}</td>
                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{po.currency?.code || 'N/A'}</td>
                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{po._count?.lines || 0}</td>
                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm relative">
                      <div ref={openDropdown === index ? dropdownRef : null}>
                        <button
                          className="text-gray-500 hover:text-blue-800 p-1"
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
                          <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg w-36 sm:w-40 z-50 border border-gray-200">
                            <ul className="py-1">
                              <li 
                                onClick={() => { handleView(po); setOpenDropdown(null); }}
                                className="px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors"
                              >
                                View Details
                              </li>
                              <li 
                                onClick={() => { handleEdit(po); setOpenDropdown(null); }}
                                className="px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors"
                              >
                                Edit
                              </li>
                              {po.status === 'DRAFT' && (
                                <li 
                                  onClick={() => handleChangeStatus(po, 'SUBMIT')}
                                  className="px-4 py-2 text-xs sm:text-sm text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors border-t border-gray-100"
                                >
                                  Submit
                                </li>
                              )}
                              {po.status === 'SUBMITTED' && (
                                <>
                                  <li 
                                    onClick={() => handleChangeStatus(po, 'APPROVE')}
                                    className="px-4 py-2 text-xs sm:text-sm text-green-600 hover:bg-green-50 cursor-pointer transition-colors border-t border-gray-100"
                                  >
                                    Approve
                                  </li>
                                  <li 
                                    onClick={() => handleChangeStatus(po, 'REJECT')}
                                    className="px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                                  >
                                    Reject
                                  </li>
                                </>
                              )}
                              <li 
                                onClick={() => handleDelete(po)}
                                className="px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors border-t border-gray-100"
                              >
                                Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseOrderListing;
