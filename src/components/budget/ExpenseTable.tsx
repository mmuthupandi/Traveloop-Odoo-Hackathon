import { useState } from "react";
import { MoreVertical, Plus, ChevronDown } from "lucide-react";
import { expenses, categoryBadgeColors } from "@/data/budget";

export function ExpenseTable() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? expenses : expenses.slice(0, 5);

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-[#1F261F]">
          Expense List
        </h3>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl bg-[#2F4F3E] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#3C6B52] hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Add Expense
        </button>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-[#E8DED1]">
              {["Date", "Description", "Category", "Amount", "Payment Method", ""].map(
                (col) => (
                  <th
                    key={col}
                    className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-[#7F7A70]"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {visible.map((exp, i) => {
              const badgeClass =
                categoryBadgeColors[exp.category] ?? "bg-[#F0EDE8] text-[#7F7A70]";
              return (
                <tr
                  key={exp.id}
                  className="group border-b border-[#F0EDE8] transition-colors duration-150 last:border-0 hover:bg-[#FAFAF8]"
                >
                  <td className="py-3.5 pr-4 text-sm text-[#7F7A70]">{exp.date}</td>
                  <td className="py-3.5 pr-4 text-sm font-semibold text-[#1F261F]">
                    {exp.description}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
                    >
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-sm font-bold text-[#E87565]">
                    {exp.amount < 0 ? `-$${Math.abs(exp.amount)}` : `$${exp.amount}`}
                  </td>
                  <td className="py-3.5 pr-4 text-sm text-[#7F7A70]">
                    {exp.paymentMethod}
                  </td>
                  <td className="py-3.5">
                    <button
                      type="button"
                      aria-label="More options"
                      className="rounded-lg p-1.5 text-[#7F7A70] opacity-0 transition-all duration-150 hover:bg-[#F0EDE8] hover:text-[#1F261F] group-hover:opacity-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* View all */}
      {expenses.length > 5 && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#2F4F3E] transition-all duration-200 hover:text-[#3C6B52]"
          >
            {showAll ? "Show Less" : "View All Expenses"}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
