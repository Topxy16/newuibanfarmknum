// app/(dashboard)/customers/page.tsx
'use client'; 

import { Plus, Search } from 'lucide-react';
import React, { useState } from 'react';
import CustomerCard from '../../../components/customers/CustomerCard';
import CustomerFormModal from '../../../components/customers/CustomerFormModal';
import { CustomerStatus } from '../../../components/customers/StatusSelect'; 

// *** อัปเดต Type ให้ตรงกับ Modal ใหม่ ***
interface Customer {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: CustomerStatus;
  address: string;
  mapImage: string;
}
type ModalMode = 'add' | 'edit' | 'delete' | 'view';

// ข้อมูลตัวอย่าง
const DUMMY_CUSTOMERS: Customer[] = [
  { id: 'C001', name: 'ร้านชำ 1', description: 'ขายดีมาก, เจ้าของใจดี', imageUrl: '/images/rancham.jpg', status: 'ปกติ', address: 'ที่อยู่ 1', mapImage: '/images/delivery-route.png' },
  { id: 'C002', name: 'ร้านชำ 2', description: 'กำลังพิจารณา, โทร 08x', imageUrl: '/images/rancham.jpg', status: 'ไม่เคยซื้อขาย', address: 'ที่อยู่ 2', mapImage: '/images/delivery-route.png' },
  { id: 'C003', name: 'ร้านชำ 3', description: 'ปฏิเสธไปแล้ว, อย่าเข้าอีก', imageUrl: '/images/rancham.jpg', status: 'ปฏิเสธ', address: 'ที่อยู่ 3', mapImage: '/images/delivery-route.png' },
];

const CustomersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined); 


  const handleAction = (mode: ModalMode, customerId: string) => {
    const customer = DUMMY_CUSTOMERS.find(c => c.id === customerId);
    setSelectedCustomer(customer);
    setModalMode(mode);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(undefined);
    setModalMode('add');
  };

  return (
    <div className="p-8 bg-bg-page min-h-screen"> 
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary">ลูกค้า</h1>
        
        {/* ปุ่มเพิ่มลูกค้า */}
        <button 
          aria-label="เพิ่มลูกค้าใหม่" 
          onClick={() => handleAction('add', '')} 
          className="p-2 bg-white text-green-600 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <Plus size={24} className="p-0.5" />
        </button>
      </div>
      
      {/* Grid สำหรับ Card ลูกค้า (4 คอลัมน์) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {DUMMY_CUSTOMERS.map((customer) => (
          <CustomerCard 
            key={customer.id}
            id={customer.id}
            name={customer.name}
            description={customer.description}
            imageUrl={customer.imageUrl}
            status={customer.status}
            onEdit={(id) => handleAction('edit', id)}
            onDelete={(id) => handleAction('delete', id)}
          />
        ))}
      </div>
      
      {/* Modal Component */}
      <CustomerFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        mode={modalMode} 
        initialData={selectedCustomer}
      />
    </div>
  );
};

export default CustomersPage;