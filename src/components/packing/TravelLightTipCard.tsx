import { Leaf } from "lucide-react";
import { travelLightTip } from "@/data/packing";

export function TravelLightTipCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E8DED1]/60 bg-gradient-to-br from-[#EAF4EE] to-[#F7F4EE] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      {/* Decorative backpack illustration */}
      <div className="pointer-events-none absolute bottom-0 right-0 opacity-25">
        <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Backpack body */}
          <rect x="25" y="30" width="60" height="65" rx="14" fill="#2F4F3E" />
          {/* Strap top */}
          <rect x="38" y="18" width="34" height="18" rx="9" fill="#3C8B68" />
          {/* Front pocket */}
          <rect x="35" y="65" width="40" height="22" rx="8" fill="#3C6B52" />
          {/* Handle */}
          <rect x="46" y="12" width="18" height="8" rx="4" fill="#2F4F3E" />
          {/* Zipper line */}
          <line x1="35" y1="76" x2="75" y2="76" stroke="#EAF4EE" strokeWidth="2" strokeDasharray="4 3" />
          {/* Hat */}
          <ellipse cx="82" cy="28" rx="16" ry="6" fill="#C46A2D" opacity="0.7" />
          <rect x="72" y="14" width="20" height="16" rx="6" fill="#E87565" opacity="0.7" />
        </svg>
      </div>

      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D4EBD9]">
            <Leaf className="h-5 w-5 text-[#2F4F3E]" strokeWidth={1.8} />
          </div>
          <h3 className="font-serif text-base font-bold text-[#1F261F]">
            Travel Light Tip
          </h3>
        </div>
        <p className="mt-3 text-sm font-medium leading-relaxed text-[#1F261F]/80">
          {travelLightTip}
        </p>
      </div>
    </div>
  );
}
