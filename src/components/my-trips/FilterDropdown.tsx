import { useState, useRef, useEffect } from "react";
import { Filter, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type SortOption = "default" | "date-asc" | "date-desc" | "budget-asc" | "budget-desc";

const options: { id: SortOption; label: string }[] = [
  { id: "default",      label: "Default order"      },
  { id: "date-asc",     label: "Date: Earliest first" },
  { id: "date-desc",    label: "Date: Latest first"   },
  { id: "budget-asc",   label: "Budget: Low to high"  },
  { id: "budget-desc",  label: "Budget: High to low"  },
];

type FilterDropdownProps = {
  value: SortOption;
  onChange: (v: SortOption) => void;
};

export function FilterDropdown({ value, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isFiltered = value !== "default";

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-12 items-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition-all duration-200",
          isFiltered
            ? "border-[#2F4F3E] bg-[#EAF4EE] text-[#2F4F3E]"
            : "border-[#DDD4C6] bg-white text-[#2C2A24] hover:border-[#C9BEAF] hover:bg-[#FCFAF6]"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Filter className="h-4 w-4" />
        <span>Filter</span>
        {isFiltered && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#2F4F3E] text-[9px] font-bold text-white">
            1
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-14 z-30 min-w-[210px] overflow-hidden rounded-2xl border border-[#E8DED1] bg-white py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
          >
            {options.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === opt.id}
                  onClick={() => { onChange(opt.id); setOpen(false); }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-150",
                    value === opt.id
                      ? "bg-[#EAF4EE] text-[#2F4F3E] font-semibold"
                      : "text-[#1F261F] hover:bg-[#F7F4EE]"
                  )}
                >
                  {opt.label}
                  {value === opt.id && <Check className="h-3.5 w-3.5 text-[#2F4F3E]" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
