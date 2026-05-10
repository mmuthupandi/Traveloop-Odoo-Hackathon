import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { quickActions } from "@/data/travel-dashboard";
import { cn } from "@/lib/utils";

export function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-title">
      <SectionHeader
        id="quick-actions-title"
        title="Quick Actions"
        action="View all"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <a key={action.title} href={`#/${action.route}`}>
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.025 }}
                className={cn(
                  "group min-h-[190px] h-full rounded-3xl p-6 shadow-travel transition-all duration-300 hover:shadow-float cursor-pointer",
                  action.palette
                )}
              >
                <div
                  className={cn(
                    "grid h-14 w-14 place-items-center rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]",
                    action.iconPalette
                  )}
                >
                  <Icon className="h-8 w-8" strokeWidth={1.8} />
                </div>
                <div className="mt-7 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink">
                      {action.title}
                    </h3>
                    <p className="mt-2 max-w-[13rem] text-sm font-medium leading-6 text-ink/75">
                      {action.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_9px_18px_rgba(31,38,31,0.12)] transition-all duration-300 group-hover:bg-forest group-hover:text-white"
                    aria-label={`Open ${action.title}`}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.article>
            </a>
          );
        })}
      </div>
    </section>
  );
}
