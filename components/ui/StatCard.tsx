import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 h-[120px]">
      <p className="text-sm font-semibold text-gray-500 mb-1">{title}</p>
      <div className="grid grid-cols-1 text-end">
        <h2 className="text-3xl font-bold text-text-primary mr-2">{value}</h2>
        <span className="text-md font-normal text-gray-500">{unit}</span>
      </div>
    </div>
  );
};

export default StatCard;