// app/(dashboard)/products/page.tsx
'use client'; 

import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import ProductCardItem from '../../../components/products/ProductCardItem';
import ProductFormModal from '../../../components/products/ProductFormModal';

interface Product {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

// ข้อมูลตัวอย่าง
const DUMMY_PRODUCTS: Product[] = [
  { 
    id: 1, 
    // ใช้รูปภาพตัวอย่างจากดีไซน์
    imageUrl: "/images/pungkoob.jpg", 
    title: "ขนมปังกรอบเนยน้ำตาล", 
    description: "ขนมปังกรอบอบจากเตาหอมๆ หวานมันกรอบอร่อย เหมาะสำหรับทานคู่กับชา กาแฟ หรือทานเล่น",
  },
  { 
    id: 2, 
    imageUrl: "/images/pungkoob.jpg",
    title: "ขนมปังกรอบเนยกระเทียม", 
    description: "ขนมปังกรอบกระเทียมอบหอมๆ รสชาติเข้มข้น จัดจ้าน เหมาะสำหรับสายกระเทียม",
  },
];


const ProductsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'delete'>('add'); // เพิ่ม 'delete'
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined); 

  // ฟังก์ชันสำหรับเปิดโหมดแก้ไข
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setModalMode('edit');
    setIsModalOpen(true);
  };
  
  // ฟังก์ชันสำหรับเปิดโหมดลบ
  const handleDelete = (product: Product) => {
    setEditingProduct(product);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  // ฟังก์ชันสำหรับปิด Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(undefined);
    setModalMode('add'); 
  };
  
  // เตรียมข้อมูลที่จะส่งให้ Modal (ใช้ได้ทั้ง Edit และ Delete)
  const modalInitialData = editingProduct ? { 
      name: editingProduct.title, 
      description: editingProduct.description, 
      imageUrl: editingProduct.imageUrl 
  } : undefined;


  return (
    <div className="p-8 bg-bg-page min-h-screen"> 
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary">สินค้า</h1>
        
        {/* ปุ่มเพิ่มสินค้า */}
        <button 
          aria-label="เพิ่มสินค้าใหม่" 
          onClick={() => { setModalMode('add'); setIsModalOpen(true); }}
          className="p-2 bg-white text-green-600 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <Plus size={24} className="p-0.5" />
        </button>
      </div>

      {/* Product List Section */}
      <div className="grid grid-cols-2 gap-6">
        {DUMMY_PRODUCTS.map((product) => (
          <ProductCardItem 
            key={product.id}
            {...product}
            onEdit={() => handleEdit(product)} 
            onDelete={() => handleDelete(product)} // ผูกกับ handleDelete
          />
        ))}
      </div>
      
      {/* Modal Component */}
      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        mode={modalMode} 
        initialData={modalInitialData}
      />
    </div>
  );
};

export default ProductsPage;