import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { TravelArtwork } from "@/components/TravelArtwork";
import { Switch } from "@/components/ui/switch";
import { itineraryNavItems } from "@/data/itinerary-builder";
import { getRouteForLabel, routeHashes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type ItinerarySidebarProps = {
  darkMode: boolean;
  onDarkModeChange: (checked: boolean) => void;
};

export function ItinerarySidebar({
  darkMode,
  onDarkModeChange
}: ItinerarySidebarProps) {
  return (
    <aside className="hidden xl:fixed xl:inset-y-0 xl:left-0 xl:z-40 xl:flex xl:w-[282px] xl:flex-col xl:border-r xl:border-[#DDD4C6] xl:bg-[#F8F4EB] xl:px-6 xl:py-9">
      <BrandLogo />

      <nav aria-label="Primary navigation" className="mt-14 space-y-2">
        {itineraryNavItems.map((item, index) => {
          const Icon = item.icon;
          const route = getRouteForLabel(item.label);
          const isActive = item.label === "Itinerary Builder";

          return (
            <motion.a
              href={route ? routeHashes[route] : "#"}
              key={item.label}
              onClick={(event) => {
                if (!route) event.preventDefault();
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03 * index, duration: 0.35 }}
              whileHover={{ x: 2 }}
              className={cn(
                "flex h-14 items-center gap-4 rounded-2xl px-5 text-[15px] font-semibold transition-all duration-300",
                isActive
                  ? "bg-[#2F4F3E] text-white shadow-[0_14px_28px_rgba(47,79,62,0.22)]"
                  : "text-[#27241F] hover:bg-white/70 hover:text-[#2F4F3E]"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-[22px] w-[22px]" strokeWidth={1.9} />
              <span>{item.label}</span>
            </motion.a>
          );
        })}
      </nav>

      <div className="mt-auto space-y-8 pt-10">
        <TravelArtwork />

        <figure className="rounded-3xl bg-white/[0.48] px-5 py-5">
          <div className="font-serif text-3xl font-bold leading-none text-[#2F4F3E]">
            "
          </div>
          <blockquote className="mt-1 text-sm font-medium leading-6 text-[#1F261F]">
            The journey is planned, the memories are not.
          </blockquote>
          <figcaption className="mt-3 text-xs font-medium text-[#7F7A70]">
            - Let's make it unforgettable.
          </figcaption>
        </figure>

        <div className="flex items-center justify-between rounded-3xl bg-[#FAF8F4] px-4 py-3 shadow-[0_8px_20px_rgba(47,79,62,0.06)]">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#1F261F]">
            <Moon className="h-5 w-5 text-[#2F4F3E]" />
            <span>Dark Mode</span>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={onDarkModeChange}
            aria-label="Toggle dark mode"
          />
        </div>
      </div>
    </aside>
  );
}

