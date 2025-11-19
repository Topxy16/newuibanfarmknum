// components/financial/TransactionItem.tsx
import React from 'react';
import { ChevronRight, Trash2 } from 'lucide-react';

interface TransactionItemProps {
  transaction: {
    type: 'รายรับ' | 'รายจ่าย';
    date: string;
    amount: number;
    category: string;
    details: string;
  };
  onViewDetail: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onViewDetail }) => {
  const isRevenue = transaction.type === 'รายรับ';
  const typeClass = isRevenue ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
  const categoryClass = isRevenue ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700';

  return (
    <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={onViewDetail}>
      
      {/* ซ้าย: ประเภท, วันที่, รายละเอียด */}
      <div className="flex items-center gap-4">
        {/* ประเภท: รายรับ/รายจ่าย */}
        <span className={`px-3 py-1 text-sm font-bold rounded-full ${typeClass}`}>
          {transaction.type}
        </span>
        
        {/* วันที่ */}
        <span className="text-sm font-semibold text-gray-500">{transaction.date}</span>
        
        {/* รายละเอียด/คำอธิบาย */}
        <span className="text-sm font-normal text-text-primary">{transaction.details}</span>
      </div>

      {/* ขวา: จำนวนเงิน, หมวดหมู่, ปุ่ม Action */}
      <div className="flex items-center gap-3">
        
        {/* จำนวนเงิน */}
        <span className="text-lg font-bold text-text-primary">
          {transaction.amount.toLocaleString()} บาท
        </span>
        
        {/* หมวดหมู่ */}
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryClass}`}>
          {transaction.category}
        </span>

        {/* ปุ่มลบ (ถ้ามี) */}
        <button 
          className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
          onClick={(e) => { e.stopPropagation(); console.log('Delete Transaction'); }}
          aria-label="ลบรายการ"
        >
          <Trash2 size={18} />
        </button>
        
        <ChevronRight size={20} className="text-gray-400" />
      </div>
    </div>
  );
};

export default TransactionItem;