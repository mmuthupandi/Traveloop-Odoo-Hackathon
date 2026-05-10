import { cn } from "@/lib/utils";
import type { PackingCategory } from "@/data/packing";

type CategoryFilterTabsProps = {
  categories: PackingCategory[];
  activeFilter: string;
  onChange: (id: string) => void;
};

export function CategoryFilterTabs({
  categories,
  activeFilter,
  onChange
}: CategoryFilterTabsProps) {
  const tabs = [{ id: "all", label: "All Items" }, ...categories.map((c) => ({ id: c.id, label: c.label }))];

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeFilter === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
            activeFilter === tab.id
              ? "bg-[#2F4F3E] text-white shadow-[0_4px_12px_rgba(47,79,62,0.2)]"
              : "border border-[#E8DED1] bg-white text-[#7F7A70] hover:border-[#2F4F3E]/30 hover:bg-[#F7F4EE] hover:text-[#2F4F3E]"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
