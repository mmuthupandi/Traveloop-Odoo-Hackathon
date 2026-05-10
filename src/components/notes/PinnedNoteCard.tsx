
import { Pin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Note } from "@/data/notes";
import { cn } from "@/lib/utils";

interface PinnedNoteCardProps {
  note: Note;
  index: number;
}

export function PinnedNoteCard({ note, index }: PinnedNoteCardProps) {
  const getBgColor = (category: string) => {
    switch (category) {
      case 'Important': return 'bg-emerald-50 border-emerald-100';
      case 'Ideas': return 'bg-amber-50 border-amber-100';
      case 'Planning': return 'bg-sky-50 border-sky-100';
      case 'Budget': return 'bg-rose-50 border-rose-100';
      default: return 'bg-stone-50 border-stone-100';
    }
  };

  const getTagColor = (category: string) => {
    switch (category) {
      case 'Important': return 'bg-emerald-100 text-emerald-800';
      case 'Ideas': return 'bg-amber-100 text-amber-800';
      case 'Planning': return 'bg-sky-100 text-sky-800';
      case 'Budget': return 'bg-rose-100 text-rose-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
      className={cn(
        "min-w-[260px] p-6 rounded-3xl border relative flex flex-col h-48 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl",
        getBgColor(note.category)
      )}
    >
      <div className="absolute top-4 right-4">
        <Pin className="w-4 h-4 text-[#2F4F3E] rotate-45" />
      </div>
      
      <h4 className="font-serif text-lg font-bold text-[#2F4F3E] leading-tight mb-2 pr-4">{note.title}</h4>
      <p className="text-sm text-[#7F7A70] line-clamp-3 mb-auto">{note.preview}</p>
      
      <div className="flex items-center justify-between mt-4">
        <span className={cn("text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full", getTagColor(note.category))}>
          {note.category}
        </span>
        <Pin className="w-3.5 h-3.5 text-[#2F4F3E] opacity-20" />
      </div>
    </motion.div>
  );
}

export function PinnedNotesSection({ notes }: { notes: Note[] }) {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-serif font-bold text-[#2F4F3E] flex items-center gap-2">
          <Pin className="w-5 h-5" /> Pinned Notes
        </h2>
        <button className="text-sm font-bold text-[#C46A2D] hover:underline flex items-center gap-1 group">
          View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 -mx-2 px-2 no-scrollbar">
        {notes.map((note, idx) => (
          <PinnedNoteCard key={note.id} note={note} index={idx} />
        ))}
      </div>
    </section>
  );
}
