
interface OrderStatProps {
    total: number;
    unsuccess: number;
    success: number;
}

const ProductItem: React.FC<OrderStatProps> = ({ total, unsuccess, success }) => (
       
        <div className="justify-between items-center text-black">
          <h3 className="text-gray-500 text-sm font-normal">ออเดอร์</h3>
          <div className="grid grid-cols-3 gap-4 text-center mt-6">
            <div>
              <span className="text-2xl font-bold text-black">{total}</span>
              <p className="text-sm text-gray-500 font-normal">ทั้งหมด</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-black">{unsuccess}</span>
              <p className="text-sm text-gray-500 font-normal">รอจัดส่ง</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-black">{success}</span>
              <p className="text-sm text-gray-500 font-normal">จัดส่งสำเร็จ</p>
            </div>
          </div>
        </div>
   
);

const OrderCard = () => {
    const orders = [
        { total: 16, unsuccess: 10 ,success: 6},
    ];

    return (
        <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col gap-4 border border-gray-100">
            <div className="flex flex-col gap-3">
                {orders.map((orders, index) => (
                    <ProductItem key={index} total={orders.total} unsuccess={orders.unsuccess} success={orders.success}/>
                ))}
            </div>
        </div>
    );
};

export default OrderCard;