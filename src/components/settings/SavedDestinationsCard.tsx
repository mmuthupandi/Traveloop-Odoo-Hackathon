import { useState } from "react";
import { Heart, MoreVertical, Plus, Star, Trash2, X } from "lucide-react";
import { savedDestinations, type SavedDestination } from "@/data/settings";
import { motion, AnimatePresence } from "framer-motion";

export function SavedDestinationsCard() {
  const [destinations, setDestinations] = useState<SavedDestination[]>(savedDestinations);
  const [liked, setLiked] = useState<Record<string, boolean>>(
    Object.fromEntries(savedDestinations.map((d) => [d.id, true]))
  );
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newDest, setNewDest] = useState({ name: "", region: "" });

  function toggleLike(id: string) {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function removeDestination(id: string) {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
    setMenuOpen(null);
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newDest.name.trim()) return;
    const dest: SavedDestination = {
      id: `dest-${Date.now()}`,
      name: newDest.name.trim(),
      region: newDest.region.trim() || "Unknown",
      rating: 4.5,
      reviews: "New",
      image: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80`,
    };
    setDestinations((prev) => [...prev, dest]);
    setLiked((prev) => ({ ...prev, [dest.id]: true }));
    setNewDest({ name: "", region: "" });
    setAddOpen(false);
  }

  const inputCls = "w-full rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-3 py-2.5 text-sm font-medium text-[#1F261F] outline-none focus:border-[#2F4F3E]/50 focus:ring-2 focus:ring-[#2F4F3E]/10 transition-all";

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDECEA]">
            <Heart className="h-5 w-5 text-[#E87565]" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1F261F]">Saved Destinations</h3>
            <p className="text-xs font-medium text-[#7F7A70]">Your favorite and dream destinations.</p>
          </div>
        </div>
        <button type="button" onClick={() => setAddOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-4 py-2 text-sm font-semibold text-[#2F4F3E] transition-all duration-200 hover:bg-[#2F4F3E] hover:text-white hover:border-[#2F4F3E]">
          {addOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {addOpen ? "Cancel" : "Add Destination"}
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {addOpen && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden"
            onSubmit={handleAdd}>
            <div className="mt-4 flex gap-3 rounded-2xl border border-[#E8DED1] bg-[#F7F4EE] p-4">
              <input className={inputCls} placeholder="Destination name" value={newDest.name}
                onChange={(e) => setNewDest({ ...newDest, name: e.target.value })} required />
              <input className={inputCls} placeholder="Region (e.g. Asia)" value={newDest.region}
                onChange={(e) => setNewDest({ ...newDest, region: e.target.value })} />
              <button type="submit" className="shrink-0 rounded-xl bg-[#2F4F3E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3C6B52]">
                Add
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Destination cards */}
      <div className="mt-5 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <AnimatePresence>
          {destinations.map((dest) => (
            <motion.div key={dest.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}
              className="group relative w-[180px] shrink-0 overflow-hidden rounded-2xl border border-[#E8DED1]/60 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.1)]">
              <div className="relative h-[120px] overflow-hidden">
                <img src={dest.image} alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <button type="button" onClick={() => toggleLike(dest.id)}
                  aria-label={liked[dest.id] ? "Remove from saved" : "Add to saved"}
                  className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform duration-200 hover:scale-110">
                  <Heart className="h-3.5 w-3.5 transition-colors duration-200"
                    fill={liked[dest.id] ? "#E87565" : "none"}
                    stroke={liked[dest.id] ? "#E87565" : "#7F7A70"} strokeWidth={2} />
                </button>
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-1">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#1F261F]">{dest.name}</p>
                    <p className="text-xs font-medium text-[#7F7A70]">{dest.region}</p>
                  </div>
                  <div className="relative shrink-0">
                    <button type="button" aria-label="More options"
                      onClick={() => setMenuOpen(menuOpen === dest.id ? null : dest.id)}
                      className="rounded-lg p-1 text-[#7F7A70] hover:bg-[#F0EDE8] hover:text-[#1F261F]">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                    {menuOpen === dest.id && (
                      <div className="absolute right-0 top-7 z-20 min-w-[120px] overflow-hidden rounded-xl border border-[#E8DED1] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
                        <button type="button" onClick={() => removeDestination(dest.id)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-[#E87565] hover:bg-[#FDECEA]">
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-[#F3A33A] text-[#F3A33A]" />
                  <span className="text-xs font-bold text-[#1F261F]">{dest.rating}</span>
                  <span className="text-xs text-[#7F7A70]">({dest.reviews})</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {destinations.length === 0 && (
          <p className="py-8 text-sm text-[#7F7A70]">No saved destinations yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}
