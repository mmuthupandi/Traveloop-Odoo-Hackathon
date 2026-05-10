import {
  AlertCircle, CalendarDays, Users, Utensils, Lightbulb, ShoppingBag
} from "lucide-react";
import type { NoteCategory } from "@/data/notes";
import { CATEGORY_META } from "@/data/notes";

const ICONS = { AlertCircle, CalendarDays, Users, Utensils, Lightbulb, ShoppingBag };

type Props = { category: NoteCategory; size?: "sm" | "md" };

export function NotesCategoryBadge({ category, size = "sm" }: Props) {
  const meta = CATEGORY_META[category];
  const IconName = meta.icon as keyof typeof ICONS;
  const Icon = ICONS[IconName];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${
        size === "sm" ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
      }`}
      style={{ backgroundColor: meta.bg, color: meta.color }}
    >
      {Icon && <Icon className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} strokeWidth={2} />}
      {category}
    </span>
  );
}
