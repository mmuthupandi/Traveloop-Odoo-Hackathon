import { cn } from "@/lib/utils";
import type { PackingItem } from "@/data/packing";

type ChecklistItemProps = {
  item: PackingItem;
  color: string;
  onToggle: (id: string) => void;
};

export function ChecklistItem({ item, color, onToggle }: ChecklistItemProps) {
  return (
    <label
      className="group flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1 transition-colors duration-150 hover:bg-[#F7F4EE]"
      htmlFor={`item-${item.id}`}
    >
      {/* Custom checkbox */}
      <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={`item-${item.id}`}
          type="checkbox"
          checked={item.packed}
          onChange={() => onToggle(item.id)}
          className="peer sr-only"
          aria-label={item.label}
        />
        {/* Unchecked ring */}
        <div
          className={cn(
            "h-5 w-5 rounded-md border-2 transition-all duration-200",
            item.packed ? "border-transparent" : "border-[#D0C9BE] group-hover:border-[#2F4F3E]/40"
          )}
          style={item.packed ? { backgroundColor: color } : {}}
        />
        {/* Checkmark */}
        {item.packed && (
          <svg
            className="pointer-events-none absolute h-3 w-3 text-white"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2,6 5,9 10,3" />
          </svg>
        )}
      </div>

      <span
        className={cn(
          "text-sm font-medium transition-all duration-200",
          item.packed
            ? "text-[#7F7A70] line-through"
            : "text-[#1F261F] group-hover:text-[#2F4F3E]"
        )}
      >
        {item.label}
      </span>
    </label>
  );
}
