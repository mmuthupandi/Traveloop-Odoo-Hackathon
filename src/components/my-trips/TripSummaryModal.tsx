import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, WalletCards, CheckSquare, TrendingUp,
  Plane, Users, AlertCircle, CheckCircle2
} from "lucide-react";
import type { TripItem } from "@/data/my-trips";
import { cn } from "@/lib/utils";

type Props = { trip: TripItem; onClose: () => void };

const timeline = [
  { date: "15 May", event: "Departure from New Delhi", done: true },
  { date: "15 May", event: "Arrive Bali, check-in Seminyak", done: true },
  { date: "16 May", event: "Ubud Day Tour", done: false },
  { date: "17 May", event: "Temple Trail & Kecak Dance", done: false },
  { date: "18 May", event: "Water Sports & Spa", done: false },
  { date: "19 May", event: "Mount Batur Sunrise Trek", done: false },
  { date: "23 May", event: "Departure back to New Delhi", done: false },
];

const bookings = [
  { label: "Outbound Flight", status: "confirmed", detail: "IndiGo · 15 May 06:30" },
  { label: "Return Flight", status: "confirmed", detail: "IndiGo · 23 May 16:00" },
  { label: "Hotel Seminyak", status: "confirmed", detail: "The Layar · 2 nights" },
  { label: "Hotel Ubud", status: "confirmed", detail: "Komaneka · 3 nights" },
  { label: "Surfing Lesson", status: "pending", detail: "Kuta Beach · 18 May" },
  { label: "Spa Session", status: "pending", detail: "Ubud Wellness · 18 May" },
];

const checklist = [
  { label: "Passport valid 6+ months", done: true },
  { label: "Travel insurance purchased", done: true },
  { label: "Visa obtained", done: true },
  { label: "Foreign currency exchanged", done: false },
  { label: "Packing list completed", done: false },
  { label: "Emergency contacts saved", done: true },
  { label: "Hotel confirmations printed", done: false },
];

const expenses = [
  { desc: "Flight Booking", category: "Transport", amount: -360, date: "02 Apr" },
  { desc: "Hotel Deposit", category: "Accommodation", amount: -400, date: "05 Apr" },
  { desc: "Travel Insurance", category: "Insurance", amount: -85, date: "10 Apr" },
  { desc: "Ubud Tour Booking", category: "Activities", amount: -45, date: "15 Apr" },
];

const readinessItems = [
  { label: "Bookings", pct: 80, color: "#3C8B68" },
  { label: "Documents", pct: 100, color: "#3F7EA7" },
  { label: "Packing", pct: 33, color: "#C46A2D" },
  { label: "Budget", pct: 60, color: "#9B6BB5" },
];

const tabs = ["Summary", "Bookings", "Timeline", "Readiness", "Expenses", "Checklist"];

