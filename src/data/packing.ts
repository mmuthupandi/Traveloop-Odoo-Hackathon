import {
  Shirt,
  SprayCan,
  FileText,
  Smartphone,
  HeartPulse,
  Package
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PackingItem = {
  id: string;
  label: string;
  packed: boolean;
};

export type PackingCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  items: PackingItem[];
};

export const initialCategories: PackingCategory[] = [
  {
    id: "clothing",
    label: "Clothing",
    icon: Shirt,
    color: "#3C8B68",
    bgColor: "#EAF4EE",
    items: [
      { id: "c1", label: "T-shirts (4)", packed: true },
      { id: "c2", label: "Shorts (2)", packed: true },
      { id: "c3", label: "Lightweight pants", packed: true },
      { id: "c4", label: "Socks (5)", packed: false },
      { id: "c5", label: "Underwear (5)", packed: false },
      { id: "c6", label: "Swimwear", packed: false },
      { id: "c7", label: "Jacket / Hoodie", packed: false },
      { id: "c8", label: "Sleepwear", packed: false },
      { id: "c9", label: "Hat / Cap", packed: false }
    ]
  },
  {
    id: "toiletries",
    label: "Toiletries",
    icon: SprayCan,
    color: "#3F7EA7",
    bgColor: "#E6F1F8",
    items: [
      { id: "t1", label: "Toothbrush", packed: true },
      { id: "t2", label: "Toothpaste", packed: true },
      { id: "t3", label: "Shampoo", packed: true },
      { id: "t4", label: "Body Wash", packed: true },
      { id: "t5", label: "Sunscreen", packed: false },
      { id: "t6", label: "Moisturizer", packed: false },
      { id: "t7", label: "Razor", packed: false }
    ]
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    color: "#C46A2D",
    bgColor: "#F8EDE0",
    items: [
      { id: "d1", label: "Passport", packed: true },
      { id: "d2", label: "Flight Tickets", packed: true },
      { id: "d3", label: "Hotel Voucher", packed: true },
      { id: "d4", label: "Travel Insurance", packed: false },
      { id: "d5", label: "Visa (if required)", packed: false }
    ]
  },
  {
    id: "electronics",
    label: "Electronics",
    icon: Smartphone,
    color: "#9B6BB5",
    bgColor: "#F3EDF8",
    items: [
      { id: "e1", label: "Phone", packed: true },
      { id: "e2", label: "Charger", packed: true },
      { id: "e3", label: "Power Bank", packed: true },
      { id: "e4", label: "Camera", packed: false },
      { id: "e5", label: "Universal Adapter", packed: false },
      { id: "e6", label: "Headphones", packed: false }
    ]
  },
  {
    id: "health",
    label: "Health",
    icon: HeartPulse,
    color: "#E87565",
    bgColor: "#FDECEA",
    items: [
      { id: "h1", label: "Basic Medicines", packed: true },
      { id: "h2", label: "Pain Reliever", packed: true },
      { id: "h3", label: "Band-Aids", packed: false },
      { id: "h4", label: "Face Masks", packed: false },
      { id: "h5", label: "Hand Sanitizer", packed: false }
    ]
  },
  {
    id: "others",
    label: "Others",
    icon: Package,
    color: "#7F7A70",
    bgColor: "#F0EDE8",
    items: [
      { id: "o1", label: "Sunglasses", packed: true },
      { id: "o2", label: "Travel Pillow", packed: false },
      { id: "o3", label: "Reusable Water Bottle", packed: false },
      { id: "o4", label: "Snacks", packed: false }
    ]
  }
];

export const packingTripData = {
  title: "Bali Getaway",
  emoji: "🌴",
  dates: "15 May – 23 May 2026",
  stops: 5,
  image:
    "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=400&q=80"
};

export const travelLightTip =
  "Roll your clothes, use packing cubes, and stick to versatile items.";

export const dontForgetMessage =
  "Check the weather forecast and adjust your packing.";
