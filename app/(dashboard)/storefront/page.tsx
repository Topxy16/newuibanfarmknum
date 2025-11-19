// app/(dashboard)/storefront/page.tsx
'use client';

import React, { useState } from 'react';
import ProductConfigCard from '../../../components/storefront/ProductConfigCard';
import LiffPreview from '../../../components/storefront/LiffPreview';

// ข้อมูลสินค้าที่เรามี (ใช้สำหรับทั้ง Admin และ Preview)
const INITIAL_PRODUCTS = [
  { 
    id: 1, 
    title: "ขนมปังกรอบเนยน้ำตาล", 
    imageUrl: "/images/product-placeholder.jpg", 
    isAvailable: true,
    price: 100
  },
  { 
    id: 2, 
    title: "ขนมปังกรอบพริกเผาหมูหยอง", 
    imageUrl: "/images/product-placeholder-2.jpg", 
    isAvailable: false,
    price: 120
  },
];

const StorefrontPage: React.FC = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null); // State สำหรับ URL Banner

  // Handler สำหรับสลับสถานะสินค้า
  const handleToggleAvailability = (id: number) => {
    setProducts(prevProducts => 
      prevProducts.map(p => 
        p.id === id ? { ...p, isAvailable: !p.isAvailable } : p
      )
    );
  };
  
  // Handler สำหรับเปลี่ยน Banner
  const handleBannerChange = (url: string) => {
    setBannerUrl(url);
  };

  // Handler สำหรับลบ Banner
  const handleBannerRemove = () => {
    if (bannerUrl) {
      URL.revokeObjectURL(bannerUrl); // คืนทรัพยากรที่ใช้สร้าง URL ชั่วคราว
    }
    setBannerUrl(null);
  };

  // กรองสินค้าที่พร้อมขายสำหรับส่งไป Preview
  const availableProducts = products.filter(p => p.isAvailable).map(p => ({
    title: p.title,
    imageUrl: p.imageUrl,
    price: p.price
  }));


  return (
    <div className="p-8 bg-bg-page min-h-screen"> 
      <h1 className="text-2xl font-bold text-text-primary mb-6">หน้าร้านค้า</h1>

      {/* Grid หลัก: 1 ส่วนสำหรับ Config, 1 ส่วนสำหรับ Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        
        {/* คอลัมน์ซ้าย: Store Configuration (2/3 ของพื้นที่) */}
        <div className="col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-text-primary pb-2 mb-4">การจัดการสินค้าหน้าร้าน</h2>
          
          {/* List Configuration Cards */}
          <div className="space-y-4">
            {products.map(product => (
              <ProductConfigCard
                key={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                isAvailable={product.isAvailable}
                onToggle={() => handleToggleAvailability(product.id)}
              />
            ))}
          </div>
          
          {/* ข้อมูลอื่นๆ ที่เกี่ยวข้องกับร้านค้า */}
          {/* <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-bold">ข้อมูลร้านค้า</h3>
            <p className="text-gray-600 mt-2">ที่อยู่ร้าน, เวลาทำการ, การตั้งค่าการแจ้งเตือน LIFF</p>
          </div> */}
        </div>

        {/* คอลัมน์ขวา: LIFF Preview (1/3 ของพื้นที่) */}
        <div className="col-span-1">
            <LiffPreview
              products={availableProducts}
              currentBannerUrl={bannerUrl || "/images/default-banner.jpg"} // ใช้ default ถ้าไม่มี
              onBannerChange={handleBannerChange}
              onBannerRemove={handleBannerRemove}
            />
        </div>

      </div>
    </div>
  );
};

export default StorefrontPage;