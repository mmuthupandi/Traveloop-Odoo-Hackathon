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

export const budgetCategories: BudgetCategory[] = [
  {
    id: "accommodation",
    label: "Accommodation",
    icon: Bed,
    color: "#3C8B68",
    bgColor: "#EAF4EE",
    budget: 600,
    spent: 350
  },
  {
    id: "transport",
    label: "Transport",
    icon: Car,
    color: "#3F7EA7",
    bgColor: "#E6F1F8",
    budget: 300,
    spent: 180
  },
  {
    id: "activities",
    label: "Activities",
    icon: Compass,
    color: "#C46A2D",
    bgColor: "#F8EDE0",
    budget: 250,
    spent: 150
  },
  {
    id: "food",
    label: "Food & Drinks",
    icon: Utensils,
    color: "#E87565",
    bgColor: "#FDECEA",
    budget: 200,
    spent: 120
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: ShoppingBag,
    color: "#9B6BB5",
    bgColor: "#F3EDF8",
    budget: 70,
    spent: 40
  },
  {
    id: "others",
    label: "Others",
    icon: MoreHorizontal,
    color: "#7F7A70",
    bgColor: "#F0EDE8",
    budget: 30,
    spent: 30
  }
];

export const donutColors = [
  "#3C8B68",
  "#3F7EA7",
  "#C46A2D",
  "#E87565",
  "#9B6BB5",
  "#B0A898"
];

export const dailySpending: DailySpend[] = [
  { day: "15 May", spent: 220, budget: 207, overBudget: true },
  { day: "16 May", spent: 110, budget: 207, overBudget: false },
  { day: "17 May", spent: 85, budget: 207, overBudget: false },
  { day: "18 May", spent: 95, budget: 207, overBudget: false },
  { day: "19 May", spent: 240, budget: 207, overBudget: true },
  { day: "20 May", spent: 60, budget: 207, overBudget: false },
  { day: "21 May", spent: 60, budget: 207, overBudget: false }
];

export const expenses: Expense[] = [
  {
    id: "1",
    date: "15 May 2026",
    description: "Hotel Booking",
    category: "Accommodation",
    amount: -220,
    paymentMethod: "Credit Card"
  },
  {
    id: "2",
    date: "15 May 2026",
    description: "Flight to Bali",
    category: "Transport",
    amount: -180,
    paymentMethod: "Credit Card"
  },
  {
    id: "3",
    date: "16 May 2026",
    description: "Ubud Day Tour",
    category: "Activities",
    amount: -75,
    paymentMethod: "Debit Card"
  },
  {
    id: "4",
    date: "16 May 2026",
    description: "Dinner at Local Restaurant",
    category: "Food & Drinks",
    amount: -35,
    paymentMethod: "Cash"
  },
  {
    id: "5",
    date: "17 May 2026",
    description: "Souvenir Shopping",
    category: "Shopping",
    amount: -40,
    paymentMethod: "Cash"
  }
];

export const categoryBadgeColors: Record<string, string> = {
  Accommodation: "bg-[#EAF4EE] text-[#3C8B68]",
  Transport: "bg-[#E6F1F8] text-[#3F7EA7]",
  Activities: "bg-[#F8EDE0] text-[#C46A2D]",
  "Food & Drinks": "bg-[#FDECEA] text-[#E87565]",
  Shopping: "bg-[#F3EDF8] text-[#9B6BB5]",
  Others: "bg-[#F0EDE8] text-[#7F7A70]"
};

export const summaryStats = {
  totalBudget: 1450,
  totalSpent: 870,
  remaining: 580,
  avgCostPerDay: 124,
  tripDays: 7
};

export const tripSelectorData = {
  title: "Bali Getaway",
  emoji: "🌴",
  dates: "15 May – 23 May 2026",
  stops: 5,
  image:
    "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=400&q=80"
};

export const smartTip =
  "You're doing great! 🎉 You're under budget by $580. Keep it up and enjoy your trip.";

export const paymentIcons: Record<string, LucideIcon> = {
  "Credit Card": CreditCard,
  "Debit Card": CreditCard,
  Cash: CreditCard
};
