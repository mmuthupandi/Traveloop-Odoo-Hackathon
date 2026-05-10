import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { budgetCategories, donutColors, summaryStats } from "@/data/budget";

const data = budgetCategories.map((c, i) => ({
  name: c.label,
  value: c.spent,
  color: donutColors[i],
  pct: Math.round((c.spent / summaryStats.totalSpent) * 100)
}));

function CustomTooltip({
  active,
  payload
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string; pct: number } }>;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-xl border border-[#E8DED1] bg-white px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-[#1F261F]">{d.name}</p>
      <p className="text-[#7F7A70]">
        ${d.value} · {d.payload.pct}%
      </p>
    </div>
  );
}

export function BudgetDonutChart() {
  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <h3 className="font-serif text-xl font-bold text-[#1F261F]">
        Budget Breakdown
      </h3>

      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
        {/* Donut */}
        <div className="relative h-[200px] w-[200px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-serif text-2xl font-bold text-[#1F261F]">
              ${summaryStats.totalSpent}
            </span>
            <span className="text-[10px] font-medium text-[#7F7A70]">
              of ${summaryStats.totalBudget}
            </span>
          </div>
        </div>

        {/* Legend */}
        <ul className="w-full space-y-2.5">
          {data.map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <span className="text-sm font-medium text-[#1F261F]">{d.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#1F261F]">
                  ${d.value}
                </span>
                <span className="w-8 text-right text-xs font-medium text-[#7F7A70]">
                  {d.pct}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
