import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import type { Note, NoteCategory } from "@/data/notes";
import { CATEGORY_META, TRIP_OPTIONS } from "@/data/notes";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (note: Omit<Note, "id">) => void;
};

const inputCls = "w-full rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-3 py-2.5 text-sm font-medium text-[#1F261F] outline-none focus:border-[#2F4F3E]/50 focus:ring-2 focus:ring-[#2F4F3E]/10 transition-all";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#7F7A70]";

const CATEGORIES: NoteCategory[] = ["Important", "Day Plan", "Contacts", "Food", "Ideas", "Shopping"];

export function AddNoteModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    title: "",
    category: "Day Plan" as NoteCategory,
    trip: "Bali Getaway 🌴",
    stop: "",
    content: "",
    type: "text" as "text" | "checklist",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    const now = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    onAdd({
      title: form.title.trim(),
      category: form.category,
      trip: form.trip,
      date: now,
      stop: form.stop.trim() || "Bali, Indonesia",
      preview: form.content.slice(0, 80) + (form.content.length > 80 ? "..." : ""),
      content: form.content,
      type: form.type,
      checklist: form.type === "checklist" ? [] : undefined,
      archived: false,
      createdAt: now + ", " + new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      updatedAt: now + ", " + new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    });
    setForm({ title: "", category: "Day Plan", trip: "Bali Getaway 🌴", stop: "", content: "", type: "text" });
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={onClose} />

          {/* Scrollable overlay — works with any sidebar width */}
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 xl:pl-[282px]">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-2xl border border-[#E8DED1] bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-xl font-bold text-[#1F261F]">Add New Note</h3>
              <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0EDE8] text-[#7F7A70] hover:bg-[#E8DED1]">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelCls}>Title</label>
                <input className={inputCls} placeholder="Note title..." value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Category</label>
                  <select className={inputCls} value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as NoteCategory })}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Type</label>
                  <select className={inputCls} value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as "text" | "checklist" })}>
                    <option value="text">Text Note</option>
                    <option value="checklist">Checklist</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Trip</label>
                  <select className={inputCls} value={form.trip}
                    onChange={(e) => setForm({ ...form, trip: e.target.value })}>
                    {TRIP_OPTIONS.map((t) => (
                      <option key={t.id} value={`${t.title} ${t.emoji}`}>{t.title} {t.emoji}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Stop / Location</label>
                  <input className={inputCls} placeholder="e.g. Ubud, Bali" value={form.stop}
                    onChange={(e) => setForm({ ...form, stop: e.target.value })} />
                </div>
              </div>

              <div>
                <label className={labelCls}>{form.type === "checklist" ? "Initial items (one per line)" : "Content"}</label>
                <textarea rows={4} className={`${inputCls} resize-none`}
                  placeholder={form.type === "checklist" ? "Item 1\nItem 2\nItem 3..." : "Write your note here..."}
                  value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose}
                  className="flex-1 rounded-xl border border-[#E8DED1] py-2.5 text-sm font-semibold text-[#7F7A70] hover:bg-[#F0EDE8]">
                  Cancel
                </button>
                <button type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2F4F3E] py-2.5 text-sm font-semibold text-white hover:bg-[#3C6B52]">
                  <Plus className="h-4 w-4" /> Add Note
                </button>
              </div>
            </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
