import { motion } from "framer-motion";
import { Paperclip, Plane, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroImage } from "@/data/travel-dashboard";

export function HeroBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative min-h-[410px] overflow-hidden rounded-[2rem] bg-forest shadow-float md:min-h-[440px]"
      aria-labelledby="hero-title"
    >
      <img
        src={heroImage}
        alt="A traveler overlooking a mountain range at sunrise"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#F7E9D1]/95 via-[#E8C894]/50 to-[#1A251D]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#171D18]/55 via-transparent to-white/10" />
      <div className="absolute left-[48%] top-10 hidden text-ink/75 md:block">
        <svg
          width="214"
          height="124"
          viewBox="0 0 214 124"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13 102c28-8 36-26 48-45 13-21 35-33 56-22 12 6 16 18 9 27-8 10-27 8-29-5-3-19 34-34 104-28"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <motion.div
        animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[28%] top-16 hidden rotate-12 rounded-full bg-white/30 p-2 text-ink backdrop-blur-sm md:block"
        aria-hidden="true"
      >
        <Plane className="h-8 w-8" />
      </motion.div>
      <Paperclip
        className="absolute right-10 top-10 hidden h-7 w-7 rotate-[32deg] text-white/40 lg:block"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[410px] max-w-2xl flex-col justify-center px-8 py-10 md:min-h-[440px] md:px-14">
        <p className="mb-4 w-fit rounded-full bg-white/[0.45] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-forest backdrop-blur">
          Curated journeys
        </p>
        <h2
          id="hero-title"
          className="max-w-xl font-serif text-5xl font-extrabold leading-[0.98] text-ink md:text-6xl"
        >
          Your next adventure starts{" "}
          <span className="relative inline-block font-script text-6xl font-bold text-clay md:text-7xl">
            here
            <span className="absolute -bottom-1 left-1 h-1.5 w-full rounded-full bg-clay/40" />
          </span>
        </h2>
        <p className="mt-6 max-w-sm text-base font-medium leading-7 text-ink/85">
          Plan, organize and experience unforgettable journeys your way.
        </p>

        <form className="mt-9 max-w-[560px]" role="search">
          <div className="flex h-16 items-center gap-3 rounded-full bg-white/95 p-2 pl-6 shadow-[0_18px_40px_rgba(31,38,31,0.16)] backdrop-blur">
            <Search className="h-6 w-6 shrink-0 text-ink" aria-hidden="true" />
            <label className="sr-only" htmlFor="destination-search">
              Search destinations, cities or activities
            </label>
            <input
              id="destination-search"
              type="search"
              placeholder="Search destinations, cities or activities..."
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink outline-none placeholder:text-muted"
            />
            <Button
              type="submit"
              variant="clay"
              size="icon"
              className="h-12 w-12 shrink-0"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}
