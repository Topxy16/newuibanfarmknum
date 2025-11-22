// app/(dashboard)/raw-materials/page.tsx
'use client';

import { Plus, Search } from 'lucide-react';
import React, { useState } from 'react';
import MaterialTable from '../../../components/materials/MaterialTable';
import MaterialFormModal from '../../../components/materials/MaterialFormModal';

interface Material {
  id: string;
  name: string;
  price: number;
  quantityPerPack: number;
  unit: string;
}
type ModalMode = 'add' | 'edit' | 'delete';

// ข้อมูลวัตถุดิบจากภาพ
const DUMMY_MATERIALS: Material[] = [
  { id: 'M001', name: 'ขนมปัง', price: 15, quantityPerPack: 28, unit: 'แผ่น' },
  { id: 'M002', name: 'เนย', price: 65, quantityPerPack: 1000, unit: 'กรัม' },
  { id: 'M003', name: 'น้ำตาล', price: 26, quantityPerPack: 1000, unit: 'กรัม' },
  { id: 'M004', name: 'พริกเผา', price: 100, quantityPerPack: 1000, unit: 'กรัม' },
  { id: 'M005', name: 'หมูหยอง', price: 120, quantityPerPack: 1000, unit: 'กรัม' },
  { id: 'M006', name: 'มายองเนส', price: 50, quantityPerPack: 1000, unit: 'กรัม' },
  { id: 'M007', name: 'แพ็คเกจ', price: 80, quantityPerPack: 100, unit: 'ซอง' },
  { id: 'M008', name: 'แก๊ส (ต่อเดือน)', price: 500, quantityPerPack: 1, unit: 'ถัง' },
];

const RawMaterialsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | undefined>(undefined);

  const handleAction = (mode: ModalMode, material?: Material) => {
    setSelectedMaterial(material);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMaterial(undefined);
    setModalMode('add');
  };

  return (
    <div className="p-8 bg-bg-page min-h-screen">

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary">จัดการวัตถุดิบ</h1>

        {/* ปุ่มเพิ่มวัตถุดิบ */}
        <button
          aria-label="เพิ่มวัตถุดิบใหม่"
          onClick={() => handleAction('add', undefined)}
          className="p-2 bg-white text-green-600 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <Plus size={24} className="p-0.5" />
        </button>
      </div>

      {/* Table Header: Search Bar */}
      <div className="mb-4 bg-white p-4 rounded-3xl shadow-md">
        <div className='flex justify-between items-center mb-4'>
          <h2 className="text-xl font-bold text-text-primary">ตารางวัตถุดิบทั้งหมด</h2>

          <div className="relative w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาชื่อวัตถุดิบ..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal"
            />
          </div>
        </div>
        {/* Material Table Section */}
        <MaterialTable
          materials={DUMMY_MATERIALS}
          onEdit={(material) => handleAction('edit', material)}
          onDelete={(material) => handleAction('delete', material)}
        />

      </div>
      {/* Modal Component */}
      <MaterialFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        initialData={selectedMaterial}
      />

    </div>
  );
};

export default RawMaterialsPage;