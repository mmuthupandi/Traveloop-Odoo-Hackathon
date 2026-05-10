import { motion } from "framer-motion";
import type { TabItem, TripStatus } from "@/data/my-trips";
import { cn } from "@/lib/utils";

type FilterTabsProps = {
  items: TabItem[];
  active: "all" | TripStatus;
  onChange: (tab: "all" | TripStatus) => void;
};

export function FilterTabs({ items, active, onChange }: FilterTabsProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-[#EFE7DB] p-2">
      {items.map((tab) => (
        <motion.button
          type="button"
          key={tab.id}
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
            active === tab.id
              ? "bg-[#2F4F3E] text-white shadow-[0_10px_24px_rgba(47,79,62,0.26)]"
              : "bg-[#F7F4EE] text-[#4A463D] hover:bg-white"
          )}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}

