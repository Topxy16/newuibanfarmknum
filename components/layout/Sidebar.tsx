// sidebar
'use client';
import {
    Package, LayoutDashboard, ShoppingBag, ScrollText, Users, Store, MapPin, LogOut, X
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth'; // นำเข้า Hook
import { usePathname } from 'next/navigation';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname();
    const { handleLogout } = useAuth();

    const navItems = [
        { name: 'แดชบอร์ด', icon: LayoutDashboard, href: '/' },
        { name: 'สินค้า', icon: Package, href: '/products' },
        { name: 'รายงานการเงิน', icon: ScrollText, href: '/financial-reports' },
        { name: 'ออเดอร์', icon: ShoppingBag, href: '/orders' },
        { name: 'หน้าร้านค้า', icon: Store, href: '/storefront' },
        { name: 'ลูกค้า', icon: Users, href: '/customers' },
        { name: 'แผนที่ร้านค้า', icon: MapPin, href: '/store-map' },
    ];

    return (
        <>
            {/* Backdrop สำหรับ mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-screen w-72 bg-white p-4 flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
            >
                {/* Logo */}
                <div>
                    <div className="flex items-center justify-between">
                        <Image
                            src="/images/breadicon.png"
                            width={36}
                            height={36}
                            alt="Bread Icon"
                            className="ml-2 mt-6"
                        />
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 mt-4 text-gray-500 hover:text-black"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="text-xs m-2 opacity-50 mt-8">เครื่องมือ</div>

                    <nav className="space-y-2 mt-2">
                        {navItems.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                (item.href !== '/' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`
                    flex items-center gap-3 px-5 py-3 rounded-xl transition-colors duration-200
                    ${isActive ? 'bg-gray-100 text-text-primary font-bold' : 'text-black hover:bg-gray-50'}
                  `}
                                >
                                    <item.icon size={20} className="text-gray-600" />
                                    <span className="font-normal">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout */}
                <button
                    onClick={() => {
                        onClose();
                        handleLogout(); // เรียกใช้ Logout
                    }}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200 w-full justify-start"
                >
                    <LogOut size={20} />
                    <span className="font-normal">ออกจากระบบ</span>
                </button>
            </aside>
        </>
    );
};

export default Sidebar;
