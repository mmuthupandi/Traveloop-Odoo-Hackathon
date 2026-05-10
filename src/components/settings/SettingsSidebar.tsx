import { motion } from "framer-motion";
import { Moon, Mountain } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { navItems } from "@/data/travel-dashboard";
import { TravelArtwork } from "@/components/TravelArtwork";
import { getRouteForLabel, routeHashes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type SettingsSidebarProps = {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
};

export function SettingsSidebar({ darkMode, setDarkMode }: SettingsSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[282px] border-r border-[#DDD4C6] bg-[#F8F4EB] px-6 py-8 xl:flex xl:flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#2F4F3E] text-white">
          <Mountain className="h-7 w-7" />
        </div>
        <div>
          <p className="font-serif text-xl font-extrabold text-[#1F261F]">WONDERLUST</p>
          <p className="font-script text-lg text-[#2F4F3E]">Stories begin here</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-12 space-y-1.5" aria-label="Primary navigation">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const route = getRouteForLabel(item.label);
          const isActive = item.label === "Settings";

          return (
            <motion.a
              href={route ? routeHashes[route] : "#"}
              key={item.label}
              onClick={(e) => { if (!route) e.preventDefault(); }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ x: 2 }}
              className={cn(
                "flex h-[52px] w-full items-center gap-4 rounded-2xl px-4 text-[15px] font-semibold transition-all duration-300",
                isActive
                  ? "bg-[#2F4F3E] text-white shadow-[0_12px_24px_rgba(47,79,62,0.24)]"
                  : "text-[#27241F] hover:bg-white/70 hover:text-[#2F4F3E]"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} />
              {item.label}
            </motion.a>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto space-y-5">
        <TravelArtwork />

        <figure className="rounded-3xl bg-white/50 px-5 py-4">
          <div className="font-serif text-3xl font-bold leading-none text-[#2F4F3E]">"</div>
          <blockquote className="mt-1 text-sm font-medium leading-6 text-[#1F261F]">
            The world is a book and those who do not travel read only one page.
          </blockquote>
          <figcaption className="mt-2 text-xs font-medium text-[#7F7A70]">
            – St. Augustine
          </figcaption>
        </figure>

        <div className="flex items-center justify-between rounded-2xl bg-[#F5EEE2] px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2C2822]">
            <Moon className="h-4 w-4" />
            Dark Mode
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} aria-label="Toggle dark mode" />
        </div>
      </div>
    </aside>
  );
}
