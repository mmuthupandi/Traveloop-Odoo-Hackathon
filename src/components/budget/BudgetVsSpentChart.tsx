import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { BudgetCategory } from "@/data/budget";

type Props = { categories: BudgetCategory[] };

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[#E8DED1] bg-white px-3 py-2 shadow-lg text-xs">
      <p className="mb-1 font-semibold text-[#1F261F]">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: ${p.value}
        </p>
      ))}
    </div>
  );
}

export function BudgetVsSpentChart({ categories }: Props) {
  const data = categories.map((c) => ({
    name: c.label === "Food & Drinks" ? "Food" : c.label.length > 8 ? c.label.slice(0, 8) : c.label,
    Budget: c.budget,
    Spent: c.spent,
  }));

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <h3 className="font-serif text-xl font-bold text-[#1F261F]">Budget vs Spent</h3>
      <div className="mt-5 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%" barGap={4} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8DED1" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#7F7A70", fontFamily: "Inter" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#7F7A70", fontFamily: "Inter" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: "#7F7A70", paddingTop: 12 }} />
            <Bar dataKey="Budget" fill="#E8DED1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Spent" fill="#2F4F3E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
