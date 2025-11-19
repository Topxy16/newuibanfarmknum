
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit, description }) => {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-md flex flex-col gap-2 border border-gray-100">
      <h3 className="text-gray-500 text-md font-normal">{title}</h3>
      <div className="flex place-content-end">
        <span className="text-4xl font-bold text-black">{value}</span>
        
      </div>
      <div className="flex place-content-end">
        {unit && <span className="text-sm text-gray-600 font-normal">{unit}</span>}
      </div>
    </div>
  );
};

export default StatCard;