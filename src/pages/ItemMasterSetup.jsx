import React, { useState } from 'react';

const ItemMasterSetup = () => {
  const [activeTab, setActiveTab] = useState('General Info');

  const tabs = [
    'General Info',
    'Classification',
    'Pricing & Costing',
    'Inventory Settings',
    'Procurement Info',
    'Sales Info',
    'Logistics Info',
  ];

  return (
    <div className="shadow-md rounded-2xl bg-gray-50 ">
      <div className="mx-auto ">
        {/* Header */}
        <div className="">
          <h1 className="text-3xl font-bold text-gray-800">Item Master Setup</h1>
          <p className="text-gray-500 mt-1">
            Configure and manage item details for Sales & Distribution ERP
          </p>
        </div>

<div className='border border-gray-200 p-3 mt-5'>
        {/* Tabs */}
        <div className="border-b border-gray-300 flex gap-2 px-8 py-3 bg-gray-50">
  {tabs.map((tab) => (
    <button
      key={tab}
      className={`px-4 py-2 text-sm font-medium rounded transition-all duration-200
        ${activeTab === tab
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:text-blue-600 hover:cursor-pointer hover:bg-blue-100'
        }`}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </button>
  ))}
</div>


        {/* Form Section */}
        <div className="p-8 space-y-6">
          {activeTab === 'General Info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Item Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ITM-001"
                    className="w-full border border-gray-300 cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Steel Bolt M8"
                    className="w-full border border-gray-300  cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="4"
                  placeholder="Enter item description..."
                  className="w-full border border-gray-300  cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Item Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border  border-gray-300 cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                    <option>Select type</option>
                    <option>Raw Material</option>
                    <option>Finished Goods</option>
                    <option>Service</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Base UOM <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border  border-gray-300 cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                    <option>Select UOM</option>
                    <option>KG</option>
                    <option>Piece</option>
                    <option>Liter</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300  cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Classification' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Item Group <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border  border-gray-300 cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                    <option>Select item group</option>
                    <option>Hardware</option>
                    <option>Electronics</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Item Category <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 cursor-pointer  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                    <option>Select category</option>
                    <option>Bolts</option>
                    <option>Nuts</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Product Line</label>
                  <select className="w-full border border-gray-300  cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                    <option>Select product line</option>
                    <option>Line A</option>
                    <option>Line B</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">HSN/SAC Code</label>
                  <input
                    type="text"
                    placeholder="e.g., 73181500"
                    className="w-full border  border-gray-300 cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Pricing & Costing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Standard Cost</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full border  border-gray-300 cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">List Price</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full border border-gray-300  cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 cursor-pointer  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - Pound Sterling</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Tax Category</label>
                <select className="w-full border  border-gray-300 cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                  <option>Select tax category</option>
                  <option>Category A</option>
                  <option>Category B</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'Inventory Settings' && (
            <div className="space-y-6">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Default Warehouse Location</label>
                <select className="w-full border cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                  <option>Select warehouse</option>
                  <option>Warehouse 1</option>
                  <option>Warehouse 2</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Min Stock Level</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border  cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Max Stock Level</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border cursor-pointer border-gray-300   rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Reorder Point</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full  cursor-pointer border border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium  text-gray-700 mb-1">Batch Tracking</label>
                  <div className="flex items-center">
                    <input type="checkbox cursor-pointer focus:ring focus:ring-blue-700 bborder border-gray-300  "  className="mr-2" />
                    <span>Enable batch/lot number tracking for this item</span>
                  </div>
                </div>
                <div>
                  <label className="block font-medium  text-gray-700 mb-1">Expiry Tracking</label>
                  <div className="flex items-center">
                    <input type="checkbox cursor-pointer focus:ring focus:ring-blue-700 border border-gray-300  " className="mr-2" />
                    <span>Track expiry dates for this item</span>
                  </div>
                </div>
                <div>
                  <label className="block font-medium  text-gray-700 mb-1">Serial Number Tracking</label>
                  <div className="flex items-center">
                    <input type="checkbox cursor-pointer focus:ring focus:ring-blue-700 border border-gray-300  " className="mr-2" />
                    <span>Enable unique serial number tracking</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Procurement Info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Default Vendor</label>
                  <select className="w-full border border-gray-300  cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                    <option>Select vendor</option>
                    <option>Vendor A</option>
                    <option>Vendor B</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Lead Time (Days)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Minimum Order Quantity (MOQ)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Purchase UOM</label>
                  <select className="w-full border cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                    <option>Select UOM</option>
                    <option>KG</option>
                    <option>Piece</option>
                    <option>Liter</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Sales Info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Sales UOM</label>
                  <select className="w-full border cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                    <option>Select UOM</option>
                    <option>KG</option>
                    <option>Piece</option>
                    <option>Liter</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Default Customer</label>
                  <select className="w-full border cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                    <option>Select customer</option>
                    <option>Customer A</option>
                    <option>Customer B</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Warranty Period (Months)</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                />
              </div>
            </div>
          )}

          {activeTab === 'Logistics Info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Weight (KG)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full border cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Volume (m³)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full border cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Dimensions (L×W×H m)</label>
                  <input
                    type="text"
                    placeholder="e.g., 10×20×30"
                    className="w-full border cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Preferred Shipping Method</label>
                <select className="w-full border cursor-pointer border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-700">
                  <option>Select shipping method</option>
                  <option>Air</option>
                  <option>Sea</option>
                  <option>Road</option>
                </select>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6 ">
            <button class="inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw h-4 w-4"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>Reset</button>
            <button class="inline-flex  bg-blue-600 text-white cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save h-4 w-4"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path><path d="M7 3v4a1 1 0 0 0 1 1h7"></path></svg>Save Item Master</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ItemMasterSetup;