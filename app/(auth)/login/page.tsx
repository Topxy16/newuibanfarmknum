// app/(auth)/login/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import AuthCard from '../../../components/auth/AuthCard';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login Attempt:", { username, password });
        // *** Logic Authentication (API Call) จะอยู่ตรงนี้ ***
        // ถ้าสำเร็จ: redirect('/');
    };

    return (
        <AuthCard title="เข้าสู่ระบบ">
            <p className="text-sm text-gray-500 mb-8">
                ยินดีต้อนรับเข้าสู่ระบบบริหารจัดการสินค้าสำหรับ
                <br />ผู้ผลิต/ผู้ค้าส่งเบเกอรี่บ้านฟาร์มขนม
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* ชื่อผู้ใช้งาน */}
                <div>
                    <span className="text-sm font-bold text-text-primary block mb-2 text-left">ชื่อผู้ใช้งาน</span>
                    <input
                        type="text"
                        placeholder="กรอกชื่อผู้ใช้งาน"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal"
                        required
                    />
                </div>
                
                {/* รหัสผ่าน */}
                <div className="relative">
                    <span className="text-sm font-bold text-text-primary block mb-2 text-left">รหัสผ่าน</span>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="กรอกรหัสผ่าน"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal pr-10"
                        required
                    />
                    {/* ปุ่ม Show/Hide Password */}
                    {/* <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <Link href="#" className="text-xs text-blue-600 hover:underline block text-right mt-1">
                        ลืมรหัสผ่าน
                    </Link> */}
                </div>

                {/* ปุ่มเข้าสู่ระบบ */}
                <button
                    type="submit"
                    className="w-full py-3 mt-8 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors duration-200 shadow-lg"
                >
                    เข้าสู่ระบบ
                </button>
            </form>
            
            {/* ลิงก์สมัครสมาชิก */}
            <Link href="/register" className="text-sm text-gray-500 hover:text-blue-600 hover:underline block mt-4">
                สมัครสมาชิก
            </Link>
        </AuthCard>
    );
};

export default LoginPage;