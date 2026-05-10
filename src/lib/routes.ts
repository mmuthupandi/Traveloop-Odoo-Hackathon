export type AppRoute = "home" | "my-trips" | "budget" | "packing";

export const routeHashes: Record<AppRoute, string> = {
  home: "#/",
  "my-trips": "#/my-trips",
  budget: "#/budget",
  packing: "#/packing"
};

export function getRouteFromHash(hash = window.location.hash): AppRoute {
  const path = hash.replace(/^#/, "");
  if (path === "/my-trips") return "my-trips";
  if (path === "/budget") return "budget";
  if (path === "/packing") return "packing";
  return "home";
}

export function getRouteForLabel(label: string): AppRoute | null {
  if (label === "Home") return "home";
  if (label === "My Trips") return "my-trips";
  if (label === "Budget") return "budget";
  if (label === "Packing List") return "packing";
  return null;
}

