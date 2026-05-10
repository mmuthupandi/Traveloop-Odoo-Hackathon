import { Moon } from "lucide-react";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";
import { TravelArtwork } from "@/components/TravelArtwork";
import { Switch } from "@/components/ui/switch";
import { navItems } from "@/data/travel-dashboard";
import { getRouteForLabel, routeHashes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type SidebarProps = {
  darkMode: boolean;
  onDarkModeChange: (checked: boolean) => void;
};

export function Sidebar({ darkMode, onDarkModeChange }: SidebarProps) {
  return (
    <aside className="hidden xl:fixed xl:inset-y-0 xl:left-0 xl:z-40 xl:flex xl:w-[282px] xl:flex-col xl:border-r xl:border-[#DDD4C6] xl:bg-[#F8F4EB] xl:px-6 xl:py-9">
      <BrandLogo />

      <nav aria-label="Primary navigation" className="mt-14 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const route = getRouteForLabel(item.label);
          const isActive = item.label === "Home";

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
              className={cn(
                "flex h-14 items-center gap-4 rounded-2xl px-5 text-[15px] font-semibold transition-all duration-300",
                isActive
                  ? "bg-forest text-white shadow-[0_14px_28px_rgba(47,79,62,0.2)]"
                  : "text-ink hover:bg-white/70 hover:text-forest"
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

        <figure className="rounded-3xl bg-white/[0.45] px-5 py-5">
          <div className="font-serif text-3xl font-bold leading-none text-forest">
            “
          </div>
          <blockquote className="mt-1 text-sm font-medium leading-6 text-ink">
            Jobs fill your pocket, adventures fill your soul.
          </blockquote>
          <figcaption className="mt-3 text-xs font-medium text-muted">
            - Jamie Lyn Beatty
          </figcaption>
        </figure>

        <div className="flex items-center justify-between rounded-3xl bg-parchment px-4 py-3 shadow-[0_8px_20px_rgba(47,79,62,0.06)]">
          <div className="flex items-center gap-3 text-sm font-semibold text-ink">
            <Moon className="h-5 w-5 text-forest" />
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
