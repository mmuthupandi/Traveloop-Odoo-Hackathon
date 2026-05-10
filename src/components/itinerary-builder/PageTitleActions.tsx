import { Eye, Plus } from "lucide-react";
import { ItineraryButton } from "@/components/itinerary-builder/ItineraryButton";

type PageTitleActionsProps = {
  onPreview: () => void;
  onAddStop: () => void;
};

export function PageTitleActions({
  onPreview,
  onAddStop
}: PageTitleActionsProps) {
  return (
    <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 className="font-serif text-5xl font-extrabold leading-tight text-[#1F261F] md:text-6xl">
          Itinerary Builder
        </h2>
        <p className="mt-3 text-base font-medium text-[#4F4A40] md:text-lg">
          Add places, activities and dates to build your dream trip.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ItineraryButton
          icon={Eye}
          label="Preview Itinerary"
          onClick={onPreview}
        />
        <ItineraryButton
          icon={Plus}
          label="Add Stop"
          variant="primary"
          onClick={onAddStop}
        />
      </div>
    </section>
  );
}

