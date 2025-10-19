import React from "react";
import { Plus, Eye, Edit } from "lucide-react";

export default function PrincipalSetup() {
  const principals = [
    {
      name: "Global Brands",
      category: "Electronics",
      tags: ["Home Goods", "Apparel"],
    },
    {
      name: "AgroHarvest Solutions",
      category: "Grains",
      tags: ["Fertilizers", "Farm Equipment"],
    },
    {
      name: "Tech Innovations",
      category: "Software",
      tags: ["Hardware", "Consulting"],
    },
    {
      name: "Fashion Forward",
      category: "Women’s Wear",
      tags: ["Men’s Wear"],
    },
    {
      name: "Health Essentials",
      category: "Pharmaceuticals",
      tags: ["Medical Supplies"],
    },
    {
      name: "Artisan Crafts Studio",
      category: "Handicrafts",
      tags: ["Art Supplies"],
    },
    {
      name: "Future Mobility Co",
      category: "Electric Vehicles",
      tags: ["Charging Solutions"],
    },
    {
      name: "Green Living Solutions",
      category: "Eco-friendly Products",
      tags: ["Renewable Energy"],
    },
  ];

  return (
    <div className="font-semibold">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Principal Setup
        </h1>
        <button className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium rounded-lg bg-[#006FFF] text-white px-4 py-2 hover:bg-[#0055cc]">
          <Plus className="h-4 w-4" /> Add New Principal
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {principals.map((p, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-full bg-gray-100 mb-3 flex items-center justify-center">
              <span className="text-gray-400 text-2xl">🎯</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {p.name}
            </h2>

            <span className="inline-block bg-[#006FFF] text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
              {p.category}
            </span>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {p.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium border border-gray-300 rounded-full text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-1 cursor-pointer px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                <Eye className="h-4 w-4" /> View Details
              </button>
              <button className="flex items-center gap-1 cursor-pointer px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                <Edit className="h-4 w-4" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
