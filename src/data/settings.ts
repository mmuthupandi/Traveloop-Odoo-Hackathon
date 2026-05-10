export type ThemeOption = "light" | "dark" | "system";

export type NotificationSetting = {
  id: string;
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
};

export type SecurityRow = {
  id: string;
  title: string;
  subtitle: string;
};

export type SavedDestination = {
  id: string;
  name: string;
  region: string;
  rating: number;
  reviews: string;
  image: string;
};

export type StorageRow = {
  id: string;
  title: string;
  description: string;
  action: string;
};

export type SupportRow = {
  id: string;
  title: string;
  description: string;
};

export const initialNotifications: NotificationSetting[] = [
  {
    id: "trip-reminders",
    icon: "plane",
    title: "Trip Reminders",
    description: "Get reminded about upcoming trips",
    enabled: true
  },
  {
    id: "budget-alerts",
    icon: "wallet",
    title: "Budget Alerts",
    description: "Receive alerts for budget updates",
    enabled: true
  },
  {
    id: "deals",
    icon: "tag",
    title: "Deals & Offers",
    description: "Get notified about exciting deals",
    enabled: true
  },
  {
    id: "new-features",
    icon: "sparkles",
    title: "New Features",
    description: "Stay updated with new features",
    enabled: false
  }
];

export const securityRows: SecurityRow[] = [
  { id: "password", title: "Password", subtitle: "••••••••" },
  { id: "2fa", title: "Two-Factor Authentication", subtitle: "On" },
  { id: "login-activity", title: "Login Activity", subtitle: "View recent devices" },
  { id: "privacy", title: "Privacy Settings", subtitle: "Manage your data and privacy" }
];

export const savedDestinations: SavedDestination[] = [
  {
    id: "maldives",
    name: "Maldives",
    region: "Indian Ocean",
    rating: 4.8,
    reviews: "1.2K",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "switzerland",
    name: "Switzerland",
    region: "Europe",
    rating: 4.7,
    reviews: "1.8K",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    region: "Oceania",
    rating: 4.7,
    reviews: "1.6K",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "iceland",
    name: "Iceland",
    region: "Europe",
    rating: 4.6,
    reviews: "980",
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "bali",
    name: "Bali, Indonesia",
    region: "Asia",
    rating: 4.7,
    reviews: "2.4K",
    image: "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=600&q=80"
  }
];

export const storageRows: StorageRow[] = [
  { id: "export", title: "Export My Data", description: "Download a copy of your data", action: "Export" },
  { id: "cache", title: "Clear Cache", description: "Free up space by clearing cached data", action: "Clear" },
  { id: "offline", title: "Offline Maps", description: "Manage downloaded maps", action: "Manage" }
];

export const supportRows: SupportRow[] = [
  { id: "help", title: "Help Center", description: "Find answers to common questions" },
  { id: "contact", title: "Contact Support", description: "Get in touch with our team" },
  { id: "feedback", title: "Give Feedback", description: "Help us improve your experience" }
];

export const languageOptions = ["English", "Spanish", "French", "German", "Japanese", "Portuguese"];
export const currencyOptions = ["USD – US Dollar", "EUR – Euro", "GBP – British Pound", "JPY – Japanese Yen", "AUD – Australian Dollar"];
export const dateFormatOptions = ["DD MMM YYYY", "MM/DD/YYYY", "YYYY-MM-DD", "DD/MM/YYYY"];
export const temperatureOptions = ["Celsius (°C)", "Fahrenheit (°F)"];
