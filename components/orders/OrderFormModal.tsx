// components/orders/OrderFormModal.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { X, Trash2 } from 'lucide-react'; 
import Image from 'next/image'; 

// *** 1. กำหนดค่าคงที่ (Constants) ***
const PRODUCT_UNIT_PRICE = 100;
const PRODUCT_OPTIONS = [
  'ขนมปังกรอบเนยน้ำตาล',
  'ขนมปังกรอบพริกเผาหมูหยอง', // แก้ไขชื่อสินค้าให้ถูกต้อง
];
const MAX_ITEMS = 2; // จำนวนสินค้าสูงสุดที่อนุญาตให้เพิ่ม

// ใช้งานได้ 4 โหมด
type ModalMode = 'add' | 'edit' | 'delete' | 'view';

// Type สำหรับสินค้าแต่ละรายการในออเดอร์
interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
}

interface Order {
  id: string;
  orderDate: string; 
  deliveryDate: string; 
  customerName: string;
  phone: string;
  // อัปเดตให้รองรับรายการสินค้าหลายรายการ
  items: OrderItem[]; 
  totalPrice: number; 
  mapImage?: string; 
}

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  initialData?: Order;
}

const OrderFormModal: React.FC<OrderFormModalProps> = ({ isOpen, onClose, mode, initialData }) => {
  if (!isOpen) return null;

  const DUMMY_DATE_TODAY = '2025-11-09'; 
  const DUMMY_DATE_DELIVERY = '2025-11-11'; 

  // *** State สำหรับรายการสินค้า (Multi-item) ***
  const initialItems: OrderItem[] = initialData?.items || [
    { id: Date.now(), productName: PRODUCT_OPTIONS[0], quantity: 1 }
  ];

  const [orderDate, setOrderDate] = useState(initialData?.orderDate || DUMMY_DATE_TODAY);
  const [deliveryDate, setDeliveryDate] = useState(initialData?.deliveryDate || DUMMY_DATE_DELIVERY);
  const [customerName, setCustomerName] = useState(initialData?.customerName || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [orderItems, setOrderItems] = useState<OrderItem[]>(initialItems);

  useEffect(() => {
    if (initialData) {
      setOrderDate(initialData.orderDate);
      setDeliveryDate(initialData.deliveryDate);
      setCustomerName(initialData.customerName);
      setPhone(initialData.phone);
      // โหลด items จาก initialData หรือตั้งค่าเริ่มต้น
      setOrderItems(initialData.items || [{ id: Date.now(), productName: PRODUCT_OPTIONS[0], quantity: 1 }]);
    } else {
      setOrderDate(DUMMY_DATE_TODAY);
      setDeliveryDate(DUMMY_DATE_DELIVERY);
      setCustomerName('');
      setPhone('');
      setOrderItems([{ id: Date.now(), productName: PRODUCT_OPTIONS[0], quantity: 1 }]);
    }
  }, [initialData, mode]); 

  const isViewMode = mode === 'view';
  const isDeleteMode = mode === 'delete';
  const isEditMode = mode === 'edit';
  const isInputDisabled = isDeleteMode || isViewMode; 
  
  let title = 'เพิ่มออเดอร์';
  let buttonText = 'เพิ่มออเดอร์';
  let buttonColor = 'bg-green-600 hover:bg-green-700';
  if (isEditMode) {
    title = 'แก้ไขออเดอร์';
    buttonText = 'แก้ไขออเดอร์';
    buttonColor = 'bg-amber-700 hover:bg-amber-800';
  } else if (isDeleteMode) {
    title = 'ลบออเดอร์';
    buttonText = 'ลบออเดอร์';
    buttonColor = 'bg-red-600 hover:bg-red-700';
  } else if (isViewMode) {
    title = `รายละเอียดออเดอร์ #${initialData?.id || ''}`;
  }
  
  // *** 2. Logic คำนวณราคารวม (ใช้ useMemo เพื่อประสิทธิภาพ) ***
  const totalOrderPrice = useMemo(() => {
    return orderItems.reduce((sum, item) => {
      // ราคารวม = (ราคาต่อหน่วย 100 * จำนวน)
      return sum + (PRODUCT_UNIT_PRICE * item.quantity);
    }, 0);
  }, [orderItems]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${title} Order:`, { 
        orderDate, 
        deliveryDate, 
        customerName, 
        phone, 
        orderItems, 
        totalPrice: totalOrderPrice // ส่งราคารวมที่คำนวณแล้ว
    });
    onClose(); 
  };
  
  // *** 3. Handler สำหรับการเพิ่มรายการสินค้าใหม่ (จำกัดที่ 2 รายการ) ***
  const handleAddItem = () => {
    if (orderItems.length < MAX_ITEMS) {
        // กำหนดสินค้าเริ่มต้นเป็นตัวที่ 2 หากตัวแรกถูกเลือกแล้ว เพื่อความสะดวก
        const nextProduct = orderItems.length === 1 && orderItems[0].productName === PRODUCT_OPTIONS[0]
            ? PRODUCT_OPTIONS[1]
            : PRODUCT_OPTIONS[0];

        const newItem: OrderItem = { 
            id: Date.now(), 
            productName: nextProduct, 
            quantity: 1 
        };
        setOrderItems([...orderItems, newItem]);
    }
  };

  const handleUpdateItem = (id: number, field: keyof OrderItem, value: any) => {
    setOrderItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    // ต้องมีอย่างน้อย 1 รายการเสมอ
    if (orderItems.length > 1) { 
      setOrderItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };
  
  // Component สำหรับ Date Input (คงเดิม)
  interface DateInputProps { 
    value: string; 
    label: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  }
  
  const DateInput: React.FC<DateInputProps> = ({ value, label, onChange }) => (
    <div> 
      <input
        type="date" 
        placeholder={label}
        value={value}
        onChange={onChange} 
        disabled={isInputDisabled}
        className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal disabled:opacity-80"
      />
    </div>
  );


  // Component สำหรับจัดการสินค้าแต่ละรายการ
  interface OrderItemControlProps {
    item: OrderItem;
    onUpdate: (field: keyof OrderItem, value: any) => void;
    onRemove: () => void;
  }
  
  const OrderItemControl: React.FC<OrderItemControlProps> = ({ item, onUpdate, onRemove }) => {
    const isRemoveDisabled = orderItems.length === 1 || isInputDisabled;

    return (
      <div className="flex items-center gap-2 w-full">
        <div className="relative flex gap-2 items-center  rounded-xl flex-grow">
          {/* Select Input สำหรับเลือกสินค้า (ใช้ PRODUCT_OPTIONS) */}
          <select 
            value={item.productName} 
            onChange={(e) => onUpdate('productName', e.target.value)}
            disabled={isInputDisabled}
            className="p-3 border border-gray-300 bg-gray-100 text-text-primary font-normal disabled:opacity-80 rounded-xl"
          >
            {PRODUCT_OPTIONS.map(name => (
                <option key={name} value={name}>{name}</option>
            ))}
          </select>
          
          {/* ปุ่ม +/- และ จำนวน */}
          <div className="flex items-center text-text-primary bg-white border border-gray-300 rounded-xl overflow-hidden">
            <button 
              type="button"
              onClick={() => onUpdate('quantity', Math.max(1, item.quantity - 1))}
              disabled={isInputDisabled}
              className="p-3 hover:bg-gray-100 disabled:opacity-50"
            >
              -
            </button>
            <span className="p-3 font-semibold w-10 text-center">{item.quantity}</span>
            <button 
              type="button"
              onClick={() => onUpdate('quantity', item.quantity + 1)}
              disabled={isInputDisabled}
              className="p-3 hover:bg-gray-100 disabled:opacity-50"
            >
              +
            </button>

          </div>
        </div>
        
        {/* ปุ่มลบรายการสินค้า (แสดงเมื่อมีสินค้ามากกว่า 1 รายการ และไม่อยู่ในโหมด disabled) */}
        {!isInputDisabled && (
          <button
            type="button"
            onClick={onRemove}
            disabled={isRemoveDisabled}
            className={`p-2 rounded-full transition-colors duration-200 ${isRemoveDisabled ? 'text-gray-400' : 'bg-white shadow-md border border-gray-200 text-red-500 hover:bg-red-500 hover:text-white'}`}
            title="ลบรายการนี้"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    );
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md" onClick={onClose}>
      <div 
        // อัปเดต style modal color เป็น bg-white
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

          {/* ฟอร์มหลัก */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* *** 4. ปรับโครงสร้าง Grid Layout เพื่อสลับตำแหน่ง *** */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                
                {/* 1. วันที่สั่ง (Row 1 Col 1) */}
                <div>
                    <span className="text-sm font-bold text-text-primary block mb-2">วันที่สั่ง</span>
                    <DateInput 
                        value={orderDate} 
                        label="กรอกวันที่สั่ง" 
                        onChange={(e) => setOrderDate(e.target.value)} 
                    />
                </div>
                
                {/* 2. วันที่ต้องส่ง (Row 1 Col 2) */}
                <div>
                    <span className="text-sm font-bold text-text-primary block mb-2">วันที่ต้องส่ง</span>
                    <DateInput 
                        value={deliveryDate} 
                        label="กรอกวันที่ต้องส่ง" 
                        onChange={(e) => setDeliveryDate(e.target.value)} 
                    />
                </div>

                {/* 3. ชื่อผู้สั่งสินค้า (Row 2 Col 1) */}
                <div>
                    <span className="text-sm font-bold text-text-primary block mb-2">ชื่อผู้สั่งสินค้า</span>
                    <input
                        type="text"
                        placeholder="กรอกชื่อผู้สั่งสินค้า"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        disabled={isInputDisabled}
                        className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal disabled:opacity-80"
                        required
                    />
                </div>
                
                {/* 4. เบอร์โทรศัพท์ (Row 2 Col 2 - ถูกสลับมาอยู่คอลัมน์นี้) */}
                <div>
                    <span className="text-sm font-bold text-text-primary block mb-2">เบอร์โทรศัพท์</span>
                    <input
                        type="tel"
                        placeholder="กรอกเบอร์โทรศัพท์"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={isInputDisabled}
                        className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal disabled:opacity-80"
                        required
                    />
                </div>

                {/* 5. สินค้าที่สั่ง (Row 3 Col 1 - ถูกสลับมาอยู่คอลัมน์นี้) */}
                <div className="col-span-1">
                    <span className="text-sm font-bold text-text-primary block mb-2">สินค้าที่สั่ง</span>
                    
                    {orderItems.map((item) => (
                        <div key={item.id} className="mb-2">
                            <OrderItemControl 
                                item={item}
                                onUpdate={(field, value) => handleUpdateItem(item.id, field, value)}
                                onRemove={() => handleRemoveItem(item.id)}
                            />
                        </div>
                    ))}

                    {/* ปุ่ม "เพิ่มสินค้า" (แสดงเมื่อไม่อยู่ในโหมด disabled และจำนวนยังไม่ถึง MAX_ITEMS) */}
                    {!isInputDisabled && orderItems.length < MAX_ITEMS && (
                        <button 
                            type="button"
                            onClick={handleAddItem}
                            className="text-sm font-normal text-blue-600 cursor-pointer hover:underline block ml-auto mt-2"
                        >
                            เพิ่มสินค้า
                        </button>
                    )}
                </div>
                
                {/* 6. ราคารวม (Row 3 Col 2 - แสดงในทุกโหมด) */}
                <div className="flex items-start mt-8.5">
                    <p className="text-2xl font-bold text-text-primary">
                        ราคารวม : <span className="ml-2 text-green-600">{totalOrderPrice.toLocaleString()}</span> บาท
                    </p>
                </div>
            </div>

            {/* 7. ส่วนแผนที่ (เฉพาะโหมดดูรายละเอียด) */}
            {isViewMode && (
                <div className="space-y-4 pt-4">
                    <h3 className="text-xl font-bold text-text-primary">จุดส่งของ</h3>
                    <div className="relative w-full h-96 rounded-xl overflow-hidden border border-gray-300">
                        <Image
                            src={initialData?.mapImage || "/images/map-placeholder.jpg"}
                            alt="Delivery Map"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            )}

            {/* 8. ปุ่ม Action (ซ่อนในโหมด View) */}
            {!isViewMode && (
                <div className="pt-4">
                    <button
                        type="submit"
                        className={`w-full py-3 px-6 text-white font-bold rounded-xl transition-colors duration-200 shadow-lg ${buttonColor}`}
                    >
                        {buttonText}
                    </button>
                </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderFormModal;