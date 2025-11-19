// navbar
'use client';

import { Bell, Menu } from 'lucide-react';
import SearchInput from '../ui/SearchInput';

interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
    return (
        <nav className="flex items-center justify-between bg-gray-900 p-3 lg:p-4 rounded-3xl">
            {/* Mobile Menu */}
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-full text-gray-700 hover:bg-gray-100 mr-3 lg:hidden"
                    aria-label="Open menu"
                >
                    <Menu size={24} />
                </button>

            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 lg:gap-5 flex-1 justify-end">
                <div className="hidden lg:block ">
                    <SearchInput />
                </div>
                <button className="flex place-content-center w-10 h-10 relative p-2 rounded-full bg-gray-100 shadow-md">
                    <Bell size={20} className="text-gray-600" />
                </button>
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-gray-300" />
            </div>
        </nav>
    );
};

export default Navbar;
