// components/ui/AlertFail.tsx
'use client';
import React from 'react';
import { XCircle, X } from 'lucide-react';

interface AlertProps {
  message: string;
  detail?: string;
  show: boolean;
  onClose: () => void;
}

const AlertFail: React.FC<AlertProps> = ({ message, detail, show, onClose }) => {
  if (!show) return null;

  return (
    // Fixed Position Top Right
    <div className="fixed top-5 right-5 z-[100] transition-opacity duration-300 ease-in-out">
      <div className="flex items-center p-4 bg-white rounded-lg shadow-xl border border-red-200">
        
        {/* Icon */}
        <XCircle size={24} className="text-red-600 flex-shrink-0 mr-3" />
        
        {/* Content */}
        <div className="text-left">
          <p className="font-bold text-red-700">{message}</p>
          {detail && <p className="text-sm text-gray-600">{detail}</p>}
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close alert"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default AlertFail;