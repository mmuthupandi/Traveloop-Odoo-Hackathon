import { motion } from "framer-motion";
import { Moon, Mountain } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { sidebarItems } from "@/data/my-trips";
import { TravelArtwork } from "@/components/TravelArtwork";
import { getRouteForLabel, routeHashes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type TripsSidebarProps = {
  darkMode: boolean;
  setDarkMode: (next: boolean) => void;
};

export function TripsSidebar({ darkMode, setDarkMode }: TripsSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[282px] border-r border-[#DDD4C6] bg-[#F8F4EB] px-6 py-8 xl:flex xl:flex-col">
      <div className="flex items-center gap-3">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#2F4F3E] text-white">
          <Mountain className="h-7 w-7" />
        </div>
        <div>
          <p className="font-serif text-xl font-extrabold text-[#1F261F]">Traveloop</p>
          <p className="font-script text-lg text-[#2F4F3E]">Stories begin here</p>
        </div>
      </div>

      <nav className="mt-12 space-y-2">
        {sidebarItems.map((item, i) => {
          const Icon = item.icon;
          const route = getRouteForLabel(item.label);
          const isActive = item.label === "My Trips";

          return (
            <motion.a
              href={route ? routeHashes[route] : "#"}
              key={item.label}
              onClick={(event) => {
                if (!route) event.preventDefault();
              }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ x: 2 }}
              className={cn(
                "flex h-14 w-full items-center gap-4 rounded-2xl px-4 text-left text-[17px] font-semibold transition-all duration-300",
                isActive
                  ? "bg-[#2F4F3E] text-white shadow-[0_12px_24px_rgba(47,79,62,0.24)]"
                  : "text-[#27241F] hover:bg-white/70"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </motion.a>
          );
        })}
      </nav>

      <div className="mt-auto space-y-6">
        <TravelArtwork />
        <figure className="rounded-3xl bg-white/50 p-4">
          <blockquote className="text-2xl font-serif text-[#2F4F3E]">“</blockquote>
          <p className="text-lg leading-8 text-[#2B2823]">Collect moments, not things.</p>
        </figure>
        <div className="flex items-center justify-between rounded-2xl bg-[#F5EEE2] px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2C2822]">
            <Moon className="h-4 w-4" />
            Dark Mode
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>
    </aside>
  );
}
