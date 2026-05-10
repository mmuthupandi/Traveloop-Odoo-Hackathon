import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { ProfileCard } from "@/components/settings/ProfileCard";
import { PreferencesCard } from "@/components/settings/PreferencesCard";
import { AccountSecurityCard } from "@/components/settings/AccountSecurityCard";
import { NotificationsCard } from "@/components/settings/NotificationsCard";
import { SavedDestinationsCard } from "@/components/settings/SavedDestinationsCard";
import { DataStorageCard } from "@/components/settings/DataStorageCard";
import { SupportCard } from "@/components/settings/SupportCard";
import { DangerZoneCard } from "@/components/settings/DangerZoneCard";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay }
});

export function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1F261F]">
      <SettingsSidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="xl:ml-[282px]">
        <div className="mx-auto flex max-w-[1420px] flex-col gap-7 px-4 py-6 sm:px-6 lg:px-10 xl:px-12 xl:py-10">

          {/* Header */}
          <motion.div {...fadeUp(0)}>
            <SettingsHeader />
          </motion.div>

          {/* Page title */}
          <motion.div {...fadeUp(0.05)}>
            <h2 className="font-serif text-5xl font-bold text-[#1D231E] md:text-6xl">
              Settings
            </h2>
          </motion.div>

          {/* Row 1: Profile + Preferences */}
          <motion.div
            {...fadeUp(0.1)}
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            <ProfileCard />
            <PreferencesCard />
          </motion.div>

          {/* Row 2: Account Security + Notifications */}
          <motion.div
            {...fadeUp(0.15)}
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            <AccountSecurityCard />
            <NotificationsCard />
          </motion.div>

          {/* Row 3: Saved Destinations — full width */}
          <motion.div {...fadeUp(0.2)}>
            <SavedDestinationsCard />
          </motion.div>

          {/* Row 4: Data & Storage + Support */}
          <motion.div
            {...fadeUp(0.25)}
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            <DataStorageCard />
            <SupportCard />
          </motion.div>

          {/* Row 5: Danger Zone — full width */}
          <motion.div {...fadeUp(0.3)}>
            <DangerZoneCard />
          </motion.div>

        </div>
      </main>
    </div>
  );
}
