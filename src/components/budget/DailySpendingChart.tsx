import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell, ResponsiveContainer } from "recharts";
import { AlertTriangle } from "lucide-react";
import type { DailySpend } from "@/data/budget";

type Props = {
  dailySpending: DailySpend[];
  dailyBudget: number;
};

function CustomTooltip({ active, payload, label, dailyBudget }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  dailyBudget: number;
}) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const over = val > dailyBudget;
  return (
    <div className="rounded-xl border border-[#E8DED1] bg-white px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-[#1F261F]">{label}</p>
      <p className={over ? "text-[#E87565] font-medium" : "text-[#3C8B68] font-medium"}>
        ${val} {over ? "▲ over" : "✓ under"} budget
      </p>
    </div>
  );
}

export function DailySpendingChart({ dailySpending, dailyBudget }: Props) {
  const overBudgetDays = dailySpending.filter((d) => d.overBudget).length;

  if (dailySpending.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <p className="text-sm text-[#7F7A70]">No spending data yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-serif text-xl font-bold text-[#1F261F]">Daily Spending</h3>
        <div className="flex items-center gap-4 text-xs font-medium text-[#7F7A70]">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#3C8B68]" />Under Budget</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#E87565]" />Over Budget</span>
          <span className="flex items-center gap-1.5"><span className="h-px w-5 border-t-2 border-dashed border-[#7F7A70]" />Limit</span>
        </div>
      </div>

      <div className="mt-5 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailySpending} barCategoryGap="35%" margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8DED1" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#7F7A70", fontFamily: "Inter" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#7F7A70", fontFamily: "Inter" }} axisLine={false} tickLine={false} />
            <Tooltip content={(props) => <CustomTooltip {...props} dailyBudget={dailyBudget} />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
            <ReferenceLine y={dailyBudget} stroke="#7F7A70" strokeDasharray="5 4" strokeWidth={1.5} />
            <Bar dataKey="spent" radius={[5, 5, 0, 0]}>
              {dailySpending.map((entry) => (
                <Cell key={entry.day} fill={entry.overBudget ? "#E87565" : "#3C8B68"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {overBudgetDays > 0 && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-[#F8EDE0] bg-[#FEF6EE] px-4 py-3">
          <AlertTriangle className="h-4 w-4 shrink-0 text-[#C46A2D]" strokeWidth={2} />
          <p className="text-sm font-medium text-[#1F261F]">
            Over budget on <span className="font-bold text-[#C46A2D]">{overBudgetDays} day(s)</span>
          </p>
        </div>
      )}
    </div>
  );
}
