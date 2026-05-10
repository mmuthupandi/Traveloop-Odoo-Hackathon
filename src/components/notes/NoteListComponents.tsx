
import { useState } from "react";
import { Search, Filter, ArrowUpDown, LayoutGrid, List as ListIcon, MoreVertical, Pin, MapPin, FileText, CheckSquare, Image as ImageIcon, ChevronDown, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Note, CATEGORIES } from "@/data/notes";
import { cn } from "@/lib/utils";

export function NotesToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <h2 className="text-2xl font-serif font-bold text-[#2F4F3E]">All Notes</h2>
      
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7F7A70] group-focus-within:text-[#2F4F3E] transition-colors" />
          <input 
            type="text" 
            placeholder="Search notes..." 
            className="w-full bg-white border border-[#E8DED1] rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F4F3E]/10 transition-all"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8DED1] rounded-full text-sm font-medium text-[#2F4F3E] hover:bg-[#E8DED1]/30 transition-all">
          <span className="hidden sm:inline">All Trips</span>
          <Filter className="w-4 h-4 text-[#7F7A70]" />
        </button>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8DED1] rounded-full text-sm font-medium text-[#2F4F3E] hover:bg-[#E8DED1]/30 transition-all">
          <span className="hidden sm:inline">Sort</span>
          <ArrowUpDown className="w-4 h-4 text-[#7F7A70]" />
        </button>

        <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-white border border-[#E8DED1] rounded-full text-[#2F4F3E] hover:bg-[#E8DED1]/30 cursor-pointer">
          <ListIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export function NoteListItem({ note }: { note: Note }) {
  const getIcon = () => {
    switch (note.type) {
      case 'location': return <MapPin className="w-5 h-5" />;
      case 'list': return <CheckSquare className="w-5 h-5" />;
      case 'image': return <ImageIcon className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getIconColor = () => {
    switch (note.type) {
      case 'location': return 'bg-orange-100 text-orange-600';
      case 'list': return 'bg-blue-100 text-blue-600';
      case 'image': return 'bg-purple-100 text-purple-600';
      default: return 'bg-emerald-100 text-emerald-600';
    }
  };

  return (
    <motion.div 
      layout
      whileHover={{ scale: 1.005, backgroundColor: 'rgba(232, 222, 209, 0.2)' }}
      className="group flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-[#E8DED1] transition-all cursor-pointer"
    >
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0", getIconColor())}>
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[#2F4F3E] truncate text-sm sm:text-base">{note.title}</h4>
        <p className="text-xs sm:text-sm text-[#7F7A70] truncate">{note.preview}</p>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <span className="text-[10px] sm:text-xs font-medium text-[#7F7A70]">{note.date}</span>
        <div className="w-4 h-4 flex items-center justify-center">
          {note.isPinned && <Pin className="w-3.5 h-3.5 text-[#2F4F3E] opacity-40 group-hover:opacity-100 transition-opacity" />}
        </div>
        <button className="p-1.5 rounded-full hover:bg-[#E8DED1] text-[#7F7A70] opacity-0 group-hover:opacity-100 transition-all">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export function NotesGroup({ title, notes, count }: { title: string, notes: Note[], count: number }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mb-3 px-2 group"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-serif font-bold text-[#2F4F3E]">{title}</h3>
          <span className="text-[10px] font-bold text-[#7F7A70] bg-[#E8DED1]/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{count} Notes</span>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-[#7F7A70] transition-transform duration-300", !isOpen && "-rotate-90")} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-2 border border-[#E8DED1]/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              {notes.map((note) => (
                <NoteListItem key={note.id} note={note} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CategoryCard() {
  const icons: any = { AlertCircle: FileText, Lightbulb: ImageIcon, Calendar: MapPin, DollarSign: FileText, Package: ImageIcon, FileText: FileText };
  
  return (
    <div className="bg-white rounded-[2rem] p-6 border border-[#E8DED1] shadow-sm">
      <h3 className="font-serif text-lg font-bold text-[#2F4F3E] mb-6">Notes by Category</h3>
      
      <div className="space-y-1">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat.id}
            className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#F7F4EE] transition-all group"
          >
            <div className="flex items-center gap-3 text-[#7F7A70] group-hover:text-[#2F4F3E]">
              <div className="w-8 h-8 rounded-lg bg-[#F7F4EE] group-hover:bg-[#E8DED1] flex items-center justify-center transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
            <span className="text-xs font-bold text-[#7F7A70] bg-[#F7F4EE] px-2 py-0.5 rounded-full">{cat.count}</span>
          </button>
        ))}
      </div>

      <button className="w-full mt-6 py-3 rounded-2xl border border-dashed border-[#E8DED1] text-sm font-bold text-[#7F7A70] hover:border-[#2F4F3E] hover:text-[#2F4F3E] transition-all flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" />
        New Category
      </button>
    </div>
  );
}

export function RecentNotesCard({ notes }: { notes: Note[] }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 border border-[#E8DED1] shadow-sm mt-6">
      <h3 className="font-serif text-lg font-bold text-[#2F4F3E] mb-6">Recent Notes</h3>
      
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="flex gap-4 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5 text-[#7F7A70]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#2F4F3E] truncate">{note.title}</h4>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <p className="text-[10px] text-[#7F7A70] truncate flex-1">{note.preview}</p>
                <span className="text-[10px] text-[#B4ADA3] whitespace-nowrap">2h ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-8 text-sm font-bold text-[#C46A2D] hover:underline">
        View All Recent
      </button>
    </div>
  );
}
