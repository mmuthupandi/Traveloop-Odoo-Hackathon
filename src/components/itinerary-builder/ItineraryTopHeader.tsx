import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ItineraryTopHeader() {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="font-serif text-4xl font-extrabold leading-tight text-[#1F261F] md:text-5xl">
          Hi, Explorer! <span className="font-sans text-3xl">👋</span>
        </h1>
        <p className="mt-2 text-base font-medium text-[#4F4A40] md:text-lg">
          Let's build your perfect adventure.
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
          className="flex items-center gap-3 rounded-full border border-[#DDD4C6] bg-white py-1.5 pl-1.5 pr-4 shadow-[0_8px_22px_rgba(0,0,0,0.05)]"
        >
          <Avatar className="h-11 w-11">
            <AvatarImage
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80"
              alt="Aarav Sharma"
            />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-bold text-[#24221D] sm:block">
            Aarav Sharma
          </span>
          <ChevronDown className="h-4 w-4 text-[#605B52]" />
        </button>
      </div>
    </header>
  );
}

