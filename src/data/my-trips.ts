import {
  Backpack,
  BriefcaseBusiness,
  Compass,
  Edit3,
  Eye,
  FileText,
  Filter,
  Home,
  MapPinned,
  MoreVertical,
  NotebookPen,
  Plane,
  Search,
  Settings,
  UserRound,
  WalletCards
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SidebarNavItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

export type TripStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export type TripAction = {
  label: string;
  icon: LucideIcon;
};

export type TripItem = {
  id: string;
  title: string;
  emoji: string;
  dates: string;
  stops: number;
  description: string;
  budgetLabel: string;
  budgetValue: string;
  statusLabel: string;
  status: TripStatus;
  progress?: number;
  progressLabel?: string;
  progressColor?: string;
  image: string;
  cardTint: string;
  avatars: string[];
  extraPeople?: number;
  actions: TripAction[];
};

export type TabItem = {
  id: "all" | TripStatus;
  label: string;
};

export const sidebarItems: SidebarNavItem[] = [
  { label: "Home", icon: Home },
  { label: "My Trips", icon: BriefcaseBusiness, active: true },
  { label: "Itinerary Builder", icon: MapPinned },
  { label: "Explore", icon: Compass },
  { label: "Budget", icon: WalletCards },
  { label: "Packing List", icon: Backpack },
  { label: "Notes", icon: NotebookPen },
  { label: "Profile", icon: UserRound },
  { label: "Settings", icon: Settings }
];

export const tabs: TabItem[] = [
  { id: "all", label: "All Trips" },
  { id: "upcoming", label: "Upcoming" },
  { id: "ongoing", label: "Ongoing" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" }
];

export const tripAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80"
];

export const trips: TripItem[] = [
  {
    id: "bali",
    title: "Bali Getaway",
    emoji: "🌴",
    dates: "15 May - 23 May 2026",
    stops: 5,
    description: "Beaches, temples and endless sunshine. The perfect island escape.",
    budgetLabel: "Total Budget",
    budgetValue: "$1,450",
    statusLabel: "In 12 days",
    status: "upcoming",
    progress: 60,
    progressLabel: "60%",
    progressColor: "bg-[#2F4F3E]",
    image:
      "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=1200&q=80",
    cardTint: "bg-[#F8F4EC]",
    avatars: tripAvatars.slice(0, 4),
    extraPeople: 2,
    actions: [
      { label: "View Details", icon: Eye },
      { label: "Edit Trip", icon: Edit3 },
      { label: "View Summary", icon: FileText }
    ]
  },
  {
    id: "japan",
    title: "Japan Spring",
    emoji: "🌸",
    dates: "01 Jun - 14 Jun 2026",
    stops: 7,
    description: "Cherry blossoms, culture and cuisine. A trip to remember.",
    budgetLabel: "Total Budget",
    budgetValue: "$2,350",
    statusLabel: "In 28 days",
    status: "upcoming",
    progress: 30,
    progressLabel: "30%",
    progressColor: "bg-[#C46A2D]",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    cardTint: "bg-[#FBF5EE]",
    avatars: tripAvatars.slice(1, 5),
    extraPeople: 3,
    actions: [
      { label: "View Details", icon: Eye },
      { label: "Edit Trip", icon: Edit3 },
      { label: "View Summary", icon: FileText }
    ]
  },
  {
    id: "greece",
    title: "Greek Islands",
    emoji: "🌊",
    dates: "10 Jul - 20 Jul 2026",
    stops: 4,
    description: "Blue waters, white streets and sunsets that steal your heart.",
    budgetLabel: "Total Budget",
    budgetValue: "$1,850",
    statusLabel: "In 58 days",
    status: "upcoming",
    progress: 20,
    progressLabel: "20%",
    progressColor: "bg-[#5A56B0]",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    cardTint: "bg-[#F7F3FC]",
    avatars: tripAvatars.slice(0, 4),
    extraPeople: 1,
    actions: [
      { label: "View Details", icon: Eye },
      { label: "Edit Trip", icon: Edit3 },
      { label: "View Summary", icon: FileText }
    ]
  },
  {
    id: "switzerland",
    title: "Switzerland Escape",
    emoji: "🏔️",
    dates: "10 Apr - 18 Apr 2026",
    stops: 6,
    description: "Snowy peaks, scenic trains and pure serenity.",
    budgetLabel: "You Spent",
    budgetValue: "$1,980",
    statusLabel: "Completed",
    status: "completed",
    progress: 100,
    progressLabel: "Complete",
    progressColor: "bg-[#2F4F3E]",
    image:
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=1200&q=80",
    cardTint: "bg-[#F6F5F1]",
    avatars: tripAvatars.slice(0, 4),
    extraPeople: 2,
    actions: [
      { label: "View Summary", icon: FileText },
      { label: "Edit Trip", icon: Edit3 }
    ]
  },
  {
    id: "dubai",
    title: "Dubai Adventure",
    emoji: "🏙️",
    dates: "05 Mar - 10 Mar 2026",
    stops: 3,
    description: "Modern wonders, luxury and desert adventures.",
    budgetLabel: "Status",
    budgetValue: "Cancelled",
    statusLabel: "Cancelled",
    status: "cancelled",
    progress: 0,
    progressLabel: "Cancelled",
    progressColor: "bg-[#D94848]",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
    cardTint: "bg-[#F9F2EE]",
    avatars: tripAvatars.slice(1, 4),
    actions: [{ label: "View Details", icon: Eye }]
  }
];

export const overviewStats = [
  { label: "Total Trips", value: "8" },
  { label: "Upcoming Trips", value: "3" },
  { label: "Completed Trips", value: "4" },
  { label: "Countries Visited", value: "6" }
];

export const topActionIcons = {
  search: Search,
  filter: Filter,
  plan: Plane,
  more: MoreVertical
};

