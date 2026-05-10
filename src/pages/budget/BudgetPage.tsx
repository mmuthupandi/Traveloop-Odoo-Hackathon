import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { BudgetHeader } from "@/components/budget/BudgetHeader";
import { TripSelector } from "@/components/budget/TripSelector";
import { BudgetSummaryCards } from "@/components/budget/BudgetSummaryCards";
import { BudgetDonutChart } from "@/components/budget/BudgetDonutChart";
import { BudgetVsSpentChart } from "@/components/budget/BudgetVsSpentChart";
import { DailySpendingChart } from "@/components/budget/DailySpendingChart";
import { CategoryDetails } from "@/components/budget/CategoryDetails";
import { ExpenseTable } from "@/components/budget/ExpenseTable";
import { BudgetBottomCards } from "@/components/budget/BudgetBottomCards";
import {
  tripBudgetSeeds,
  budgetLabelIcons,
  budgetLabelBgColors,
  donutColors,
  type BudgetCategory,
  type Expense,
} from "@/data/budget";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

/** Convert a seed's budgetRows into BudgetCategory objects with icons */
function rowsToCategories(
  rows: { label: string; spent: number; total: number; color: string }[],
  i_offset = 0
): BudgetCategory[] {
  return rows.map((r, i) => ({
    id:      r.label.toLowerCase().replace(/[^a-z]/g, "-"),
    label:   r.label,
    icon:    budgetLabelIcons[r.label] ?? budgetLabelIcons.Others,
    color:   r.color,
    bgColor: budgetLabelBgColors[r.label] ?? "#F0EDE8",
    budget:  r.total,
    spent:   r.spent,
  }));
}

export function BudgetPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(tripBudgetSeeds[0].tripId);
  const [categories, setCategories] = useState<BudgetCategory[]>(() =>
    rowsToCategories(tripBudgetSeeds[0].budgetRows)
  );
  const [expenses, setExpenses] = useState<Expense[]>(() =>
    tripBudgetSeeds[0].expenses.map((e) => ({ ...e }))
  );
  const [totalBudget, setTotalBudget] = useState(tripBudgetSeeds[0].totalBudget);
  const [tripDays, setTripDays] = useState(tripBudgetSeeds[0].tripDays);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  function handleTripChange(tripId: string) {
    const seed = tripBudgetSeeds.find((s) => s.tripId === tripId);
    if (!seed) return;
    setSelectedTripId(tripId);
    setCategories(rowsToCategories(seed.budgetRows));
    setExpenses(seed.expenses.map((e) => ({ ...e })));
    setTotalBudget(seed.totalBudget);
    setTripDays(seed.tripDays);
  }

  // Total spent = sum of all expense amounts
  const totalSpent = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const remaining    = totalBudget - totalSpent;
  const avgCostPerDay = tripDays > 0 ? Math.round(totalSpent / tripDays) : 0;
  const dailyBudget   = tripDays > 0 ? Math.round(totalBudget / tripDays) : 0;

  // Sync category spent values live from expenses
  const syncedCategories = useMemo<BudgetCategory[]>(() => {
    const spentByLabel: Record<string, number> = {};
    expenses.forEach((e) => {
      spentByLabel[e.category] = (spentByLabel[e.category] ?? 0) + e.amount;
    });
    return categories.map((c) => ({
      ...c,
      spent: spentByLabel[c.label] ?? 0,
    }));
  }, [expenses, categories]);

  // Daily spending derived from expenses grouped by date
  const dailySpending = useMemo(() => {
    const seed = tripBudgetSeeds.find((s) => s.tripId === selectedTripId);
    if (!seed) return [];

    // Parse start date from "DD Mon – DD Mon YYYY"
    const dateStr = seed.dates.split("–")[0].trim(); // "15 May "
    const [day, mon] = dateStr.trim().split(" ");
    const months: Record<string, number> = {
      Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11
    };
    const start = new Date(2026, months[mon] ?? 0, parseInt(day, 10));

    const days: string[] = [];
    for (let i = 0; i < seed.tripDays; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(
        d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
      );
    }

    // Group expenses by day label (e.g. "15 May")
    const spentByDay: Record<string, number> = {};
    expenses.forEach((e) => {
      // e.date is like "15 May 2026" — strip year
      const key = e.date.replace(" 2026", "").replace(" 2025", "");
      spentByDay[key] = (spentByDay[key] ?? 0) + e.amount;
    });

    return days.map((day) => {
      const spent = spentByDay[day] ?? 0;
      return { day, spent, budget: dailyBudget, overBudget: spent > dailyBudget };
    });
  }, [expenses, selectedTripId, dailyBudget]);

  function handleAddExpense(expense: Omit<Expense, "id">) {
    setExpenses((prev) => [{ ...expense, id: `exp-${Date.now()}` }, ...prev]);
  }

  function handleDeleteExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  function handleUpdateCategoryBudget(id: string, newBudget: number) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, budget: newBudget } : c))
    );
    setTotalBudget((prev) => {
      const old = categories.find((c) => c.id === id)?.budget ?? 0;
      return prev - old + newBudget;
    });
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1F261F]">
      <AppSidebar activeRoute="budget" darkMode={darkMode} onDarkModeChange={setDarkMode} />

      <main className="xl:ml-[282px]">
        <div className="mx-auto flex max-w-[1420px] flex-col gap-8 px-4 pt-3 pb-20 sm:px-6 lg:px-10 xl:px-12 xl:py-10">

          <motion.div {...fadeUp(0)}>
            <BudgetHeader />
          </motion.div>

          <motion.section {...fadeUp(0.05)}>
            <h2 className="font-serif text-5xl font-bold text-[#1D231E] md:text-6xl">
              Budget Overview
            </h2>
            <div className="mt-5">
              <TripSelector
                seeds={tripBudgetSeeds}
                selectedId={selectedTripId}
                onSelect={handleTripChange}
                totalBudget={totalBudget}
                onBudgetChange={setTotalBudget}
              />
            </div>
          </motion.section>

          <motion.section {...fadeUp(0.1)}>
            <BudgetSummaryCards
              totalBudget={totalBudget}
              totalSpent={totalSpent}
              remaining={remaining}
              avgCostPerDay={avgCostPerDay}
              tripDays={tripDays}
            />
          </motion.section>

          <motion.section {...fadeUp(0.15)} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <BudgetDonutChart
              categories={syncedCategories}
              totalSpent={totalSpent}
              totalBudget={totalBudget}
            />
            <BudgetVsSpentChart categories={syncedCategories} />
          </motion.section>

          <motion.section {...fadeUp(0.2)} className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
            <DailySpendingChart
              dailySpending={dailySpending}
              dailyBudget={dailyBudget}
            />
            <CategoryDetails
              categories={syncedCategories}
              onUpdateBudget={handleUpdateCategoryBudget}
            />
          </motion.section>

          <motion.section {...fadeUp(0.25)}>
            <ExpenseTable
              expenses={expenses}
              categories={syncedCategories}
              onAdd={handleAddExpense}
              onDelete={handleDeleteExpense}
            />
          </motion.section>

          <motion.section {...fadeUp(0.3)}>
            <BudgetBottomCards
              categories={syncedCategories}
              totalBudget={totalBudget}
              totalSpent={totalSpent}
              remaining={remaining}
              avgCostPerDay={avgCostPerDay}
              tripId={selectedTripId}
            />
          </motion.section>
        </div>
      </main>
    </div>
  );
}
