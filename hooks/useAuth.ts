// hooks/useAuth.ts
import { useRouter } from 'next/navigation';

// ดึง Base URL จาก Environment Variable (ต้องมีใน .env.local)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * ฟังก์ชันสำหรับตรวจสอบ Token และสถานะ Login
 * @returns true หาก Token ถูกต้องและใช้งานได้
 */
export const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const check = await fetch(`${API_BASE_URL}/auth/checkLogin`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        const res = await check.json();
        
        // สถานะ 1 ในโค้ดเก่าของคุณหมายถึง Login สำเร็จ
        return res.status === 1; 

    } catch (error) {
        console.error("Error checking auth status:", error);
        return false;
    }
};

/**
 * Custom Hook สำหรับใช้จัดการ Authentication Logic
 */
export const useAuth = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    const handleLoginSuccess = (token: string) => {
        localStorage.setItem('token', token);
        // ใช้ setTimeout เพื่อให้ Alert แสดงผลก่อน
        setTimeout(() => {
            router.push('/'); // ไปหน้า Dashboard หลัก
        }, 500); 
    };

    return { checkAuthStatus, handleLogout, handleLoginSuccess };
};