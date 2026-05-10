import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { overviewStats } from "@/data/my-trips";
import { TravelArtwork } from "@/components/TravelArtwork";

export function OverviewCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-[#E4DBCF] bg-[#F8F4EC] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] lg:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <h3 className="font-serif text-3xl font-bold text-[#1F261F]">Your Travel Overview</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {overviewStats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-2xl border border-[#E5DDD1] bg-[#FBF8F2] px-3 py-4 text-center"
              >
                <p className="text-xs font-semibold text-[#7A7367]">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-[#22241F]">{stat.value}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-[#E5DDD1] bg-[#F3ECE0] p-5">
          <Quote className="h-7 w-7 text-[#2F4F3E]" />
          <p className="mt-3 text-xl font-medium leading-9 text-[#2B322A]">
            The world is wide, and your stories are just getting started.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#6D665A]">Keep exploring!</p>
          <div className="mt-4 h-24">
            <TravelArtwork />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

