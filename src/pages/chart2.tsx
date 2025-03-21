import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Dhaka', value: 81, color: '#66cc99' },
  { name: 'Khulna', value: 74, color: '#6666ff' },
  { name: 'Rangpur', value: 61, color: '#ff9900' },
  { name: 'Rajshahi', value: 44, color: '#33cccc' },
  { name: 'Mymensingh', value: 34, color: '#9999ff' },
  { name: 'Barisal', value: 34, color: '#6699cc' },
  { name: 'Chittagong', value: 13, color: '#ff6666' },
];

export default function CustomPieChart() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Regional Distribution</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
}
