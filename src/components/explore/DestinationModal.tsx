import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Star, MapPin, Clock, Globe, DollarSign, Languages,
  ChevronLeft, ChevronRight, Lightbulb, Route, Heart
} from "lucide-react";
import type { ExploreDestination } from "@/data/explore";
import { destinationDetails } from "@/data/destination-details";
import { routeHashes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type Props = {
  destination: ExploreDestination;
  onClose: () => void;
};

export function DestinationModal({ destination, onClose }: Props) {
  const detail = destinationDetails[destination.id];
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);

  const images = detail?.images ?? [destination.image];
  const prev = () => setActiveImg((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveImg((i) => (i + 1) % images.length);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Centering wrapper — accounts for sidebar on xl */}
      <div className="fixed inset-0 z-50 flex items-center justify-center xl:pl-[282px]">
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative mx-4 flex h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-[#F7F4EE] shadow-[0_24px_80px_rgba(0,0,0,0.25)]"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Image carousel */}
        <div className="relative h-64 shrink-0 overflow-hidden sm:h-72">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImg}
              src={images[activeImg]}
              alt={destination.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Close */}
          <button type="button" onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
            aria-label="Close">
            <X className="h-4 w-4" />
          </button>

          {/* Save */}
          <button type="button" onClick={() => setSaved((v) => !v)}
            className="absolute right-14 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
            aria-label="Save destination">
            <Heart className="h-4 w-4" fill={saved ? "#E87565" : "none"} stroke={saved ? "#E87565" : "white"} strokeWidth={2} />
          </button>

          {/* Carousel controls */}
          {images.length > 1 && (
            <>
              <button type="button" onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60">
                <ChevronRight className="h-4 w-4" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, i) => (
                  <button key={i} type="button" onClick={() => setActiveImg(i)}
                    className={cn("h-1.5 rounded-full transition-all duration-200",
                      i === activeImg ? "w-5 bg-white" : "w-1.5 bg-white/50")} />
                ))}
              </div>
            </>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-4 left-5">
            <h2 className="font-serif text-3xl font-bold text-white">
              {destination.name}, {destination.country} {destination.emoji}
            </h2>
            {detail && (
              <p className="mt-0.5 text-sm font-medium text-white/80 italic">{detail.tagline}</p>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-5 space-y-6">

            {/* Rating + price row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-[#F3A33A] text-[#F3A33A]" />
                  <span className="font-bold text-[#1F261F]">{destination.rating}</span>
                  <span className="text-sm text-[#7F7A70]">({destination.reviews})</span>
                </div>
                <span className="rounded-full bg-[#EAF4EE] px-2.5 py-0.5 text-xs font-semibold text-[#2F4F3E]">
                  {destination.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#7F7A70]">From</p>
                <p className="font-serif text-2xl font-bold text-[#1F261F]">{destination.price}</p>
              </div>
            </div>

            {/* Description */}
            {detail && (
              <p className="text-sm font-medium leading-relaxed text-[#3A3530]">{detail.description}</p>
            )}

            {/* Quick info grid */}
            {detail && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Clock, label: "Best Time", value: detail.bestTime },
                  { icon: Languages, label: "Language", value: detail.language },
                  { icon: DollarSign, label: "Currency", value: detail.currency },
                  { icon: Globe, label: "Timezone", value: detail.timezone },
                ].map((info) => (
                  <div key={info.label} className="rounded-2xl border border-[#E8DED1] bg-white p-3">
                    <info.icon className="h-4 w-4 text-[#2F4F3E]" strokeWidth={1.8} />
                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#7F7A70]">{info.label}</p>
                    <p className="mt-0.5 text-xs font-semibold text-[#1F261F] leading-tight">{info.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            {detail && (
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F261F] mb-3">Highlights</h3>
                <div className="grid grid-cols-2 gap-3">
                  {detail.highlights.map((h) => (
                    <div key={h.title} className="flex items-start gap-3 rounded-2xl border border-[#E8DED1] bg-white p-3">
                      <span className="text-xl shrink-0">{h.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-[#1F261F]">{h.title}</p>
                        <p className="text-xs font-medium text-[#7F7A70] leading-relaxed">{h.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Must See */}
            {detail && (
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F261F] mb-3">Must See</h3>
                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                  {detail.mustSee.map((place) => (
                    <div key={place.name} className="shrink-0 w-40 overflow-hidden rounded-2xl border border-[#E8DED1] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                      <img src={place.image} alt={place.name} className="h-24 w-full object-cover" />
                      <div className="p-2.5">
                        <p className="text-xs font-bold text-[#1F261F] leading-tight">{place.name}</p>
                        <span className="mt-1 inline-block rounded-full bg-[#EAF4EE] px-2 py-0.5 text-[9px] font-semibold text-[#2F4F3E]">
                          {place.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Tips */}
            {detail && (
              <div className="rounded-2xl border border-[#E8DED1] bg-[#EAF4EE] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-[#2F4F3E]" strokeWidth={1.8} />
                  <h3 className="text-sm font-bold text-[#1F261F]">Travel Tips</h3>
                </div>
                <ul className="space-y-2">
                  {detail.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-medium text-[#3A3530]">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F4F3E]" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

        {/* Footer CTA */}
        <div className="shrink-0 flex gap-3 border-t border-[#E8DED1] bg-white px-5 py-4">
          <button type="button" onClick={onClose}
            className="flex-1 rounded-xl border border-[#E8DED1] py-3 text-sm font-semibold text-[#7F7A70] hover:bg-[#F0EDE8] transition-colors">
            Close
          </button>
          <a href={routeHashes["itinerary-builder"]} onClick={onClose}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2F4F3E] py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(47,79,62,0.25)] hover:bg-[#3C6B52] transition-colors">
            <Route className="h-4 w-4" />
            Plan This Trip
          </a>
        </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
