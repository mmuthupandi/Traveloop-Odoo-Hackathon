import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BudgetOverview } from "@/components/BudgetOverview";
import { DiscoverInspiration } from "@/components/DiscoverInspiration";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { QuickActions } from "@/components/QuickActions";
import { AppSidebar } from "@/components/AppSidebar";
import { TravelMapCard } from "@/components/TravelMapCard";
import { UpcomingTrips } from "@/components/UpcomingTrips";

export function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(196,106,45,0.10),transparent_28rem),linear-gradient(135deg,#FAF8F4_0%,#F7F4EE_45%,#EFE6D8_100%)] text-ink dark:bg-[linear-gradient(135deg,#1E241F_0%,#121814_100%)]">
      <AppSidebar activeRoute="home" darkMode={darkMode} onDarkModeChange={setDarkMode} />

      <main className="xl:ml-[282px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="mx-auto flex max-w-[1500px] flex-col gap-9 px-4 pt-3 pb-20 sm:px-6 lg:px-10 xl:px-12 xl:py-10 2xl:px-14"
        >
          <Header />
          <HeroBanner />
          <QuickActions />
          <UpcomingTrips />
          <DiscoverInspiration />
          <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[0.95fr_1.25fr]">
            <BudgetOverview />
            <TravelMapCard />
          </section>
        </motion.div>
      </main>
    </div>
  );
}
