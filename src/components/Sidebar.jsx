import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiActivity,
  FiTrafficCone,
  FiTrendingUp,
  FiAlertCircle,
  FiTruck,
  FiMap,
  FiBarChart3,
  FiUsers,
  FiSettings,
  FiRadio,
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { label: 'Dashboard', icon: FiHome, path: '/dashboard', roles: ['admin', 'operator', 'manager'] },
  {
    label: 'Traffic Monitor',
    icon: FiActivity,
    path: '/traffic/monitor',
    roles: ['admin', 'operator', 'manager', 'viewer'],
  },
  {
    label: 'Density Analysis',
    icon: FiTrendingUp,
    path: '/traffic/density',
    roles: ['admin', 'operator', 'manager'],
  },
  {
    label: 'Signal Management',
    icon: FiTrafficCone,
    path: '/signals/management',
    roles: ['admin', 'operator'],
  },
  {
    label: 'Incident Report',
    icon: FiAlertCircle,
    path: '/incidents/report',
    roles: ['admin', 'operator', 'manager'],
  },
  {
    label: 'Violations',
    icon: FiTruck,
    path: '/violations/review',
    roles: ['admin', 'operator', 'manager'],
  },
  {
    label: 'Emergency',
    icon: FiAlertCircle,
    path: '/emergency',
    roles: ['admin', 'operator'],
  },
  {
    label: 'Routes',
    icon: FiMap,
    path: '/routes',
    roles: ['admin', 'operator', 'manager'],
  },
  {
    label: 'Analytics',
    icon: FiBarChart3,
    path: '/analytics',
    roles: ['admin', 'operator', 'manager'],
  },
  {
    label: 'Sensors',
    icon: FiRadio,
    path: '/sensors',
    roles: ['admin', 'operator'],
  },
  { label: 'Users', icon: FiUsers, path: '/users', roles: ['admin'] },
  { label: 'Settings', icon: FiSettings, path: '/settings', roles: ['admin'] },
];

export default function Sidebar({ isOpen }) {
  const { user } = useAuth();

  const visibleMenuItems = menuItems.filter((item) => item.roles.includes(user?.role));

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 w-64 bg-dark-800 border-r border-dark-700 overflow-y-auto transition-transform duration-300 lg:relative lg:top-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <nav className="p-4 space-y-2">
        {visibleMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-primary-600 text-white' : 'text-dark-300 hover:bg-dark-700'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
