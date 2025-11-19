
import { User, DollarSign } from 'lucide-react';

interface CustomerRankingProps {
  name: string;
  price: number;
}

const CustomerItem: React.FC<CustomerRankingProps> = ({ name, price }) => (
  <div className="flex justify-between items-center text-black">
    <div className="flex items-center gap-2">
      <User size={16} className="text-gray-500" />
      <span className="font-normal text-sm">{name}</span>
    </div>
    <span className="font-semibold text-sm">{price.toLocaleString()}฿</span>
  </div>
);

const CustomerCard = () => {
  const customer = [
    { name: 'ร้านชำ', price: 2000 },
    { name: 'ร้านชำ', price: 1000 },
    { name: 'ร้านชำ', price: 500 },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col gap-4 border border-gray-100">
      <h3 className="text-gray-500 text-sm font-normal">ลูกค้า</h3>
      <div className="flex flex-col gap-3 ml-2">
        {customer.map((customer, index) => (
          <CustomerItem key={index} name={customer.name} price={customer.price} />
        ))}
      </div>
    </div>
  );
};

export default CustomerCard;