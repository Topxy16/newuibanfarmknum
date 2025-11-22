// app/(auth)/register/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import AuthCard from '../../../components/auth/AuthCard';
import { useRouter } from 'next/navigation';
// นำเข้า Alerts ที่เรามีอยู่แล้ว
import AlertSuccess from '../../../components/ui/AlertSuccess'; 
import AlertFail from '../../../components/ui/AlertFail';

// Type สำหรับสถานะ Alert
type AlertStatus = '' | 'success' | 'fail';

const RegisterPage: React.FC = () => {
    const router = useRouter();
    
    // States หลัก
    const [username, setName] = useState("");
    const [password, setPass] = useState("");
    const [tel, setTel] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [repassword, setRepassword] = useState("");

    // States สำหรับการควบคุม UI และ Logic
    const [alert, setAlert] = useState<AlertStatus>('');
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Real-time Check States
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
    const [isCheckingUser, setIsCheckingUser] = useState(false); // สถานะกำลังตรวจสอบ
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // ************* Logic Check State และ Button State *************
    useEffect(() => {
        const isPasswordMatch = password === repassword && password.length > 0;
        
        // ควบคุมสถานะปุ่ม: ต้องกรอกครบ, รหัสผ่านตรง, Username ใช้ได้
        const isFormValid = (
            username.trim() !== '' &&
            password.trim() !== '' &&
            tel.trim() !== '' &&
            fname.trim() !== '' &&
            lname.trim() !== '' &&
            isPasswordMatch &&
            isUsernameAvailable
        );
        setButtonDisabled(!isFormValid);

    }, [username, password, repassword, tel, fname, lname, isUsernameAvailable]);

    // ************* Logic ตรวจสอบ Username (Debounced Check) *************
    const checkuser = async (user: string) => {
        setName(user);
        if (user.trim() === "") {
            setIsUsernameAvailable(false);
            setAlertMessage('');
            return;
        }
        
        setIsCheckingUser(true);
        // API Call Check Username
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/check`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ 'u_userName': user }),
        });
        const resData = await res.json();
        
        setIsCheckingUser(false);

        if (resData.message === "A username can be used") {
            setIsUsernameAvailable(true);
            setAlertMessage('ชื่อผู้ใช้งานนี้สามารถใช้ได้');
        } else {
            setIsUsernameAvailable(false);
            setAlertMessage('ชื่อผู้ใช้งานนี้ถูกใช้ไปแล้ว');
        }
    };

    // ************* Logic การสมัครสมาชิก *************
    const register = async () => {
        setLoading(true);
        setAlert('');
        
        if (password !== repassword) {
            setAlertMessage('รหัสผ่านไม่ตรงกัน');
            setAlert('fail');
            setLoading(false);
            setTimeout(() => setAlert(''), 3000);
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    'u_userName': username,
                    'u_passWord': password,
                    'de_firstName': fname,
                    'de_lastName': lname,
                    'de_tel': tel
                }),
            });
            const resData = await res.json();

            if (resData.message === 'Register Success') {
                setAlertMessage('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
                setAlert('success');
                // นำทางไปหน้า Login
                setTimeout(() => {
                    router.push('/login'); 
                }, 2000);
            } else {
                setAlertMessage(`สมัครไม่สำเร็จ: ${resData.message}`);
                setAlert('fail');
            }
        } catch (error) {
            console.error('Register Error:', error);
            setAlertMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ');
            setAlert('fail');
        } finally {
            setLoading(false);
            setTimeout(() => setAlert(''), 3000);
        }
    };

    // Helper Component สำหรับ Icon Check/Cross
    const CheckIcon = ({ isValid, isLoading }: { isValid: boolean, isLoading: boolean }) => {
        if (isLoading) return <div className="ml-2 size-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>;
        if (username.trim() === '') return null;
        
        return (
            <div className="ml-2">
                {isValid ? (
                    <CheckCircle size={20} className="text-green-600" />
                ) : (
                    <XCircle size={20} className="text-red-600" />
                )}
            </div>
        );
    };


    const [showPassword, setShowPassword] = useState(false);


    return (
        <AuthCard title="สมัครสมาชิก">
            
            {/* ALERT BOXES */}
            {alert === 'success' && <AlertSuccess 
                message='สมัครสมาชิกสำเร็จ' 
                detail={alertMessage} 
                show={true} 
                onClose={() => setAlert('')} 
            />}
            {alert === 'fail' && <AlertFail 
                message='สมัครสมาชิกไม่สำเร็จ' 
                detail={alertMessage} 
                show={true} 
                onClose={() => setAlert('')} 
            />}
            
            <form onSubmit={(e) => { e.preventDefault(); register(); }} className="space-y-4 pt-4">
                
                {/* 1. ชื่อผู้ใช้งาน */}
                <div>
                    <span className="text-sm font-bold text-text-primary block mb-2 text-left">ชื่อผู้ใช้งาน</span>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="กรอกชื่อผู้ใช้งาน"
                            className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal"
                            onChange={(e) => checkuser(e.target.value)}
                            required
                        />
                        {/* ไอคอนตรวจสอบชื่อผู้ใช้ */}
                        <CheckIcon isValid={isUsernameAvailable} isLoading={isCheckingUser} />
                    </div>
                    {/* Message ตรวจสอบ */}
                    {alertMessage && username.trim() !== '' && !isCheckingUser && (
                        <p className={`text-xs text-left mt-1 ${isUsernameAvailable ? 'text-green-600' : 'text-red-600'}`}>
                            {alertMessage}
                        </p>
                    )}
                </div>
                
                {/* 2. ชื่อและนามสกุล */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <span className="text-sm font-bold text-text-primary block mb-2 text-left">ชื่อ</span>
                        <input type="text" placeholder="ชื่อ" onChange={(e) => setFname(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal" required />
                    </div>
                    <div className="flex-1">
                        <span className="text-sm font-bold text-text-primary block mb-2 text-left">สกุล</span>
                        <input type="text" placeholder="สกุล" onChange={(e) => setLname(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal" required />
                    </div>
                </div>

                 {/* 3. เบอร์โทรศัพท์ */}
                 <div>
                    <span className="text-sm font-bold text-text-primary block mb-2 text-left">เบอร์โทรศัพท์</span>
                    <input type="tel" placeholder="กรอกเบอร์โทรศัพท์" onChange={(e) => setTel(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal" required />
                </div>
                
                {/* 4. รหัสผ่าน */}
                <div className="relative">
                    <span className="text-sm font-bold text-text-primary block mb-2 text-left">รหัสผ่าน</span>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="รหัสผ่าน"
                        onChange={(e) => setPass(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal pr-10"
                        required
                    />
                     <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[44px] text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                 {/* 5. ยืนยันรหัสผ่าน */}
                <div className="relative">
                    <span className="text-sm font-bold text-text-primary block mb-2 text-left">ยืนยันรหัสผ่าน</span>
                    <div className="flex items-center">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="ยืนยันรหัสผ่าน"
                            onChange={(e) => setRepassword(e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary font-normal"
                            required
                        />
                         {/* ไอคอนตรวจสอบรหัสผ่าน */}
                        {repassword.length > 0 && <CheckIcon isValid={password === repassword} isLoading={false} />}
                    </div>

                </div>

                {/* ปุ่มสมัครสมาชิก */}
                <button
                    type="submit"
                    disabled={buttonDisabled || loading}
                    className={`w-full py-3 mt-8 font-bold rounded-xl transition-colors duration-200 shadow-lg ${!buttonDisabled 
                        ? 'bg-green-600 hover:bg-green-800 text-white' 
                        : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        }`}
                >
                    {loading ? 'กำลังดำเนินการ...' : 'สมัครสมาชิก'}
                </button>
            </form>
            
            <Link href="/login" className="text-sm text-gray-500 hover:text-blue-600 hover:underline block mt-4">
                เข้าสู่ระบบ
            </Link>
        </AuthCard>
    );
};

export default RegisterPage;