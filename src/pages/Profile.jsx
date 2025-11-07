import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'A passionate developer.',
  });

  const handleSave = () => {
    // alert('Profile updated!');
    navigate('/'); // Redirect to dashboard on save
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <div className=" ">
      <div className="  bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h1>

        <form className="space-y-6">
          {/* Avatar Upload */}
          <div>
            <label htmlFor="avatar" className="block text-lg font-semibold text-gray-700">Profile Picture</label>
            <input
              id="avatar"
              type="file"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-lg font-semibold text-gray-700">Bio</label>
            <textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a short bio"
            />
          </div>

          {/* Email */}
          

          {/* Save and Cancel Buttons */}
          <div className="flex justify-between gap-4 mt-6">
            <button
              onClick={handleCancel}
              className="px-6 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
