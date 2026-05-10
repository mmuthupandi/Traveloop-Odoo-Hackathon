
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/notes/Header";
import { QuickCaptureCard } from "@/components/notes/QuickCaptureCard";
import { PinnedNotesSection } from "@/components/notes/PinnedNoteCard";
import { NotesToolbar, NotesGroup, CategoryCard, RecentNotesCard } from "@/components/notes/NoteListComponents";
import { NOTES, RECENT_NOTES } from "@/data/notes";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export function TravelNotesDashboard() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const pinnedNotes = NOTES.filter(note => note.isPinned);
  
  // Group notes by trip
  const groupedNotes = NOTES.reduce((acc, note) => {
    if (!note.trip) return acc;
    if (!acc[note.trip]) acc[note.trip] = [];
    acc[note.trip].push(note);
    return acc;
  }, {} as Record<string, typeof NOTES>);

  return (
    <div className="flex min-h-screen bg-[#F7F4EE]">
      <AppSidebar activeRoute="notes" darkMode={darkMode} onDarkModeChange={setDarkMode} />

      {/* Main Content Area */}
      <main className="flex-1 xl:ml-[282px] flex flex-col lg:flex-row">
        <div className="flex-1 pt-3 px-4 pb-20 xl:p-10 max-w-5xl">
          <Header />
          
          <div className="mt-8">
            <QuickCaptureCard />
          </div>

          <PinnedNotesSection notes={pinnedNotes} />

          <section className="mt-12">
            <NotesToolbar />
            
            <div className="space-y-6">
              {Object.entries(groupedNotes).map(([trip, notes]) => (
                <NotesGroup 
                  key={trip} 
                  title={trip} 
                  notes={notes} 
                  count={notes.length} 
                />
              ))}
            </div>

            <div className="flex justify-center mt-12 pb-20">
              <button className="flex items-center gap-2 px-8 py-3 bg-white border border-[#E8DED1] rounded-full text-sm font-bold text-[#2F4F3E] hover:shadow-md transition-all group">
                Load More Notes
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </section>
        </div>

        {/* Right Utility Sidebar */}
        <aside className="w-96 p-10 bg-transparent hidden xl:block sticky top-0 h-screen overflow-y-auto no-scrollbar">
          <CategoryCard />
          <RecentNotesCard notes={RECENT_NOTES} />
        </aside>
      </main>
    </div>
  );
}
