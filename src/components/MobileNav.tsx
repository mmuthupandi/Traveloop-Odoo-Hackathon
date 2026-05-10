import { motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { mobileActions } from "@/data/travel-dashboard";

export function MobileNav() {
  return (
    <div className="sticky top-0 z-40 border-b border-forest/10 bg-cream/90 px-4 py-4 backdrop-blur-xl xl:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <BrandLogo />
        <div className="flex items-center gap-2 overflow-x-auto">
          {mobileActions.slice(0, 3).map((item) => {
            const Icon = item.icon;
            return (
              <motion.div whileTap={{ scale: 0.96 }} key={item.label}>
                <Button
                  type="button"
                  variant={item.label === "Plan" ? "default" : "outline"}
                  size="icon"
                  aria-label={item.label}
                  className="h-11 w-11 shrink-0"
                >
                  <Icon className="h-5 w-5" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
