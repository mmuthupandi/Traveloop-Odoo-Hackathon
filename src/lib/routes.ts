export type AppRoute = "home" | "my-trips" | "itinerary-builder" | "explore";

export const routeHashes: Record<AppRoute, string> = {
  home: "#/",
  "my-trips": "#/my-trips",
  "itinerary-builder": "#/itinerary-builder",
  explore: "#/explore"
};

export function getRouteFromHash(hash = window.location.hash): AppRoute {
  const path = hash.replace(/^#/, "");

  if (path === "/my-trips") return "my-trips";
  if (path === "/itinerary-builder") return "itinerary-builder";
  if (path === "/explore") return "explore";

  return "home";
}

export function getRouteForLabel(label: string): AppRoute | null {
  if (label === "Home") return "home";
  if (label === "My Trips") return "my-trips";
  if (label === "Itinerary Builder") return "itinerary-builder";
  if (label === "Explore") return "explore";
  return null;
}
