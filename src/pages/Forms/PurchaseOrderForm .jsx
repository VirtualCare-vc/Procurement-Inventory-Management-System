import React, { useState, useEffect } from 'react';
import InvoiceEditor from './InvoiceEditor';
import api from '../../api';

const PurchaseOrderForm = () => {
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState('A00001');
  const [purchaseOrderDate, setPurchaseOrderDate] = useState('Nov 05, 2025');
  const [businessName, setBusinessName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [currency, setCurrency] = useState('Pakistani Rupee(PKR, PKRs)');
  const [businessLogo, setBusinessLogo] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingVendors, setLoadingVendors] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (companyId) {
      fetchVendors(companyId);
      setVendorId(''); // Reset vendor selection when company changes
    } else {
      setVendors([]);
      setVendorId('');
    }
  }, [companyId]);

  const fetchCompanies = async () => {
    try {
      setLoadingCompanies(true);
      const res = await api.get('/directory/companies?all=true');
      setCompanies(res.data.data || res.data);
    } catch (err) {
      console.error('Error fetching companies:', err);
    } finally {
      setLoadingCompanies(false);
    }
  };

  const fetchVendors = async (selectedCompanyId) => {
    try {
      setLoadingVendors(true);
      const res = await api.get(`/directory/vendors?companyId=${selectedCompanyId}&all=true`);
      setVendors(res.data.data || res.data);
    } catch (err) {
      console.error('Error fetching vendors:', err);
      setVendors([]);
    } finally {
      setLoadingVendors(false);
    }
  };

  // Handle business logo upload
  const handleLogoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setBusinessLogo(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Purchase Order</h1>
      </div>

      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Left Section */}
        <div className="space-y-4 w-[60%]">
          <div>
            <label htmlFor="purchaseOrderNumber" className="block text-sm font-medium text-gray-700">Purchase Order No:</label>
            <input
              id="purchaseOrderNumber"
              type="text"
              value={purchaseOrderNumber}
              onChange={(e) => setPurchaseOrderNumber(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="purchaseOrderDate" className="block text-sm font-medium text-gray-700">Purchase Order Date:</label>
            <input
              id="purchaseOrderDate"
              type="text"
              value={purchaseOrderDate}
              onChange={(e) => setPurchaseOrderDate(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button className="text-blue-600 text-sm">+ Add Custom Fields</button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-end w-full md:w-[250px] h-[100px] bg-gray-50 items-center">
          <label htmlFor="business-logo" className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-2 cursor-pointer w-full text-center">
<svg className='w-14 h-14' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM224 176C250.5 176 272 197.5 272 224C272 250.5 250.5 272 224 272C197.5 272 176 250.5 176 224C176 197.5 197.5 176 224 176zM368 288C376.4 288 384.1 292.4 388.5 299.5L476.5 443.5C481 450.9 481.2 460.2 477 467.8C472.8 475.4 464.7 480 456 480L184 480C175.1 480 166.8 475 162.7 467.1C158.6 459.2 159.2 449.6 164.3 442.3L220.3 362.3C224.8 355.9 232.1 352.1 240 352.1C247.9 352.1 255.2 355.9 259.7 362.3L286.1 400.1L347.5 299.6C351.9 292.5 359.6 288.1 368 288.1z"/></svg>            <span className="block text-gray-600">Add Business Logo</span>
            <small className="block text-sm text-gray-500">Resolution up to 1080x1080px. PNG or JPEG file.</small>
            <input 
              type="file" 
              id="business-logo" 
              className="hidden" 
              accept="image/png, image/jpeg" 
              onChange={handleLogoChange} 
            />
          </label>
          {businessLogo && <img src={businessLogo} alt="Business Logo" className="mt-2 w-20 h-20 object-cover rounded-full" />}
        </div>
      </div>

      <div className="flex justify-center gap-10">
        {/* Order By Section */}
        <div className="mb-6 w-full md:w-1/2 p-6 bg-gray-50 rounded-xl ">
          <h2 className="text-xl font-semibold mb-2">Order By</h2>
          <h3 className="text-lg font-medium mb-4">Your Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="companyId" className="block text-sm font-medium text-gray-700">
                Select Company: <span className="text-red-500">*</span>
              </label>
              <select
                id="companyId"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
                disabled={loadingCompanies}
              >
                <option value="">{loadingCompanies ? 'Loading companies...' : 'Select Company'}</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name} ({company.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Your Business Name:</label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Your Business Name (required)"
              />
            </div>
            {/* Country Field */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country:</label>
              <select
                id="country"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pakistan">Pakistan</option>
              </select>
            </div>
            {/* Other Fields... */}
          </div>
        </div>

        {/* Order To Section */}
        <div className="mb-6 w-full md:w-1/2 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Order To</h2>
          <h3 className="text-lg font-medium mb-4">Vendor's Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="vendorId" className="block text-sm font-medium text-gray-700">
                Select Vendor: <span className="text-red-500">*</span>
              </label>
              <select
                id="vendorId"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
                disabled={!companyId || loadingVendors}
              >
                <option value="">
                  {!companyId ? 'Select a company first' : loadingVendors ? 'Loading vendors...' : vendors.length === 0 ? 'No vendors available for this company' : 'Select Vendor'}
                </option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name} ({vendor.code}) - {vendor.email}
                  </option>
                ))}
              </select>
            </div>
            {/* Country Field */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country:</label>
              <select
                id="country"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pakistan">Pakistan</option>
              </select>
            </div>
            {/* Other Fields... */}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input type="checkbox" />
          <label className="text-sm text-gray-700">Add Shipping Details</label>
        </div>
      </div>

      <InvoiceEditor />
    </div>
  );
};

export default PurchaseOrderForm;
