import { useEffect, useState } from "react";
import { HomePage } from "@/pages/home/HomePage";
import { MyTripsPage } from "@/pages/my-trips/MyTripsPage";
import { BudgetPage } from "@/pages/budget/BudgetPage";
import { PackingPage } from "@/pages/packing/PackingPage";
import { getRouteFromHash, type AppRoute } from "@/lib/routes";

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash());

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash());

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (route === "my-trips") return <MyTripsPage />;
  if (route === "budget") return <BudgetPage />;
  if (route === "packing") return <PackingPage />;
  return <HomePage />;
}
