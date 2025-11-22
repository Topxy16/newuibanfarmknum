// app/(dashboard)/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuthStatus } from '../../hooks/useAuth'; // นำเข้า Logic ตรวจสอบ
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State สำหรับรอการตรวจสอบ
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await checkAuthStatus();
      if (!loggedIn) {
        // ถ้าไม่มี Token หรือ Token ไม่ถูกต้อง ให้นำไปหน้า Login
        router.replace('/login'); 
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [router]);
  
  // ถ้ากำลังโหลด หรือยังไม่ได้ Login ให้แสดงหน้า Loading หรือ null ไปก่อน
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">กำลังตรวจสอบสิทธิ์...</div>;
  }
  
  // โค้ดส่วนแสดงผลเมื่อผ่านการตรวจสอบ
  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div
        className={`
          flex-1 w-full
          transition-all duration-300
          lg:ml-72
        `}
      >
        <div className="p-4 lg:p-6">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="bg-gray-900 rounded-3xl mt-4 h-[calc(100vh-90px)] overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}