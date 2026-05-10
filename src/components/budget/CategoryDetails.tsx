import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import type { BudgetCategory } from "@/data/budget";

type Props = {
  categories: BudgetCategory[];
  onUpdateBudget: (id: string, newBudget: number) => void;
};

export function CategoryDetails({ categories, onUpdateBudget }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  function startEdit(cat: BudgetCategory) {
    setEditingId(cat.id);
    setEditValue(String(cat.budget));
  }

  function saveEdit(id: string) {
    const val = parseFloat(editValue);
    if (!isNaN(val) && val >= 0) onUpdateBudget(id, val);
    setEditingId(null);
  }

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <h3 className="font-serif text-xl font-bold text-[#1F261F]">Category Details</h3>

      <ul className="mt-5 space-y-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const pct = cat.budget > 0 ? Math.round((cat.spent / cat.budget) * 100) : 0;
          const isOver = pct >= 100;
          const isEditing = editingId === cat.id;

          return (
            <li key={cat.id}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: cat.bgColor }}>
                  <Icon className="h-4 w-4" style={{ color: cat.color }} strokeWidth={1.8} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[#1F261F]">{cat.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#1F261F]">
                        ${cat.spent}
                        {isEditing ? (
                          <span className="font-normal text-[#7F7A70]"> / </span>
                        ) : (
                          <span className="font-normal text-[#7F7A70]"> / ${cat.budget}</span>
                        )}
                      </span>
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            autoFocus
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") saveEdit(cat.id); if (e.key === "Escape") setEditingId(null); }}
                            className="w-16 rounded-lg border border-[#2F4F3E]/40 bg-[#F7F4EE] px-2 py-0.5 text-xs font-semibold text-[#1F261F] outline-none"
                          />
                          <button type="button" onClick={() => saveEdit(cat.id)} className="text-[#2F4F3E] hover:text-[#3C6B52]">
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button type="button" onClick={() => setEditingId(null)} className="text-[#7F7A70] hover:text-[#E87565]">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => startEdit(cat)}
                          className="rounded p-0.5 text-[#B0A898] hover:text-[#2F4F3E] transition-colors">
                          <Pencil className="h-3 w-3" />
                        </button>
                      )}
                      <span className="text-xs font-semibold min-w-[32px] text-right" style={{ color: isOver ? "#E87565" : cat.color }}>
                        {pct}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#F0EDE8]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: isOver ? "#E87565" : cat.color }}
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
