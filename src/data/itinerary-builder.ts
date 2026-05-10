import {
  Backpack,
  BriefcaseBusiness,
  Camera,
  Clock3,
  Compass,
  Expand,
  Home,
  Luggage,
  MapPinned,
  NotebookPen,
  Route,
  Settings,
  Sparkles,
  SunMedium,
  UserRound,
  WalletCards
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ItineraryNavItem = {
  label: string;
  icon: LucideIcon;
};

export type ItineraryStop = {
  id: string;
  title: string;
  emoji: string;
  dates: string;
  duration: string;
  description: string;
  activityCount: number;
  image: string;
  badgeClass: string;
  activities: string[];
};

export type TipItem = {
  title: string;
  text: string;
  icon: LucideIcon;
  colorClass: string;
};

export const itineraryNavItems: ItineraryNavItem[] = [
  { label: "Home", icon: Home },
  { label: "My Trips", icon: BriefcaseBusiness },
  { label: "Itinerary Builder", icon: Route },
  { label: "Explore", icon: Compass },
  { label: "Budget", icon: WalletCards },
  { label: "Packing List", icon: Backpack },
  { label: "Notes", icon: NotebookPen },
  { label: "Profile", icon: UserRound },
  { label: "Settings", icon: Settings }
];

export const currentTrip = {
  title: "Bali Getaway",
  emoji: "🌴",
  dates: "15 May - 23 May 2026",
  stops: "5 Stops",
  progress: 60,
  description:
    "A perfect island escape with stunning beaches, local culture and unforgettable sunsets.",
  image:
    "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=900&q=80"
};

export const itineraryStops: ItineraryStop[] = [
  {
    id: "bali",
    title: "Bali, Indonesia",
    emoji: "🛕",
    dates: "15 May - 17 May 2026",
    duration: "3 Days",
    description: "Explore beautiful beaches, temples and vibrant local culture.",
    activityCount: 3,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80",
    badgeClass: "bg-[#2F4F3E]",
    activities: ["Uluwatu Temple", "Jimbaran sunset dinner", "Kuta beach walk"]
  },
  {
    id: "ubud",
    title: "Ubud, Indonesia",
    emoji: "🌿",
    dates: "17 May - 19 May 2026",
    duration: "2 Days",
    description: "Discover nature, waterfalls, and peaceful rice terrace views.",
    activityCount: 2,
    image:
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=700&q=80",
    badgeClass: "bg-[#C46A2D]",
    activities: ["Tegallalang Rice Terrace", "Sacred Monkey Forest"]
  },
  {
    id: "nusa-penida",
    title: "Nusa Penida, Indonesia",
    emoji: "🌊",
    dates: "19 May - 21 May 2026",
    duration: "2 Days",
    description: "Stunning cliffs, crystal clear waters and breathtaking views.",
    activityCount: 2,
    image:
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=700&q=80",
    badgeClass: "bg-[#4D83A6]",
    activities: ["Kelingking Beach", "Angel's Billabong"]
  },
  {
    id: "gili",
    title: "Gili Islands, Indonesia",
    emoji: "🌴",
    dates: "21 May - 22 May 2026",
    duration: "1 Day",
    description: "Relax on the island, enjoy snorkeling and the laid-back vibe.",
    activityCount: 1,
    image:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=700&q=80",
    badgeClass: "bg-[#D3A945]",
    activities: ["Sunrise snorkeling"]
  },
  {
    id: "seminyak",
    title: "Seminyak, Indonesia",
    emoji: "🌅",
    dates: "22 May - 23 May 2026",
    duration: "1 Day",
    description: "End your trip with luxury, shopping and beachside sunsets.",
    activityCount: 2,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80",
    badgeClass: "bg-[#78906F]",
    activities: ["Beach club lunch", "Seminyak sunset market"]
  }
];

export const extraStop: ItineraryStop = {
  id: "canggu",
  title: "Canggu, Indonesia",
  emoji: "🏄",
  dates: "23 May - 24 May 2026",
  duration: "1 Day",
  description: "Add surf cafes, boutique markets and a relaxed coastal finish.",
  activityCount: 2,
  image:
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80",
  badgeClass: "bg-[#2F4F3E]",
  activities: ["Surf lesson", "Canggu cafe walk"]
};

export const tripSummaryRows = [
  { label: "Trip Duration", value: "9 Days", icon: Clock3 },
  { label: "Total Stops", value: "5 Places", icon: MapPinned },
  { label: "Total Activities", value: "10 Activities", icon: Route },
  { label: "Estimated Budget", value: "$1,450", icon: WalletCards }
];

export const tips: TipItem[] = [
  {
    title: "Best Time to Visit",
    text: "May is great for pleasant weather in Bali.",
    icon: SunMedium,
    colorClass: "text-[#C46A2D] bg-[#FBEEE2]"
  },
  {
    title: "Travel Suggestion",
    text: "Book accommodations in advance for better deals.",
    icon: Luggage,
    colorClass: "text-[#2F4F3E] bg-[#EDF2EA]"
  },
  {
    title: "Don't Forget",
    text: "Sunscreen, beachwear and your camera.",
    icon: Camera,
    colorClass: "text-[#4D83A6] bg-[#EAF1F4]"
  }
];

export const suggestedActivities = [
  {
    title: "Uluwatu Temple",
    meta: "$15 - 2-3 hrs",
    image:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Tegallalang Rice Terrace",
    meta: "$10 - 1-2 hrs",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Nusa Dua Beach",
    meta: "Free - 2-3 hrs",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Kecak Fire Dance",
    meta: "$12 - 1 hr",
    image:
      "https://images.unsplash.com/photo-1535139262971-c51845709a48?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Surfing at Kuta",
    meta: "$20 - 2-3 hrs",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80"
  }
];

export const routePins = [
  { x: "18%", y: "20%" },
  { x: "39%", y: "41%" },
  { x: "58%", y: "68%" },
  { x: "79%", y: "60%" },
  { x: "43%", y: "86%" }
];

export const decorativeIcons = {
  expand: Expand,
  sparkles: Sparkles
};

