import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

const alertTypes = {
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    icon: FiCheckCircle,
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    icon: FiAlertCircle,
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    icon: FiAlertCircle,
  },
  info: {
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/30',
    text: 'text-primary-400',
    icon: FiInfo,
  },
};

export default function Alert({ type = 'info', title, message, onClose }) {
  const config = alertTypes[type];
  const Icon = config.icon;

  return (
    <div className={`rounded-lg border ${config.bg} ${config.border} p-4 flex gap-4`}>
      <Icon className={`${config.text} flex-shrink-0 mt-0.5`} size={20} />
      <div className="flex-1">
        {title && <p className={`${config.text} font-medium`}>{title}</p>}
        {message && <p className="text-dark-300 text-sm mt-1">{message}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-dark-400 hover:text-dark-300">
          ×
        </button>
      )}
    </div>
  );
}
