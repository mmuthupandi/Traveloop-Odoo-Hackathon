
import { useEffect, useState } from "react";
import { LoginPage } from "@/pages/login/LoginPage";
import { HomePage } from "@/pages/home/HomePage";
import { MyTripsPage } from "@/pages/my-trips/MyTripsPage";
import { ItineraryBuilderPage } from "@/pages/itinerary-builder/ItineraryBuilderPage";
import { ExplorePage } from "@/pages/explore/ExplorePage";
import { BudgetPage } from "@/pages/budget/BudgetPage";
import { PackingPage } from "@/pages/packing/PackingPage";
import { SettingsPage } from "@/pages/settings/SettingsPage";
import { TravelNotesDashboard } from "@/pages/notes/TravelNotesDashboard";
import { getRouteFromHash, type AppRoute } from "@/lib/routes";

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash());

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash());

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderPage = () => {
    switch (route) {
      case "login":
        return <LoginPage />;
      case "my-trips":
        return <MyTripsPage />;
      case "itinerary-builder":
        return <ItineraryBuilderPage />;
      case "explore":
        return <ExplorePage />;
      case "budget":
        return <BudgetPage />;
      case "packing":
        return <PackingPage />;
      case "notes":
        return <TravelNotesDashboard />;
      case "settings":
        return <SettingsPage />;
      case "home":
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      {renderPage()}
    </div>
  );
}
