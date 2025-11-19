// components/storefront/ProductConfigCard.tsx
import React from 'react';
import Image from 'next/image';
import { Power } from 'lucide-react';

interface ProductConfigCardProps {
  imageUrl: string;
  title: string;
  isAvailable: boolean; // สถานะพร้อมขาย
  onToggle: () => void; // Handler สำหรับเปลี่ยนสถานะ
}

const ProductConfigCard: React.FC<ProductConfigCardProps> = ({ imageUrl, title, isAvailable, onToggle }) => {
  const toggleClass = isAvailable ? 'bg-green-600' : 'bg-gray-300';
  const toggleTranslate = isAvailable ? 'translate-x-full' : 'translate-x-0';
  const statusText = isAvailable ? 'พร้อมขาย' : 'ปิดการขาย';

  return (
    <div className="bg-white rounded-3xl shadow-md p-4 flex items-center justify-between border border-gray-100">
      
      {/* ซ้าย: รูปภาพและชื่อสินค้า */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 overflow-hidden rounded-lg flex-shrink-0">
          <Image src="/images/pungkoob.jpg" alt={title} width={64} height={64} className="object-cover" />
        </div>
        <h4 className="text-md font-bold text-text-primary">{title}</h4>
      </div>

      {/* ขวา: สถานะและ Toggle Switch */}
      <div className="flex items-center gap-3">
        <Power size={18} className={`mr-2 ${isAvailable ? 'text-green-600' : 'text-gray-400'}`} />
        
        {/* ข้อความสถานะ */}
        <span className={`text-sm font-semibold ${isAvailable ? 'text-green-600' : 'text-gray-500'} w-20 text-right`}>
          {statusText}
        </span>

        {/* Custom Toggle Switch */}
        <button
          onClick={onToggle}
          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ${toggleClass}`}
          role="switch"
          aria-checked={isAvailable}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${toggleTranslate}`}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductConfigCard;