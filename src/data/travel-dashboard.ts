import {
  ArrowUpRight,
  Backpack,
  Binoculars,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  Compass,
  Home,
  Map,
  MapPinned,
  NotebookPen,
  Plane,
  Route,
  Settings,
  Share2,
  Sparkles,
  UserRound,
  WalletCards
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

export type QuickAction = {
  title: string;
  description: string;
  icon: LucideIcon;
  palette: string;
  iconPalette: string;
};

export type Trip = {
  title: string;
  emoji: string;
  dates: string;
  stops: number;
  budget: string;
  planning: number;
  countdown: string;
  color: string;
  image: string;
};

export type Destination = {
  country: string;
  price: string;
  image: string;
};

export type BudgetSlice = {
  name: string;
  value: number;
  amount: string;
  color: string;
};

export const navItems: NavItem[] = [
  { label: "Home", icon: Home, active: true },
  { label: "My Trips", icon: BriefcaseBusiness },
  { label: "Itinerary Builder", icon: Route },
  { label: "Explore", icon: Compass },
  { label: "Budget", icon: WalletCards },
  { label: "Packing List", icon: Backpack },
  { label: "Notes", icon: NotebookPen },
  { label: "Profile", icon: UserRound },
  { label: "Settings", icon: Settings }
];

export const quickActions: QuickAction[] = [
  {
    title: "Plan New Trip",
    description: "Start planning your next adventure",
    icon: Map,
    palette: "bg-[#EAF0E8]",
    iconPalette: "bg-[#CFE1D1] text-forest"
  },
  {
    title: "Explore Places",
    description: "Discover amazing destinations",
    icon: MapPinned,
    palette: "bg-[#F8EAD6]",
    iconPalette: "bg-[#F0D5AA] text-[#7B542B]"
  },
  {
    title: "Find Activities",
    description: "Find top activities and experiences",
    icon: Binoculars,
    palette: "bg-[#E9F0F3]",
    iconPalette: "bg-[#CFE0E6] text-[#315363]"
  },
  {
    title: "Estimate Budget",
    description: "Plan your budget smartly",
    icon: WalletCards,
    palette: "bg-[#F8E6D2]",
    iconPalette: "bg-[#F2CB9E] text-clay"
  },
  {
    title: "Share Itinerary",
    description: "Share your trip with friends",
    icon: Share2,
    palette: "bg-[#F7E5DC]",
    iconPalette: "bg-[#F0C7B6] text-[#C3542C]"
  }
];

export const trips: Trip[] = [
  {
    title: "Bali Getaway",
    emoji: "🌴",
    dates: "15 May - 23 May 2026",
    stops: 5,
    budget: "$1,450",
    planning: 60,
    countdown: "In 12 days",
    color: "#2F3A8F",
    image:
      "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Japan Spring",
    emoji: "🌸",
    dates: "01 Jun - 14 Jun 2026",
    stops: 7,
    budget: "$2,350",
    planning: 30,
    countdown: "In 28 days",
    color: "#E86D1F",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Greek Islands",
    emoji: "🌊",
    dates: "10 Jul - 20 Jul 2026",
    stops: 4,
    budget: "$1,850",
    planning: 20,
    countdown: "In 58 days",
    color: "#35439B",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80"
  }
];

export const destinations: Destination[] = [
  {
    country: "Switzerland",
    price: "$1,899",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=700&q=80"
  },
  {
    country: "Iceland",
    price: "$2,199",
    image:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=700&q=80"
  },
  {
    country: "Thailand",
    price: "$899",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=700&q=80"
  },
  {
    country: "New Zealand",
    price: "$1,999",
    image:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=700&q=80"
  },
  {
    country: "Dubai",
    price: "$1,299",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80"
  }
];

export const budgetBreakdown: BudgetSlice[] = [
  { name: "Flights", value: 40, amount: "$2,260", color: "#33389B" },
  { name: "Stays", value: 25, amount: "$1,410", color: "#3F7EA7" },
  { name: "Activities", value: 20, amount: "$1,130", color: "#3C8B68" },
  { name: "Food", value: 10, amount: "$565", color: "#E87565" },
  { name: "Transport", value: 5, amount: "$285", color: "#F3A33A" }
];

export const budgetStats = [
  { label: "Total Trips", value: "3" },
  { label: "Total Budget", value: "$5,650" },
  { label: "Avg. per Trip", value: "$1,883" }
];

export const heroImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85";

export const avatarImage =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80";

export const mobileActions = [
  { label: "Trips", icon: CalendarDays },
  { label: "Explore", icon: Compass },
  { label: "Plan", icon: Plane },
  { label: "Notes", icon: ClipboardList },
  { label: "Inspire", icon: Sparkles },
  { label: "Open", icon: ArrowUpRight }
];
