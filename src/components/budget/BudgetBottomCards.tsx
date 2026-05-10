import { ExternalLink, Lightbulb } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { summaryStats, budgetCategories, donutColors, smartTip } from "@/data/budget";

// Find top spending category
const topCat = [...budgetCategories].sort((a, b) => b.spent - a.spent)[0];
const topPct = Math.round((topCat.spent / summaryStats.totalSpent) * 100);

const miniDonutData = [
  { value: topCat.spent },
  { value: summaryStats.totalSpent - topCat.spent }
];

export function BudgetBottomCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Budget Summary */}
      <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <h3 className="font-serif text-lg font-bold text-[#1F261F]">
          Budget Summary
        </h3>
        <ul className="mt-4 space-y-3">
          {[
            { label: "Planned Budget", value: `$${summaryStats.totalBudget.toLocaleString()}` },
            { label: "Total Spent", value: `$${summaryStats.totalSpent.toLocaleString()}` },
            { label: "Remaining Budget", value: `$${summaryStats.remaining.toLocaleString()}` },
            { label: "Avg. Cost per Day", value: `$${summaryStats.avgCostPerDay}` }
          ].map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between border-b border-[#F0EDE8] pb-3 last:border-0 last:pb-0"
            >
              <span className="text-sm text-[#7F7A70]">{row.label}</span>
              <span className="text-sm font-bold text-[#1F261F]">{row.value}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#2F4F3E]/20 py-2.5 text-sm font-semibold text-[#2F4F3E] transition-all duration-200 hover:bg-[#2F4F3E] hover:text-white"
        >
          View Full Report
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Top Spending Category */}
      <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <h3 className="font-serif text-lg font-bold text-[#1F261F]">
          Top Spending Category
        </h3>
        <div className="mt-5 flex flex-col items-center gap-4">
          {/* Mini donut */}
          <div className="relative h-[120px] w-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={miniDonutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={54}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  <Cell fill={donutColors[0]} />
                  <Cell fill="#F0EDE8" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-lg font-bold text-[#1F261F]">
                {topPct}%
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-base font-bold text-[#1F261F]">{topCat.label}</p>
            <p className="text-sm text-[#7F7A70]">
              ${topCat.spent} ({topPct}%)
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#F7F4EE] px-4 py-3">
          <p className="text-xs font-medium text-[#7F7A70]">
            {topCat.label} is your top spending category.
          </p>
        </div>
      </div>

      {/* Smart Tip */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E8DED1]/60 bg-gradient-to-br from-[#EAF4EE] to-[#F7F4EE] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        {/* Decorative mountain illustration */}
        <div className="pointer-events-none absolute bottom-0 right-0 opacity-20">
          <svg
            width="140"
            height="100"
            viewBox="0 0 140 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 100 L50 20 L100 60 L140 10 L140 100 Z" fill="#2F4F3E" />
            <path d="M60 100 L90 45 L120 70 L140 40 L140 100 Z" fill="#3C8B68" opacity="0.6" />
          </svg>
        </div>

        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF6EE]">
              <Lightbulb className="h-5 w-5 text-[#C46A2D]" strokeWidth={1.8} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1F261F]">
              Smart Tip
            </h3>
          </div>
          <p className="mt-4 text-sm font-medium leading-relaxed text-[#1F261F]/80">
            {smartTip}
          </p>
        </div>
      </div>
    </div>
  );
}
