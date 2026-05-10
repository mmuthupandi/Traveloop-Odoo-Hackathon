import { ChevronDown, MapPin, Plus, RotateCcw, CheckCircle2 } from "lucide-react";
import { packingTripData } from "@/data/packing";

type PackingTripSelectorProps = {
  onAddItem: () => void;
  onReset: () => void;
  onMarkAll: () => void;
};

export function PackingTripSelector({
  onAddItem,
  onReset,
  onMarkAll
}: PackingTripSelectorProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Trip selector card */}
      <button
        type="button"
        className="flex items-center gap-3 self-start rounded-2xl border border-[#E8DED1]/80 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
        aria-label="Select trip"
      >
        <img
          src={packingTripData.image}
          alt={packingTripData.title}
          className="h-12 w-16 rounded-xl object-cover"
        />
        <div className="text-left">
          <p className="text-base font-bold text-[#1F261F]">
            {packingTripData.title} {packingTripData.emoji}
          </p>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-[#7F7A70]">
            <span>{packingTripData.dates}</span>
            <span className="h-1 w-1 rounded-full bg-[#7F7A70]" />
            <span className="flex items-center gap-0.5">
              <MapPin className="h-3 w-3" />
              {packingTripData.stops} Stops
            </span>
          </div>
        </div>
        <ChevronDown className="ml-2 h-4 w-4 text-[#7F7A70]" />
      </button>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onAddItem}
          className="flex items-center gap-2 rounded-xl border border-[#E8DED1] bg-white px-4 py-2.5 text-sm font-semibold text-[#1F261F] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[#2F4F3E]/30 hover:bg-[#F7F4EE] hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border border-[#E8DED1] bg-white px-4 py-2.5 text-sm font-semibold text-[#1F261F] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[#C46A2D]/30 hover:bg-[#FEF6EE] hover:-translate-y-0.5"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Checklist
        </button>

        <button
          type="button"
          onClick={onMarkAll}
          className="flex items-center gap-2 rounded-xl bg-[#2F4F3E] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(47,79,62,0.25)] transition-all duration-200 hover:bg-[#3C6B52] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(47,79,62,0.3)]"
        >
          <CheckCircle2 className="h-4 w-4" />
          Mark All as Packed
        </button>
      </div>
    </div>
  );
}
