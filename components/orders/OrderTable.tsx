import React from 'react';
import ActionMenu from './ActionMenu';

interface Order {
    id: string;
    orderDate: string;
    customerName: string;
    phone: string;
    deliveryDate: string;
    status: 'จัดส่งแล้ว' | 'รอจัดส่ง' | 'ยกเลิก';
}

interface OrderTableProps {
    orders: Order[];
    onView: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onView, onEdit, onDelete }) => {

    const getStatusStyle = (status: Order['status']) => {
        switch (status) {
            case 'จัดส่งแล้ว':
                return 'text-green-600 bg-green-100/50';
            case 'รอจัดส่ง':
                return 'text-amber-600 bg-amber-100/50';
            case 'ยกเลิก':
                return 'text-red-600 bg-red-100/50';
            default:
                return 'text-gray-600 bg-gray-100/50';
        }
    };

    return (
        <div className="bg-white overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">


                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">เลขออเดอร์</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">วันที่สั่ง</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ชื่อผู้สั่งสินค้า</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">เบอร์โทรศัพท์</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">วันที่ต้องส่ง</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">สถานะออเดอร์</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">เครื่องมือ</th>
                        </tr>
                    </thead>


                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        {orders.map((order, index) => (

                            <tr
                                key={order.id}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-[#F4F4F4]'}
                            >
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.orderDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.customerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.deliveryDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <ActionMenu
                                        orderId={order.id}
                                        onView={onView}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTable;