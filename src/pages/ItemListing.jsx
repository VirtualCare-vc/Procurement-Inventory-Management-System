import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const ItemListing = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
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

  const fetchItems = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/directory/items?page=${page}&limit=${limit}`);
      setItems(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch items');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalItems = meta.total;
  const activeItems = items.filter(item => item.isActive).length;
  const inactiveItems = totalItems - activeItems;

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleView = (item) => {
    console.log('View item:', item);
  };

  const handleEdit = (item) => {
    console.log('Edit item:', item);
    navigate('/CreateItemForm', { state: { item } });
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      try {
        await api.delete(`/directory/items/${item.id}`);
        fetchItems();
        setOpenDropdown(null);
      } catch (err) {
        alert('Failed to delete item: ' + (err.response?.data?.message || err.message));
      }
    }
  };

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
          <p className="font-medium">Error loading items</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
      {/* Summary Cards */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-6 gap-4">
        {/* Total Items */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Total Items</p>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{totalItems}</p>
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

        {/* Active Items */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Active Items</p>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{activeItems}</p>
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

        {/* Inactive Items */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex items-center justify-between border border-gray-200 w-full">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Inactive Items</p>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-1">{inactiveItems}</p>
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
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">Item </h2>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2 sm:gap-3">
          <Link to="/CreateItemForm">
            <button className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-300 w-full sm:w-auto">
              + Create New Item
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
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Item Name</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Code</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Description</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Category</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Unit Price</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Currency</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">UOM</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Vendor</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Status</th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{item.name}</td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{item.code}</td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{item.description || 'N/A'}</td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{item.category || 'N/A'}</td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{item.unitPrice}</td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{item.currency?.code || 'N/A'}</td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{item.uom?.code || 'N/A'}</td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-700">{item.preferredVendor?.name || 'N/A'}</td>
                <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm">
                  <span className={`px-2 sm:px-3 py-1 rounded-lg ${item.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
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
                      <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg w-32 sm:w-36 z-50 border border-gray-200">
                        <ul className="py-1">
                          <li 
                            onClick={() => { handleView(item); setOpenDropdown(null); }}
                            className="px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors"
                          >
                            View
                          </li>
                          <li 
                            onClick={() => { handleEdit(item); setOpenDropdown(null); }}
                            className="px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors"
                          >
                            Edit
                          </li>
                          <li 
                            onClick={() => handleDelete(item)}
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

export default ItemListing;
