import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Package } from 'lucide-react';
import api from '../../api';

export default function CreatePurchaseOrderForm() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    companyId: '',
    vendorId: '',
    lines: [
      {
        itemId: '',
        description: '',
        qty: '',
        price: ''
      }
    ]
  });

  const [companies, setCompanies] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (formData.companyId) {
      fetchVendorsByCompany(formData.companyId);
      setFormData(prev => ({ ...prev, vendorId: '' })); // Reset vendor when company changes
    } else {
      setVendors([]);
    }
  }, [formData.companyId]);

  const fetchDropdownData = async () => {
    try {
      setLoadingData(true);
      const [companiesRes, itemsRes] = await Promise.all([
        api.get('/directory/companies?all=true'),
        api.get('/directory/items?all=true')
      ]);
      setCompanies(companiesRes.data.data || companiesRes.data);
      setItems(itemsRes.data.data || itemsRes.data);
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
      setMessage({ type: 'error', text: 'Failed to load form data' });
    } finally {
      setLoadingData(false);
    }
  };

  const fetchVendorsByCompany = async (companyId) => {
    try {
      setLoadingVendors(true);
      const res = await api.get(`/directory/vendors?companyId=${companyId}&all=true`);
      setVendors(res.data.data || res.data);
    } catch (err) {
      console.error('Error fetching vendors:', err);
      setVendors([]);
    } finally {
      setLoadingVendors(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLineChange = (index, field, value) => {
    const updatedLines = [...formData.lines];
    updatedLines[index][field] = value;

    // Auto-fill item details when item is selected
    if (field === 'itemId' && value) {
      const selectedItem = items.find(item => item.id === value);
      if (selectedItem) {
        updatedLines[index].description = selectedItem.name;
        updatedLines[index].price = selectedItem.unitPrice || '';
      }
    }

    setFormData(prev => ({ ...prev, lines: updatedLines }));
  };

  const addLine = () => {
    setFormData(prev => ({
      ...prev,
      lines: [...prev.lines, { itemId: '', description: '', qty: '', price: '' }]
    }));
  };

  const removeLine = (index) => {
    if (formData.lines.length > 1) {
      setFormData(prev => ({
        ...prev,
        lines: prev.lines.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateLineTotal = (qty, price) => {
    const quantity = parseFloat(qty) || 0;
    const unitPrice = parseFloat(price) || 0;
    return quantity * unitPrice;
  };

  const calculateGrandTotal = () => {
    return formData.lines.reduce((total, line) => {
      return total + calculateLineTotal(line.qty, line.price);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validation
    if (!formData.companyId || !formData.vendorId) {
      setMessage({ type: 'error', text: 'Please select company and vendor' });
      setLoading(false);
      return;
    }

    if (formData.lines.some(line => !line.itemId || !line.qty || !line.price)) {
      setMessage({ type: 'error', text: 'Please fill all line item details' });
      setLoading(false);
      return;
    }

    try {
      const payload = {
        companyId: formData.companyId,
        vendorId: formData.vendorId,
        lines: formData.lines.map(line => ({
          itemId: line.itemId,
          description: line.description,
          qty: line.qty.toString(),
          price: parseFloat(line.price).toFixed(2)
        }))
      };

      await api.post('/po', payload);
      setMessage({ type: 'success', text: 'Purchase Order created successfully!' });
      
      // Reset form
      setTimeout(() => {
        navigate('/PurchaseCycle');
      }, 1500);
    } catch (err) {
      console.error('Error creating PO:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to create purchase order' 
      });
    } finally {
      setLoading(false);
    }
  };

  const grandTotal = calculateGrandTotal();

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Package className="text-blue-600" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Purchase Order</h2>
            <p className="text-sm text-gray-500">Add items and create a new purchase order</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm font-medium text-blue-900">Total Items</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{formData.lines.length}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="text-sm font-medium text-green-900">Total Quantity</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {formData.lines.reduce((sum, line) => sum + (parseFloat(line.qty) || 0), 0)}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <p className="text-sm font-medium text-purple-900">Grand Total</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">${grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl">
        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {message.text}
          </div>
        )}

        {/* Company and Vendor Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company <span className="text-red-500">*</span>
            </label>
            <select
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
              required
              disabled={loadingData}
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name} ({company.code})
                </option>
              ))}
            </select>
          </div>

          {/* Vendor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vendor <span className="text-red-500">*</span>
            </label>
            <select
              name="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
              required
              disabled={!formData.companyId || loadingVendors || loadingData}
            >
              <option value="">
                {!formData.companyId ? 'Select a company first' : loadingVendors ? 'Loading vendors...' : vendors.length === 0 ? 'No vendors available for this company' : 'Select Vendor'}
              </option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name} ({vendor.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Line Items</h3>
            <button
              type="button"
              onClick={addLine}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              <Plus size={16} />
              Add Line
            </button>
          </div>

          <div className="space-y-4">
            {formData.lines.map((line, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Item #{index + 1}</span>
                  {formData.lines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLine(index)}
                      className="text-red-600 hover:text-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Item Selection */}
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Item <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={line.itemId}
                      onChange={(e) => handleLineChange(index, 'itemId', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      required
                      disabled={loadingData}
                    >
                      <option value="">Select Item</option>
                      {items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} ({item.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={line.qty}
                      onChange={(e) => handleLineChange(index, 'qty', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                      min="1"
                      step="1"
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Unit Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={line.price}
                      onChange={(e) => handleLineChange(index, 'price', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={line.description}
                    onChange={(e) => handleLineChange(index, 'description', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Item description"
                  />
                </div>

                {/* Line Total */}
                <div className="mt-3 flex justify-end">
                  <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-600">Line Total: </span>
                    <span className="text-sm font-bold text-gray-900">
                      ${calculateLineTotal(line.qty, line.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grand Total */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Grand Total:</span>
            <span className="text-3xl font-bold text-blue-600">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || loadingData}
            className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Purchase Order'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/PurchaseCycle')}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
