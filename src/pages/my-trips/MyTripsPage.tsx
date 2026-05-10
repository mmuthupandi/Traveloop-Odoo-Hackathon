import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import type { TripStatus } from "@/data/my-trips";
import { tabs, trips } from "@/data/my-trips";
import { ActionButton } from "@/components/my-trips/ActionButton";
import { FilterDropdown, type SortOption } from "@/components/my-trips/FilterDropdown";
import { FilterTabs } from "@/components/my-trips/FilterTabs";
import { OverviewCard } from "@/components/my-trips/OverviewCard";
import { SearchBar } from "@/components/my-trips/SearchBar";
import { TripCard } from "@/components/my-trips/TripCard";
import { TripsHeader } from "@/components/my-trips/TripsHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { routeHashes } from "@/lib/routes";

export function MyTripsPage() {
  const [activeTab, setActiveTab]   = useState<"all" | TripStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy]         = useState<SortOption>("default");
  const [darkMode, setDarkMode]     = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const filteredTrips = useMemo(() => {
    let result = [...trips];

    // 1. Status tab filter
    if (activeTab !== "all") {
      result = result.filter((t) => t.status === activeTab);
    }

    // 2. Search filter — matches title, description, dates
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.dates.toLowerCase().includes(q)
      );
    }

    // 3. Sort
    if (sortBy === "date-asc") {
      result = result.sort((a, b) => a.dates.localeCompare(b.dates));
    } else if (sortBy === "date-desc") {
      result = result.sort((a, b) => b.dates.localeCompare(a.dates));
    } else if (sortBy === "budget-asc") {
      result = result.sort(
        (a, b) =>
          parseFloat(a.budgetValue.replace(/[^0-9.]/g, "")) -
          parseFloat(b.budgetValue.replace(/[^0-9.]/g, ""))
      );
    } else if (sortBy === "budget-desc") {
      result = result.sort(
        (a, b) =>
          parseFloat(b.budgetValue.replace(/[^0-9.]/g, "")) -
          parseFloat(a.budgetValue.replace(/[^0-9.]/g, ""))
      );
    }

    return result;
  }, [activeTab, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1F261F]">
      <AppSidebar activeRoute="my-trips" darkMode={darkMode} onDarkModeChange={setDarkMode} />
      <main className="xl:ml-[282px]">
        <div className="mx-auto flex max-w-[1420px] flex-col gap-8 px-4 pt-3 pb-20 sm:px-6 lg:px-10 xl:px-12 xl:py-10">
          <TripsHeader />

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Title row + controls */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="font-serif text-5xl font-bold text-[#1D231E] md:text-6xl">
                My Trips
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                <FilterDropdown value={sortBy} onChange={setSortBy} />
                <ActionButton
                  icon={Plane}
                  label="+ Plan New Trip"
                  variant="primary"
                  href={routeHashes.explore}
                />
              </div>
            </div>

            <FilterTabs items={tabs} active={activeTab} onChange={setActiveTab} />
          </motion.section>

          {/* Results */}
          <section className="space-y-5">
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip, idx) => (
                <TripCard key={trip.id} trip={trip} index={idx} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 rounded-3xl border border-[#E8DED1] bg-white py-16 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              >
                <p className="font-serif text-2xl font-bold text-[#1F261F]">No trips found</p>
                <p className="text-sm font-medium text-[#7F7A70]">
                  {searchQuery
                    ? `No results for "${searchQuery}". Try a different keyword.`
                    : "No trips match the selected filter."}
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-2 rounded-xl bg-[#2F4F3E] px-5 py-2 text-sm font-semibold text-white hover:bg-[#3C6B52]"
                  >
                    Clear search
                  </button>
                )}
              </motion.div>
            )}
          </section>

          <OverviewCard />
        </div>
      </main>
    </div>
  );
}
