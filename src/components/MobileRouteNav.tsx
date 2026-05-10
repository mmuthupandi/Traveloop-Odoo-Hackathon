import { BriefcaseBusiness, Compass, Home, Route } from "lucide-react";
import type { AppRoute } from "@/lib/routes";
import { routeHashes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type MobileRouteNavProps = {
  activeRoute: AppRoute;
};

const mobileNavItems = [
  { label: "Home", route: "home" as const, icon: Home },
  { label: "Trips", route: "my-trips" as const, icon: BriefcaseBusiness },
  { label: "Builder", route: "itinerary-builder" as const, icon: Route },
  { label: "Explore", route: "explore" as const, icon: Compass }
];

export function MobileRouteNav({ activeRoute }: MobileRouteNavProps) {
  return (
    <nav className="fixed inset-x-4 bottom-4 z-50 rounded-3xl border border-[#DED4C7] bg-[#FFFCF6]/95 p-2 shadow-[0_18px_50px_rgba(47,79,62,0.18)] backdrop-blur-xl xl:hidden">
      <div className="grid grid-cols-4 gap-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.route;

          return (
            <a
              key={item.route}
              href={routeHashes[item.route]}
              className={cn(
                "flex h-14 items-center justify-center gap-1.5 rounded-2xl text-xs font-extrabold transition-all duration-300 sm:gap-2 sm:text-sm",
                isActive
                  ? "bg-[#2F4F3E] text-white shadow-[0_12px_24px_rgba(47,79,62,0.22)]"
                  : "text-[#433E35] hover:bg-[#F3ECE0]"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
