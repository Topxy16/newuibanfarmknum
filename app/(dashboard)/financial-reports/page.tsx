// app/(dashboard)/financial-reports/page.tsx
'use client';

import { Plus, Search } from 'lucide-react';
import React, { useState } from 'react';
import StatCard from '../../../components/ui/StatCard';
import TransactionItem from '../../../components/financial/TransactionItem';
import TransactionFormModal from '../../../components/financial/TransactionFormModal';

interface Transaction {
    id: string;
    type: 'รายรับ' | 'รายจ่าย';
    date: string;
    amount: number;
    category: string; // หมวดหมู่
    details: string; // คำอธิบาย/ชื่อร้านค้า
    // สำหรับ Modal View
    viewData: { label: string; amount: number; qty?: number; type?: string }[];
}

type ModalMode = 'add' | 'view'; // มีแค่ Add และ View

const DUMMY_TRANSACTIONS: Transaction[] = [
    { id: 'T001', type: 'รายจ่าย', date: '25/10/2568', amount: 500, category: 'วัตถุดิบ', details: 'ซื้อแป้งทำขนมปัง', viewData: [{ label: 'ขนมปัง', amount: 140, qty: 10, type: 'วัตถุดิบ' }] },
    { id: 'T002', type: 'รายรับ', date: '25/10/2568', amount: 200, category: 'ขายได้', details: 'ขายขนมให้ร้านค้า A', viewData: [{ label: 'ร้านสองพี่น้อง', amount: 500, type: 'ขายได้' }] },
    { id: 'T003', type: 'รายจ่าย', date: '25/10/2568', amount: 500, category: 'วัตถุดิบ', details: 'ซื้อเนย/นม', viewData: [{ label: 'ขนมปัง', amount: 140, qty: 10, type: 'วัตถุดิบ' }] },
    { id: 'T004', type: 'รายจ่าย', date: '25/10/2568', amount: 500, category: 'วัตถุดิบ', details: 'ค่าแก๊สหุงต้ม', viewData: [{ label: 'ขนมปัง', amount: 140, qty: 10, type: 'วัตถุดิบ' }] },
];

const FinancialReportsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>('add');
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined);

    // คำนวณรายรับ/รายจ่ายรวม
    const totalRevenue = DUMMY_TRANSACTIONS.filter(t => t.type === 'รายรับ').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = DUMMY_TRANSACTIONS.filter(t => t.type === 'รายจ่าย').reduce((sum, t) => sum + t.amount, 0);

    const handleView = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setModalMode('view');
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedTransaction(undefined);
        setModalMode('add');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(undefined);
        setModalMode('add');
    };

    return (
        <div className="p-8 bg-bg-page min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-text-primary mb-6">รายงานการเงิน</h1>
                {/* ปุ่มเพิ่มรายการรายจ่าย */}
                <button
                    aria-label="เพิ่มรายการรายจ่าย"
                    onClick={handleAdd}
                    className="p-2 bg-white text-green-600 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                    <Plus size={24} className="p-0.5" />
                </button>
            </div>

            {/* Stat Card Section */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <StatCard
                    title="รายรับ"
                    value={totalRevenue.toLocaleString()}
                    unit="บาท"
                />
                <StatCard
                    title="รายจ่าย"
                    value={totalExpense.toLocaleString()}
                    unit="บาท"
                />
            </div>

            {/* Transaction List Header */}
            <div className=" mb-4 p-4 bg-white rounded-3xl shadow-md border border-gray-100">
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-bold text-text-primary">รายการรายรับ-รายจ่าย</h2>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-72">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="ค้นหารายการรายจ่าย เช่น วันที่ ขนมปัง เนย"
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal"
                            />
                        </div>



                    </div>
                </div>

                {/* Transaction List */}
                <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 divide-y divide-gray-100">
                    {DUMMY_TRANSACTIONS.map((transaction, index) => (
                        <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                            onViewDetail={() => handleView(transaction)}
                        />
                    ))}
                </div>

            </div>



            {/* Modal Component */}
            <TransactionFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                mode={modalMode}
                initialData={selectedTransaction}
            />
        </div>
    );
};

export default FinancialReportsPage;