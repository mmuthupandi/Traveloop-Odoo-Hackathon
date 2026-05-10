import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { TripStatus } from "@/data/my-trips";
import { tabs, topActionIcons, trips } from "@/data/my-trips";
import { ActionButton } from "@/components/my-trips/ActionButton";
import { FilterTabs } from "@/components/my-trips/FilterTabs";
import { OverviewCard } from "@/components/my-trips/OverviewCard";
import { SearchBar } from "@/components/my-trips/SearchBar";
import { TripCard } from "@/components/my-trips/TripCard";
import { TripsHeader } from "@/components/my-trips/TripsHeader";
import { AppSidebar } from "@/components/AppSidebar";

export function MyTripsPage() {
  const [activeTab, setActiveTab] = useState<"all" | TripStatus>("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const filteredTrips = useMemo(() => {
    if (activeTab === "all") return trips;
    return trips.filter((trip) => trip.status === activeTab);
  }, [activeTab]);

  const FilterIcon = topActionIcons.filter;
  const PlanIcon = topActionIcons.plan;

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
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="font-serif text-6xl font-bold text-[#1D231E]">
                  My Trips
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <SearchBar />
                <ActionButton icon={FilterIcon} label="Filter" />
                <ActionButton
                  icon={PlanIcon}
                  label="+ Plan New Trip"
                  variant="primary"
                />
              </div>
            </div>
            <FilterTabs
              items={tabs}
              active={activeTab}
              onChange={setActiveTab}
            />
          </motion.section>

          <section className="space-y-5">
            {filteredTrips.map((trip, idx) => (
              <TripCard key={trip.id} trip={trip} index={idx} />
            ))}
          </section>

          <OverviewCard />
        </div>
      </main>
    </div>
  );
}

