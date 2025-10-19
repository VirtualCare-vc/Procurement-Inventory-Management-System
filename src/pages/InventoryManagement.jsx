import React from "react";
import {
  Plus,
  TrendingUp,
  Package,
  AlertTriangle,
  Building2,
} from "lucide-react";

export default function InventoryManagement() {
  const stats = [
    {
      title: "Total Stock Value",
      value: "$16,915.00",
      subtitle: "Based on current unit costs",
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "Items in Stock",
      value: "215",
      subtitle: "Across all locations",
      icon: <Package className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "Low Stock Alerts",
      value: "3",
      subtitle: "Items below reorder level",
      icon: <AlertTriangle className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "Total Warehouses",
      value: "4",
      subtitle: "Managed locations",
      icon: <Building2 className="h-5 w-5 text-blue-600" />,
    },
  ];

  const items = [
    {
      name: "Premium Office Chair",
      sku: "OC-PREM-001",
      stock: 50,
      cost: "$150.00",
      value: "$7500.00",
      location: "Warehouse A",
      batch: "BCH001-2023",
      expiry: "N/A",
    },
    {
      name: "Wireless Ergonomic Mouse",
      sku: "MS-WRL-ER-005",
      stock: 15,
      cost: "$25.00",
      value: "$375.00",
      location: "Branch Office 1",
      batch: "BCH002-2023",
      expiry: "N/A",
    },
    {
      name: "4K UHD Monitor 27 Inch",
      sku: "MN-4K27-010",
      stock: 22,
      cost: "$350.00",
      value: "$7700.00",
      location: "Warehouse B",
      batch: "BCH003-2023",
      expiry: "N/A",
    },
    {
      name: "Standard Keyboard",
      sku: "KB-STD-101-BLK",
      stock: 8,
      cost: "$30.00",
      value: "$240.00",
      location: "Warehouse A",
      batch: "BCH004-2023",
      expiry: "N/A",
    },
    {
      name: "Thermal Printer Labels (Pack of 1000)",
      sku: "LB-THRM-1K",
      stock: 120,
      cost: "$10.00",
      value: "$1200.00",
      location: "Warehouse C",
      batch: "BCH005-2023",
      expiry: "12/2025",
    },
  ];

  const locations = [
    { name: "Warehouse A", city: "New York" },
    { name: "Warehouse B", city: "Los Angeles" },
    { name: "Warehouse C", city: "Chicago" },
    { name: "Branch Office 1", city: "Houston" },
  ];

  const lowStock = [
    { name: "Wireless Ergonomic Mouse", current: 15, total: 20 },
    { name: "Standard Keyboard", current: 8, total: 10 },
    { name: "High-Capacity Ink Cartridge", current: 3, total: 5 },
  ];

  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Inventory Management
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{s.title}</p>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {s.value}
                </h3>
              </div>
              {s.icon}
            </div>
            <p className="text-xs text-gray-500 mt-2">{s.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 h-fit rounded-2xl  p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Inventory Items
            </h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search items..."
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
              />
              <button className=" cursor-pointer inline-flex items-center gap-2 text-sm font-medium rounded-lg bg-[#006FFF] text-white px-3 py-1.5 hover:bg-[#0055cc]">
                <Plus className="h-4 w-4" /> Add New Item
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600">
                  <th className="px-4 py-2">Item Name</th>
                  <th className="px-4 py-2">SKU</th>
                  <th className="px-4 py-2">Stock</th>
                  <th className="px-4 py-2">Unit Cost</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Batch</th>
                  <th className="px-4 py-2">Expiry</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-4 py-2">{item.sku}</td>
                    <td className="px-4 py-2">{item.stock}</td>
                    <td className="px-4 py-2">{item.cost}</td>
                    <td className="px-4 py-2">{item.value}</td>
                    <td className="px-4 py-2">{item.location}</td>
                    <td className="px-4 py-2">{item.batch}</td>
                    <td className="px-4 py-2">{item.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Stock Operations
            </h2>

            <form className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 text-gray-600">
                  Operation Type
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-1.5">
                  <option>Stock Receipt</option>
                  <option>Stock Issue</option>
                  <option>Adjustment</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-600">Item Name</label>
                <input
                  type="text"
                  placeholder="Search or select item"
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600">Quantity</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5"
                  defaultValue="1"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600">Location</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-1.5">
                  <option>Warehouse A</option>
                  <option>Warehouse B</option>
                  <option>Warehouse C</option>
                </select>
              </div>

              <button
                type="button"
                className="cursor-pointer w-full bg-[#006FFF] text-white rounded-lg py-2 font-medium hover:bg-[#0055cc]"
              >
                Record Stock Change
              </button>
            </form>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Low Stock Alerts
            </h2>

            <div className="space-y-4">
              {lowStock.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm text-gray-700 mb-1">
                    <span>{item.name}</span>
                    <span
                      className={`font-medium bg-orange-700 p-1 px-2 rounded-lg text-sm text-white ${
                        item.current / item.total <= 0.3
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {item.current}/{item.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#006FFF] h-2 rounded-full"
                      style={{
                        width: `${(item.current / item.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl text-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-semibold text-gray-900">
                Warehouses & Branches
              </h1>
              <button className="inline-flex items-center cursor-pointer gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Plus className="h-4 w-4" /> Add Location
              </button>
            </div>

            <div className="space-y-4">
              {locations.map((loc, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-gray-700">
                      {loc.name}
                    </h2>
                    <p className="text-sm text-gray-500">{loc.city}</p>
                  </div>
                  <button class=" cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-square-pen h-4 w-4"
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
