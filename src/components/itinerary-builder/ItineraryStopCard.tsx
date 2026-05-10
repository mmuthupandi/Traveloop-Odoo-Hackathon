import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Pencil,
  Trash2,
  UsersRound,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ItineraryStop } from "@/data/itinerary-builder";
import { TimelineMarker } from "@/components/itinerary-builder/TimelineMarker";
import { cn } from "@/lib/utils";

type ItineraryStopCardProps = {
  stop: ItineraryStop;
  index: number;
  isLast: boolean;
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (stop: ItineraryStop) => void;
};

export function ItineraryStopCard({
  stop,
  index,
  isLast,
  expanded,
  onToggle,
  onDelete,
  onUpdate
}: ItineraryStopCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(stop);

  useEffect(() => {
    setDraft(stop);
  }, [stop]);

  const saveDraft = () => {
    onUpdate({
      ...draft,
      title: draft.title.trim() || stop.title,
      dates: draft.dates.trim() || stop.dates,
      duration: draft.duration.trim() || stop.duration,
      description: draft.description.trim() || stop.description
    });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraft(stop);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-4">
      <TimelineMarker
        index={index}
        badgeClass={stop.badgeClass}
        isLast={isLast}
      />

      <motion.article
        layout
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.36, delay: index * 0.04 }}
        whileHover={{ y: -3 }}
        className="w-full rounded-3xl border border-[#E8DED1] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
      >
        <div className="grid gap-5 lg:grid-cols-[230px_1fr_auto]">
          <img
            src={stop.image}
            alt={stop.title}
            className="h-48 w-full rounded-2xl object-cover lg:h-44"
          />

          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 md:hidden">
                  <span
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-full text-sm font-extrabold text-white",
                      stop.badgeClass
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#8A8276]">
                    Stop {index + 1}
                  </span>
                </div>

                {isEditing ? (
                  <div className="mt-3 grid gap-2 md:mt-0">
                    <input
                      value={draft.title}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          title: event.target.value
                        }))
                      }
                      className="w-full rounded-2xl border border-[#DDD4C6] bg-[#FFFCF6] px-4 py-3 font-serif text-2xl font-bold text-[#1F261F] outline-none focus:border-[#2F4F3E]"
                    />
                    <div className="grid gap-2 sm:grid-cols-2">
                      <input
                        value={draft.dates}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            dates: event.target.value
                          }))
                        }
                        className="rounded-2xl border border-[#DDD4C6] bg-[#FFFCF6] px-4 py-2 text-sm font-semibold text-[#4A443B] outline-none focus:border-[#2F4F3E]"
                      />
                      <input
                        value={draft.duration}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            duration: event.target.value
                          }))
                        }
                        className="rounded-2xl border border-[#DDD4C6] bg-[#FFFCF6] px-4 py-2 text-sm font-semibold text-[#4A443B] outline-none focus:border-[#2F4F3E]"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="mt-3 font-serif text-3xl font-bold text-[#1F261F] md:mt-0">
                      {stop.title}{" "}
                      <span className="font-sans text-2xl">{stop.emoji}</span>
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-[#6B6458]">
                      {stop.dates} <span className="mx-2">•</span>{" "}
                      {stop.duration}
                    </p>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={saveDraft}
                      className="grid h-10 w-10 place-items-center rounded-xl border border-[#D8E5D5] bg-[#EFF6ED] text-[#2F4F3E] transition-all duration-300 hover:bg-white"
                      aria-label={`Save ${stop.title}`}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="grid h-10 w-10 place-items-center rounded-xl border border-[#E8DED1] bg-[#FAF8F4] text-[#6B6458] transition-all duration-300 hover:bg-white"
                      aria-label={`Cancel editing ${stop.title}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-[#E8DED1] bg-[#FAF8F4] text-[#2F4F3E] transition-all duration-300 hover:bg-white"
                    aria-label={`Edit ${stop.title}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onDelete}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-[#F0D7D0] bg-[#FFF7F4] text-[#C14435] transition-all duration-300 hover:bg-white"
                  aria-label={`Delete ${stop.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {isEditing ? (
              <textarea
                value={draft.description}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    description: event.target.value
                  }))
                }
                rows={3}
                className="mt-4 w-full resize-none rounded-2xl border border-[#DDD4C6] bg-[#FFFCF6] px-4 py-3 text-base font-medium leading-7 text-[#36342E] outline-none focus:border-[#2F4F3E]"
              />
            ) : (
              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[#36342E]">
                {stop.description}
              </p>
            )}

            <p className="mt-4 flex items-center gap-2 text-sm font-bold text-[#2F4F3E]">
              <UsersRound className="h-4 w-4" />
              {stop.activityCount}{" "}
              {stop.activityCount === 1 ? "Activity" : "Activities"}
            </p>

            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  key="activities"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 grid gap-2 border-t border-[#EEE6DA] pt-4 sm:grid-cols-2">
                    {stop.activities.map((activity) => (
                      <div
                        key={activity}
                        className="rounded-2xl bg-[#F7F4EE] px-4 py-3 text-sm font-semibold text-[#3C382F]"
                      >
                        {activity}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={onToggle}
            className="grid h-11 w-11 place-items-center self-end justify-self-end rounded-full border border-[#E8DED1] bg-white text-[#2F4F3E] shadow-[0_8px_18px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5"
            aria-label={`${expanded ? "Collapse" : "Expand"} ${stop.title}`}
          >
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-transform duration-300",
                expanded && "rotate-180"
              )}
            />
          </button>
        </div>
      </motion.article>
    </div>
  );
}

