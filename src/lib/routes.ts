export type AppRoute = "home" | "my-trips" | "budget";

export const routeHashes: Record<AppRoute, string> = {
  home: "#/",
  "my-trips": "#/my-trips",
  budget: "#/budget"
};

export function getRouteFromHash(hash = window.location.hash): AppRoute {
  const path = hash.replace(/^#/, "");
  if (path === "/my-trips") return "my-trips";
  if (path === "/budget") return "budget";
  return "home";
}

export function getRouteForLabel(label: string): AppRoute | null {
  if (label === "Home") return "home";
  if (label === "My Trips") return "my-trips";
  if (label === "Budget") return "budget";
  return null;
}

