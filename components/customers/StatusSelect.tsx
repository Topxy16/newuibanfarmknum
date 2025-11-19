// components/customers/StatusSelect.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export type CustomerStatus = 'ปกติ' | 'ไม่เคยซื้อขาย' | 'ปฏิเสธ';

interface StatusSelectProps {
  value: CustomerStatus;
  onChange: (status: CustomerStatus) => void;
  disabled: boolean;
}

const STATUS_OPTIONS: { label: string; value: CustomerStatus; color: string }[] = [
  { label: 'ซื้อขายเป็นปกติ', value: 'ปกติ', color: 'bg-green-500' },
  { label: 'ไม่เคยซื้อขาย', value: 'ไม่เคยซื้อขาย', color: 'bg-amber-500' },
  { label: 'ปฏิเสธการซื้อขาย', value: 'ปฏิเสธ', color: 'bg-red-500' },
];

const StatusSelect: React.FC<StatusSelectProps> = ({ value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // หา Option ปัจจุบันเพื่อแสดงผล
  const currentOption = STATUS_OPTIONS.find(opt => opt.value === value) || STATUS_OPTIONS[0];

  useEffect(() => {
    // ปิด dropdown เมื่อมีการคลิกภายนอก
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen && !disabled) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, disabled]);

  const handleSelect = (status: CustomerStatus) => {
    onChange(status);
    setIsOpen(false);
  };
  
  const StatusDot = ({ color }: { color: string }) => (
      <span className={`w-3 h-3 rounded-full mr-2 ${color}`}></span>
  );

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full p-3 rounded-xl border border-gray-300 bg-gray-100 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal ${disabled ? 'opacity-80 cursor-default' : 'hover:bg-gray-200'}`}
        disabled={disabled}
      >
        <div className="flex items-center">
            {/* แสดงสถานะที่เลือก */}
            <span className="text-gray-500 mr-2">เลือกสถานะการซื้อขาย:</span>
            <StatusDot color={currentOption.color} />
            <span className="font-semibold text-text-primary">{currentOption.label}</span>
        </div>
        {!disabled && <ChevronDown size={18} className={`text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />}
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {STATUS_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full p-3 text-left flex items-center hover:bg-gray-100 transition-colors"
            >
              <StatusDot color={option.color} />
              <span className="text-text-primary">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusSelect;