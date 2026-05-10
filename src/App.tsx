import { useEffect, useState } from "react";
import { HomePage } from "@/pages/home/HomePage";
import { MyTripsPage } from "@/pages/my-trips/MyTripsPage";
import { getRouteFromHash, type AppRoute } from "@/lib/routes";

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash());

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash());

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return route === "my-trips" ? <MyTripsPage /> : <HomePage />;
}
