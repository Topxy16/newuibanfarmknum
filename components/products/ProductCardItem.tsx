// components/products/ProductCardItem.tsx
import Image from 'next/image';
import { Trash2, Edit } from 'lucide-react';
import React from 'react';

interface ProductCardItemProps {
  imageUrl: string;
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void; // Prop ใหม่สำหรับเปิด Modal ลบ
}

const ProductCardItem: React.FC<ProductCardItemProps> = ({ imageUrl, title, description, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-3xl p-4 flex items-start gap-4 border border-gray-100/50">
      
      {/* ส่วนที่ 1: รูปภาพสินค้า */}
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          width={96}
          height={96}
          className="object-cover"
        />
      </div>

      {/* ส่วนที่ 2: รายละเอียดสินค้า */}
      <div className="flex-grow pt-1">
        <h4 className="text-lg font-bold text-text-primary mb-1">{title}</h4>
        <p className="text-sm font-normal text-gray-500 line-clamp-2">{description}</p>
      </div>

      {/* ส่วนที่ 3: ปุ่มจัดการ */}
      <div className="flex items-center gap-3 self-end">
        {/* ปุ่มลบ: ใช้สไตล์ที่คุณกำหนด */}
        <button 
          aria-label="ลบสินค้า" 
          onClick={onDelete} // ผูกกับ onDelete
          className="p-2 bg-white shadow-md border border-gray-300 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-colors duration-200"
        >
          <Trash2 size={18} />
        </button>
        {/* ปุ่มแก้ไข: ใช้สไตล์ที่คุณกำหนด (แต่เปลี่ยน text-color) */}
        <button 
          aria-label="แก้ไขสินค้า" 
          onClick={onEdit}
          // ปุ่ม Edit ใช้สีส้มเพื่อให้แยกจากปุ่มลบได้ชัดเจน
          className="p-2 bg-white shadow-md border border-gray-300 text-amber-500 hover:text-white hover:bg-amber-500 rounded-full transition-colors duration-200"
        >
          <Edit size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductCardItem;