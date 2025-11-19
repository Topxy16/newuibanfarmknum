// components/customers/CustomerFormModal.tsx
// 'use client'

import React, { useState, useEffect } from 'react';
import { X, Camera } from 'lucide-react';
import Image from 'next/image';
import StatusSelect, { CustomerStatus } from './StatusSelect';
import ImageUpload from '../products/ImageUpload'; // ใช้ ImageUpload เดิม

type ModalMode = 'add' | 'edit' | 'delete' | 'view';

interface Customer {
  id: string;
  name: string;
  description: string; // คำอธิบายร้านค้า
  imageUrl: string; // รูปร้านค้า
  status: CustomerStatus; // สถานะการซื้อขาย
  address: string; // ที่อยู่
  mapImage: string; // รูปแผนที่
}

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  initialData?: Customer;
}

// *** Custom Input Component (ย้ายมาไว้ข้างใน หรือสร้างไฟล์แยก) ***
const FormInput: React.FC<{ label: string, value: string, placeholder: string, type?: string, disabled: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }> =
  ({ label, value, placeholder, type = 'text', disabled, onChange }) => (
    <div>
      <span className="text-sm font-bold text-text-primary block mb-2">{label}</span>
      {type === 'textarea' ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
          disabled={disabled}
          rows={3}
          className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal resize-none disabled:opacity-80"
          required
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
          disabled={disabled}
          className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal disabled:opacity-80"
          required
        />
      )}
    </div>
  );


const CustomerFormModal: React.FC<CustomerFormModalProps> = ({ isOpen, onClose, mode, initialData }) => {
  if (!isOpen) return null;

  // States
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<CustomerStatus>(initialData?.status || 'ไม่เคยซื้อขาย');

  // Load initial data
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setStatus(initialData.status);
    } else {
      setName('');
      setDescription('');
      setStatus('ไม่เคยซื้อขาย');
    }
  }, [initialData, mode]);

  const isViewMode = mode === 'view'; // ไม่มีในดีไซน์ แต่ยังคงหลักการ
  const isDeleteMode = mode === 'delete';
  const isEditMode = mode === 'edit';
  const isInputDisabled = isDeleteMode || isViewMode;

  let title = 'เพิ่มข้อมูลลูกค้า';
  let buttonText = 'เพิ่มข้อมูลลูกค้า';
  let buttonColor = 'bg-green-600 hover:bg-green-700';

  if (isEditMode) {
    title = 'แก้ไขข้อมูลลูกค้า';
    buttonText = 'แก้ไขข้อมูลลูกค้า';
    buttonColor = 'bg-amber-700 hover:bg-amber-800';
  } else if (isDeleteMode) {
    title = `ลบข้อมูลลูกค้า`;
    buttonText = 'ลบข้อมูลลูกค้า';
    buttonColor = 'bg-red-600 hover:bg-red-700';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${title} Customer:`, { name, description, status });
    onClose();
  };

  // Component สำหรับแสดงรูปภาพร้านค้าและแผนที่
  const ImageAndMapSection = () => {
    // โหมดเพิ่ม: แสดง ImageUpload สำหรับรูปภาพร้านค้า
    if (mode === 'add') {
      return (
        <div className="space-y-4">
          <ImageUpload /> {/* ใช้ ImageUpload เดิม */}
          {/* รูปภาพแผนที่ (ที่อยู่ลูกค้า) */}
          <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100 border border-gray-300">
            MAP
          </div>
        </div>

      );
    }

    // โหมด Edit/Delete/View: แสดงรูปภาพร้านค้าจริงและแผนที่
    if (initialData) {
      return (
        <div className="space-y-4 h-full">
          {/* รูปภาพร้านค้า */}
          <div className="relative w-full h-60 rounded-xl overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center">
            <Image src={initialData.imageUrl} alt={initialData.name} fill />
          </div>

          {/* รูปภาพแผนที่ (ที่อยู่ลูกค้า) */}
          <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100 border border-gray-300">
            MAP
          </div>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">

          {/* Header และปุ่มปิด */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 bg-white shadow-md border border-gray-300 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">

            {/* คอลัมน์ซ้าย: ข้อมูลร้านค้า */}
            <div className="col-span-1 space-y-6">

              <FormInput
                label="ชื่อร้านค้า"
                value={name}
                placeholder="กรอกชื่อร้านค้า"
                onChange={(e) => setName(e.target.value)}
                disabled={isInputDisabled}
              />

              <FormInput
                label="คำอธิบายร้านค้า"
                value={description}
                placeholder="กรอกคำอธิบายร้านค้า"
                type="textarea"
                onChange={(e) => setDescription(e.target.value)}
                disabled={isInputDisabled}
              />

              <StatusSelect
                value={status}
                onChange={setStatus}
                disabled={isInputDisabled}
              />

              {/* ปุ่ม Action */}
              <div className="pt-8">
                <button
                  type="submit"
                  className={`w-full py-3 px-6 text-white font-bold rounded-xl transition-colors duration-200 shadow-lg ${buttonColor}`}
                >
                  {buttonText}
                </button>
              </div>
            </div>

            {/* คอลัมน์ขวา: รูปภาพและแผนที่ */}
            <div className="col-span-1">
              <ImageAndMapSection />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerFormModal;