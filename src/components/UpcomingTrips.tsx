import { CircleDollarSign, MapPin, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { trips } from "@/data/travel-dashboard";

export function UpcomingTrips() {
  return (
    <section aria-labelledby="upcoming-trips-title">
      <SectionHeader
        id="upcoming-trips-title"
        title="Upcoming Trips"
        action="View all trips"
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {trips.map((trip, index) => (
          <motion.article
            key={trip.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.05, duration: 0.45 }}
            whileHover={{ y: -8 }}
            className="group overflow-hidden rounded-3xl bg-parchment shadow-travel transition-all duration-300 hover:shadow-float"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={trip.image}
                alt={`${trip.title} destination`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <span className="absolute left-5 top-4 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-ink shadow-travel">
                {trip.countdown}
              </span>
              <button
                type="button"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-travel transition-all duration-300 hover:bg-forest hover:text-white"
                aria-label={`Open ${trip.title} menu`}
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              <h3 className="font-serif text-xl font-bold text-ink">
                {trip.title} <span className="font-sans">{trip.emoji}</span>
              </h3>
              <p className="mt-1 text-sm font-medium text-muted">
                {trip.dates}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-ink/75">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {trip.stops} Stops
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleDollarSign className="h-4 w-4" />
                  {trip.budget}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-linen">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${trip.planning}%`,
                      backgroundColor: trip.color
                    }}
                  />
                </div>
                <span className="whitespace-nowrap text-xs font-bold text-muted">
                  {trip.planning}% Planned
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
