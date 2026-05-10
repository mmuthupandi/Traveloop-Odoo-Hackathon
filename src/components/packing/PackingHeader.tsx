import { Bell, ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { avatarImage } from "@/data/travel-dashboard";

export function PackingHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-serif text-4xl font-extrabold leading-tight text-[#1F261F] md:text-5xl">
          Hi, Explorer! <span className="font-sans text-3xl">👋</span>
        </h1>
        <p className="mt-1.5 text-base font-medium text-[#1F261F]/70">
          Pack smart, travel light, enjoy more.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="relative border-[#E8DED1] bg-[#FAF8F4] shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5 text-[#1F261F]" />
          <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-[#D84F3F] ring-2 ring-[#FAF8F4]" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-3 rounded-full bg-[#FAF8F4] py-1.5 pl-1.5 pr-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(47,79,62,0.12)] focus-visible:ring-2 focus-visible:ring-[#2F4F3E] focus-visible:ring-offset-2"
              aria-label="Open user menu"
            >
              <Avatar>
                <AvatarImage src={avatarImage} alt="Aarav Sharma" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-bold text-[#1F261F] sm:block">
                Aarav Sharma
              </span>
              <ChevronDown className="h-4 w-4 text-[#1F261F]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserRound className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Preferences
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1 h-px bg-[#E8DED1]" />
            <DropdownMenuItem className="text-[#A33D2F]">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
