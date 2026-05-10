import { motion } from "framer-motion";
import { currentTrip } from "@/data/itinerary-builder";

export function TripSummaryCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-[#E8DED1] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:p-6"
    >
      <div className="grid gap-6 lg:grid-cols-[260px_1fr_260px] lg:items-center">
        <img
          src={currentTrip.image}
          alt={currentTrip.title}
          className="h-40 w-full rounded-2xl object-cover lg:h-36"
        />

        <div>
          <h3 className="font-serif text-3xl font-bold text-[#1F261F]">
            {currentTrip.title} <span className="font-sans text-2xl">{currentTrip.emoji}</span>
          </h3>
          <p className="mt-2 text-sm font-semibold text-[#6B6458]">
            {currentTrip.dates} <span className="mx-2">•</span> {currentTrip.stops}
          </p>
          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[#36342E]">
            {currentTrip.description}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm font-semibold text-[#3E3A32]">
            <span>{currentTrip.progress}% Completed</span>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#E8DED1]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentTrip.progress}%` }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-full rounded-full bg-[#2F4F3E]"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

