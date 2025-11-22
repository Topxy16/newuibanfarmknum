// app/(auth)/login/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import AuthCard from '../../../components/auth/AuthCard'; // ปรับ Path
import { useRouter } from 'next/navigation';
import { useAuth, checkAuthStatus } from '../../../hooks/useAuth'; // นำเข้า Hook
// *สมมติว่าคุณมี Alert Component อยู่ใน components/ui/*
import AlertSuccess from '../../../components/ui/AlertSuccess'; 
import AlertFail from '../../../components/ui/AlertFail'; 

const LoginPage: React.FC = () => {
    const { handleLoginSuccess } = useAuth();
    const router = useRouter();
    
    // State สำหรับ Form และ Alert
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState<'' | 'success' | 'fail'>('');
    const [loading, setLoading] = useState(false);
    
    // Logic: 1. ตรวจสอบ Token เมื่อเข้าถึงหน้า
    useEffect(() => {
        const checkToken = async () => {
            const loggedIn = await checkAuthStatus();
            if (loggedIn) {
                // หากมี Token ถูกต้อง ให้ไปหน้าหลักทันที
                router.replace('/'); 
            }
        };
        checkToken();
    }, [router]);

    // Logic: 2. การเข้าสู่ระบบ
    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setAlert('');
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ 'username': username, 'password': password }),
            });
            const resData = await res.json();

            if (resData.status === 1 && resData.token) {
                setAlert('success');
                handleLoginSuccess(resData.token); // จัดเก็บ Token และนำทาง
            } else {
                setAlert('fail');
            }
        } catch (error) {
            console.error('Login Error:', error);
            setAlert('fail');
        } finally {
            setLoading(false);
            setTimeout(() => setAlert(''), 3000);
        }
    };

    return (
        <AuthCard title="เข้าสู่ระบบ">
            {/* Alert Components (ปรับใช้ตาม Alert เดิมของคุณ) */}
            {alert === 'success' && <AlertSuccess message='เข้าสู่ระบบสำเร็จ' detail='กำลังนำทาง...' show={true} onClose={() => {}} />}
            {alert === 'fail' && <AlertFail message='เข้าสู่ระบบไม่สำเร็จ' detail='ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' show={true} onClose={() => {}} />}
            
            {/* ... (เนื้อหาข้อความต้อนรับเดิม) ... */}

            <form onSubmit={login} className="space-y-4">
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
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 bottom-9 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <Link href="#" className="text-xs text-blue-600 hover:underline block text-right mt-2">
                        ลืมรหัสผ่าน
                    </Link>
                </div>

                {/* ปุ่มเข้าสู่ระบบ */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 mt-8 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors duration-200 shadow-lg disabled:bg-gray-400"
                >
                    {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                </button>
            </form>
            
            <Link href="/register" className="text-sm text-gray-500 hover:text-blue-600 hover:underline block mt-4">
                สมัครสมาชิก
            </Link>
        </AuthCard>
    );
};

export default LoginPage;