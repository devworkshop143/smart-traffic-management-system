import React from 'react';

export default function DashboardStat({ icon: Icon, label, value, subtext, trend }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-dark-400 text-sm">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {subtext && <p className="text-dark-400 text-xs mt-1">{subtext}</p>}
        </div>
        <div className="p-3 bg-primary-500/10 rounded-lg">
          <Icon size={24} className="text-primary-400" />
        </div>
      </div>
      {trend && (
        <div className={`text-xs mt-4 ${
          trend.up ? 'text-green-400' : 'text-red-400'
        }`}>
          {trend.up ? '↑' : '↓'} {trend.value}% from last month
        </div>
      )}
    </div>
  );
}
