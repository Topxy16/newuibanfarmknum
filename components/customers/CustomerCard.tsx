// components/customers/CustomerCard.tsx
import React from 'react';
import Image from 'next/image';
import { Trash2, Edit } from 'lucide-react';
import { CustomerStatus } from './StatusSelect';

interface CustomerCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: CustomerStatus;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const getStatusColor = (status: CustomerStatus) => {
  switch (status) {
    case 'ปกติ': return 'bg-green-500';
    case 'ไม่เคยซื้อขาย': return 'bg-amber-500';
    case 'ปฏิเสธ': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
};

const CustomerCard: React.FC<CustomerCardProps> = ({ id, name, description, imageUrl, status, onEdit, onDelete }) => {
  const statusColor = getStatusColor(status);

  return (
    <div className="bg-white rounded-3xl shadow-md p-4 flex flex-col gap-3 border border-gray-100">

      {/* ส่วนบน: รูปภาพ, ชื่อ, สถานะ */}
      <div className="flex  gap-4">
        {/* รูปภาพร้านค้า */}
        <div className="relative flex-shrink-0 overflow-hidden rounded-lg">
          <Image src={imageUrl} alt={name} width={150} height={150} className="object-cover" />
          {/* Status Dot */}

        </div>

        {/* ชื่อร้านและคำอธิบาย */}
        <div className="flex-grow pt-1">
          <h4 className="text-lg font-bold text-text-primary mb-1">{name}</h4>
          {/* คำอธิบายร้าน (แสดงแค่ 1-2 บรรทัด) */}
          <p className="text-sm font-normal text-gray-500 line-clamp-2">{description}</p>
        </div>

        <div className="grid grid-cols-1 content-between place-items-end">
          
          <div className={`w-5 h-5 rounded-full border-2 border-white ${statusColor}`}></div>
          
          {/* ส่วนล่าง: ปุ่มจัดการ */}
          <div className="flex gap-2 pt-3">

            {/* ปุ่มแก้ไข (ใช้สไตล์ปุ่ม Action ที่อัปเดตแล้ว) */}
            <button
              aria-label="แก้ไขข้อมูลลูกค้า"
              onClick={() => onEdit(id)}
              className="p-2 bg-white shadow-md border border-gray-300 text-amber-500 hover:text-white hover:bg-amber-500 rounded-full transition-colors duration-200"
            >
              <Edit size={18} />
            </button>

            {/* ปุ่มลบ */}
            <button
              aria-label="ลบข้อมูลลูกค้า"
              onClick={() => onDelete(id)}
              className="p-2 bg-white shadow-md border border-gray-300 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-colors duration-200"
            >
              <Trash2 size={18} />
            </button>


          </div>


        </div>



      </div>


    </div>
  );
};

export default CustomerCard;