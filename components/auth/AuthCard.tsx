// components/auth/AuthCard.tsx
import React from 'react';

interface AuthCardProps {
    title: string;
    children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children }) => {
    return (
        // ใช้ bg-white, rounded-3xl, shadow-xl คล้าย Modal/Card อื่น ๆ
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm text-center border border-gray-100/50">
            <h1 className="text-3xl font-bold text-text-primary mb-6">{title}</h1>
            {children}
        </div>
    );
};

export default AuthCard;