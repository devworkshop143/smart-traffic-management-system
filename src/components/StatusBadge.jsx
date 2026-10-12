import React from 'react';

const statusBadges = {
  active: 'bg-green-500/20 text-green-300 border-green-500/30',
  inactive: 'bg-red-500/20 text-red-300 border-red-500/30',
  pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  online: 'bg-green-500/20 text-green-300 border-green-500/30',
  offline: 'bg-red-500/20 text-red-300 border-red-500/30',
  approved: 'bg-green-500/20 text-green-300 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export default function StatusBadge({ status }) {
  const colorClass = statusBadges[status?.toLowerCase()] || statusBadges.inactive;

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${colorClass}`}>
      {status}
    </span>
  );
}
