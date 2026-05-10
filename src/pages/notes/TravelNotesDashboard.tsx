import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Filter, Plus, ChevronDown, MapPin, Check,
  LayoutList, LayoutGrid, SlidersHorizontal
} from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { NoteCard } from "@/components/notes/NoteCard";
import { NoteDetailPanel } from "@/components/notes/NoteDetailPanel";
import { AddNoteModal } from "@/components/notes/AddNoteModal";
import { NotesCategoryBadge } from "@/components/notes/NotesCategoryBadge";
import { INITIAL_NOTES, TRIP_OPTIONS, type Note, type NoteCategory } from "@/data/notes";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "by-trip" | "by-day" | "reminders" | "archived";
type SortOrder = "newest" | "oldest";

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "all",       label: "All Notes"   },
  { id: "by-trip",   label: "By Trip"     },
  { id: "by-day",    label: "By Day / Stop" },
  { id: "reminders", label: "Reminders"   },
  { id: "archived",  label: "Archived"    },
];

export function TravelNotesDashboard() {
  const [darkMode, setDarkMode]       = useState(false);
  const [notes, setNotes]             = useState<Note[]>(INITIAL_NOTES);
  const [selectedId, setSelectedId]   = useState<string | null>(INITIAL_NOTES[0].id);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder]     = useState<SortOrder>("newest");
  const [viewMode, setViewMode]       = useState<"list" | "grid">("list");
  const [addOpen, setAddOpen]         = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(TRIP_OPTIONS[0]);
  const [tripDropOpen, setTripDropOpen] = useState(false);
  const [sortDropOpen, setSortDropOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Filtered + sorted notes
  const visibleNotes = useMemo(() => {
    let result = notes;

    // Tab filter
    if (activeFilter === "archived") {
      result = result.filter((n) => n.archived);
    } else {
      result = result.filter((n) => !n.archived);
      if (activeFilter === "by-trip") {
        result = result.filter((n) => n.trip.includes(selectedTrip.title));
      } else if (activeFilter === "by-day") {
        result = result.sort((a, b) => a.stop.localeCompare(b.stop));
      } else if (activeFilter === "reminders") {
        result = result.filter((n) => !!n.reminder);
      }
    }

    // Search
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.preview.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q) ||
          n.trip.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortOrder === "newest") {
      result = [...result].sort((a, b) => b.id.localeCompare(a.id));
    } else {
      result = [...result].sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [notes, activeFilter, searchQuery, sortOrder, selectedTrip]);

  const selectedNote = notes.find((n) => n.id === selectedId) ?? null;

  function handleAdd(note: Omit<Note, "id">) {
    const newNote: Note = { ...note, id: `n-${Date.now()}` };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
  }

  function handleDelete(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function handleArchive(id: string) {
    setNotes((prev) => prev.map((n) => n.id === id ? { ...n, archived: !n.archived } : n));
  }

  function handleUpdate(updated: Note) {
    setNotes((prev) => prev.map((n) => n.id === updated.id ? updated : n));
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1F261F]">
      <AppSidebar activeRoute="notes" darkMode={darkMode} onDarkModeChange={setDarkMode} />

      <main className="xl:ml-[282px]">
        <div className="mx-auto flex max-w-[1420px] flex-col gap-6 px-4 pt-3 pb-20 sm:px-6 lg:px-10 xl:px-12 xl:py-10">

          {/* Page title */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="font-serif text-5xl font-bold text-[#1D231E] md:text-6xl">My Notes</h2>
          </motion.div>

          {/* Top controls */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            {/* Trip selector */}
            <div className="relative">
              <button type="button" onClick={() => setTripDropOpen((v) => !v)}
                className="flex items-center gap-3 rounded-2xl border border-[#E8DED1]/80 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all">
                <img src={selectedTrip.image} alt={selectedTrip.title} className="h-10 w-14 rounded-xl object-cover" />
                <div className="text-left">
                  <p className="text-sm font-bold text-[#1F261F]">{selectedTrip.title} {selectedTrip.emoji}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[#7F7A70]">
                    <span>{selectedTrip.dates}</span>
                    <span className="h-1 w-1 rounded-full bg-[#7F7A70]" />
                    <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{selectedTrip.stops} Stops</span>
                  </div>
                </div>
                <ChevronDown className={cn("ml-1 h-4 w-4 text-[#7F7A70] transition-transform duration-200", tripDropOpen && "rotate-180")} />
              </button>
              {tripDropOpen && (
                <div className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-[260px] overflow-hidden rounded-2xl border border-[#E8DED1] bg-white py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                  {TRIP_OPTIONS.map((t) => (
                    <button key={t.id} type="button"
                      onClick={() => { setSelectedTrip(t); setTripDropOpen(false); }}
                      className={cn("flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                        t.id === selectedTrip.id ? "bg-[#EAF4EE]" : "hover:bg-[#F7F4EE]"
                      )}>
                      <img src={t.image} alt={t.title} className="h-8 w-12 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1F261F]">{t.title} {t.emoji}</p>
                        <p className="text-xs text-[#7F7A70]">{t.dates}</p>
                      </div>
                      {t.id === selectedTrip.id && <Check className="h-4 w-4 text-[#2F4F3E] shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search */}
              <label className="flex h-10 items-center gap-2 rounded-xl border border-[#E8DED1] bg-white px-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus-within:border-[#2F4F3E]/40 transition-all">
                <Search className="h-4 w-4 shrink-0 text-[#9A9386]" />
                <input type="search" placeholder="Search notes..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 bg-transparent text-sm font-medium text-[#1F261F] outline-none placeholder:text-[#9A9386]" />
              </label>

              {/* Filter */}
              <button type="button"
                className="flex h-10 items-center gap-2 rounded-xl border border-[#E8DED1] bg-white px-3 text-sm font-semibold text-[#1F261F] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-[#F7F4EE] transition-colors">
                <Filter className="h-4 w-4" /> Filter
              </button>

              {/* Add Note */}
              <button type="button" onClick={() => setAddOpen(true)}
                className="flex h-10 items-center gap-2 rounded-xl bg-[#2F4F3E] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(47,79,62,0.25)] hover:bg-[#3C6B52] hover:-translate-y-0.5 transition-all">
                <Plus className="h-4 w-4" /> Add Note
              </button>
            </div>
          </motion.div>

          {/* Filter tabs */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}
            className="flex flex-wrap gap-2">
            {FILTER_TABS.map((tab) => (
              <button key={tab.id} type="button" onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                  activeFilter === tab.id
                    ? "bg-[#2F4F3E] text-white shadow-[0_4px_12px_rgba(47,79,62,0.2)]"
                    : "border border-[#E8DED1] bg-white text-[#7F7A70] hover:border-[#2F4F3E]/30 hover:bg-[#F7F4EE] hover:text-[#2F4F3E]"
                )}>
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Main 2-column layout */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

            {/* Left: Notes list */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
              className="flex-1 min-w-0">
              <div className="rounded-2xl border border-[#E8DED1]/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                {/* List header */}
                <div className="flex items-center justify-between border-b border-[#F0EDE8] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-[#1F261F]">Notes List</h3>
                    <span className="rounded-full bg-[#EAF4EE] px-2 py-0.5 text-xs font-bold text-[#2F4F3E]">
                      {visibleNotes.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Sort */}
                    <div className="relative">
                      <button type="button" onClick={() => setSortDropOpen((v) => !v)}
                        className="flex items-center gap-1.5 rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-3 py-1.5 text-xs font-semibold text-[#1F261F] hover:bg-[#F0EDE8] transition-colors">
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        {sortOrder === "newest" ? "Newest" : "Oldest"}
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      {sortDropOpen && (
                        <div className="absolute right-0 top-9 z-20 min-w-[120px] overflow-hidden rounded-xl border border-[#E8DED1] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
                          {(["newest", "oldest"] as SortOrder[]).map((s) => (
                            <button key={s} type="button"
                              onClick={() => { setSortOrder(s); setSortDropOpen(false); }}
                              className={cn("flex w-full items-center justify-between px-3 py-2 text-xs font-medium transition-colors",
                                sortOrder === s ? "bg-[#EAF4EE] text-[#2F4F3E]" : "text-[#1F261F] hover:bg-[#F7F4EE]"
                              )}>
                              {s === "newest" ? "Newest first" : "Oldest first"}
                              {sortOrder === s && <Check className="h-3 w-3" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* View toggle */}
                    <div className="flex rounded-xl border border-[#E8DED1] overflow-hidden">
                      <button type="button" onClick={() => setViewMode("list")}
                        className={cn("flex h-8 w-8 items-center justify-center transition-colors",
                          viewMode === "list" ? "bg-[#2F4F3E] text-white" : "bg-white text-[#7F7A70] hover:bg-[#F7F4EE]"
                        )}>
                        <LayoutList className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" onClick={() => setViewMode("grid")}
                        className={cn("flex h-8 w-8 items-center justify-center transition-colors",
                          viewMode === "grid" ? "bg-[#2F4F3E] text-white" : "bg-white text-[#7F7A70] hover:bg-[#F7F4EE]"
                        )}>
                        <LayoutGrid className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className={cn("p-4", viewMode === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3")}>
                  {visibleNotes.length > 0 ? (
                    visibleNotes.map((note, i) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        index={i}
                        isSelected={selectedId === note.id}
                        onSelect={() => setSelectedId(note.id)}
                        onDelete={handleDelete}
                        onArchive={handleArchive}
                      />
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <p className="font-serif text-lg font-bold text-[#1F261F]">No notes found</p>
                      <p className="mt-1 text-sm text-[#7F7A70]">
                        {searchQuery ? `No results for "${searchQuery}"` : "Add your first note to get started."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right: Detail panel */}
            <motion.aside initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
              className="w-full lg:sticky lg:top-6 lg:w-[360px] xl:w-[400px]">
              <NoteDetailPanel
                note={selectedNote}
                onClose={() => setSelectedId(null)}
                onDelete={handleDelete}
                onArchive={handleArchive}
                onUpdate={handleUpdate}
              />
            </motion.aside>
          </div>
        </div>
      </main>

      <AddNoteModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
    </div>
  );
}
