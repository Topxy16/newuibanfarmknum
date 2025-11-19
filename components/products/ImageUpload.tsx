
import { Camera } from 'lucide-react';
import React from 'react';

const ImageUpload: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-60 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
      <Camera size={48} className="text-gray-400" />
      <p className="mt-2 text-sm text-gray-500">เพิ่มรูปภาพ</p>
      {/* Input จริงสำหรับอัปโหลด (ซ่อนไว้) */}
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        // ในอนาคตคุณสามารถเพิ่ม ref เพื่อเรียกใช้ onClick() ได้
      />
    </div>
  );
};

export default ImageUpload;