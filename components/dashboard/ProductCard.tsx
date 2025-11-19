
import { Package, DollarSign } from 'lucide-react';

interface ProductItemProps {
  name: string;
  price: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ name, price }) => (
  <div className="flex justify-between items-center text-black">
    <div className="flex items-center gap-2">
      <Package size={16} className="text-gray-500" />
      <span className="font-normal text-sm">{name}</span>
    </div>
    <span className="font-semibold text-sm">{price.toLocaleString()}฿</span>
  </div>
);

const ProductCard = () => {
  const products = [
    { name: 'ของที่ระลึกแบบอบอุ่น', price: 2000 },
    { name: 'ของที่ระลึกแบบเด็กๆ', price: 1000 },
    { name: 'ของที่ระลึก', price: 500 },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col gap-4 border border-gray-100">
      <h3 className="text-gray-500 text-sm font-normal">สินค้า</h3>
      <div className="flex flex-col gap-3 ml-2">
        {products.map((product, index) => (
          <ProductItem key={index} name={product.name} price={product.price} />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;