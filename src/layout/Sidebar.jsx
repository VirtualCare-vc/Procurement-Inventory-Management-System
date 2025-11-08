import {
  Home,
  Building2,
  Users,
  Package,
  ShoppingCart,
  X,
  ChevronRight,
  Cog,
  Shell,
} from "lucide-react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`fixed lg:static z-50 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Logo + Close Button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center">
              <Shell className="text-blue-600" size={50} color="white"  />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">Virtual Care ERP</span>
          </div>
          <button
            className="lg:hidden text-white hover:bg-white/20 p-1 rounded-md transition"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Dashboard */}
          <div>
            {/* <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Main</h3>   */}
            {/* <ul className="space-y-1">
              <SidebarItem
                icon={<Home size={18} />}
                label="Dashboard"
                onClick={() => {
                  navigate("/dashboard");
                  setSidebarOpen(false);
                }}
                active={isActive("/dashboard")}
              />
            </ul> */}
          </div>

          {/* Management */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Management</h3>
            <ul className="space-y-1">
              <SidebarItem
                icon={<Users size={18} />}
                label="User Management"
                onClick={() => {
                  navigate("/UserListing");
                  setSidebarOpen(false);
                }}
                active={isActive("/UserListing")}
              />
              <SidebarItem
                icon={<Building2 size={18} />}
                label="Company Management"
                onClick={() => {
                  navigate("/CompanyListing");
                  setSidebarOpen(false);
                }}
                active={isActive("/CompanyListing")}
              />
              <SidebarItem
                icon={<Building2 size={18} />}
                label="Vendor Management"
                onClick={() => {
                  navigate("/VendorListing");
                  setSidebarOpen(false);
                }}
                active={isActive("/VendorListing")}
              />
              <SidebarItem
                icon={<Package size={18} />}
                label="Item Management"
                onClick={() => {
                  navigate("/ItemListing");
                  setSidebarOpen(false);
                }}
                active={isActive("/ItemListing")}
              />
            </ul>
          </div>

          {/* Operations */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Operations</h3>
            <ul className="space-y-1">
              <SidebarItem
                icon={<ShoppingCart size={18} />}
                label="Purchase Orders"
                onClick={() => {
                  navigate("/PurchaseCycle");
                  setSidebarOpen(false);
                }}
                active={isActive("/PurchaseCycle")}
              />
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// Enhanced SidebarItem with active state and smooth transitions
function SidebarItem({ icon, label, onClick, active }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`group flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer
          ${active 
            ? "bg-blue-50 text-blue-700 font-medium shadow-sm" 
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`}
      >
        <div className="flex items-center gap-3">
          <span className={`transition-colors ${active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`}>
            {icon}
          </span>
          <span className="text-sm truncate">{label}</span>
        </div>
        {active && (
          <ChevronRight size={16} className="text-blue-600" />
        )}
      </button>
    </li>
  );
}
