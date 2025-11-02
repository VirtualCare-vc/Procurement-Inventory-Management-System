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
import ItemProductSetup from "../pages/ItemProductSetup";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 inset-y-0 left-0 w-64 bg-gray-50 border-r border-gray-200 flex flex-col transform 
          transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
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

          {/* CORE SETUP */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              CORE SETUP
            </h3>
            <ul className="space-y-1">
              {/* Matches /signup */}
               {/* <SidebarItem
                icon={<Home size={16} />}
                label="Sign Up & Onboarding"
                onClick={() => navigate("/signup")}
              /> */}
              <SidebarItem
                icon={<Building2 size={16} />}
                label="Company Setup"
                onClick={() => navigate("/company-setup")}
              />
              <SidebarItem
                icon={<Users size={16} />}
                label="Customer Setup"
                onClick={() => navigate("/customer-setup")}
              />
              <SidebarItem
                icon={<Package size={16} />}
                label="Item/Product Setup"
                onClick={() => navigate("/ItemProductSetup")}
              />
              <SidebarItem
                icon={<Warehouse size={16} />}
                label="Warehouse Setup"
                onClick={() => navigate("/warehouse-setup")}
              />
              <SidebarItem
                icon={<Layers size={16} />}
                label="Item Master Setup"
                onClick={() => navigate("/ItemMasterSetup")}
              />
            </ul>
          </div>

          {/* CUSTOM FORM */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">CUSTOM FORM</h3>
            <ul className="space-y-1">
              <SidebarItem
                icon={<Users size={16} />}
                label="Tenant User Setup"
                onClick={() => navigate("/TenantUserForm")}
              />
               {/* <SidebarItem
                icon={<Users size={16} />}
                label="Vendors Setup"
                onClick={() => navigate("/VendorsForm")}
              /> */}
              <SidebarItem
                icon={<Users size={16} />}
                label="Assign User to Vendor"
                onClick={() => navigate("/AssignUserToVendorForm")}
              />
              <SidebarItem
                icon={<Building2 size={16} />}
                label="Create Vendor"
                onClick={() => navigate("/CreateVendorForm")}
              />
              <SidebarItem
                icon={<Building2 size={16} />}
                label="Create Company"
                onClick={() => navigate("/CreateCompanyForm")}
              />
              <SidebarItem
                icon={<Package size={16} />}
                label="Create Item"
                onClick={() => navigate("/CreateItemForm")}
              />
            </ul>
          </div>

          {/* FINANCIAL SETUP */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              FINANCIAL SETUP
            </h3>
            <ul className="space-y-1">
              <SidebarItem
                icon={<Building2 size={16} />}
                label="Principal Setup"
                onClick={() => navigate("/PrincipalSetup")}
              />
              {/* Commented out: no matching route */}
              {/* <SidebarItem icon={<CreditCard size={16} />} label="Bank & Payment Mode" /> */}
              <SidebarItem
                icon={<Percent size={16} />}
                label="Trade Offers & Discounts"
                onClick={() => navigate("/TradeOffersSetup")}
              />
              {/* <SidebarItem icon={<Calculator size={16} />} label="Tax Setup" /> */}
            </ul>
          </div>

          {/* OPERATIONS SETUP */}
          {/* Commented out: no matching routes yet */}
          {/*
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              OPERATIONS SETUP
            </h3>
            <ul className="space-y-1">
              <SidebarItem icon={<DollarSign size={16} />} label="Sales Team Setup" />
              <SidebarItem icon={<UserCog size={16} />} label="Employee Setup" />
              <SidebarItem icon={<Route size={16} />} label="Route Plan Setup" />
            </ul>
          </div>
          */}

          {/* TRANSACTIONS */}
          {/* Commented out: no matching routes yet */}
          {/*
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              TRANSACTIONS
            </h3>
            <ul className="space-y-1">
              <SidebarItem icon={<FileText size={16} />} label="Billing & Invoicing" />
              <SidebarItem icon={<Layers size={16} />} label="Inventory Management" />
              <SidebarItem icon={<ClipboardList size={16} />} label="Expense and Accounting" />
              <SidebarItem icon={<Calculator size={16} />} label="Day-End Reconciliation" />
            </ul>
          </div>
          */}
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
          ${
            active
              ? "bg-gray-100 text-gray-900 font-medium"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }`}
      >
        {icon}
        <span className="truncate">{label}</span>
      </button>
    </li>
  );
}