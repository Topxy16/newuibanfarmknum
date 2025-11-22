// app/(auth)/layout.tsx
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ใช้ min-h-screen และ flex เพื่อจัดให้อยู่ตรงกลาง
    <div className="flex items-center justify-center min-h-screen bg-bg-page p-4">
        {children}
    </div>
  );
}