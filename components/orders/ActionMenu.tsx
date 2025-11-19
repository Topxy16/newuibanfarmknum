'use client';

import React, { useState } from 'react';
import { MoreVertical, Search, Edit, Trash2 } from 'lucide-react';

interface ActionMenuProps {
  orderId: string;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
} 

const ActionMenu: React.FC<ActionMenuProps> = ({ orderId, onView, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);


  const menuItems = [
    { icon: Search, label: 'ดูรายละเอียด', action: () => onView(orderId) },
    { icon: Edit, label: 'แก้ไขออเดอร์', action: () => onEdit(orderId) },
    { icon: Trash2, label: 'ลบออเดอร์', action: () => onDelete(orderId), color: 'text-red-500 hover:bg-red-500 hover:text-white' },
  ];

  const handleActionClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-400 hover:text-text-primary rounded-full hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
      >
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          onBlur={() => setIsOpen(false)} 
          tabIndex={-1} 
        >
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleActionClick(item.action)}
                className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${item.color || ''}`}
              >
                <item.icon size={16} className="mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;