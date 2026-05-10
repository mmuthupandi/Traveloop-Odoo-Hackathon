import {
  Backpack,
  BriefcaseBusiness,
  Compass,
  Fish,
  Home,
  Landmark,
  Leaf,
  Mountain,
  NotebookPen,
  Palmtree,
  Route,
  Settings,
  Soup,
  Sparkles,
  Tag,
  TreePine,
  UserRound,
  UsersRound,
  WalletCards
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ExploreNavItem = {
  label: string;
  icon: LucideIcon;
};

export type ExploreCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  className: string;
};

export type ExploreDestination = {
  id: string;
  name: string;
  country: string;
  emoji: string;
  rating: number;
  reviews: string;
  price: string;
  category: string;
  badge?: string;
  image: string;
};

export type ExploreOffer = {
  title: string;
  description: string;
  icon: LucideIcon;
  className: string;
};

export type ExploreInterest = {
  title: string;
  subtitle: string;
  image: string;
};

export const exploreNavItems: ExploreNavItem[] = [
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

export const exploreCategories: ExploreCategory[] = [
  { id: "Beaches", label: "Beaches", icon: Palmtree, className: "bg-[#F3ECE1] text-[#2F4F3E]" },
  { id: "Mountains", label: "Mountains", icon: Mountain, className: "bg-[#EAF0F1] text-[#315363]" },
  { id: "Historical", label: "Historical", icon: Landmark, className: "bg-[#F8E9D5] text-[#A85D2B]" },
  { id: "Adventure", label: "Adventure", icon: Compass, className: "bg-[#EFEDEA] text-[#39433A]" },
  { id: "Food", label: "Food & Culture", icon: Soup, className: "bg-[#F8E6D4] text-[#C46A2D]" },
  { id: "Wildlife", label: "Wildlife", icon: Fish, className: "bg-[#F3E3E4] text-[#7E514F]" },
  { id: "Relaxation", label: "Relaxation", icon: Leaf, className: "bg-[#F6E7E1] text-[#A76558]" }
];

export const popularDestinations: ExploreDestination[] = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    emoji: "🌴",
    rating: 4.7,
    reviews: "2.4K reviews",
    price: "$450",
    category: "Beaches",
    image:
      "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "switzerland",
    name: "Switzerland",
    country: "Alps",
    emoji: "🏔️",
    rating: 4.8,
    reviews: "1.8K reviews",
    price: "$1,250",
    category: "Mountains",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    emoji: "🌊",
    rating: 4.6,
    reviews: "1.6K reviews",
    price: "$680",
    category: "Relaxation",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    emoji: "🌸",
    rating: 4.9,
    reviews: "2.1K reviews",
    price: "$910",
    category: "Historical",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80"
  }
];

export const recommendedDestinations: ExploreDestination[] = [
  {
    id: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    emoji: "🐚",
    rating: 4.8,
    reviews: "1.2K reviews",
    price: "$980",
    category: "Relaxation",
    badge: "Relaxation",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    country: "South Island",
    emoji: "⛰️",
    rating: 4.7,
    reviews: "1.5K reviews",
    price: "$1,120",
    category: "Adventure",
    badge: "Adventure",
    image:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cambodia",
    name: "Cambodia",
    country: "Siem Reap",
    emoji: "🏛️",
    rating: 4.6,
    reviews: "980 reviews",
    price: "$620",
    category: "Historical",
    badge: "Culture",
    image:
      "https://images.unsplash.com/photo-1559628233-100c798642d4?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "thailand",
    name: "Thailand",
    country: "Phuket",
    emoji: "🌴",
    rating: 4.5,
    reviews: "1.1K reviews",
    price: "$430",
    category: "Beaches",
    badge: "Beaches",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80"
  }
];

export const exploreOffers: ExploreOffer[] = [
  { title: "Summer Sale", description: "Up to 30% off on beach destinations", icon: Sparkles, className: "bg-[#FFF2D8] text-[#C46A2D]" },
  { title: "Mountain Deals", description: "Up to 25% off adventure awaits", icon: Mountain, className: "bg-[#F0E9DE] text-[#64553D]" },
  { title: "Group Discount", description: "Extra 10% off for groups of 4+", icon: UsersRound, className: "bg-[#EAF2E8] text-[#2F4F3E]" },
  { title: "Early Bird", description: "Book early, save more", icon: Tag, className: "bg-[#EAF1F4] text-[#4D83A6]" }
];

export const exploreInterests: ExploreInterest[] = [
  {
    title: "Solo Travel",
    subtitle: "Find your freedom",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Romantic Getaways",
    subtitle: "Perfect escapes for two",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Family Trips",
    subtitle: "Fun for the whole family",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Budget Friendly",
    subtitle: "Amazing trips, less spend",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  }
];

export const trendingSearches = [
  "Northern Lights",
  "Skyscrapers",
  "Road Trips",
  "Island Hopping",
  "Safari",
  "Historical Temples",
  "Backpacking",
  "Vineyards"
];

export const heroExploreImage =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85";

export const ctaLandscapeImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80";

export const treeIcon = TreePine;
