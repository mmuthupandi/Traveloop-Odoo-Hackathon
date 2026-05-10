import { motion } from "framer-motion";
import { MoreVertical, Users } from "lucide-react";
import type { TripItem } from "@/data/my-trips";
import { ProgressBar } from "@/components/my-trips/ProgressBar";
import { cn } from "@/lib/utils";

type TripCardProps = {
  trip: TripItem;
  index: number;
};

const statusClassMap: Record<TripItem["status"], string> = {
  upcoming: "bg-white text-[#2F4F3E]",
  ongoing: "bg-[#FFF5EB] text-[#C46A2D]",
  completed: "bg-[#EEF5EE] text-[#2F4F3E]",
  cancelled: "bg-[#FDEEEE] text-[#B84040]"
};

export function TripCard({ trip, index }: TripCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={cn(
        "rounded-3xl border border-[#E8DED1] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 md:p-5",
        trip.cardTint
      )}
    >
      <div className="grid gap-5 xl:grid-cols-[340px_1fr_200px]">
        <div className="relative overflow-hidden rounded-3xl">
          <img src={trip.image} alt={trip.title} className="h-60 w-full object-cover" />
          <span
            className={cn(
              "absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold shadow-[0_8px_20px_rgba(0,0,0,0.12)]",
              statusClassMap[trip.status]
            )}
          >
            {trip.statusLabel}
          </span>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-[34px] font-bold leading-tight text-[#20251F]">
                {trip.title} <span className="font-sans text-3xl">{trip.emoji}</span>
              </h3>
              <p className="mt-2 text-base font-semibold text-[#676053]">
                {trip.dates} <span className="mx-2">•</span> {trip.stops} Stops
              </p>
            </div>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-[#514B41] transition-all duration-300 hover:bg-white/70"
              aria-label={`More actions for ${trip.title}`}
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-4 max-w-xl text-base leading-8 text-[#3D3A34]">{trip.description}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7E7668]">{trip.budgetLabel}</p>
              <p
                className={cn(
                  "mt-1 text-3xl font-bold",
                  trip.status === "cancelled" ? "text-[#B84040]" : "text-[#1F261F]"
                )}
              >
                {trip.budgetValue}
              </p>
            </div>
            {trip.status !== "cancelled" ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7E7668]">Progress</p>
                <p className="mt-1 text-lg font-bold text-[#23271E]">{trip.progressLabel}</p>
                <div className="mt-2">
                  <ProgressBar value={trip.progress ?? 0} toneClassName={trip.progressColor ?? "bg-[#2F4F3E]"} />
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7E7668]">Status</p>
                <p className="mt-1 text-lg font-bold text-[#B84040]">{trip.progressLabel}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-2">
            {trip.actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#D9D0C2] bg-[#FCF9F4] px-3 text-sm font-semibold text-[#2D2A24] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  <Icon className="h-4 w-4" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="flex -space-x-3">
              {trip.avatars.map((avatar, i) => (
                <img
                  key={`${trip.id}-${i}`}
                  src={avatar}
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-[#F7F4EE] object-cover"
                />
              ))}
            </div>
            {trip.extraPeople ? (
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#E9E0D2] text-xs font-bold text-[#544C40]">
                +{trip.extraPeople}
              </span>
            ) : null}
            <Users className="ml-1 h-4 w-4 text-[#807868]" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

