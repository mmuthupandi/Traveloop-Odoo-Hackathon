export type AppRoute = "home" | "my-trips";

export const routeHashes: Record<AppRoute, string> = {
  home: "#/",
  "my-trips": "#/my-trips"
};

export function getRouteFromHash(hash = window.location.hash): AppRoute {
  return hash.replace(/^#/, "") === "/my-trips" ? "my-trips" : "home";
}

export function getRouteForLabel(label: string): AppRoute | null {
  if (label === "Home") return "home";
  if (label === "My Trips") return "my-trips";
  return null;
}

