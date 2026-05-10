import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import {
  extraStop,
  itineraryStops,
  type ItineraryStop
} from "@/data/itinerary-builder";
import { ItineraryButton } from "@/components/itinerary-builder/ItineraryButton";
import { ItinerarySidebar } from "@/components/itinerary-builder/ItinerarySidebar";
import { ItineraryStopCard } from "@/components/itinerary-builder/ItineraryStopCard";
import { ItineraryTopHeader } from "@/components/itinerary-builder/ItineraryTopHeader";
import { PageTitleActions } from "@/components/itinerary-builder/PageTitleActions";
import { QuoteCard } from "@/components/itinerary-builder/QuoteCard";
import { RouteOverviewCard } from "@/components/itinerary-builder/RouteOverviewCard";
import { SuggestedActivities } from "@/components/itinerary-builder/SuggestedActivities";
import { TipsCard } from "@/components/itinerary-builder/TipsCard";
import { TripStatsPanel } from "@/components/itinerary-builder/TripStatsPanel";
import { TripSummaryCard } from "@/components/itinerary-builder/TripSummaryCard";

export function ItineraryBuilderPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [stops, setStops] = useState<ItineraryStop[]>(itineraryStops);
  const [expandedStops, setExpandedStops] = useState<string[]>(["bali"]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const totalActivities = useMemo(
    () => stops.reduce((sum, stop) => sum + stop.activityCount, 0),
    [stops]
  );

  const addStop = () => {
    setStops((currentStops) => {
      const hasCanggu = currentStops.some((stop) => stop.id === extraStop.id);
      const nextStop = hasCanggu
        ? {
            ...extraStop,
            id: `canggu-${currentStops.length + 1}`,
            title: "Canggu Extension"
          }
        : extraStop;

      const updatedStops = [...currentStops, nextStop];
      setExpandedStops((current) => [...current, nextStop.id]);
      setActionMessage(`${nextStop.title} added to your itinerary.`);
      return updatedStops;
    });
  };

  const deleteStop = (id: string) => {
    setStops((currentStops) => {
      if (currentStops.length === 1) {
        setActionMessage("Keep at least one stop in your itinerary.");
        return currentStops;
      }

      const deletedStop = currentStops.find((stop) => stop.id === id);
      setActionMessage(
        deletedStop ? `${deletedStop.title} removed from your itinerary.` : null
      );
      return currentStops.filter((stop) => stop.id !== id);
    });
    setExpandedStops((current) => current.filter((stopId) => stopId !== id));
  };

  const updateStop = (updatedStop: ItineraryStop) => {
    setStops((currentStops) =>
      currentStops.map((stop) =>
        stop.id === updatedStop.id ? updatedStop : stop
      )
    );
    setActionMessage(`${updatedStop.title} updated.`);
  };

  const toggleStop = (id: string) => {
    setExpandedStops((current) =>
      current.includes(id)
        ? current.filter((stopId) => stopId !== id)
        : [...current, id]
    );
  };

  const addSuggestedActivity = (activity: string) => {
    setStops((currentStops) =>
      currentStops.map((stop, index) => {
        if (index !== 0 || stop.activities.includes(activity)) return stop;

        const activities = [...stop.activities, activity];

        return {
          ...stop,
          activities,
          activityCount: activities.length
        };
      })
    );
    setExpandedStops((current) =>
      stops[0]?.id && !current.includes(stops[0].id)
        ? [...current, stops[0].id]
        : current
    );
    setActionMessage(`${activity} added to Bali, Indonesia.`);
  };

  const firstStopActivities = stops[0]?.activities ?? [];

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1F261F]">
      <ItinerarySidebar
        darkMode={darkMode}
        onDarkModeChange={setDarkMode}
      />

      <main className="xl:ml-[282px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="mx-auto flex max-w-[1540px] flex-col gap-8 px-4 pb-28 pt-6 sm:px-6 lg:px-10 xl:px-12 xl:py-10"
        >
          <ItineraryTopHeader />
          <PageTitleActions
            onPreview={() => {
              setPreviewOpen((open) => !open);
              setActionMessage(
                previewOpen ? "Preview closed." : "Preview itinerary opened."
              );
            }}
            onAddStop={addStop}
          />

          <AnimatePresence mode="popLayout">
            {actionMessage ? (
              <motion.div
                key="action-message"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-2xl border border-[#D9CEBE] bg-[#FFFBF4] px-5 py-3 text-sm font-bold text-[#2F4F3E] shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                {actionMessage}
              </motion.div>
            ) : null}

            {previewOpen ? (
              <motion.section
                key="preview"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-3xl border border-[#D9CEBE] bg-[#FFFBF4] px-6 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              >
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#C46A2D]">
                  Preview Mode
                </p>
                <p className="mt-2 text-lg font-semibold text-[#1F261F]">
                  Bali Getaway has {stops.length} stops and {totalActivities} planned activities.
                </p>
              </motion.section>
            ) : null}
          </AnimatePresence>

          <TripSummaryCard />

          <div className="grid gap-8 2xl:grid-cols-[1fr_360px]">
            <div>
              <section className="space-y-5">
                {stops.map((stop, index) => (
                  <ItineraryStopCard
                    key={stop.id}
                    stop={stop}
                    index={index}
                    isLast={index === stops.length - 1}
                    expanded={expandedStops.includes(stop.id)}
                    onToggle={() => toggleStop(stop.id)}
                    onDelete={() => deleteStop(stop.id)}
                    onUpdate={updateStop}
                  />
                ))}
              </section>

              <ItineraryButton
                icon={Plus}
                label="Add Another Stop"
                onClick={addStop}
                className="mt-5 h-14 w-full border-dashed bg-[#F5EEE2] text-[#2F4F3E]"
              />

              <SuggestedActivities
                addedActivities={firstStopActivities}
                onAddActivity={addSuggestedActivity}
              />
            </div>

            <aside className="space-y-6">
              <TripStatsPanel
                stopCount={stops.length}
                activityCount={totalActivities}
                onViewBudget={() =>
                  setActionMessage(
                    "Estimated budget is $1,450 across stays, food, activities and transport."
                  )
                }
              />
              <RouteOverviewCard />
              <TipsCard />
              <QuoteCard />
            </aside>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
