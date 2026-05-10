import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ItineraryButtonProps = {
  label: string;
  icon?: LucideIcon;
  variant?: "primary" | "outline";
  onClick?: () => void;
  className?: string;
};

export function ItineraryButton({
  label,
  icon: Icon,
  variant = "outline",
  onClick,
  className
}: ItineraryButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition-all duration-300",
        variant === "primary"
          ? "bg-[#2F4F3E] text-white shadow-[0_14px_28px_rgba(47,79,62,0.22)] hover:bg-[#294536]"
          : "border border-[#DDD4C6] bg-white text-[#25231E] shadow-[0_8px_22px_rgba(0,0,0,0.04)] hover:bg-[#FCFAF6]",
        className
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {label}
    </motion.button>
  );
}

