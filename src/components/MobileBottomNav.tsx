import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BriefcaseBusiness,
  Compass,
  WalletCards,
  MoreHorizontal,
  Route,
  Backpack,
  NotebookPen,
  UserRound,
  Settings,
  X,
  Mountain
} from "lucide-react";
import { routeHashes, type AppRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

const primaryTabs = [
  { label: "Home",     icon: Home,             route: "home"     as AppRoute },
  { label: "My Trips", icon: BriefcaseBusiness, route: "my-trips" as AppRoute },
  { label: "Explore",  icon: Compass,           route: "explore"  as AppRoute },
  { label: "Budget",   icon: WalletCards,       route: "budget"   as AppRoute },
  { label: "More",     icon: MoreHorizontal,    route: null },
] as const;

const moreItems = [
  { label: "Itinerary Builder", icon: Route,       route: "itinerary-builder" as AppRoute },
  { label: "Packing List",      icon: Backpack,    route: "packing"           as AppRoute },
  { label: "Notes",             icon: NotebookPen, route: "notes"             as AppRoute },
  { label: "Profile",           icon: UserRound,   route: "profile"           as AppRoute },
  { label: "Settings",          icon: Settings,    route: "settings"          as AppRoute },
];

type Props = { activeRoute: AppRoute };

export function MobileBottomNav({ activeRoute }: Props) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreIsActive = moreItems.some((i) => i.route === activeRoute);

  return (
    <>
      {/* ── Fixed bottom bar ── */}
      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-50 xl:hidden"
      >
        <div className="border-t border-[#DDD4C6] bg-[#F8F4EB]/96 pb-safe backdrop-blur-xl">
          <div className="flex h-16 items-stretch">
            {primaryTabs.map((tab) => {
              const Icon = tab.icon;
              const isMore = tab.label === "More";
              const isActive = isMore
                ? moreIsActive || moreOpen
                : tab.route === activeRoute;

              return (
                <a
                  key={tab.label}
                  href={!isMore && tab.route ? routeHashes[tab.route] : undefined}
                  onClick={
                    isMore
                      ? (e) => { e.preventDefault(); setMoreOpen((v) => !v); }
                      : () => setMoreOpen(false)
                  }
                  className={cn(
                    "relative flex flex-1 flex-col items-center justify-center gap-[3px] text-[10px] font-semibold transition-colors duration-200",
                    isActive ? "text-[#2F4F3E]" : "text-[#9B9488]"
                  )}
                  aria-current={isActive && !isMore ? "page" : undefined}
                  aria-label={tab.label}
                >
                  {/* Active dot — sits above the icon */}
                  {isActive && (
                    <motion.span
                      layoutId="mob-dot"
                      className="absolute top-1.5 h-1 w-5 rounded-full bg-[#2F4F3E]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}

                  <Icon
                    className={cn(
                      "h-[22px] w-[22px] transition-all duration-200",
                      isActive ? "text-[#2F4F3E]" : "text-[#9B9488]"
                    )}
                    strokeWidth={isActive ? 2.2 : 1.7}
                  />
                  <span className={isActive ? "font-bold" : ""}>{tab.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── More sheet ── */}
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm xl:hidden"
              onClick={() => setMoreOpen(false)}
            />

            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[28px] border-t border-[#DDD4C6] bg-[#F8F4EB] px-5 pb-12 pt-3 xl:hidden"
            >
              {/* Handle */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#D0C9BE]" />

              {/* Header */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-[#2F4F3E]">
                    <Mountain className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-serif text-base font-bold text-[#1F261F]">
                    More Pages
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMoreOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDE8E0] text-[#7F7A70] hover:bg-[#E0D9CF]"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-5 gap-2">
                {moreItems.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = item.route === activeRoute;
                  return (
                    <motion.a
                      key={item.label}
                      href={routeHashes[item.route]}
                      onClick={() => setMoreOpen(false)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.22 }}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-2xl px-1 py-3 text-center transition-all duration-200 active:scale-95",
                        isActive
                          ? "bg-[#2F4F3E] text-white shadow-[0_8px_20px_rgba(47,79,62,0.25)]"
                          : "bg-white text-[#3A3530] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon
                        className={cn("h-5 w-5", isActive ? "text-white" : "text-[#7F7A70]")}
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />
                      <span className="text-[9px] font-semibold leading-tight">
                        {item.label}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
