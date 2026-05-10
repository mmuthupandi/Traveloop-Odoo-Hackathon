import { Lightbulb } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { BudgetCategory } from "@/data/budget";
import { donutColors, smartTipByTrip } from "@/data/budget";

type Props = {
  categories: BudgetCategory[];
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  avgCostPerDay: number;
  tripId: string;
};

export function BudgetBottomCards({ categories, totalBudget, totalSpent, remaining, avgCostPerDay, tripId }: Props) {
  const topCat = [...categories].sort((a, b) => b.spent - a.spent)[0];
  const topPct = totalSpent > 0 && topCat ? Math.round((topCat.spent / totalSpent) * 100) : 0;
  const miniDonutData = topCat
    ? [{ value: topCat.spent }, { value: Math.max(0, totalSpent - topCat.spent) }]
    : [{ value: 1 }, { value: 0 }];

  const tip = smartTipByTrip[tripId] ??
    (remaining > 0
      ? `You're doing great! 🎉 You're under budget by $${remaining.toLocaleString()}. Keep it up!`
      : `You've exceeded your budget by $${Math.abs(remaining).toLocaleString()}. Review your expenses.`);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Budget Summary */}
      <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <h3 className="font-serif text-lg font-bold text-[#1F261F]">Budget Summary</h3>
        <ul className="mt-4 space-y-3">
          {[
            { label: "Planned Budget",  value: `$${totalBudget.toLocaleString()}` },
            { label: "Total Spent",     value: `$${totalSpent.toLocaleString()}` },
            { label: "Remaining",       value: `$${remaining.toLocaleString()}` },
            { label: "Avg. Cost/Day",   value: `$${avgCostPerDay}` },
          ].map((row) => (
            <li key={row.label} className="flex items-center justify-between border-b border-[#F0EDE8] pb-3 last:border-0 last:pb-0">
              <span className="text-sm text-[#7F7A70]">{row.label}</span>
              <span className={cn("text-sm font-bold", row.label === "Remaining" && remaining < 0 ? "text-[#E87565]" : "text-[#1F261F]")}>
                {row.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Spending Category */}
      <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <h3 className="font-serif text-lg font-bold text-[#1F261F]">Top Spending Category</h3>
        <div className="mt-5 flex flex-col items-center gap-4">
          <div className="relative h-[120px] w-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={miniDonutData} cx="50%" cy="50%" innerRadius={38} outerRadius={54}
                  startAngle={90} endAngle={-270} paddingAngle={2} dataKey="value" strokeWidth={0}>
                  <Cell fill={donutColors[0]} />
                  <Cell fill="#F0EDE8" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-lg font-bold text-[#1F261F]">{topPct}%</span>
            </div>
          </div>
          {topCat && topCat.spent > 0 ? (
            <div className="text-center">
              <p className="text-base font-bold text-[#1F261F]">{topCat.label}</p>
              <p className="text-sm text-[#7F7A70]">${topCat.spent} ({topPct}%)</p>
            </div>
          ) : (
            <p className="text-sm text-[#7F7A70]">No expenses yet</p>
          )}
        </div>
        <div className="mt-4 rounded-xl bg-[#F7F4EE] px-4 py-3">
          <p className="text-xs font-medium text-[#7F7A70]">
            {topCat && topCat.spent > 0 ? `${topCat.label} is your top spending category.` : "Add expenses to see your top category."}
          </p>
        </div>
      </div>

      {/* Smart Tip */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E8DED1]/60 bg-gradient-to-br from-[#EAF4EE] to-[#F7F4EE] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="pointer-events-none absolute bottom-0 right-0 opacity-20">
          <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
            <path d="M0 100 L50 20 L100 60 L140 10 L140 100 Z" fill="#2F4F3E" />
            <path d="M60 100 L90 45 L120 70 L140 40 L140 100 Z" fill="#3C8B68" opacity="0.6" />
          </svg>
        </div>
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF6EE]">
              <Lightbulb className="h-5 w-5 text-[#C46A2D]" strokeWidth={1.8} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1F261F]">Smart Tip</h3>
          </div>
          <p className="mt-4 text-sm font-medium leading-relaxed text-[#1F261F]/80">{tip}</p>
        </div>
      </div>
    </div>
  );
}

// cn helper inline to avoid extra import
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
