// app/(dashboard)/orders/page.tsx
'use client';

import { Plus, Search } from 'lucide-react';
import React, { useState } from 'react';
import StatCard from '../../../components/ui/StatCard';
import OrderTable from '../../../components/orders/OrderTable';
import OrderFormModal from '../../../components/orders/OrderFormModal'; // นำเข้า Modal ใหม่

type ModalMode = 'add' | 'edit' | 'delete' | 'view';

interface Order {
  id: string;
  orderDate: string;
  deliveryDate: string;
  customerName: string;
  phone: string;
  productName: string; // เพิ่ม
  quantity: number; // เพิ่ม
  totalPrice: number; // เพิ่ม
  mapImage?: string; // เพิ่ม
  status: 'จัดส่งแล้ว' | 'รอจัดส่ง' | 'ยกเลิก';
}

// ข้อมูลตัวอย่าง (Dummy Data)
const DUMMY_ORDERS = [
  { id: '#0000', orderDate: '15/10/25', customerName: 'ร้านสองพี่น้อง', phone: '0926166623', deliveryDate: '17/10/25', status: 'จัดส่งแล้ว' as const },
  { id: '#0001', orderDate: '15/10/25', customerName: 'ร้านสวยจัง', phone: '0812345678', deliveryDate: '17/10/25', status: 'รอจัดส่ง' as const },
  { id: '#0002', orderDate: '16/10/25', customerName: 'ร้านของกินอร่อย', phone: '0654321098', deliveryDate: '18/10/25', status: 'จัดส่งแล้ว' as const },
  { id: '#0003', orderDate: '16/10/25', customerName: 'ร้านขนมปังหอม', phone: '0987654321', deliveryDate: '19/10/25', status: 'รอจัดส่ง' as const },
  { id: '#0004', orderDate: '17/10/25', customerName: 'ร้านขายส่ง', phone: '0899998888', deliveryDate: '20/10/25', status: 'จัดส่งแล้ว' as const },
];

// ข้อมูลสำหรับ Stat Card
const DUMMY_STATS = {
  total: 12,
  pending: 6,
  completed: 6,
};


const OrdersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined);

  // ฟังก์ชันสำหรับเปิด Modal (รวม 4 Action)
  const handleAction = (mode: ModalMode, order?: Order) => {
    setSelectedOrder(order);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  // ฟังก์ชันปิด Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(undefined);
    setModalMode('add');
  };

  return (
    <div className="p-8 bg-bg-page min-h-screen">
      {/* ... Header Section ... */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary">ออเดอร์</h1>
        <button
          onClick={() => handleAction('add', undefined)} // เปิดโหมด Add
          className="p-2 bg-white text-green-600 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <Plus size={24} className="p-0.5" />
        </button>
      </div>

      {/* ... Stat Card Section ... */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard
          title="ออเดอร์"
          value={DUMMY_STATS.total.toString()}
          unit=""
        />
        <StatCard
          title="รอจัดส่ง"
          value={DUMMY_STATS.pending.toString()}
          unit=""
        />
        <StatCard
          title="จัดส่งสำเร็จ"
          value={DUMMY_STATS.completed.toString()}
          unit=""
        />
      </div>
      {/* ... Table Header ... */}
      <div className="mb-4 bg-white p-4 rounded-3xl shadow-md">
        <div className='flex justify-between items-center mb-4'>
          <h2 className="text-xl font-bold text-text-primary">ตารางออเดอร์</h2>

          <div className="relative w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาออเดอร์..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal"
            />
          </div>
        </div>

        {/* Order Table Section */}
        <OrderTable
          orders={DUMMY_ORDERS}
          onView={(id) => handleAction('view', DUMMY_ORDERS.find(o => o.id === id))}
          onEdit={(id) => handleAction('edit', DUMMY_ORDERS.find(o => o.id === id))}
          onDelete={(id) => handleAction('delete', DUMMY_ORDERS.find(o => o.id === id))}
        />

      </div>
      {/* Modal Component */}
      <OrderFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        initialData={selectedOrder}
      />
    </div>
  );
};

export default OrdersPage;