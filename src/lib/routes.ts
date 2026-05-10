
export type AppRoute = "login" | "home" | "my-trips" | "itinerary-builder" | "explore" | "budget" | "packing" | "notes" | "profile" | "settings";

export const routeHashes: Record<AppRoute, string> = {
  login: "#/login",
  home: "#/",
  "my-trips": "#/my-trips",
  "itinerary-builder": "#/itinerary-builder",
  explore: "#/explore",
  budget: "#/budget",
  packing: "#/packing",
  notes: "#/notes",
  profile: "#/profile",
  settings: "#/settings"
};

export function getRouteFromHash(hash = window.location.hash): AppRoute {
  const path = hash.replace(/^#/, "");

  if (path === "/login") return "login";
  if (path === "/my-trips") return "my-trips";
  if (path === "/itinerary-builder") return "itinerary-builder";
  if (path === "/explore") return "explore";
  if (path === "/budget") return "budget";
  if (path === "/packing") return "packing";
  if (path === "/notes") return "notes";
  if (path === "/profile") return "profile";
  if (path === "/settings") return "settings";
  
  return "home";
}

export function getRouteForLabel(label: string): AppRoute | null {
  if (label === "Home") return "home";
  if (label === "My Trips") return "my-trips";
  if (label === "Itinerary Builder") return "itinerary-builder";
  if (label === "Explore") return "explore";
  if (label === "Budget") return "budget";
  if (label === "Packing List") return "packing";
  if (label === "Notes") return "notes";
  if (label === "Profile") return "profile";
  if (label === "Settings") return "settings";
  return null;
}
