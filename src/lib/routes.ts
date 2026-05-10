export type AppRoute = "home" | "my-trips" | "budget" | "packing" | "settings";

export const routeHashes: Record<AppRoute, string> = {
  home: "#/",
  "my-trips": "#/my-trips",
  budget: "#/budget",
  packing: "#/packing",
  settings: "#/settings"
};

export function getRouteFromHash(hash = window.location.hash): AppRoute {
  const path = hash.replace(/^#/, "");
  if (path === "/my-trips") return "my-trips";
  if (path === "/budget") return "budget";
  if (path === "/packing") return "packing";
  if (path === "/settings") return "settings";
  return "home";
}

export function getRouteForLabel(label: string): AppRoute | null {
  if (label === "Home") return "home";
  if (label === "My Trips") return "my-trips";
  if (label === "Budget") return "budget";
  if (label === "Packing List") return "packing";
  if (label === "Settings") return "settings";
  return null;
}

