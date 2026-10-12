import React from 'react';
import Card from './Card';

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="p-4 bg-primary-500/10 rounded-lg mb-4">
        <Icon size={48} className="text-primary-400" />
      </div>
      <h3 className="text-lg font-semibold mt-4">{title}</h3>
      <p className="text-dark-400 text-sm mt-2 max-w-sm text-center">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
