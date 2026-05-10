import { useEffect, useState } from "react";
import { ExplorePage } from "@/pages/explore/ExplorePage";
import { HomePage } from "@/pages/home/HomePage";
import { ItineraryBuilderPage } from "@/pages/itinerary-builder/ItineraryBuilderPage";
import { MyTripsPage } from "@/pages/my-trips/MyTripsPage";
import { MobileRouteNav } from "@/components/MobileRouteNav";
import { getRouteFromHash, type AppRoute } from "@/lib/routes";

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash());

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash());

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      {route === "my-trips" ? <MyTripsPage /> : null}
      {route === "itinerary-builder" ? <ItineraryBuilderPage /> : null}
      {route === "explore" ? <ExplorePage /> : null}
      {route === "home" ? <HomePage /> : null}
      <MobileRouteNav activeRoute={route} />
    </>
  );
}
