// components/dashboard/SummaryCard.tsx
interface SummaryCardProps {
  title: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col justify-center items-center h-full border border-gray-100">
      <h3 className="text-gray-500 text-2xl font-normal">{title}</h3>
    </div>
  );
};

export default SummaryCard;