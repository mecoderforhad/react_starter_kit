import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'January', "2022": 30, "2023": 50, "2024": 40 },
  { name: 'February', "2022": 40, "2023": 70, "2024": 60 },
  { name: 'March', "2022": 80, "2023": 90, "2024": 70 },
  { name: 'April', "2022": 20, "2023": 30, "2024": 60 },
  { name: 'May', "2022": 40, "2023": 50, "2024": 70 },
  { name: 'June', "2022": 50, "2023": 80, "2024": 90 }
];

export default function StackedBarChart() {
  return (
    <div className="w-2/5 h-[400px] p-4 bg-[#0d1117] rounded-2xl border border-yellow-500">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis dataKey="name" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip wrapperStyle={{ backgroundColor: '#1f2937', color: 'white' }} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
          <Legend wrapperStyle={{ color: 'white' }} />
          <Bar dataKey="2022" stackId="a" fill="#3b82f6" />
          <Bar dataKey="2023" stackId="a" fill="#22c55e" />
          <Bar dataKey="2024" stackId="a" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
