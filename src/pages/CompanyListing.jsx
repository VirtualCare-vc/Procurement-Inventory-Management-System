import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const CompanyListing = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/directory/companies?page=${page}&limit=${limit}`);
      setCompanies(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch companies');
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalCompanies = meta.total;
  const activeCompanies = companies.filter(company => company.isActive).length;
  const inactiveCompanies = totalCompanies - activeCompanies;
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">
          <p className="font-medium">Error loading companies</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
      <div className="flex justify-between gap-12">
        {/* Total Companies */}
        <div className="bg-gray-50 rounded-xl p-6 w-full flex items-center justify-between border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-700">Total Companies</p>
            <p className="text-3xl font-bold text-black mt-1">{totalCompanies}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>

        {/* Active Companies */}
        <div className="bg-gray-50 rounded-xl p-6 w-full flex items-center justify-between border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-700">Active Companies</p>
            <p className="text-3xl font-bold text-black mt-1">{activeCompanies}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Inactive Companies */}
        <div className="bg-gray-50 rounded-xl p-6 w-full flex items-center justify-between border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-700">Inactive Companies</p>
            <p className="text-3xl font-bold text-black mt-1">{inactiveCompanies}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Companies</h2>
        <div className="flex justify-center gap-3">
          {/* Link to CreateVendorForm */}
          <Link to="/CreateCompanyForm">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300">
              + Create Company
            </button>
          </Link>

          
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-auto">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Company Name</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Code</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Country</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Created At</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-sm text-gray-700">{company.name}</td>
                <td className="py-3 px-6 text-sm text-gray-700">{company.code}</td>
                <td className="py-3 px-6 text-sm text-gray-700">{company.description || 'N/A'}</td>
                <td className="py-3 px-6 text-sm text-gray-700">{company.country || 'N/A'}</td>
                <td className="py-3 px-6 text-sm">
                  <span className={`px-3 py-1 rounded-lg ${company.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {company.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">{new Date(company.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
      )}
    </div>
  );
}

export default CompanyListing;
