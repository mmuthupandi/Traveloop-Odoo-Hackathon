import { useState } from "react";
import { Heart, MoreVertical, Plus, Star } from "lucide-react";
import { savedDestinations } from "@/data/settings";

export function SavedDestinationsCard() {
  const [liked, setLiked] = useState<Record<string, boolean>>(
    Object.fromEntries(savedDestinations.map((d) => [d.id, true]))
  );

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDECEA]">
            <Heart className="h-5 w-5 text-[#E87565]" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1F261F]">Saved Destinations</h3>
            <p className="text-xs font-medium text-[#7F7A70]">Your favorite and dream destinations.</p>
          </div>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-4 py-2 text-sm font-semibold text-[#2F4F3E] transition-all duration-200 hover:bg-[#2F4F3E] hover:text-white hover:border-[#2F4F3E]"
        >
          <Plus className="h-4 w-4" />
          Add Destination
        </button>
      </div>

      {/* Destination cards — horizontal scroll */}
      <div className="mt-5 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {savedDestinations.map((dest) => (
          <div
            key={dest.id}
            className="group relative w-[180px] shrink-0 overflow-hidden rounded-2xl border border-[#E8DED1]/60 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.1)]"
          >
            {/* Image */}
            <div className="relative h-[120px] overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Heart overlay */}
              <button
                type="button"
                onClick={() => setLiked((prev) => ({ ...prev, [dest.id]: !prev[dest.id] }))}
                aria-label={`${liked[dest.id] ? "Remove from" : "Add to"} saved`}
                className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform duration-200 hover:scale-110"
              >
                <Heart
                  className="h-3.5 w-3.5 transition-colors duration-200"
                  fill={liked[dest.id] ? "#E87565" : "none"}
                  stroke={liked[dest.id] ? "#E87565" : "#7F7A70"}
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* Info */}
            <div className="p-3">
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#1F261F]">{dest.name}</p>
                  <p className="text-xs font-medium text-[#7F7A70]">{dest.region}</p>
                </div>
                <button
                  type="button"
                  aria-label="More options"
                  className="shrink-0 rounded-lg p-1 text-[#7F7A70] hover:bg-[#F0EDE8] hover:text-[#1F261F]"
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-[#F3A33A] text-[#F3A33A]" />
                <span className="text-xs font-bold text-[#1F261F]">{dest.rating}</span>
                <span className="text-xs text-[#7F7A70]">({dest.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
