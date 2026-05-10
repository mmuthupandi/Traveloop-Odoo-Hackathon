import {
  Bed,
  Car,
  Compass,
  CreditCard,
  ShoppingBag,
  Utensils,
  MoreHorizontal
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { tripDetailData } from "@/data/trip-details";

export type BudgetCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  budget: number;
  spent: number;
};

export type Expense = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  paymentMethod: string;
};

export type DailySpend = {
  day: string;
  spent: number;
  budget: number;
  overBudget: boolean;
};

export type TripBudgetSeed = {
  tripId: string;
  title: string;
  emoji: string;
  dates: string;
  stops: number;
  image: string;
  totalBudget: number;
  tripDays: number;
  // Budget categories derived from trip-details budget array
  budgetRows: { label: string; spent: number; total: number; color: string }[];
  // Initial expenses derived from hotels + flights + booked activities
  expenses: Expense[];
};

// Category icon map — labels match the budget.label values in trip-details
export const categoryIconMap: Record<string, LucideIcon> = {
  Flights:     Bed,       // reuse Bed as placeholder; overridden by color
  Hotels:      Bed,
  Activities:  Compass,
  Food:        Utensils,
  Transport:   Car,
  Shopping:    ShoppingBag,
  Others:      MoreHorizontal,
};

// Proper icons per label
export const budgetLabelIcons: Record<string, LucideIcon> = {
  Flights:    Car,
  Hotels:     Bed,
  Activities: Compass,
  Food:       Utensils,
  Transport:  Car,
  Shopping:   ShoppingBag,
  Others:     MoreHorizontal,
};

export const budgetLabelBgColors: Record<string, string> = {
  Flights:    "#E6F1F8",
  Hotels:     "#EAF4EE",
  Activities: "#F8EDE0",
  Food:       "#FDECEA",
  Transport:  "#E6F1F8",
  Shopping:   "#F3EDF8",
  Others:     "#F0EDE8",
};

// Build expenses from the trip detail data (hotels + flights + booked activities)
function buildExpenses(tripId: string): Expense[] {
  const d = tripDetailData[tripId];
  if (!d) return [];
  const exps: Expense[] = [];

  // Flights
  d.flights.forEach((f, i) => {
    const amt = Math.round(d.budget.find((b) => b.label === "Flights")?.spent ?? 0);
    // Split flight cost evenly between outbound/return
    const perFlight = Math.round(amt / d.flights.length);
    exps.push({
      id: `${tripId}-flight-${i}`,
      date: f.date,
      description: `${f.airline} · ${f.from.split(" ")[0]} → ${f.to.split(" ")[0]}`,
      category: "Flights",
      amount: perFlight,
      paymentMethod: "Credit Card",
    });
  });

  // Hotels
  d.hotels.forEach((h, i) => {
    const price = parseInt(h.price.replace(/[^0-9]/g, ""), 10);
    exps.push({
      id: `${tripId}-hotel-${i}`,
      date: d.flights[0]?.date ?? "",
      description: `${h.name} (${h.nights})`,
      category: "Hotels",
      amount: price,
      paymentMethod: "Credit Card",
    });
  });

  // Booked activities only
  d.activities
    .filter((a) => a.booked && parseInt(a.price.replace(/[^0-9]/g, ""), 10) > 0)
    .forEach((a, i) => {
      const price = parseInt(a.price.replace(/[^0-9]/g, ""), 10);
      exps.push({
        id: `${tripId}-activity-${i}`,
        date: d.flights[0]?.date ?? "",
        description: a.name,
        category: "Activities",
        amount: price,
        paymentMethod: "Cash",
      });
    });

  return exps;
}

// Derive seeds from the single source of truth in trip-details.ts
export const tripBudgetSeeds: TripBudgetSeed[] = Object.entries(tripDetailData).map(
  ([tripId, d]) => ({
    tripId,
    title:       d.title,
    emoji:       d.emoji,
    dates:       d.dates,
    stops:       d.stops,
    image:       d.image,
    totalBudget: d.totalBudget,
    tripDays:    d.tripDays,
    budgetRows:  d.budget,
    expenses:    buildExpenses(tripId),
  })
);

export const donutColors = [
  "#3F7EA7", "#3C8B68", "#C46A2D", "#E87565", "#9B6BB5", "#B0A898"
];

export const categoryBadgeColors: Record<string, string> = {
  Flights:       "bg-[#E6F1F8] text-[#3F7EA7]",
  Hotels:        "bg-[#EAF4EE] text-[#3C8B68]",
  Activities:    "bg-[#F8EDE0] text-[#C46A2D]",
  Food:          "bg-[#FDECEA] text-[#E87565]",
  "Food & Drinks": "bg-[#FDECEA] text-[#E87565]",
  Transport:     "bg-[#E6F1F8] text-[#3F7EA7]",
  Shopping:      "bg-[#F3EDF8] text-[#9B6BB5]",
  Others:        "bg-[#F0EDE8] text-[#7F7A70]",
};

export const paymentMethods = ["Credit Card", "Debit Card", "Cash", "Bank Transfer"];

export const smartTipByTrip: Record<string, string> = {
  bali:   "You're doing great! 🎉 You're under budget by $370. Keep it up and enjoy your trip.",
  japan:  "Transport is over budget. Consider using the JR Pass for unlimited train travel.",
  greece: "Transport is slightly over budget. Ferry tickets booked in advance save up to 30%.",
};
