import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type TimelineMarkerProps = {
  index: number;
  badgeClass: string;
  isLast: boolean;
};

export function TimelineMarker({ index, badgeClass, isLast }: TimelineMarkerProps) {
  return (
    <div className="relative hidden w-16 shrink-0 flex-col items-center md:flex">
      <div
        className={cn(
          "z-10 grid h-11 w-11 place-items-center rounded-full text-sm font-extrabold text-white shadow-[0_10px_22px_rgba(0,0,0,0.16)]",
          badgeClass
        )}
      >
        {index + 1}
      </div>
      {!isLast ? (
        <div className="absolute top-12 h-[calc(100%+2rem)] border-l-2 border-dashed border-[#D6CABC]" />
      ) : null}
      <GripVertical className="mt-12 h-5 w-5 text-[#B7AB9B]" />
    </div>
  );
}

