import React, { useState } from "react";

const InvoiceEditor = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      itemName: '',
      description: '',
      quantity: 1,
      rate: 0,
      taxRate: 0,
      discount: 0
    }
  ]);

  const [currency, setCurrency] = useState('PKR');
  const [showDiscount, setShowDiscount] = useState(false);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);

  // Add new item row
  const addNewItem = () => {
    const newItem = {
      id: items.length + 1,
      itemName: '',
      description: '',
      quantity: 1,
      rate: 0,
      taxRate: 0,
      discount: 0
    };
    setItems([...items, newItem]);
  };

  // Remove item row
  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Update item field
  const updateItem = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Calculate item amount
  const calculateItemAmount = (item) => {
    return item.quantity * item.rate;
  };

  // Calculate item tax
  const calculateItemTax = (item) => {
    const amount = calculateItemAmount(item);
    return (amount * item.taxRate) / 100;
  };

  // Calculate item total
  const calculateItemTotal = (item) => {
    const amount = calculateItemAmount(item);
    const tax = calculateItemTax(item);
    const discount = showDiscount ? (amount * item.discount) / 100 : 0;
    return amount + tax - discount;
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + calculateItemAmount(item), 0);
  };

  // Calculate total tax
  const calculateTotalTax = () => {
    return items.reduce((sum, item) => sum + calculateItemTax(item), 0);
  };

  // Calculate total discount
  const calculateTotalDiscountAmount = () => {
    if (showDiscount) {
      const itemDiscounts = items.reduce((sum, item) => {
        const amount = calculateItemAmount(item);
        return sum + (amount * item.discount) / 100;
      }, 0);
      return itemDiscounts + totalDiscount;
    }
    return totalDiscount;
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTotalTax();
    const discount = calculateTotalDiscountAmount();
    return subtotal + tax - discount + additionalCharges;
  };

  return (
    <div className="mt-8">
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-blue-600 font-medium cursor-pointer border border-blue-500 rounded-lg px-4 py-2 bg-white hover:bg-blue-50 transition-colors">
              <span className="text-base">%</span>
              Configure Tax
            </button>

            <div className="relative">
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="cursor-pointer flex items-center text-gray-700 font-medium border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PKR">Pakistani Rupee (PKR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-8">#</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[200px]">Item Details</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold w-24">Quantity</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold w-32">Rate</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold w-24">Tax %</th>
                  {showDiscount && <th className="px-4 py-3 text-center text-sm font-semibold w-24">Disc %</th>}
                  <th className="px-4 py-3 text-right text-sm font-semibold w-32">Amount</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold w-32">Tax</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold w-32">Total</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold w-16">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">{index + 1}</td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Item name"
                        value={item.itemName}
                        onChange={(e) => updateItem(item.id, 'itemName', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                      />
                      <input
                        type="text"
                        placeholder="Description (optional)"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 1)}
                        className="w-full px-2 py-1 text-sm text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-sm text-right border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={item.taxRate}
                        onChange={(e) => updateItem(item.id, 'taxRate', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-sm text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    {showDiscount && (
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={item.discount}
                          onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                    )}
                    <td className="px-4 py-3 text-sm text-right text-gray-700 font-medium">
                      {currency} {calculateItemAmount(item).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">
                      {currency} {calculateItemTax(item).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900 font-semibold">
                      {currency} {calculateItemTotal(item).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Add New Line Button */}
          <div className="bg-gray-50 border-t border-gray-300 px-4 py-3 text-center">
            <button 
              onClick={addNewItem}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add New Line</span>
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="flex justify-end">
          <div className="w-full max-w-md space-y-4">
            {/* Calculations */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-semibold text-gray-900">{currency} {calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Tax:</span>
                <span className="font-semibold text-gray-900">{currency} {calculateTotalTax().toFixed(2)}</span>
              </div>
              {(showDiscount || totalDiscount > 0) && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">Discount:</span>
                  <span className="font-semibold text-red-600">- {currency} {calculateTotalDiscountAmount().toFixed(2)}</span>
                </div>
              )}
              {additionalCharges > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">Additional Charges:</span>
                  <span className="font-semibold text-gray-900">{currency} {additionalCharges.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Grand Total:</span>
                <span className="text-xl font-bold text-blue-600">{currency} {calculateGrandTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button 
                onClick={() => setShowDiscount(!showDiscount)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>{showDiscount ? 'Hide' : 'Give'} Item Wise Discount</span>
              </button>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Give Discount on Total</span>
                </button>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={totalDiscount}
                  onChange={(e) => setTotalDiscount(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-24 px-2 py-1 text-sm text-right border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Additional Charges</span>
                </button>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={additionalCharges}
                  onChange={(e) => setAdditionalCharges(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-24 px-2 py-1 text-sm text-right border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Terms, Notes, Attachments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <button className="flex items-center justify-center gap-2 bg-white text-gray-700 font-medium border border-dashed border-blue-300 rounded-lg py-4 hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Add Terms & Conditions</span>
          </button>

          <button className="flex items-center justify-center gap-2 bg-white text-gray-700 font-medium border border-dashed border-blue-300 rounded-lg py-4 hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Add Notes</span>
          </button>

          <button className="flex items-center justify-center gap-2 bg-white text-gray-700 font-medium border border-dashed border-blue-300 rounded-lg py-4 hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span>Add Attachments</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceEditor;
