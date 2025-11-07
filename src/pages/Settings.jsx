import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'English',
    notifications: { email: true, push: false },
  });

  const handleSave = () => {
    // alert('Settings updated!');
    navigate('/'); // Redirect to dashboard on save
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to dashboard on cancel
  };

  return (
    <div className="">
      <div className=" bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

        <form className="space-y-6">
          {/* Theme Setting */}
          <div>
            <label htmlFor="theme" className="block text-lg font-semibold text-gray-700">Currency </label>
            <select
              id="Currency "
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="light">PKR</option>
              <option value="dark">Dollar </option>
              <option value="dark">Euro  </option>
              <option value="dark">Yuan  </option>

            </select>
          </div>

          {/* Language Setting */}
          <div>
            <label htmlFor="language" className="block text-lg font-semibold text-gray-700">Language</label>
            <select
              id="language"
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>

          {/* Notifications Setting */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Notifications</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => setSettings({ ...settings, notifications: { ...settings.notifications, email: e.target.checked } })}
                className="mr-3 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-lg text-gray-700">Email Notifications</span>
            </div>
            
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex justify-between gap-4 mt-6">
            <button
              onClick={handleCancel}
              className="px-6 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
