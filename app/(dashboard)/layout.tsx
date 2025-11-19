// desktop layout
'use client';

import { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen font-inter">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content */}
      <div
        className={`
          flex-1 w-full
          transition-all duration-300
          lg:ml-72  /* ชดเชยความกว้างของ sidebar เมื่ออยู่บน desktop */
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
