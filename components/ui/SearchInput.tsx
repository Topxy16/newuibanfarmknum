// components/ui/SearchInput.tsx
import { Search } from 'lucide-react';

const SearchInput = () => {
  return (
    <div className="relative flex items-center w-80">
      <Search size={20} className="absolute left-3 text-gray-400" />
      <input
        type="text"
        placeholder="ค้นหา..."
        className="w-full pl-10 pr-4 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 bg-white text-black shadow-md" 
      />
    </div>
  );
};

export default SearchInput;