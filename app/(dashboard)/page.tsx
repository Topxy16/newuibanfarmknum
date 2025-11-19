// app/(dashboard)/page.tsx
import StatCard from '../../components/dashboard/StatCard';
import ProductCard from '../../components/dashboard/ProductCard';
import SummaryCard from '../../components/dashboard/SummaryCard';
import CustomerCard from '../../components/dashboard/CustomerCard';
import OrderStatCard from '../../components/dashboard/OrderStatCard';

const DashboardPage = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-black mb-14">แดชบอร์ด</h2>

      {/* Top Row: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="ออเดอร์" value={12} unit="วันนี้" />
        <StatCard title="สินค้า" value={2} />
        <StatCard title="ยอดการขาย" value={3600} unit="วันนี้" />
        <StatCard title="ลูกค้า" value={6} unit="คน" description="ไม่นับเฉพาะ" />
      </div>
      <div className='bg-gray-300 p-[1px] mb-8'></div>
      {/* Middle Row: Order Status & Product List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <OrderStatCard />
        <ProductCard />
        <CustomerCard /> {/* ตัวอย่างการใช้ซ้ำ หรือคุณอาจจะใช้เป็น Product Sales Chart แทน */}
      </div>

      {/* Bottom Row: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard title="สรุปการขาย สัปดาห์" />
        <SummaryCard title="สรุปการขาย เดือน" />
      </div>
    </div>
  );
};

export default DashboardPage;