import {
  Home,
  Building2,
  Users,
  Package,
  Warehouse,
  CreditCard,
  Percent,
  Calculator,
  UserCog,
  Route,
  DollarSign,
  ClipboardList,
  FileText,
  Layers,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemProductSetup from "../pages/ItemProductSetup";
// import AssignUserToVendorForm from "../pages/Forms/AssignUserToVendorForm";
import AssignUserToVendorForm from "../pages/Forms/AssignUserToVendorForm";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  // State to manage dropdown visibility
  const [vendorOpen, setVendorOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`fixed lg:static z-50 inset-y-0 left-0 w-64 bg-gray-50 border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Logo + Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <span className="text-blue-600 text-xl font-semibold">DistroFlow</span>
          <button
            className="lg:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-gray-700 text-sm">

          {/* CUSTOM FORM */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-500 mb-2">ERP Solution</h3>
            <ul className="space-y-1">
              <SidebarItem
                icon={<Users size={16} />}
                label="User Mangement"
                onClick={() => navigate("/UserListing")}
              />
              <SidebarItem
                icon={<Users size={16} />}
                label="Company Mangement"
                onClick={() => navigate("/CompanyListing")}
              />
              {/* <SidebarItem
                icon={<Users size={16} />}
                label="Assign User to Vendor"
                onClick={() => navigate("/AssignUserToVendorForm")}
              /> */}

              <SidebarItem
                icon={<Users size={16} />}
                label="Vendor Mangement"
                onClick={() => navigate("/VendorListing")}
              />
              
<SidebarItem
                icon={<Users size={16} />}
                label="Item Mangement"
                onClick={() => navigate("/ItemListing")}
              />

<SidebarItem
                icon={<Users size={16} />}
                label="Purchase Cycle"
                onClick={() => navigate("/PurchaseCycle")}
              />

              
              {/* Item Dropdown */}
              
            </ul>
          </div>

        </div>
      </aside>
    </>
  );
}

// Updated SidebarItem with cursor-pointer
function SidebarItem({ icon, label, onClick, active }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left transition cursor-pointer
          ${active ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
      >
        {icon}
        <span className="truncate">{label}</span>
      </button>
    </li>
  );
}
