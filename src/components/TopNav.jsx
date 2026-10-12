import React from 'react';
import { FiMenu, FiX, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function TopNav({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-dark-800 border-b border-dark-700 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-dark-700 rounded-lg transition-colors lg:hidden"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <h1 className="text-xl font-bold text-gradient">Traffic Manager</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors relative">
          <FiBell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 hover:bg-dark-700 px-3 py-2 rounded-lg transition-colors"
          >
            <FiUser size={20} />
            <span className="text-sm">{user?.full_name || 'User'}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-dark-700 border border-dark-600 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b border-dark-600">
                <p className="font-medium">{user?.full_name}</p>
                <p className="text-xs text-dark-400">{user?.email}</p>
                <p className="text-xs text-primary-400 uppercase">{user?.role}</p>
              </div>
              <button
                onClick={() => navigate('/settings')}
                className="w-full text-left px-4 py-2 hover:bg-dark-600 transition-colors"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-dark-600 transition-colors text-red-400"
              >
                <FiLogOut className="inline mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
