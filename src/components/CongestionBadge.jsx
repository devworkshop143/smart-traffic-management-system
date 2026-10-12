import React from 'react';

const congestionColors = {
  Low: 'bg-green-500/20 text-green-300 border-green-500/30',
  Moderate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  High: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Severe: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export default function CongestionBadge({ level }) {
  const colorClass = congestionColors[level] || congestionColors.Low;

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${colorClass}`}>
      {level}
    </span>
  );
}
