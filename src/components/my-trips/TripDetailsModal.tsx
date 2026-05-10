import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, MapPin, Calendar, Plane, Star, Clock,
  NotebookPen, Map, Compass, Route
} from "lucide-react";
import type { TripItem } from "@/data/my-trips";
import { tripDetailData } from "@/data/trip-details";
import { routeHashes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type Props = { trip: TripItem; onClose: () => void };

const fallbackData = tripDetailData.bali;
const TABS = ["Itinerary", "Hotels", "Flights", "Activities", "Notes", "Budget", "Map"];

export function TripDetailsModal({ trip, onClose }: Props) {
  const [activeTab, setActiveTab] = React.useState("Itinerary");
  const data = tripDetailData[trip.id] ?? fallbackData;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        key="panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col bg-[#F7F4EE] shadow-[-20px_0_60px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero */}
        <div className="relative h-52 shrink-0 overflow-hidden">
          <img src={trip.image} alt={trip.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-white">
                {trip.title} {trip.emoji}
              </h2>
              <div className="mt-1 flex items-center gap-3 text-sm font-medium text-white/80">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{trip.dates}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{trip.stops} Stops</span>
              </div>
            </div>
            {/* Build Itinerary CTA */}
            <a
              href={routeHashes["itinerary-builder"]}
              onClick={onClose}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-[#2F4F3E] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:bg-[#3C6B52] transition-colors"
            >
              <Route className="h-4 w-4" />
              Build Itinerary
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-[#E8DED1] bg-white px-4 py-2 scrollbar-hide">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTab(t)}
              className={cn(
                "shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
                activeTab === t
                  ? "bg-[#2F4F3E] text-white"
                  : "text-[#7F7A70] hover:bg-[#F0EDE8] hover:text-[#1F261F]"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">

          {activeTab === "Itinerary" && (
            <div className="space-y-0">
              {data.itinerary.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2F4F3E] text-xs font-bold text-white">
                      {i + 1}
                    </div>
                    {i < data.itinerary.length - 1 && <div className="mt-1 w-px flex-1 bg-[#E8DED1] min-h-[28px]" />}
                  </div>
                  <div className="pb-5">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#7F7A70]">{item.day}</p>
                    <p className="mt-0.5 font-serif text-lg font-bold text-[#1F261F]">{item.title}</p>
                    <p className="mt-1 text-sm font-medium text-[#7F7A70]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Hotels" && (
            <div className="space-y-3">
              {data.hotels.map((h, i) => (
                <div key={i} className="rounded-2xl border border-[#E8DED1] bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[#1F261F]">{h.name}</p>
                      <div className="mt-1 flex items-center gap-0.5">
                        {Array.from({ length: h.stars }).map((_, s) => (
                          <Star key={s} className="h-3 w-3 fill-[#F3A33A] text-[#F3A33A]" />
                        ))}
                      </div>
                    </div>
                    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold",
                      h.status === "Confirmed" ? "bg-[#EAF4EE] text-[#2F4F3E]" : "bg-[#FEF6EE] text-[#C46A2D]"
                    )}>
                      {h.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-[#7F7A70]">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{h.nights}</span>
                    <span className="font-bold text-[#1F261F]">{h.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Flights" && (
            <div className="space-y-3">
              {data.flights.map((f, i) => (
                <div key={i} className="rounded-2xl border border-[#E8DED1] bg-white p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#7F7A70]">{f.airline}</span>
                    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold",
                      f.status === "Confirmed" ? "bg-[#EAF4EE] text-[#2F4F3E]" : "bg-[#FEF6EE] text-[#C46A2D]"
                    )}>{f.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center min-w-[60px]">
                      <p className="font-bold text-[#1F261F] text-sm">{f.from.split(" ")[0]}</p>
                      <p className="text-xs text-[#7F7A70]">{f.time.split("→")[0].trim()}</p>
                    </div>
                    <div className="flex flex-1 items-center gap-1">
                      <div className="h-px flex-1 border-t border-dashed border-[#D0C9BE]" />
                      <Plane className="h-4 w-4 text-[#2F4F3E]" />
                      <div className="h-px flex-1 border-t border-dashed border-[#D0C9BE]" />
                    </div>
                    <div className="text-center min-w-[60px]">
                      <p className="font-bold text-[#1F261F] text-sm">{f.to.split(" ")[0]}</p>
                      <p className="text-xs text-[#7F7A70]">{f.time.split("→")[1].trim()}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-xs text-[#7F7A70]">{f.date}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Activities" && (
            <div className="space-y-2.5">
              {data.activities.map((a, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-[#E8DED1] bg-white px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl",
                      a.booked ? "bg-[#EAF4EE]" : "bg-[#F0EDE8]"
                    )}>
                      <Compass className={cn("h-4 w-4", a.booked ? "text-[#2F4F3E]" : "text-[#7F7A70]")} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1F261F]">{a.name}</p>
                      <p className="text-xs text-[#7F7A70]">{a.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#1F261F]">{a.price}</span>
                    <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold",
                      a.booked ? "bg-[#EAF4EE] text-[#2F4F3E]" : "bg-[#F0EDE8] text-[#7F7A70]"
                    )}>
                      {a.booked ? "Booked" : "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Notes" && (
            <div className="space-y-3">
              {data.notes.map((note, i) => (
                <div key={i} className="flex gap-3 rounded-2xl border border-[#E8DED1] bg-white px-4 py-3">
                  <NotebookPen className="mt-0.5 h-4 w-4 shrink-0 text-[#2F4F3E]" strokeWidth={1.8} />
                  <p className="text-sm font-medium text-[#1F261F]">{note}</p>
                </div>
              ))}
              <button type="button" className="w-full rounded-2xl border-2 border-dashed border-[#D0C9BE] py-3 text-sm font-semibold text-[#7F7A70] hover:border-[#2F4F3E] hover:text-[#2F4F3E] transition-colors">
                + Add Note
              </button>
            </div>
          )}

          {activeTab === "Budget" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white border border-[#E8DED1] p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#7F7A70]">Total Budget</p>
                  <p className="mt-1 font-serif text-2xl font-bold text-[#1F261F]">{trip.budgetValue}</p>
                </div>
                <div className="rounded-2xl bg-[#EAF4EE] border border-[#C8E0D0] p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#2F4F3E]">Remaining</p>
                  <p className="mt-1 font-serif text-2xl font-bold text-[#2F4F3E]">{data.remaining}</p>
                </div>
              </div>
              {data.budget.map((b) => {
                const pct = Math.round((b.spent / b.total) * 100);
                return (
                  <div key={b.label}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-semibold text-[#1F261F]">{b.label}</span>
                      <span className="text-[#7F7A70]">${b.spent} / ${b.total}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#F0EDE8]">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: b.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "Map" && (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#E8DED1] bg-white p-6 text-center">
              <Map className="h-12 w-12 text-[#2F4F3E]/30" strokeWidth={1} />
              <p className="font-serif text-lg font-bold text-[#1F261F]">{trip.title} Map</p>
              <p className="text-sm text-[#7F7A70]">All stops, hotels and activities for {trip.title} pinned on the map.</p>
              <div className="mt-2 h-52 w-full overflow-hidden rounded-xl bg-[#E8DED1]">
                <img
                  src={trip.image}
                  alt={`${trip.title} map`}
                  className="h-full w-full object-cover opacity-50"
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
