import { tripSummaryRows } from "@/data/itinerary-builder";
import { ItineraryButton } from "@/components/itinerary-builder/ItineraryButton";

type TripStatsPanelProps = {
  stopCount: number;
  activityCount: number;
  onViewBudget: () => void;
};

export function TripStatsPanel({
  stopCount,
  activityCount,
  onViewBudget
}: TripStatsPanelProps) {
  const rows = tripSummaryRows.map((row) => {
    if (row.label === "Total Stops") {
      return { ...row, value: `${stopCount} Places` };
    }

    if (row.label === "Total Activities") {
      return { ...row, value: `${activityCount} Activities` };
    }

    return row;
  });

  return (
    <section className="rounded-3xl border border-[#E8DED1] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <h3 className="font-serif text-2xl font-bold text-[#1F261F]">Trip Summary</h3>
      <div className="mt-5 divide-y divide-[#EEE6DA]">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.label} className="flex items-center justify-between gap-4 py-4 first:pt-0">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#F7F4EE] text-[#2F4F3E]">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-[#5D574D]">{row.label}</span>
              </div>
              <span className="text-sm font-extrabold text-[#1F261F]">{row.value}</span>
            </div>
          );
        })}
      </div>
      <ItineraryButton
        label="View Budget"
        onClick={onViewBudget}
        className="mt-4 w-full bg-[#F3ECE0]"
      />
    </section>
  );
}
