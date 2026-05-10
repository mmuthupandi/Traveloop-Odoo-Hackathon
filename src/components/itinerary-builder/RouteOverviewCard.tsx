import { Expand } from "lucide-react";
import { routePins } from "@/data/itinerary-builder";

export function RouteOverviewCard() {
  return (
    <section className="rounded-3xl border border-[#E8DED1] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl font-bold text-[#1F261F]">Route Overview</h3>
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full bg-[#F7F4EE] text-[#2F4F3E]"
          aria-label="Expand route overview"
        >
          <Expand className="h-4 w-4" />
        </button>
      </div>

      <div className="relative mt-5 h-72 overflow-hidden rounded-3xl border border-[#E8DED1] bg-[#EEF0EA]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,106,45,0.16),transparent_12rem),radial-gradient(circle_at_70%_60%,rgba(47,79,62,0.16),transparent_10rem)]" />
        <svg
          viewBox="0 0 320 300"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M64 60 C116 88 128 122 150 148 C178 180 221 184 252 214"
            fill="none"
            stroke="#2F4F3E"
            strokeWidth="3"
            strokeDasharray="8 9"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M18 286 C69 239 92 214 126 236 C172 266 215 222 302 248"
            fill="none"
            stroke="#CFC4B2"
            strokeWidth="16"
            opacity="0.5"
          />
          <path
            d="M12 94 C83 42 143 55 198 28 C236 10 277 34 314 56"
            fill="none"
            stroke="#D8D0C1"
            strokeWidth="14"
            opacity="0.55"
          />
        </svg>
        {routePins.map((pin, index) => (
          <span
            key={`${pin.x}-${pin.y}`}
            className="absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#2F4F3E] text-xs font-extrabold text-white shadow-[0_10px_20px_rgba(47,79,62,0.2)]"
            style={{ left: pin.x, top: pin.y }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </section>
  );
}

