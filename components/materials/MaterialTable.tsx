// components/materials/MaterialTable.tsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  price: number;
  quantityPerPack: number;
  unit: string;
}

interface MaterialTableProps {
  materials: Material[];
  onEdit: (material: Material) => void;
  onDelete: (material: Material) => void;
}

const MaterialTable: React.FC<MaterialTableProps> = ({ materials, onEdit, onDelete }) => {
  
  return (
    <div className="bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          
          {/* ส่วนหัวตาราง */}
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">วัตถุดิบ</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ราคา (บาท)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ปริมาณต่อแพ็ค/หน่วย</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">หน่วย</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">เครื่องมือ</th>
            </tr>
          </thead>
          
          {/* ส่วนเนื้อหาตาราง */}
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {materials.map((material, index) => (
              // สลับสีพื้นหลัง: ขาว หรือ #F4F4F4
              <tr 
                key={material.id} 
                className={index % 2 === 0 ? 'bg-white' : 'bg-[#F4F4F4]'}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">{material.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{material.price.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{material.quantityPerPack.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{material.unit}</td>
                
                <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
                    {/* ปุ่มแก้ไข */}
                    <button 
                      aria-label="แก้ไขวัตถุดิบ" 
                      onClick={() => onEdit(material)}
                      className="p-2 bg-white shadow-md border border-gray-300 text-amber-500 hover:text-white hover:bg-amber-500 rounded-full transition-colors duration-200"
                    >
                      <Edit size={18} />
                    </button>
                    {/* ปุ่มลบ */}
                    <button 
                      aria-label="ลบวัตถุดิบ" 
                      onClick={() => onDelete(material)}
                      className="p-2 bg-white shadow-md border border-gray-300 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-colors duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialTable;