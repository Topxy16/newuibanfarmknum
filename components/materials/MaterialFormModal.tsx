// components/materials/MaterialFormModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

type ModalMode = 'add' | 'edit' | 'delete';

interface Material {
  id: string;
  name: string;
  price: number;
  quantityPerPack: number; // ปริมาณในหน่วยที่ซื้อ
  unit: string; // หน่วยที่ซื้อ (เช่น แผ่น, ถุง, แพ็ค)
}

interface MaterialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  initialData?: Material;
}

const MaterialFormModal: React.FC<MaterialFormModalProps> = ({ isOpen, onClose, mode, initialData }) => {
  if (!isOpen) return null;

  const [name, setName] = useState(initialData?.name || '');
  const [price, setPrice] = useState(initialData?.price || 0);
  const [quantityPerPack, setQuantityPerPack] = useState(initialData?.quantityPerPack || 0);
  const [unit, setUnit] = useState(initialData?.unit || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setQuantityPerPack(initialData.quantityPerPack);
      setUnit(initialData.unit);
    } else {
      setName('');
      setPrice(0);
      setQuantityPerPack(0);
      setUnit('');
    }
  }, [initialData, mode]);

  const isDeleteMode = mode === 'delete';
  const isInputDisabled = isDeleteMode;

  let title = 'เพิ่มวัตถุดิบใหม่';
  let buttonText = 'เพิ่มวัตถุดิบ';
  let buttonColor = 'bg-green-600 hover:bg-green-700';

  if (mode === 'edit') {
    title = 'แก้ไขวัตถุดิบ';
    buttonText = 'บันทึกการแก้ไข';
    buttonColor = 'bg-amber-700 hover:bg-amber-800';
  } else if (isDeleteMode) {
    title = `ลบวัตถุดิบ: ${initialData?.name}`;
    buttonText = 'ยืนยันการลบ';
    buttonColor = 'bg-red-600 hover:bg-red-700';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${title} Material:`, { name, price, quantityPerPack, unit });
    onClose();
  };

  // Custom Input Row Component
  const FormInput: React.FC<{ label: string, value: string | number, placeholder: string, type?: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> =
    ({ label, value, placeholder, type = 'text', onChange }) => (
      <div>
        <span className="text-sm font-bold text-text-primary block mb-2">{label}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isInputDisabled}
          className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal disabled:opacity-80"
          required
        />
      </div>
    );


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">

              {/* 1. ชื่อวัตถุดิบ */}
              <div className="col-span-2">
                <FormInput
                  label="ชื่อวัตถุดิบ"
                  value={name}
                  placeholder="กรอกชื่อวัตถุดิบ (เช่น ขนมปัง, เนย)"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* 2. ราคาที่ซื้อมา */}
              <FormInput
                label="ราคาที่ซื้อมา (บาท)"
                value={price === 0 && !isInputDisabled ? '' : price}
                placeholder="ราคาต่อ 1 หน่วย"
                type="number"
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />

              {/* 3. ปริมาณที่ซื้อ (จำนวน/น้ำหนัก) */}
              <FormInput
                label="ปริมาณต่อแพ็ค/หน่วย (เช่น 28)" // อธิบายให้ชัดเจน
                value={quantityPerPack === 0 && !isInputDisabled ? '' : quantityPerPack}
                placeholder="จำนวนแผ่น/กรัมใน 1 หน่วยที่ซื้อ"
                type="number"
                onChange={(e) => setQuantityPerPack(parseFloat(e.target.value))}
              />

              {/* 4. หน่วยที่ซื้อ (ต่อ 1) */}
              <div className="col-span-2">
                <FormInput
                  label="หน่วยต่อ 1 (ปอน, ถุง, แพ็ค)" // อธิบายให้ชัดเจน
                  value={unit}
                  placeholder="หน่วยต่อ 1 ปอน, ถุง, แพ็ค"
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
            </div>

            {/* ปุ่ม Action */}
            <div className="pt-4">
              <button
                type="submit"
                className={`w-full py-3 px-6 text-white font-bold rounded-xl transition-colors duration-200 shadow-lg ${buttonColor}`}
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MaterialFormModal;