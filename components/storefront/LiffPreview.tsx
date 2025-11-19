// components/storefront/LiffPreview.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

interface LiffPreviewProps {
  products: { title: string; imageUrl: string; price: number }[];
  currentBannerUrl: string;
  onBannerChange: (url: string) => void;
  onBannerRemove: () => void;
}

const LiffPreview: React.FC<LiffPreviewProps> = ({ products, currentBannerUrl, onBannerChange, onBannerRemove }) => {
  
  // จำลองการอัปโหลดรูปภาพ (ใช้ใน Admin View)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      onBannerChange(url);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-bg-page h-full">
      
      {/* การ์ดจำลองมือถือ (Phone Mockup) */}
      <div className="relative w-full max-w-sm h-[650px] bg-gray-900 rounded-[3rem] shadow-2xl border-8 border-gray-700 overflow-hidden">
        
        {/* Notch จำลอง */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-gray-800 rounded-b-xl z-20"></div>
        
        {/* หน้าจอ LIFF */}
        <div className="relative h-full w-full bg-white overflow-y-auto pt-4">
          
          {/* ส่วน Banner (Admin Tools: Upload/Remove) */}
          <div className="px-4 mb-4 mt-6">
            <h3 className="text-sm font-bold text-gray-700 mb-2">ตั้งค่า Banner โปรโมชั่น</h3>
            
            <div className="relative h-32 w-full rounded-lg overflow-hidden bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center">
              {!currentBannerUrl ? (
                // แสดงรูป Banner
                <>
                  <Image src={currentBannerUrl} alt="Promotion Banner" fill style={{ objectFit: 'cover' }} />
                  {/* ปุ่มลบ Banner */}
                  <button onClick={onBannerRemove} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full z-10 hover:bg-red-600 transition-colors">
                    <X size={16} />
                  </button>
                </>
              ) : (
                // ปุ่มอัปโหลด
                <label className="flex flex-col items-center text-gray-500 cursor-pointer p-4">
                  <Upload size={24} />
                  <span className="text-xs mt-1">อัปโหลดรูป Banner (1:3)</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
              )}
            </div>
          </div>

          {/* ส่วน List สินค้า (จำลองมุมมองลูกค้า) */}
          <div className="px-4 space-y-3 pb-4">
            <h3 className="text-lg font-bold text-text-primary">สินค้าแนะนำ</h3>
            {products.map((product, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                <Image src='/images/pungkoob.jpg' alt={product.title} width={48} height={48} className="object-cover rounded-md" />
                <div className="flex-grow">
                  <p className="text-sm font-semibold">{product.title}</p>
                  <p className="text-xs text-gray-500">{product.price.toLocaleString()} บาท</p>
                </div>
                {/* ปุ่มเพิ่มในตะกร้า (จำลอง) */}
                <button className="bg-green-600 text-white text-xs px-3 py-1 rounded-full hover:bg-green-700 transition-colors">
                    +
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default LiffPreview;