// components/financial/TransactionFormModal.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';

type ModalMode = 'add' | 'view';

// Type สำหรับรายการย่อยใน Modal (สำหรับโหมด Add)
interface FormItem {
    id: number;
    category: 'รายจ่าย' | 'รายรับ';
    type: string; // ประเภทรายการ เช่น วัตถุดิบ, ค่าเช่า, ขายขนมปัง
    quantity: number;
}

interface Transaction {
    id: string;
    type: 'รายรับ' | 'รายจ่าย';
    date: string;
    amount: number;
    category: string;
    details: string;
    viewData: { label: string; amount: number; qty?: number; type?: string }[];
}

interface TransactionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: ModalMode;
    initialData?: Transaction;
}

const TransactionFormModal: React.FC<TransactionFormModalProps> = ({ isOpen, onClose, mode, initialData }) => {
    if (!isOpen) return null;

    const isViewMode = mode === 'view';
    const title = isViewMode ? (initialData?.type === 'รายรับ' ? 'รายละเอียดรายรับ' : 'รายละเอียดรายจ่าย') : 'เพิ่มรายการรายจ่าย';

    let buttonColor = 'bg-green-600 hover:bg-green-700';

    // State สำหรับโหมด Add
    const [items, setItems] = useState<FormItem[]>([
        { id: Date.now(), category: 'รายจ่าย', type: '', quantity: 0 }
    ]);

    // โหลดข้อมูลย่อยสำหรับโหมด View
    const viewItems = initialData?.viewData || [];

    // *** Logic การคำนวณราคารวม (สำหรับโหมด View) ***
    const totalViewAmount = viewItems.reduce((sum, item) => sum + item.amount, 0);

    // Handlers สำหรับโหมด Add
    const handleAddItem = (category: 'รายจ่าย' | 'รายรับ') => {
        setItems(prev => [...prev, { id: Date.now(), category, type: '', quantity: 0 }]);
    };

    const handleUpdateItem = (id: number, field: keyof FormItem, value: any) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("บันทึกรายการ:", items);
        onClose();
    };

    // Component สำหรับแสดง Input รายการย่อย
    const FormItemRow: React.FC<{ item: FormItem }> = ({ item }) => (
        <div className="grid grid-cols-4 gap-4 items-center mb-3">
            <div className="col-span-2">
                <input
                    type="text"
                    placeholder={`กรอกประเภทรายการ${item.category === 'รายจ่าย' ? 'รายจ่าย' : 'รายรับ'} เช่น ขนมปัง, เนย`}
                    value={item.type}
                    onChange={(e) => handleUpdateItem(item.id, 'type', e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal"
                    required
                />
            </div>

            <div className="col-span-1">
                <div className="flex items-center justify-between bg-gray-100 rounded-xl border border-gray-300 overflow-hidden">
                    <button
                        type="button"
                        onClick={() => handleUpdateItem(item.id, 'quantity', Math.max(0, item.quantity - 1))}
                        className="p-3 bg-gray-200 hover:bg-gray-300"
                    >
                        -
                    </button>
                    <span className="px-3 font-semibold w-10 text-center">{item.quantity}</span>
                    <button
                        type="button"
                        onClick={() => handleUpdateItem(item.id, 'quantity', item.quantity + 1)}
                        className="p-3 bg-gray-200 hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>
            </div>
            {/* Placeholder: ลบรายการ (ถ้าต้องการ) */}
        </div>
    );


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md" onClick={onClose}>
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
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

                    {/* *** โหมดดูรายละเอียด (View Mode) *** */}
                    {isViewMode && initialData && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                <span className="font-semibold text-lg">{initialData.type}</span>
                                <span className="font-semibold text-lg">{initialData.date}</span>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${initialData.type === 'รายรับ' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {initialData.category}
                                </span>
                            </div>

                            {/* ตารางรายละเอียด */}
                            <div className="divide-y divide-gray-100">
                                <div className="grid grid-cols-4 font-bold text-sm py-2 text-gray-600">
                                    <div className="col-span-2">{initialData.type === 'รายรับ' ? 'ร้านค้า/สินค้า' : 'ประเภท'}</div>
                                    <div>จำนวน</div>
                                    <div>ราคา</div>
                                </div>

                                {viewItems.map((item, index) => (
                                    <div key={index} className="grid grid-cols-4 py-2 text-sm text-text-primary">
                                        <div className="col-span-2">{item.label}</div>
                                        <div>{item.qty || '-'}</div>
                                        <div>{item.amount.toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between font-bold pt-4 border-t border-gray-300">
                                <span className="text-xl">รวม :</span>
                                <span className="text-xl">{totalViewAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    )}

                    {/* *** โหมดเพิ่มรายการ (Add Mode) *** */}
                    {!isViewMode && (
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Loop รายการรายจ่าย/รายรับ */}
                            {items.filter(i => i.category === 'รายจ่าย').map(item => <FormItemRow key={item.id} item={item} />)}
                            {items.filter(i => i.category === 'รายรับ').map(item => <FormItemRow key={item.id} item={item} />)}

                            {/* ปุ่มเพิ่มรายการ (ตามประเภท) */}
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => handleAddItem('รายจ่าย')}
                                    className="text-sm text-red-600 hover:underline"
                                >
                                    + เพิ่มรายการรายจ่าย
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleAddItem('รายรับ')}
                                    className="text-sm text-green-600 hover:underline"
                                >
                                    + เพิ่มรายการรายรับ
                                </button>
                            </div>


                            {/* ปุ่ม Action */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className={`w-full py-3 px-6 text-white font-bold rounded-xl transition-colors duration-200 shadow-lg ${buttonColor}`}
                                >
                                    เพิ่มข้อมูลสินค้า
                                </button>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
};

export default TransactionFormModal;