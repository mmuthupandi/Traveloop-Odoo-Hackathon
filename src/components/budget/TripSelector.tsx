import { ChevronDown, Edit3, MapPin } from "lucide-react";
import { tripSelectorData } from "@/data/budget";

export function TripSelector() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Trip card */}
      <button
        type="button"
        className="flex items-center gap-3 rounded-2xl border border-[#E8DED1]/80 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
        aria-label="Select trip"
      >
        <img
          src={tripSelectorData.image}
          alt={tripSelectorData.title}
          className="h-12 w-16 rounded-xl object-cover"
        />
        <div className="text-left">
          <p className="text-base font-bold text-[#1F261F]">
            {tripSelectorData.title} {tripSelectorData.emoji}
          </p>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-[#7F7A70]">
            <span>{tripSelectorData.dates}</span>
            <span className="h-1 w-1 rounded-full bg-[#7F7A70]" />
            <span className="flex items-center gap-0.5">
              <MapPin className="h-3 w-3" />
              {tripSelectorData.stops} Stops
            </span>
          </div>
        </div>
        <ChevronDown className="ml-2 h-4 w-4 text-[#7F7A70]" />
      </button>

      {/* Edit budget button */}
      <button
        type="button"
        className="flex items-center gap-2 rounded-2xl bg-[#2F4F3E] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(47,79,62,0.25)] transition-all duration-200 hover:bg-[#3C6B52] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(47,79,62,0.3)]"
      >
        <Edit3 className="h-4 w-4" />
        Edit Budget
      </button>
    </div>
  );
}
