import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { destinations } from "@/data/travel-dashboard";

export function DiscoverInspiration() {
  return (
    <section aria-labelledby="discover-title">
      <SectionHeader
        id="discover-title"
        title="Discover Inspiration"
        action="Explore all"
      />
      <div className="grid grid-flow-col auto-cols-[78%] gap-5 overflow-x-auto pb-2 sm:auto-cols-[46%] lg:grid-flow-row lg:grid-cols-5 lg:overflow-visible lg:pb-0">
        {destinations.map((destination, index) => (
          <a key={destination.country} href={`#/explore?destination=${destination.country}`}>
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="group relative h-36 overflow-hidden rounded-3xl shadow-travel cursor-pointer"
            >
              <img
                src={destination.image}
                alt={`${destination.country} travel inspiration`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-white/5" />
              <button
                type="button"
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/45 bg-white/10 text-white backdrop-blur transition-all duration-300 hover:bg-white hover:text-forest"
                aria-label={`View ${destination.country}`}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-serif text-xl font-bold leading-none">
                  {destination.country}
                </h3>
                <p className="mt-2 text-sm font-bold">
                  From {destination.price}
                </p>
              </div>
            </motion.article>
          </a>
        ))}
      </div>
    </section>
  );
}
