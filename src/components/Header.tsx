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

export function Header() {
  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="font-serif text-4xl font-extrabold leading-tight text-ink md:text-5xl">
          Hi, Explorer! <span className="font-sans text-3xl">👋</span>
        </h1>
        <p className="mt-2 text-base font-medium text-ink/80 md:text-lg">
          Where will your next adventure take you?
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="relative border-forest/10 bg-parchment shadow-travel"
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-[#D84F3F] ring-2 ring-parchment" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-3 rounded-full bg-parchment py-1.5 pl-1.5 pr-4 shadow-travel outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
              aria-label="Open user menu"
            >
              <Avatar>
                <AvatarImage src={avatarImage} alt="Aarav Sharma" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-bold text-ink sm:block">
                Aarav Sharma
              </span>
              <ChevronDown className="h-4 w-4 text-ink" />
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
            <DropdownMenuSeparator className="my-1 h-px bg-forest/10" />
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
