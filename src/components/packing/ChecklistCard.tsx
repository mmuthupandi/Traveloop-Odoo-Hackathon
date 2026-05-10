import { useState } from "react";
import { Plus, MoreVertical, Trash2, CheckSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChecklistItem } from "@/components/packing/ChecklistItem";
import type { PackingCategory, PackingItem } from "@/data/packing";
import { cn } from "@/lib/utils";

type ChecklistCardProps = {
  category: PackingCategory;
  onToggleItem: (categoryId: string, itemId: string) => void;
  onAddItem: (categoryId: string, label: string) => void;
  onMarkAllCategory: (categoryId: string) => void;
};

export function ChecklistCard({
  category,
  onToggleItem,
  onAddItem,
  onMarkAllCategory
}: ChecklistCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [newItemLabel, setNewItemLabel] = useState("");

  const Icon = category.icon;
  const packedCount = category.items.filter((i) => i.packed).length;
  const total = category.items.length;
  const pct = total > 0 ? Math.round((packedCount / total) * 100) : 0;

  function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = newItemLabel.trim();
    if (trimmed) {
      onAddItem(category.id, trimmed);
      setNewItemLabel("");
      setAddingItem(false);
    }
  }

  // Split items into two columns
  const half = Math.ceil(category.items.length / 2);
  const col1 = category.items.slice(0, half);
  const col2 = category.items.slice(half);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-[#E8DED1]/60 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
    >
      {/* Card header */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: category.bgColor }}
        >
          <Icon className="h-6 w-6" style={{ color: category.color }} strokeWidth={1.8} />
        </div>

        {/* Title + count */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-[#1F261F]">
              {category.label}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#7F7A70]">
                {packedCount} / {total} packed
              </span>

              {/* + Add */}
              <button
                type="button"
                onClick={() => setAddingItem(true)}
                className="flex items-center gap-1 rounded-lg border border-[#E8DED1] bg-[#F7F4EE] px-2.5 py-1 text-xs font-semibold text-[#2F4F3E] transition-all duration-200 hover:bg-[#2F4F3E] hover:text-white hover:border-[#2F4F3E]"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>

              {/* 3-dot menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="rounded-lg p-1.5 text-[#7F7A70] transition-colors duration-150 hover:bg-[#F0EDE8] hover:text-[#1F261F]"
                  aria-label="Category options"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-8 z-20 min-w-[160px] rounded-xl border border-[#E8DED1] bg-white py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
                    >
                      <button
                        type="button"
                        onClick={() => { onMarkAllCategory(category.id); setMenuOpen(false); }}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#1F261F] hover:bg-[#F7F4EE]"
                      >
                        <CheckSquare className="h-4 w-4 text-[#3C8B68]" />
                        Mark all packed
                      </button>
                      <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#E87565] hover:bg-[#FDECEA]"
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear category
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F0EDE8]">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: category.color }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Add item input */}
      <AnimatePresence>
        {addingItem && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleAddSubmit}
            className="mt-3 overflow-hidden"
          >
            <div className="flex gap-2">
              <input
                autoFocus
                type="text"
                value={newItemLabel}
                onChange={(e) => setNewItemLabel(e.target.value)}
                placeholder="Item name..."
                className="flex-1 rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-3 py-2 text-sm font-medium text-[#1F261F] outline-none placeholder:text-[#B0A898] focus:border-[#2F4F3E]/40 focus:ring-2 focus:ring-[#2F4F3E]/10"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#2F4F3E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3C6B52]"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => { setAddingItem(false); setNewItemLabel(""); }}
                className="rounded-xl border border-[#E8DED1] px-3 py-2 text-sm font-medium text-[#7F7A70] hover:bg-[#F0EDE8]"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Two-column checklist */}
      <div className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <div className="space-y-0.5">
          {col1.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              color={category.color}
              onToggle={(id) => onToggleItem(category.id, id)}
            />
          ))}
        </div>
        <div className="space-y-0.5">
          {col2.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              color={category.color}
              onToggle={(id) => onToggleItem(category.id, id)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
