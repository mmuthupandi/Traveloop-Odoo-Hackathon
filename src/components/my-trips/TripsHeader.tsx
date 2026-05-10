import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TripsHeader() {
  return (
    <header className="hidden flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-serif text-5xl font-extrabold text-[#1F261F]">
          Hi, Explorer! <span className="font-sans text-4xl">👋</span>
        </h1>
        <p className="mt-2 text-lg font-medium text-[#4F4A40]">
          Here are all your adventures in one place.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative grid h-12 w-12 place-items-center rounded-full border border-[#DDD4C6] bg-white shadow-[0_8px_22px_rgba(0,0,0,0.05)]"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-[#2E2A24]" />
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#D84E4E]" />
        </button>
        <button
          type="button"
          className="flex items-center gap-3 rounded-full border border-[#DDD4C6] bg-white px-2 py-1.5 shadow-[0_8px_22px_rgba(0,0,0,0.05)]"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
              alt="Aarav Sharma"
            />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold text-[#24221D]">Aarav Sharma</span>
          <ChevronDown className="mr-2 h-4 w-4 text-[#605B52]" />
        </button>
      </div>
    </header>
  );
}

