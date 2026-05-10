import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3, Archive, Trash2, MapPin, Calendar, Clock,
  X, Check, Plus, Lightbulb, BookOpen
} from "lucide-react";
import type { Note, ChecklistItem } from "@/data/notes";
import { CATEGORY_META } from "@/data/notes";
import { NotesCategoryBadge } from "@/components/notes/NotesCategoryBadge";
import { cn } from "@/lib/utils";

type Props = {
  note: Note | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onUpdate: (note: Note) => void;
};

export function NoteDetailPanel({ note, onClose, onDelete, onArchive, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");

  function startEdit() {
    if (!note) return;
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditing(true);
  }

  function saveEdit() {
    if (!note) return;
    onUpdate({ ...note, title: editTitle, content: editContent, updatedAt: new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) });
    setEditing(false);
  }

  function toggleChecklistItem(itemId: string) {
    if (!note?.checklist) return;
    onUpdate({
      ...note,
      checklist: note.checklist.map((c) =>
        c.id === itemId ? { ...c, done: !c.done } : c
      ),
      updatedAt: new Date().toLocaleString(),
    });
  }

  function addChecklistItem(text: string) {
    if (!note || !text.trim()) return;
    const newItem: ChecklistItem = { id: `c-${Date.now()}`, text: text.trim(), done: false };
    onUpdate({ ...note, checklist: [...(note.checklist ?? []), newItem] });
  }

  if (!note) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-[#E8DED1]/60 bg-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0EDE8]">
          <BookOpen className="h-8 w-8 text-[#B0A898]" strokeWidth={1.5} />
        </div>
        <p className="font-serif text-lg font-bold text-[#1F261F]">Select a note</p>
        <p className="text-sm text-[#7F7A70]">Click any note on the left to view its details here.</p>
      </div>
    );
  }

  const meta = CATEGORY_META[note.category];

  return (
    <motion.div
      key={note.id}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col rounded-2xl border border-[#E8DED1]/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-[#F0EDE8] px-5 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg" style={{ backgroundColor: meta.bg }}>
            {note.category === "Important" ? "⚠️"
              : note.category === "Day Plan" ? "📅"
              : note.category === "Contacts" ? "👤"
              : note.category === "Food" ? "🍽️"
              : note.category === "Ideas" ? "💡"
              : "🛍️"}
          </div>
          <div className="min-w-0">
            {editing ? (
              <input
                className="w-full rounded-lg border border-[#E8DED1] bg-[#F7F4EE] px-2 py-1 text-sm font-bold text-[#1F261F] outline-none focus:border-[#2F4F3E]/40"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <h3 className="font-serif text-lg font-bold text-[#1F261F] leading-snug">{note.title}</h3>
            )}
            <NotesCategoryBadge category={note.category} size="md" />
          </div>
        </div>
        <button type="button" onClick={onClose}
          className="shrink-0 rounded-lg p-1.5 text-[#B0A898] hover:bg-[#F0EDE8] hover:text-[#1F261F]">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 border-b border-[#F0EDE8] px-5 py-3">
        <span className="flex items-center gap-1.5 text-xs font-medium text-[#7F7A70]">
          <span className="text-sm">{note.trip.split(" ").slice(-1)[0]}</span>
          {note.trip.split(" ").slice(0, -1).join(" ")}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-[#7F7A70]">
          <Calendar className="h-3 w-3" />{note.date}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-[#7F7A70]">
          <MapPin className="h-3 w-3" />{note.stop}
        </span>
        {note.reminder && (
          <span className="flex items-center gap-1 rounded-full bg-[#FEF6EE] px-2 py-0.5 text-[10px] font-semibold text-[#C46A2D]">
            🔔 {note.reminder}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {note.type === "checklist" && note.checklist ? (
          <ChecklistContent
            items={note.checklist}
            onToggle={toggleChecklistItem}
            onAdd={addChecklistItem}
          />
        ) : editing ? (
          <textarea
            className="h-full min-h-[200px] w-full resize-none rounded-xl border border-[#E8DED1] bg-[#F7F4EE] p-3 text-sm font-medium text-[#1F261F] outline-none focus:border-[#2F4F3E]/40 leading-relaxed"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <div className="space-y-1">
            {note.content.split("\n").map((line, i) => (
              <p key={i} className={cn(
                "text-sm leading-relaxed",
                line === "" ? "h-3" : "",
                line.startsWith("•") || line.startsWith("–") ? "pl-2 text-[#1F261F]" : "",
                line.endsWith(":") && !line.startsWith("•") ? "mt-3 font-semibold text-[#1F261F]" : "text-[#3A3530]"
              )}>
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Timestamps */}
      <div className="border-t border-[#F0EDE8] px-5 py-3">
        <div className="flex items-center gap-4 text-[10px] text-[#B0A898]">
          <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" />Created: {note.createdAt}</span>
          <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" />Updated: {note.updatedAt}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-[#F0EDE8] px-5 py-4">
        {editing ? (
          <>
            <button type="button" onClick={saveEdit}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2F4F3E] py-2.5 text-sm font-semibold text-white hover:bg-[#3C6B52]">
              <Check className="h-4 w-4" /> Save
            </button>
            <button type="button" onClick={() => setEditing(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E8DED1] py-2.5 text-sm font-semibold text-[#7F7A70] hover:bg-[#F0EDE8]">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={startEdit}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E8DED1] py-2.5 text-sm font-semibold text-[#1F261F] hover:bg-[#F7F4EE] transition-colors">
              <Edit3 className="h-3.5 w-3.5" /> Edit
            </button>
            <button type="button" onClick={() => onArchive(note.id)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E8DED1] py-2.5 text-sm font-semibold text-[#7F7A70] hover:bg-[#F7F4EE] transition-colors">
              <Archive className="h-3.5 w-3.5" /> Archive
            </button>
            <button type="button" onClick={() => onDelete(note.id)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#FDECEA] py-2.5 text-sm font-semibold text-[#E87565] hover:bg-[#FDECEA] transition-colors">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </>
        )}
      </div>

      {/* Notes Tip Card */}
      <div className="mx-5 mb-5 overflow-hidden rounded-2xl border border-[#E8DED1]/60 bg-gradient-to-br from-[#EAF4EE] to-[#F7F4EE] p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4EBD9]">
            <Lightbulb className="h-4 w-4 text-[#2F4F3E]" strokeWidth={1.8} />
          </div>
          <p className="text-xs font-bold text-[#1F261F]">Notes Tips</p>
        </div>
        <p className="text-[11px] font-medium leading-relaxed text-[#1F261F]/70">
          Use categories to organise notes by type. Add reminders for time-sensitive details like check-ins and bookings.
        </p>
      </div>
    </motion.div>
  );
}

function ChecklistContent({
  items, onToggle, onAdd
}: {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
  onAdd: (text: string) => void;
}) {
  const [newItem, setNewItem] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    onAdd(newItem);
    setNewItem("");
  }

  const done = items.filter((i) => i.done).length;

  return (
    <div className="space-y-2">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold text-[#7F7A70]">{done} of {items.length} completed</p>
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#F0EDE8]">
          <div className="h-full rounded-full bg-[#2F4F3E] transition-all duration-500"
            style={{ width: `${items.length > 0 ? (done / items.length) * 100 : 0}%` }} />
        </div>
      </div>

      {items.map((item) => (
        <label key={item.id} className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 hover:bg-[#F7F4EE] transition-colors">
          <div
            onClick={() => onToggle(item.id)}
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200",
              item.done ? "border-transparent bg-[#2F4F3E]" : "border-[#D0C9BE] hover:border-[#2F4F3E]/40"
            )}
          >
            {item.done && (
              <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2,6 5,9 10,3" />
              </svg>
            )}
          </div>
          <span className={cn("text-sm font-medium", item.done ? "text-[#7F7A70] line-through" : "text-[#1F261F]")}>
            {item.text}
          </span>
        </label>
      ))}

      <form onSubmit={handleAdd} className="mt-3 flex gap-2">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add item..."
          className="flex-1 rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-3 py-2 text-sm font-medium text-[#1F261F] outline-none placeholder:text-[#B0A898] focus:border-[#2F4F3E]/40"
        />
        <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2F4F3E] text-white hover:bg-[#3C6B52]">
          <Plus className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
