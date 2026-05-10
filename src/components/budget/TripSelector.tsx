import { useState } from "react";
import { ChevronDown, Edit3, MapPin, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { TripBudgetSeed } from "@/data/budget";
import { cn } from "@/lib/utils";

type Props = {
  seeds: TripBudgetSeed[];
  selectedId: string;
  onSelect: (id: string) => void;
  totalBudget: number;
  onBudgetChange: (v: number) => void;
};

export function TripSelector({ seeds, selectedId, onSelect, totalBudget, onBudgetChange }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(String(totalBudget));

  const selected = seeds.find((s) => s.tripId === selectedId) ?? seeds[0];

  function handleBudgetSave() {
    const val = parseFloat(budgetInput);
    if (!isNaN(val) && val > 0) onBudgetChange(val);
    setEditingBudget(false);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Trip dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-3 rounded-2xl border border-[#E8DED1]/80 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
          aria-label="Select trip"
        >
          <img src={selected.image} alt={selected.title} className="h-12 w-16 rounded-xl object-cover" />
          <div className="text-left">
            <p className="text-base font-bold text-[#1F261F]">{selected.title} {selected.emoji}</p>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-[#7F7A70]">
              <span>{selected.dates}</span>
              <span className="h-1 w-1 rounded-full bg-[#7F7A70]" />
              <span className="flex items-center gap-0.5">
                <MapPin className="h-3 w-3" />{selected.stops} Stops
              </span>
            </div>
          </div>
          <ChevronDown className={cn("ml-2 h-4 w-4 text-[#7F7A70] transition-transform duration-200", dropdownOpen && "rotate-180")} />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-[calc(100%+8px)] z-30 min-w-[280px] overflow-hidden rounded-2xl border border-[#E8DED1] bg-white py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
            >
              {seeds.map((seed) => (
                <li key={seed.tripId}>
                  <button
                    type="button"
                    onClick={() => { onSelect(seed.tripId); setDropdownOpen(false); }}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150",
                      seed.tripId === selectedId ? "bg-[#EAF4EE]" : "hover:bg-[#F7F4EE]"
                    )}
                  >
                    <img src={seed.image} alt={seed.title} className="h-10 w-14 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#1F261F]">{seed.title} {seed.emoji}</p>
                      <p className="text-xs text-[#7F7A70]">{seed.dates}</p>
                    </div>
                    {seed.tripId === selectedId && <Check className="h-4 w-4 text-[#2F4F3E] shrink-0" />}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Edit budget */}
      <div className="flex items-center gap-2">
        {editingBudget ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#7F7A70]">$</span>
              <input
                autoFocus
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleBudgetSave()}
                className="w-32 rounded-xl border border-[#2F4F3E]/40 bg-white pl-7 pr-3 py-2.5 text-sm font-semibold text-[#1F261F] outline-none focus:ring-2 focus:ring-[#2F4F3E]/20"
              />
            </div>
            <button type="button" onClick={handleBudgetSave}
              className="rounded-xl bg-[#2F4F3E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3C6B52]">
              Save
            </button>
            <button type="button" onClick={() => { setEditingBudget(false); setBudgetInput(String(totalBudget)); }}
              className="rounded-xl border border-[#E8DED1] px-3 py-2.5 text-sm font-medium text-[#7F7A70] hover:bg-[#F0EDE8]">
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => { setEditingBudget(true); setBudgetInput(String(totalBudget)); }}
            className="flex items-center gap-2 rounded-2xl bg-[#2F4F3E] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(47,79,62,0.25)] transition-all duration-200 hover:bg-[#3C6B52] hover:-translate-y-0.5"
          >
            <Edit3 className="h-4 w-4" />
            Edit Budget
          </button>
        )}
      </div>
    </div>
  );
}
