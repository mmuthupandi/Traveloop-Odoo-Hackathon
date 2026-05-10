import { List } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type PackingSummaryCardProps = {
  packed: number;
  total: number;
};

export function PackingSummaryCard({ packed, total }: PackingSummaryCardProps) {
  const remaining = total - packed;
  const pct = total > 0 ? Math.round((packed / total) * 100) : 0;

  const data = [
    { value: packed, color: "#2F4F3E" },
    { value: remaining, color: "#F0EDE8" }
  ];

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <h3 className="font-serif text-lg font-bold text-[#1F261F]">Packing Summary</h3>

      {/* Donut chart */}
      <div className="relative mx-auto mt-4 h-[160px] w-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={72}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-2xl font-bold text-[#1F261F]">
            {packed} / {total}
          </span>
          <span className="text-xs font-medium text-[#7F7A70]">Packed</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2F4F3E]" />
            <span className="text-sm font-medium text-[#1F261F]">Packed</span>
          </div>
          <span className="text-sm font-bold text-[#1F261F]">
            {packed} ({pct}%)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8DED1]" />
            <span className="text-sm font-medium text-[#1F261F]">Remaining</span>
          </div>
          <span className="text-sm font-bold text-[#1F261F]">
            {remaining} ({100 - pct}%)
          </span>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#2F4F3E]/20 py-2.5 text-sm font-semibold text-[#2F4F3E] transition-all duration-200 hover:bg-[#2F4F3E] hover:text-white"
      >
        <List className="h-4 w-4" />
        View Packing List
      </button>
    </div>
  );
}
