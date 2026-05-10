import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionButtonProps = {
  icon?: LucideIcon;
  label: string;
  variant?: "ghost" | "primary";
  href?: string;
  onClick?: () => void;
};

export function ActionButton({ icon: Icon, label, variant = "ghost", href, onClick }: ActionButtonProps) {
  const cls = cn(
    "inline-flex h-12 items-center gap-2 rounded-2xl px-4 text-sm font-semibold transition-all duration-300",
    variant === "primary"
      ? "bg-[#2F4F3E] text-white shadow-[0_14px_28px_rgba(47,79,62,0.24)] hover:bg-[#294536]"
      : "border border-[#DDD4C6] bg-white text-[#2C2A24] hover:border-[#C9BEAF] hover:bg-[#FCFAF6]"
  );

  const content = (
    <>
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cls}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cls}
    >
      {content}
    </motion.button>
  );
}

