import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { budgetBreakdown, budgetStats } from "@/data/travel-dashboard";

export function BudgetOverview() {
  return (
    <Card className="overflow-hidden bg-parchment">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <div>
          <CardTitle>Budget Overview</CardTitle>
          <p className="mt-2 text-sm font-medium text-muted">
            Spend mix across active trips
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-white px-4 py-2 text-xs font-bold text-muted shadow-[0_8px_18px_rgba(31,38,31,0.08)] transition-all duration-300 hover:text-forest"
        >
          This Year
        </button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {budgetStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-[#F1ECE3] px-3 py-4 text-center"
            >
              <p className="text-xs font-semibold text-muted">{stat.label}</p>
              <p className="mt-1 text-lg font-extrabold text-ink">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 grid items-center gap-6 md:grid-cols-[230px_1fr]">
          <div className="relative h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={68}
                  outerRadius={98}
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {budgetBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-2xl font-extrabold text-ink">$5,650</p>
                <p className="text-sm font-semibold text-muted">Total</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {budgetBreakdown.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-semibold text-ink/80">{item.name}</span>
                </div>
                <span className="font-extrabold text-ink">{item.value}%</span>
                <span className="text-right font-semibold text-muted">
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
