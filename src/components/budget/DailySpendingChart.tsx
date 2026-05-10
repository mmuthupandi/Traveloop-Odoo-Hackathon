import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
  ResponsiveContainer
} from "recharts";
import { AlertTriangle, Eye } from "lucide-react";
import { dailySpending } from "@/data/budget";

const DAILY_BUDGET = 207;
const overBudgetDays = dailySpending.filter((d) => d.overBudget).length;

function CustomTooltip({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const over = val > DAILY_BUDGET;
  return (
    <div className="rounded-xl border border-[#E8DED1] bg-white px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-[#1F261F]">{label}</p>
      <p className={over ? "text-[#E87565] font-medium" : "text-[#3C8B68] font-medium"}>
        ${val} {over ? "▲ over" : "✓ under"} budget
      </p>
    </div>
  );
}

export function DailySpendingChart() {
  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-[#1F261F]">
          Daily Spending
        </h3>
        <div className="flex items-center gap-4 text-xs font-medium text-[#7F7A70]">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3C8B68]" />
            Under Budget
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E87565]" />
            Over Budget
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-px w-5 border-t-2 border-dashed border-[#7F7A70]" />
            Budget
          </span>
        </div>
      </div>

      <div className="mt-5 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dailySpending}
            barCategoryGap="35%"
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E8DED1"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "#7F7A70", fontFamily: "Inter" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#7F7A70", fontFamily: "Inter" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
            <ReferenceLine
              y={DAILY_BUDGET}
              stroke="#7F7A70"
              strokeDasharray="5 4"
              strokeWidth={1.5}
            />
            <Bar dataKey="spent" radius={[5, 5, 0, 0]}>
              {dailySpending.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={entry.overBudget ? "#E87565" : "#3C8B68"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Warning alert */}
      {overBudgetDays > 0 && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#F8EDE0] bg-[#FEF6EE] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 shrink-0 text-[#C46A2D]" strokeWidth={2} />
            <p className="text-sm font-medium text-[#1F261F]">
              You've gone over budget on{" "}
              <span className="font-bold text-[#C46A2D]">{overBudgetDays} day(s)</span>
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg bg-[#C46A2D] px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#A85A25]"
          >
            <Eye className="h-3.5 w-3.5" />
            View Details
          </button>
        </div>
      )}
    </div>
  );
}
