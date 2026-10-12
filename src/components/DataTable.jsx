import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function DataTable({
  columns,
  data,
  isLoading,
  emptyMessage = 'No data available',
  rowClick,
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-700">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-sm font-medium text-dark-400"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => rowClick?.(row)}
              className={`border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors ${
                rowClick ? 'cursor-pointer' : ''
              }`}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-sm">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
