// components/products/ProductFormModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X, Camera } from 'lucide-react';
import Image from 'next/image';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  // โหมดใหม่: 'add' | 'edit' | 'delete'
  mode: 'add' | 'edit' | 'delete'; 
  initialData?: {
    name: string;
    description: string;
    imageUrl: string;
  };
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  initialData 
}) => {
  if (!isOpen) return null;

  // 1. กำหนด State และ Logic ตามโหมด
  const isEditMode = mode === 'edit';
  const isDeleteMode = mode === 'delete';
  const isInputDisabled = isDeleteMode; // ปิดการแก้ไขสำหรับโหมดลบ

  // ใช้ useEffect เพื่ออัปเดต State เมื่อ initialData เปลี่ยน (จำเป็นสำหรับ Modal ที่ใช้ซ้ำ)
  useEffect(() => {
    setProductName(initialData?.name || '');
    setDescription(initialData?.description || '');
  }, [initialData]); 

  const [productName, setProductName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  
  // 2. กำหนดข้อความและสีปุ่มตามโหมด
  const title = isDeleteMode ? 'ลบสินค้า' : (isEditMode ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า');
  const buttonText = isDeleteMode ? 'ลบสินค้า' : (isEditMode ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า');
  const buttonColor = isDeleteMode ? 'bg-red-600 hover:bg-red-700' : (isEditMode ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${title} Product:`, { productName, description });
    // Logic API call สำหรับ Add/Edit/Delete จะอยู่ตรงนี้
    onClose(); 
  };
  
  // Component รูปภาพ/อัปโหลด
  const ImageContainer = () => {
    // แสดงรูปภาพจริงสำหรับโหมด Edit และ Delete
    const showActualImage = isEditMode || isDeleteMode;

    if (showActualImage && initialData?.imageUrl) {
      return (
        <div className="relative w-full h-full min-h-60 rounded-xl overflow-hidden border border-gray-200">
          <Image
            src={initialData.imageUrl}
            alt={initialData.name}
            fill 
            style={{ objectFit: 'cover' }}
            className="group-hover:opacity-75 transition-opacity duration-300"
          />
        </div>
      );
    }
    // โหมดเพิ่ม: แสดงช่องอัปโหลด
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-60 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
        <Camera size={48} className="text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">เพิ่มรูปภาพ</p>
        <input type="file" accept="image/*" className="hidden" />
      </div>
    );
  };
  

  return (
    // Backdrop: ใช้ backdrop-blur-md
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md"
      onClick={onClose}
    >
      
      {/* Modal Container: ใช้สไตล์ที่คุณกำหนด */}
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          
          {/* Header และปุ่มปิด */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-primary">{title}</h2>
            {/* ปุ่มปิด X: ใช้สไตล์ที่คุณกำหนด */}
            <button 
              onClick={onClose} 
              className="p-2 bg-white shadow-md border border-gray-300 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* ฟอร์มหลัก */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
            
            {/* คอลัมน์ซ้าย: รูปภาพ */}
            <div className="col-span-1">
              <ImageContainer />
            </div>

            {/* คอลัมน์ขวา: ข้อมูลสินค้า */}
            <div className="col-span-1 space-y-6">
              
              {/* ชื่อสินค้า */}
              <label className="block">
                <span className="text-sm font-bold text-text-primary block mb-2">ชื่อสินค้า</span>
                <input
                  type="text"
                  placeholder="กรอกชื่อสินค้า"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  // ปิดการแก้ไขสำหรับโหมดลบ
                  disabled={isInputDisabled} 
                  className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal disabled:opacity-80"
                  required
                />
              </label>

              {/* คำอธิบายสินค้า */}
              <label className="block flex-1">
                <span className="text-sm font-bold text-text-primary block mb-2">คำอธิบายสินค้า</span>
                <textarea
                  placeholder="กรอกคำอธิบายสินค้า"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  // ปิดการแก้ไขสำหรับโหมดลบ
                  disabled={isInputDisabled}
                  className="w-full h-32 p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal resize-none disabled:opacity-80"
                  required
                />
              </label>
              
              {/* ปุ่ม Action */}
              <div className="pt-4">
                <button
                  type="submit"
                  className={`w-full py-3 px-6 text-white font-bold rounded-xl transition-colors duration-200 shadow-lg ${buttonColor}`}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;