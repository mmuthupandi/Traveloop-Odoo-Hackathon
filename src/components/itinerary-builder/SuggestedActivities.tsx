import { Plus } from "lucide-react";
import { suggestedActivities } from "@/data/itinerary-builder";

type SuggestedActivitiesProps = {
  addedActivities: string[];
  onAddActivity: (activity: string) => void;
};

export function SuggestedActivities({
  addedActivities,
  onAddActivity
}: SuggestedActivitiesProps) {
  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="font-serif text-xl font-bold text-[#1F261F]">
          Suggested Activities for Bali, Indonesia
        </h3>
        <button
          type="button"
          className="text-sm font-bold text-[#2F4F3E] transition-colors duration-300 hover:text-[#C46A2D]"
        >
          View all
        </button>
      </div>
      <div className="grid grid-flow-col auto-cols-[70%] gap-4 overflow-x-auto pb-2 sm:auto-cols-[36%] lg:auto-cols-fr lg:grid-flow-row lg:grid-cols-5 lg:overflow-visible lg:pb-0">
        {suggestedActivities.map((activity) => {
          const isAdded = addedActivities.includes(activity.title);

          return (
            <article
              key={activity.title}
              className="overflow-hidden rounded-2xl border border-[#E8DED1] bg-white shadow-[0_8px_22px_rgba(0,0,0,0.05)]"
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="h-24 w-full object-cover"
              />
              <div className="flex items-center justify-between gap-2 p-3">
                <div>
                  <h4 className="text-xs font-extrabold text-[#1F261F]">
                    {activity.title}
                  </h4>
                  <p className="mt-1 text-xs font-semibold text-[#6B6458]">
                    {activity.meta}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onAddActivity(activity.title)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F7F4EE] text-[#2F4F3E] transition-all duration-300 hover:bg-[#2F4F3E] hover:text-white disabled:bg-[#2F4F3E] disabled:text-white"
                  aria-label={`${isAdded ? "Added" : "Add"} ${activity.title}`}
                  disabled={isAdded}
                >
                  <Plus className={isAdded ? "h-4 w-4 rotate-45" : "h-4 w-4"} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

