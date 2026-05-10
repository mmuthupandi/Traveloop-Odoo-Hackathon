
import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="hidden items-center justify-between py-8 px-10 bg-transparent">
      <div>
        <h1 className="font-serif text-4xl font-bold text-[#2F4F3E] flex items-center gap-3">
          My Notes <span className="text-3xl">📝</span>
        </h1>
        <p className="text-[#7F7A70] mt-2 max-w-xl">
          Capture ideas, save important details, and keep your travel thoughts organized.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative w-12 h-12 rounded-full bg-white border border-[#E8DED1] flex items-center justify-center text-[#2F4F3E] hover:shadow-md transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 pl-1 pr-3 py-1 bg-white border border-[#E8DED1] rounded-full hover:shadow-md transition-all outline-none">
            <Avatar className="w-10 h-10 border border-[#E8DED1]">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-[#2F4F3E] leading-tight">Aarav Sharma</p>
              <p className="text-[10px] text-[#7F7A70] uppercase tracking-wider">Premium Member</p>
            </div>
            <ChevronDown className="w-4 h-4 text-[#7F7A70]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl border-[#E8DED1] bg-[#F7F4EE]">
            <DropdownMenuItem className="focus:bg-[#E8DED1] text-[#2F4F3E]">Profile</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#E8DED1] text-[#2F4F3E]">Trips</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#E8DED1] text-[#2F4F3E]">Settings</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#E8DED1] text-red-600 font-medium">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
