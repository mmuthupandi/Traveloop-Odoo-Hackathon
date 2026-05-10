import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackingSidebar } from "@/components/packing/PackingSidebar";
import { PackingHeader } from "@/components/packing/PackingHeader";
import { PackingTripSelector } from "@/components/packing/PackingTripSelector";
import { CategoryFilterTabs } from "@/components/packing/CategoryFilterTabs";
import { ChecklistCard } from "@/components/packing/ChecklistCard";
import { PackingSummaryCard } from "@/components/packing/PackingSummaryCard";
import { TravelLightTipCard } from "@/components/packing/TravelLightTipCard";
import { DontForgetCard } from "@/components/packing/DontForgetCard";
import { initialCategories, type PackingCategory } from "@/data/packing";

// Deep-clone only the serializable parts (items array), preserving icon references
function cloneCategories(source: PackingCategory[]): PackingCategory[] {
  return source.map((cat) => ({
    ...cat,
    items: cat.items.map((item) => ({ ...item }))
  }));
}

export function PackingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState<PackingCategory[]>(
    () => cloneCategories(initialCategories)
  );
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Toggle a single item
  function handleToggleItem(categoryId: string, itemId: string) {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id !== categoryId
          ? cat
          : {
              ...cat,
              items: cat.items.map((item) =>
                item.id !== itemId ? item : { ...item, packed: !item.packed }
              )
            }
      )
    );
  }

  // Add item to a category
  function handleAddItem(categoryId: string, label: string) {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id !== categoryId
          ? cat
          : {
              ...cat,
              items: [
                ...cat.items,
                { id: `${categoryId}-${Date.now()}`, label, packed: false }
              ]
            }
      )
    );
  }

  // Mark all items in a category as packed
  function handleMarkAllCategory(categoryId: string) {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id !== categoryId
          ? cat
          : { ...cat, items: cat.items.map((item) => ({ ...item, packed: true })) }
      )
    );
  }

  // Mark ALL items across all categories as packed
  function handleMarkAll() {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => ({ ...item, packed: true }))
      }))
    );
  }

  // Reset all items to unpacked
  function handleReset() {
    setCategories(cloneCategories(initialCategories));
  }

  // Open add-item modal (for top-level button — opens first category's add)
  function handleAddItemGlobal() {
    // Scroll to first category card — simple UX
    document.getElementById("category-clothing")?.scrollIntoView({ behavior: "smooth" });
  }

  // Filtered categories
  const visibleCategories = useMemo(
    () =>
      activeFilter === "all"
        ? categories
        : categories.filter((c) => c.id === activeFilter),
    [categories, activeFilter]
  );

  // Summary totals
  const totalPacked = useMemo(
    () => categories.reduce((sum, c) => sum + c.items.filter((i) => i.packed).length, 0),
    [categories]
  );
  const totalItems = useMemo(
    () => categories.reduce((sum, c) => sum + c.items.length, 0),
    [categories]
  );

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1F261F]">
      <PackingSidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="xl:ml-[282px]">
        <div className="mx-auto flex max-w-[1420px] flex-col gap-7 px-4 py-6 sm:px-6 lg:px-10 xl:px-12 xl:py-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PackingHeader />
          </motion.div>

          {/* Page title + action buttons */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="space-y-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-serif text-5xl font-bold text-[#1D231E] md:text-6xl">
                Packing Checklist
              </h2>
            </div>
            <PackingTripSelector
              onAddItem={handleAddItemGlobal}
              onReset={handleReset}
              onMarkAll={handleMarkAll}
            />
          </motion.section>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <CategoryFilterTabs
              categories={categories}
              activeFilter={activeFilter}
              onChange={setActiveFilter}
            />
          </motion.div>

          {/* Two-column layout: checklist + right sidebar */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

            {/* Left: checklist cards */}
            <div className="flex-1 min-w-0 space-y-5">
              <AnimatePresence mode="popLayout">
                {visibleCategories.map((cat) => (
                  <div key={cat.id} id={`category-${cat.id}`}>
                    <ChecklistCard
                      category={cat}
                      onToggleItem={handleToggleItem}
                      onAddItem={handleAddItem}
                      onMarkAllCategory={handleMarkAllCategory}
                    />
                  </div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right: sticky summary sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="w-full space-y-4 lg:sticky lg:top-6 lg:w-[300px] xl:w-[320px]"
            >
              <PackingSummaryCard packed={totalPacked} total={totalItems} />
              <TravelLightTipCard />
              <DontForgetCard />
            </motion.aside>
          </div>

        </div>
      </main>
    </div>
  );
}
