import React from "react";
import { Plus, MoreVertical, MoreHorizontal } from "lucide-react";

export default function WarehouseSetup() {
  // ---------- Warehouse Data ----------
  const warehouses = [
    {
      id: "wh-1",
      name: "Central Distribution Hub",
      address: "123 Main St, Anytown, USA 12345",
      products: 250,
      unitsInStock: 15000,
      stockLocations: [
        {
          id: "sl-1",
          name: "Aisle 1",
          tag: "Electronics",
          stock: 2500,
          reorder: 500,
        },
        {
          id: "sl-2",
          name: "Bulk Storage",
          tag: "Building Materials",
          stock: 7000,
          reorder: 1000,
        },
        {
          id: "sl-3",
          name: "Picking Area",
          tag: "Office Supplies",
          stock: 1500,
          reorder: 300,
        },
      ],
    },
    {
      id: "wh-2",
      name: "Regional Depot - West",
      address: "456 Oak Ave, Westburg, USA 67890",
      products: 120,
      unitsInStock: 8000,
      stockLocations: [
        {
          id: "sl-4",
          name: "Section A",
          tag: "Apparel",
          stock: 3000,
          reorder: 600,
        },
        {
          id: "sl-5",
          name: "Cold Storage",
          tag: "Perishables",
          stock: 1000,
          reorder: 200,
        },
        {
          id: "sl-6",
          name: "Receiving Dock",
          tag: "Sporting Goods",
          stock: 1500,
          reorder: 300,
        },
      ],
    },
    {
      id: "wh-3",
      name: "City Fulfillment Center",
      address: "789 Pine Ln, Metropolis, USA 10112",
      products: 80,
      unitsInStock: 5000,
      stockLocations: [
        {
          id: "sl-7",
          name: "Returns Section",
          tag: "Books",
          stock: 800,
          reorder: 150,
        },
        {
          id: "sl-8",
          name: "Small Items",
          tag: "Cosmetics",
          stock: 2000,
          reorder: 400,
        },
      ],
    },
  ];

  // ---------- Helper JSX ----------
  const Stat = ({ icon, value }) => (
    <div className="inline-flex items-center gap-2 text-gray-600 text-sm sm:text-base">
      <div className="h-4 w-4 text-gray-500">{icon}</div>
      <span className="font-medium">{value}</span>
    </div>
  );

  const StockLocationCard = ({ location }) => (
    <div
      className="rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-shadow duration-200 h-32"
      style={{ borderLeft: "4px solid hsl(214 100% 50%)" }}
    >
      <div className="p-4 flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-md truncate">{location.name}</h4>
          <p className="px-2 py-0.5 font-semibold text-xs rounded-full w-fit border border-gray-300 text-gray-700 mt-2">
            {location.tag}
          </p>
          <div className="flex gap-8 lg:gap-48 text-sm mt-3 text-gray-500">
            <div>
              <p className="tracking-wide">Stock:</p>
              <p className="font-semibold text-gray-800">
                {location.stock.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="tracking-wide">Reorder:</p>
              <p className="font-semibold text-gray-800">
                {location.reorder.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <button className="cursor-pointer hover:bg-blue-100 p-1 rounded-full flex-shrink-0">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const AddStockLocationCard = () => (
    <button className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 w-full hover:bg-gray-50 transition">
      <Plus className="h-4 w-4 text-gray-500" />
      <span className="font-medium text-gray-600">Add Stock Location</span>
    </button>
  );

  // ---------- Warehouse Card ----------
  const WarehouseCard = ({ warehouse }) => (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0"
              style={{ color: "hsl(214 100% 50%)" }}
            >
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
              <path d="M10 6h4" />
              <path d="M10 10h4" />
              <path d="M10 14h4" />
              <path d="M10 18h4" />
            </svg>
            <div>
              <p className="font-semibold text-base sm:text-lg text-gray-800">
                {warehouse.name}
              </p>
              <div className="flex flex-wrap items-center gap-1 text-gray-600 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-xs sm:text-sm font-light text-black truncate">
                  {warehouse.address}
                </span>
              </div>
            </div>
          </div>

          <button className="cursor-pointer hover:bg-blue-100 p-1 rounded-full self-end sm:self-auto">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-start sm:justify-between gap-3 sm:gap-4 mt-4">
          <Stat
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "hsl(214 100% 50%)" }}
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            }
            value={`${warehouse.stockLocations.length} Stock Locations`}
          />
          <Stat
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "hsl(214 100% 50%)" }}
              >
                <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                <path d="M12 22V12"></path>
                <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path>
              </svg>
            }
            value={`${warehouse.products} Products`}
          />
          <Stat
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "hsl(214 100% 50%)" }}
              >
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                <path d="M10 6h4"></path>
                <path d="M10 10h4"></path>
                <path d="M10 14h4"></path>
                <path d="M10 18h4"></path>
              </svg>
            }
            value={`${warehouse.unitsInStock.toLocaleString()} Units in Stock`}
          />
          <p></p>
        </div>
      </div>

      {/* Stock Locations */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <h3 className="font-medium text-gray-700 text-base">
            Stock Locations ({warehouse.stockLocations.length})
          </h3>
          <button className="inline-flex items-center gap-2 text-sm rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-gray-700 font-medium hover:bg-gray-50 self-start sm:self-auto">
            <Plus className="h-4 w-4" /> Add Stock Location
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {warehouse.stockLocations.map((loc) => (
            <StockLocationCard key={loc.id} location={loc} />
          ))}
          <AddStockLocationCard />
        </div>
      </div>
    </div>
  );

  // ---------- Main UI ----------
  return (
    <div className="  ">
      <div className="flex justify-between">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Warehouse & Stock Location Setup
            </h1>
            <p className="text-gray-500 mt-1 mb-5 text-sm sm:text-base">
              Define and manage your physical storage infrastructure, including
              warehouses and their stock locations.
            </p>
            <p className="text-xl font-semibold text-gray-900">
              Your Warehouses
            </p>
          </div>
        </div>
        <div>
          <button className="inline-flex items-center gap-2 text-sm rounded-xl border border-gray-200 bg-[#006FFF] text-white px-5 py-2.5 font-medium hover:bg-[#0055cc] self-start sm:self-auto">
            <Plus className="h-5 w-5 p-0.5" /> Add New Warehouse
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {warehouses.map((wh) => (
          <WarehouseCard key={wh.id} warehouse={wh} />
        ))}
      </div>
    </div>
  );
}
