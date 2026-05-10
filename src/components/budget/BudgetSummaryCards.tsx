import { DollarSign, TrendingDown, TrendingUp, CalendarDays } from "lucide-react";

type Props = {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  avgCostPerDay: number;
  tripDays: number;
};

export function BudgetSummaryCards({ totalBudget, totalSpent, remaining, avgCostPerDay, tripDays }: Props) {
  const spentPct = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
  const remainPct = totalBudget > 0 ? Math.round((remaining / totalBudget) * 100) : 0;

  const cards = [
    {
      label: "Total Budget",
      amount: `$${totalBudget.toLocaleString()}`,
      sub: "Planned Budget",
      icon: <DollarSign className="h-5 w-5 text-[#3C8B68]" strokeWidth={1.8} />,
      iconBg: "bg-[#EAF4EE]",
    },
    {
      label: "Total Spent",
      amount: `$${totalSpent.toLocaleString()}`,
      sub: `${spentPct}% of budget`,
      icon: <TrendingUp className="h-5 w-5 text-[#E87565]" strokeWidth={1.8} />,
      iconBg: "bg-[#FDECEA]",
    },
    {
      label: "Remaining",
      amount: `$${remaining.toLocaleString()}`,
      sub: `${remainPct}% left to spend`,
      icon: <TrendingDown className="h-5 w-5 text-[#3F7EA7]" strokeWidth={1.8} />,
      iconBg: "bg-[#E6F1F8]",
    },
    {
      label: "Avg. Cost per Day",
      amount: `$${avgCostPerDay}`,
      sub: `Based on ${tripDays} days`,
      icon: <CalendarDays className="h-5 w-5 text-[#9B6BB5]" strokeWidth={1.8} />,
      iconBg: "bg-[#F3EDF8]",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-[#E8DED1]/60 bg-white px-5 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
        >
          <div className={`inline-flex rounded-xl p-2.5 ${card.iconBg}`}>{card.icon}</div>
          <p className="mt-3 text-sm font-medium text-[#7F7A70]">{card.label}</p>
          <p className="mt-1 font-serif text-3xl font-bold text-[#1F261F]">{card.amount}</p>
          <p className="mt-1 text-xs font-medium text-[#7F7A70]">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
