import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BudgetSidebar } from "@/components/budget/BudgetSidebar";
import { BudgetHeader } from "@/components/budget/BudgetHeader";
import { TripSelector } from "@/components/budget/TripSelector";
import { BudgetSummaryCards } from "@/components/budget/BudgetSummaryCards";
import { BudgetDonutChart } from "@/components/budget/BudgetDonutChart";
import { BudgetVsSpentChart } from "@/components/budget/BudgetVsSpentChart";
import { DailySpendingChart } from "@/components/budget/DailySpendingChart";
import { CategoryDetails } from "@/components/budget/CategoryDetails";
import { ExpenseTable } from "@/components/budget/ExpenseTable";
import { BudgetBottomCards } from "@/components/budget/BudgetBottomCards";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay }
});

export function BudgetPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1F261F]">
      <BudgetSidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="xl:ml-[282px]">
        <div className="mx-auto flex max-w-[1420px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-10 xl:px-12 xl:py-10">

          {/* Header */}
          <motion.div {...fadeUp(0)}>
            <BudgetHeader />
          </motion.div>

          {/* Page title + trip selector */}
          <motion.section {...fadeUp(0.05)}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-serif text-5xl font-bold text-[#1D231E] md:text-6xl">
                Budget Overview
              </h2>
            </div>
            <div className="mt-5">
              <TripSelector />
            </div>
          </motion.section>

          {/* Summary cards */}
          <motion.section {...fadeUp(0.1)}>
            <BudgetSummaryCards />
          </motion.section>

          {/* Charts row */}
          <motion.section
            {...fadeUp(0.15)}
            className="grid grid-cols-1 gap-4 lg:grid-cols-2"
          >
            <BudgetDonutChart />
            <BudgetVsSpentChart />
          </motion.section>

          {/* Daily spending + category details */}
          <motion.section
            {...fadeUp(0.2)}
            className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]"
          >
            <DailySpendingChart />
            <CategoryDetails />
          </motion.section>

          {/* Expense table */}
          <motion.section {...fadeUp(0.25)}>
            <ExpenseTable />
          </motion.section>

          {/* Bottom cards */}
          <motion.section {...fadeUp(0.3)}>
            <BudgetBottomCards />
          </motion.section>
        </div>
      </main>
    </div>
  );
}
