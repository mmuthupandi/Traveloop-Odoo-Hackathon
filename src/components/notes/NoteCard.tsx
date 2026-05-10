import { motion } from "framer-motion";
import { MoreVertical, MapPin, Clock, CheckSquare } from "lucide-react";
import { useState } from "react";
import type { Note } from "@/data/notes";
import { CATEGORY_META } from "@/data/notes";
import { NotesCategoryBadge } from "@/components/notes/NotesCategoryBadge";
import { cn } from "@/lib/utils";

type Props = {
  note: Note;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  index: number;
};

export function NoteCard({ note, isSelected, onSelect, onDelete, onArchive, index }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const meta = CATEGORY_META[note.category];
  const checkedCount = note.checklist?.filter((c) => c.done).length ?? 0;
  const totalCount = note.checklist?.length ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={onSelect}
      className={cn(
        "group relative cursor-pointer rounded-2xl border p-4 transition-all duration-200",
        isSelected
          ? "border-[#2F4F3E]/30 bg-[#EAF4EE] shadow-[0_4px_20px_rgba(47,79,62,0.12)]"
          : "border-[#E8DED1]/60 bg-white hover:border-[#2F4F3E]/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon container */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: meta.bg }}
        >
          <span className="text-lg">
            {note.category === "Important" ? "⚠️"
              : note.category === "Day Plan" ? "📅"
              : note.category === "Contacts" ? "👤"
              : note.category === "Food" ? "🍽️"
              : note.category === "Ideas" ? "💡"
              : "🛍️"}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-[#1F261F] text-sm leading-snug truncate">{note.title}</p>
            {/* 3-dot menu */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
                className="rounded-lg p-1 text-[#B0A898] opacity-0 transition-all duration-150 hover:bg-[#F0EDE8] hover:text-[#1F261F] group-hover:opacity-100"
                aria-label="Note options"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 top-7 z-20 min-w-[140px] overflow-hidden rounded-xl border border-[#E8DED1] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button type="button" onClick={() => { onArchive(note.id); setMenuOpen(false); }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-[#1F261F] hover:bg-[#F7F4EE]">
                    Archive
                  </button>
                  <button type="button" onClick={() => { onDelete(note.id); setMenuOpen(false); }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-[#E87565] hover:bg-[#FDECEA]">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="mt-0.5 text-xs text-[#7F7A70] line-clamp-2 leading-relaxed">{note.preview}</p>

          {/* Checklist progress */}
          {note.type === "checklist" && totalCount > 0 && (
            <div className="mt-2 flex items-center gap-1.5">
              <CheckSquare className="h-3 w-3 text-[#2F4F3E]" strokeWidth={2} />
              <span className="text-[10px] font-semibold text-[#2F4F3E]">{checkedCount}/{totalCount} done</span>
              <div className="flex-1 h-1 rounded-full bg-[#F0EDE8]">
                <div className="h-full rounded-full bg-[#2F4F3E] transition-all duration-300"
                  style={{ width: `${(checkedCount / totalCount) * 100}%` }} />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <NotesCategoryBadge category={note.category} />
            <div className="flex items-center gap-2 text-[10px] text-[#B0A898]">
              <span className="flex items-center gap-0.5">
                <MapPin className="h-2.5 w-2.5" />{note.stop.split(",")[0]}
              </span>
              <span className="flex items-center gap-0.5">
                <Clock className="h-2.5 w-2.5" />{note.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
