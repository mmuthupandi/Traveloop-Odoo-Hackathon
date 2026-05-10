import { useState } from "react";
import { Plus, ChevronDown, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Expense, BudgetCategory } from "@/data/budget";
import { categoryBadgeColors, paymentMethods } from "@/data/budget";
import { cn } from "@/lib/utils";

type Props = {
  expenses: Expense[];
  categories: BudgetCategory[];
  onAdd: (expense: Omit<Expense, "id">) => void;
  onDelete: (id: string) => void;
};

const inputCls = "w-full rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-3 py-2 text-sm font-medium text-[#1F261F] outline-none focus:border-[#2F4F3E]/50 focus:ring-2 focus:ring-[#2F4F3E]/10 transition-all";

export function ExpenseTable({ expenses, categories, onAdd, onDelete }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, " "),
    description: "",
    category: categories[0]?.label ?? "Accommodation",
    amount: "",
    paymentMethod: "Credit Card",
  });

  const visible = showAll ? expenses : expenses.slice(0, 5);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amt = parseFloat(form.amount);
    if (!form.description.trim() || isNaN(amt) || amt <= 0) return;
    onAdd({
      date: form.date,
      description: form.description.trim(),
      category: form.category,
      amount: amt,
      paymentMethod: form.paymentMethod,
    });
    setForm({ ...form, description: "", amount: "" });
    setShowForm(false);
  }

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-[#1F261F]">Expense List</h3>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 rounded-xl bg-[#2F4F3E] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#3C6B52] hover:-translate-y-0.5"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Expense"}
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="overflow-hidden"
          >
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-[#E8DED1] bg-[#F7F4EE] p-4 sm:grid-cols-3 lg:grid-cols-5">
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#7F7A70]">Date</label>
                <input type="date" className={inputCls}
                  value={form.date.split(" ").reverse().join("-").replace(/(\d+)-(\w+)-(\d+)/, (_, d, m, y) => {
                    const months: Record<string, string> = { Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12" };
                    return `${y}-${months[m]}-${d.padStart(2,"0")}`;
                  })}
                  onChange={(e) => {
                    const d = new Date(e.target.value);
                    setForm({ ...form, date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) });
                  }}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#7F7A70]">Description</label>
                <input className={inputCls} placeholder="e.g. Hotel Booking" value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#7F7A70]">Category</label>
                <select className={inputCls} value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map((c) => <option key={c.id} value={c.label}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#7F7A70]">Amount ($)</label>
                <input type="number" min="0.01" step="0.01" className={inputCls} placeholder="0.00"
                  value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#7F7A70]">Payment</label>
                <select className={inputCls} value={form.paymentMethod}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
                  {paymentMethods.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="col-span-2 flex items-end sm:col-span-3 lg:col-span-5">
                <button type="submit"
                  className="ml-auto flex items-center gap-2 rounded-xl bg-[#2F4F3E] px-5 py-2 text-sm font-semibold text-white hover:bg-[#3C6B52]">
                  <Plus className="h-4 w-4" /> Add Expense
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-[#E8DED1]">
              {["Date", "Description", "Category", "Amount", "Payment Method", ""].map((col) => (
                <th key={col} className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-[#7F7A70]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {visible.map((exp) => {
                const badgeClass = categoryBadgeColors[exp.category] ?? "bg-[#F0EDE8] text-[#7F7A70]";
                return (
                  <motion.tr
                    key={exp.id}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="group border-b border-[#F0EDE8] transition-colors duration-150 last:border-0 hover:bg-[#FAFAF8]"
                  >
                    <td className="py-3.5 pr-4 text-sm text-[#7F7A70]">{exp.date}</td>
                    <td className="py-3.5 pr-4 text-sm font-semibold text-[#1F261F]">{exp.description}</td>
                    <td className="py-3.5 pr-4">
                      <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-semibold", badgeClass)}>
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-sm font-bold text-[#E87565]">
                      -${exp.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 pr-4 text-sm text-[#7F7A70]">{exp.paymentMethod}</td>
                    <td className="py-3.5">
                      <button
                        type="button"
                        onClick={() => onDelete(exp.id)}
                        aria-label="Delete expense"
                        className="rounded-lg p-1.5 text-[#7F7A70] opacity-0 transition-all duration-150 hover:bg-[#FDECEA] hover:text-[#E87565] group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
            {expenses.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-[#7F7A70]">
                  No expenses yet. Click "Add Expense" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {expenses.length > 5 && (
        <div className="mt-4 flex justify-center">
          <button type="button" onClick={() => setShowAll((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#2F4F3E] transition-all duration-200 hover:text-[#3C6B52]">
            {showAll ? "Show Less" : `View All ${expenses.length} Expenses`}
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", showAll && "rotate-180")} />
          </button>
        </div>
      )}
    </div>
  );
}
