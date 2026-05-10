
import { 
  Home, 
  Map, 
  Compass, 
  DollarSign, 
  Package, 
  FileText, 
  User, 
  Settings, 
  Mountain,
  Quote,
  Moon,
  Sun
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppRoute, routeHashes } from "@/lib/routes";

interface SidebarProps {
  activeRoute: AppRoute;
}

const NAV_ITEMS = [
  { icon: Home, label: "Home", route: "home" as AppRoute },
  { icon: Map, label: "My Trips", route: "my-trips" as AppRoute },
  { icon: Compass, label: "Itinerary Builder", route: "itinerary-builder" as AppRoute },
  { icon: Compass, label: "Explore", route: "explore" as AppRoute },
  { icon: DollarSign, label: "Budget", route: "budget" as AppRoute },
  { icon: Package, label: "Packing List", route: "packing" as AppRoute },
  { icon: FileText, label: "Notes", route: "notes" as AppRoute },
  { icon: User, label: "Profile", route: "profile" as AppRoute },
  { icon: Settings, label: "Settings", route: "settings" as AppRoute },
];

export function Sidebar({ activeRoute }: SidebarProps) {
  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-[#F7F4EE] border-r border-[#E8DED1] flex flex-col z-50">
      {/* Brand Area */}
      <div className="p-8 pb-10 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#2F4F3E] flex items-center justify-center text-white">
          <Mountain className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-serif text-xl font-bold tracking-tight text-[#2F4F3E]">WONDERLUST</h1>
          <p className="font-script text-sm text-[#C46A2D] -mt-1">Stories begin here</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={routeHashes[item.route]}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300 group",
              activeRoute === item.route
                ? "bg-[#2F4F3E] text-white shadow-lg"
                : "text-[#7F7A70] hover:bg-[#E8DED1] hover:text-[#2F4F3E]"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
              activeRoute === item.route ? "text-white" : "text-[#7F7A70] group-hover:text-[#2F4F3E]"
            )} />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 mt-auto">
        <div className="bg-[#E8DED1]/50 rounded-3xl p-6 relative overflow-hidden group">
          {/* Subtle Illustration Placeholder */}
          <div className="absolute -right-4 -bottom-4 opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Map className="w-24 h-24" />
          </div>
          
          <Quote className="w-6 h-6 text-[#2F4F3E] mb-3 opacity-40" />
          <p className="text-sm italic text-[#2F4F3E] font-medium leading-relaxed relative z-10">
            “Collect moments, not things.”
          </p>
          <p className="text-xs text-[#7F7A70] mt-2 relative z-10">— Anonymous</p>
        </div>

        <div className="mt-6 flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-[#7F7A70]">
            <Moon className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Dark Mode</span>
          </div>
          <div className="w-10 h-5 bg-[#E8DED1] rounded-full relative cursor-pointer">
            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all duration-300" />
          </div>
        </div>
      </div>
    </aside>
  );
}
