import { motion } from "framer-motion";
import { Moon, Mountain, Quote } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { navItems } from "@/data/travel-dashboard";
import { TravelArtwork } from "@/components/TravelArtwork";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { getRouteForLabel, routeHashes, type AppRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

export const navbarQuotes: Record<string, { quote: string; author: string }> = {
  home: {
    quote: "Jobs fill your pocket, adventures fill your soul.",
    author: "Jaime Lyn Beatty"
  },
  "my-trips": {
    quote: "Collect moments, not things.",
    author: "Karen Salmansohn"
  },
  "itinerary-builder": {
    quote: "A goal without a plan is just a wish.",
    author: "Antoine de Saint-Exupéry"
  },
  explore: {
    quote: "The world is a book and those who do not travel read only one page.",
    author: "Saint Augustine"
  },
  budget: {
    quote: "Beware of little expenses; a small leak will sink a great ship.",
    author: "Benjamin Franklin"
  },
  packing: {
    quote: "Pack light and carry only what you need.",
    author: "David Hieatt"
  },
  notes: {
    quote: "Traveling leaves you speechless, then turns you into a storyteller.",
    author: "Ibn Battuta"
  },
  settings: {
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci"
  }
};

const fallbackQuote = {
  quote: "Not all those who wander are lost.",
  author: "J.R.R. Tolkien"
};

type AppSidebarProps = {
  activeRoute: AppRoute;
  darkMode: boolean;
  onDarkModeChange: (v: boolean) => void;
};

export function AppSidebar({ activeRoute, darkMode, onDarkModeChange }: AppSidebarProps) {
  const current = navbarQuotes[activeRoute] ?? fallbackQuote;

  return (
    <>
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[282px] flex-col border-r border-[#DDD4C6] bg-[#F8F4EB] px-6 py-8 xl:flex">

      {/* ── Brand ── */}
      <div className="flex items-center gap-3">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#2F4F3E] text-white shadow-[0_8px_20px_rgba(47,79,62,0.25)]">
          <Mountain className="h-7 w-7" />
        </div>
        <div>
          <p className="font-serif text-xl font-extrabold tracking-tight text-[#1F261F]">
            Traveloop
          </p>
          <p className="font-script text-base text-[#2F4F3E]">Stories begin here</p>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="mt-8 space-y-1" aria-label="Primary navigation">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const route = getRouteForLabel(item.label);
          const isActive = route === activeRoute;

          return (
            <motion.a
              key={item.label}
              href={route ? routeHashes[route] : "#"}
              onClick={(e) => { if (!route) e.preventDefault(); }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              whileHover={isActive ? {} : { x: 3 }}
              className={cn(
                "flex h-[50px] w-full items-center gap-3.5 rounded-2xl px-4 text-[15px] font-semibold transition-all duration-200",
                isActive
                  ? "bg-[#2F4F3E] text-white shadow-[0_10px_24px_rgba(47,79,62,0.28)]"
                  : "text-[#3A3530] hover:bg-white/80 hover:text-[#2F4F3E] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "text-[#7F7A70]")}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span>{item.label}</span>
            </motion.a>
          );
        })}
      </nav>

      {/* ── Dynamic Quote Block — fills the blank gap ── */}
      <div className="mx-1 mt-5 rounded-2xl border border-[#E2D9CC] bg-white/60 px-4 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <Quote className="h-4 w-4 text-[#2F4F3E]/50" strokeWidth={1.5} />
        <motion.p
          key={activeRoute + "-quote"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-2 text-[12.5px] font-medium leading-[1.65] text-[#2C2822] italic"
        >
          "{current.quote}"
        </motion.p>
        <motion.p
          key={activeRoute + "-author"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="mt-2 text-[11px] font-semibold tracking-wide text-[#7F7A70]"
        >
          — {current.author}
        </motion.p>
      </div>

      {/* ── Bottom: artwork + dark mode ── */}
      <div className="mt-auto space-y-4 pt-5">
        <TravelArtwork />

        <div className="flex items-center justify-between rounded-2xl bg-[#F0EAD8] px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-[#2C2822]">
            <Moon className="h-4 w-4 text-[#2F4F3E]" />
            Dark Mode
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={onDarkModeChange}
            aria-label="Toggle dark mode"
          />
        </div>
      </div>

    </aside>

    {/* ── Mobile bottom nav (hidden on xl+) ── */}
    <MobileBottomNav activeRoute={activeRoute} />
    </>
  );
}