export function TripSummaryModal({ trip, onClose }: Props) {
  const [activeTab, setActiveTab] = React.useState("Summary");
  const checkedCount = checklist.filter((c) => c.done).length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const overallReadiness = Math.round(readinessItems.reduce((s, r) => s + r.pct, 0) / readinessItems.length);

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
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-[#F7F4EE] shadow-[−20px_0_60px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#E8DED1] bg-white px-5 py-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1F261F]">Trip Summary</h2>
            <p className="text-xs font-medium text-[#7F7A70]">{trip.title} {trip.emoji} · {trip.dates}</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0EDE8] text-[#7F7A70] hover:bg-[#E8DED1]" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-[#E8DED1] bg-white px-4 py-2 scrollbar-hide">
          {tabs.map((t) => (
            <button key={t} type="button" onClick={() => setActiveTab(t)}
              className={cn("shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
                activeTab === t ? "bg-[#2F4F3E] text-white" : "text-[#7F7A70] hover:bg-[#F0EDE8] hover:text-[#1F261F]"
              )}>
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">

          {activeTab === "Summary" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: WalletCards, label: "Budget", value: trip.budgetValue, sub: "$890 spent", color: "#3C8B68", bg: "#EAF4EE" },
                  { icon: CheckSquare, label: "Checklist", value: `${checkedCount}/${checklist.length}`, sub: "items complete", color: "#3F7EA7", bg: "#E6F1F8" },
                  { icon: Plane, label: "Bookings", value: `${confirmedCount}/${bookings.length}`, sub: "confirmed", color: "#C46A2D", bg: "#F8EDE0" },
                  { icon: TrendingUp, label: "Readiness", value: `${overallReadiness}%`, sub: "trip ready", color: "#9B6BB5", bg: "#F3EDF8" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-[#E8DED1] bg-white p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: s.bg }}>
                      <s.icon className="h-4.5 w-4.5" style={{ color: s.color }} strokeWidth={1.8} />
                    </div>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#7F7A70]">{s.label}</p>
                    <p className="font-serif text-2xl font-bold text-[#1F261F]">{s.value}</p>
                    <p className="text-xs text-[#7F7A70]">{s.sub}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Bookings" && (
            <div className="space-y-2.5">
              {bookings.map((b, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-[#E8DED1] bg-white px-4 py-3">
                  <div className="flex items-center gap-3">
                    {b.status === "confirmed"
                      ? <CheckCircle2 className="h-5 w-5 text-[#3C8B68]" strokeWidth={1.8} />
                      : <AlertCircle className="h-5 w-5 text-[#C46A2D]" strokeWidth={1.8} />
                    }
                    <div>
                      <p className="text-sm font-semibold text-[#1F261F]">{b.label}</p>
                      <p className="text-xs text-[#7F7A70]">{b.detail}</p>
                    </div>
                  </div>
                  <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold",
                    b.status === "confirmed" ? "bg-[#EAF4EE] text-[#2F4F3E]" : "bg-[#FEF6EE] text-[#C46A2D]"
                  )}>
                    {b.status === "confirmed" ? "Confirmed" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Timeline" && (
            <div className="space-y-0">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      t.done ? "bg-[#2F4F3E] text-white" : "border-2 border-[#D0C9BE] bg-white text-[#7F7A70]"
                    )}>
                      {t.done ? "✓" : i + 1}
                    </div>
                    {i < timeline.length - 1 && <div className="mt-1 w-px flex-1 bg-[#E8DED1] min-h-[24px]" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#7F7A70]">{t.date}</p>
                    <p className={cn("mt-0.5 text-sm font-semibold", t.done ? "text-[#2F4F3E]" : "text-[#1F261F]")}>{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Readiness" && (
            <div className="space-y-4">
              <div className="flex flex-col items-center rounded-2xl border border-[#E8DED1] bg-white py-6">
                <p className="font-serif text-5xl font-bold text-[#2F4F3E]">{overallReadiness}%</p>
                <p className="mt-1 text-sm font-medium text-[#7F7A70]">Overall Trip Readiness</p>
                <div className="mt-4 h-2.5 w-48 overflow-hidden rounded-full bg-[#F0EDE8]">
                  <div className="h-full rounded-full bg-[#2F4F3E] transition-all duration-700" style={{ width: `${overallReadiness}%` }} />
                </div>
              </div>
              {readinessItems.map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-sm font-medium mb-1.5">
                    <span className="text-[#1F261F]">{r.label}</span>
                    <span style={{ color: r.color }}>{r.pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#F0EDE8]">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Expenses" && (
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="rounded-2xl bg-white border border-[#E8DED1] p-3 text-center">
                  <p className="text-xs text-[#7F7A70]">Total Spent</p>
                  <p className="font-serif text-xl font-bold text-[#1F261F]">$890</p>
                </div>
                <div className="rounded-2xl bg-[#EAF4EE] border border-[#C8E0D0] p-3 text-center">
                  <p className="text-xs text-[#2F4F3E]">Remaining</p>
                  <p className="font-serif text-xl font-bold text-[#2F4F3E]">$560</p>
                </div>
              </div>
              {expenses.map((e, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-[#E8DED1] bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#1F261F]">{e.desc}</p>
                    <p className="text-xs text-[#7F7A70]">{e.category} · {e.date}</p>
                  </div>
                  <span className="text-sm font-bold text-[#E87565]">${Math.abs(e.amount)}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Checklist" && (
            <div className="space-y-2.5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#1F261F]">{checkedCount} of {checklist.length} complete</p>
                <div className="h-2 w-32 overflow-hidden rounded-full bg-[#F0EDE8]">
                  <div className="h-full rounded-full bg-[#2F4F3E]" style={{ width: `${(checkedCount / checklist.length) * 100}%` }} />
                </div>
              </div>
              {checklist.map((c, i) => (
                <div key={i} className={cn("flex items-center gap-3 rounded-2xl border px-4 py-3",
                  c.done ? "border-[#C8E0D0] bg-[#EAF4EE]" : "border-[#E8DED1] bg-white"
                )}>
                  <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
                    c.done ? "bg-[#2F4F3E]" : "border-2 border-[#D0C9BE]"
                  )}>
                    {c.done && <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="2,6 5,9 10,3" /></svg>}
                  </div>
                  <p className={cn("text-sm font-medium", c.done ? "text-[#2F4F3E] line-through" : "text-[#1F261F]")}>{c.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
