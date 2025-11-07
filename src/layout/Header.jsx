import { Menu, Search, Bell, Settings } from "lucide-react";
import React, { useState } from "react";

export default function Header({ setSidebarOpen }) {
  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);



  const token = localStorage.getItem("token");
  console.log("Token before request:", token);


  const handleLogout = () => {
    localStorage.removeItem('token'); 
    console.log(token)

    window.location.href = '/login'; 
  };

  const handleProfileRedirect = () => {
    window.location.href = '/profile'; 
  };

  const handleSettingsRedirect = () => {
    window.location.href = '/settings'; 
  };

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar */}
        <div className="hidden sm:block relative w-72 md:w-[400px]">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right: Icons + User */}
      <div className="flex items-center gap-4 sm:gap-6 text-gray-700">
        <button className="hover:text-gray-900">
          <Bell size={18} />
        </button>

        {/* User avatar with dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700 rounded-full font-semibold cursor-pointer"
          >
            U
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                onClick={handleProfileRedirect} 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Profile
              </button>
              <button
                onClick={handleSettingsRedirect} 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
