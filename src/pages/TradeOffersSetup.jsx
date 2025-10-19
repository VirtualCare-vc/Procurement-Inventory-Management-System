import React from "react";
import { Plus, Eye, Calendar } from "lucide-react";

export default function TradeOffersSetup() {
  const summary = [
    { title: "Active Offers", value: 12, sub: "+2 this week", color: "text-green-600" },
    { title: "Upcoming Offers", value: 5, sub: "Ready for launch", color: "text-blue-600" },
    { title: "Expiring Soon", value: 3, sub: "Ending in 7 days", color: "text-red-600" },
    { title: "Draft Offers", value: 2, sub: "Work in progress", color: "text-gray-500" },
  ];

  const offers = [
    {
      title: "Summer Seasonal Sale",
      type: ["Percentage Discount", "Claimable"],
      status: "Active",
      validUntil: "Aug 31, 2024",
      appliedTo: "All Customer Types",
      description: "15% off on summer collection items",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      title: "Buy 2 Get 1 Free - Selected Products",
      type: ["Buy X Get Y", "Unclaimable"],
      status: "Active",
      validUntil: "Jul 15, 2024",
      appliedTo: "Product Category: Beverages",
      description: "Buy 2 items and get 1 free from selected products",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      title: "New Customer Welcome Bonus",
      type: ["Fixed Amount Discount", "Claimable"],
      status: "Upcoming",
      validUntil: "Sep 1, 2024",
      appliedTo: "New Customer Segment",
      description: "$20 OFF first order for new customers",
      statusColor: "bg-blue-100 text-blue-600",
    },
    {
      title: "Regional Clearance - West Region",
      type: ["Percentage Discount", "Unclaimable"],
      status: "Expiring Soon",
      validUntil: "Jun 30, 2024",
      appliedTo: "Region: West",
      description: "25% OFF on select items for west region clearance",
      statusColor: "bg-red-100 text-red-600",
    },
    {
      title: "Loyalty Program Tier 1 Discount",
      type: ["Percentage Discount", "Claimable"],
      status: "Active",
      validUntil: "Ongoing",
      appliedTo: "Loyalty Tier 1 Customers",
      description: "5% discount for tier 1 loyalty members",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      title: "Holiday Special - Early Bird",
      type: ["Cash Discount", "Unclaimable"],
      status: "Draft",
      validUntil: "Nov 1 - Nov 30, 2024",
      appliedTo: "All Orders > $500",
      description: "$50 instant cash discount for early holiday orders",
      statusColor: "bg-gray-100 text-gray-600",
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Trade Offers & Discounts Setup
        </h1>
        <button className="inline-flex items-center gap-2 text-sm font-medium rounded-lg bg-[#006FFF] text-white px-4 py-2 hover:bg-[#0055cc]">
          <Plus className="h-4 w-4" /> Create New Offer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summary.map((s, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
          >
            <p className="text-gray-500 text-sm mb-1">{s.title}</p>
            <h2 className="text-3xl font-semibold text-gray-800">{s.value}</h2>
            <p className={`text-xs font-medium mt-1 ${s.color}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {offers.map((offer, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {offer.title}
              </h3>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${offer.statusColor}`}
              >
                {offer.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {offer.type.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${
                    tag === "Claimable"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <p>
                <span className="font-medium">Valid until:</span> {offer.validUntil}
              </p>
              <p>
                <span className="font-medium">Applied to:</span> {offer.appliedTo}
              </p>
              <p>
                <span className="font-medium">Description:</span> {offer.description}
              </p>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                <Eye className="h-4 w-4" /> View
              </button>
              {offer.status === "Expiring Soon" && (
                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  <Calendar className="h-4 w-4" /> Extend
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
