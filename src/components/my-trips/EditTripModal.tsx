import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, Send, UserPlus } from "lucide-react";
import type { TripItem } from "@/data/my-trips";
import { cn } from "@/lib/utils";

type Props = { trip: TripItem; onClose: () => void };

const inputCls = "w-full rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-3 py-2.5 text-sm font-medium text-[#1F261F] outline-none focus:border-[#2F4F3E]/50 focus:ring-2 focus:ring-[#2F4F3E]/10 transition-all";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#7F7A70]";

const TABS = ["Dates", "Destinations", "Budget", "Travelers", "Activities"];

// Per-trip initial destinations
const tripDestinations: Record<string, { id: string; name: string; nights: string }[]> = {
  bali:        [{ id: "1", name: "Seminyak, Bali", nights: "2" }, { id: "2", name: "Ubud, Bali", nights: "3" }, { id: "3", name: "Uluwatu, Bali", nights: "2" }],
  japan:       [{ id: "1", name: "Tokyo, Japan", nights: "3" }, { id: "2", name: "Kyoto, Japan", nights: "3" }, { id: "3", name: "Osaka, Japan", nights: "2" }],
  greece:      [{ id: "1", name: "Athens, Greece", nights: "2" }, { id: "2", name: "Santorini, Greece", nights: "2" }, { id: "3", name: "Mykonos, Greece", nights: "2" }],
  switzerland: [{ id: "1", name: "Zurich, Switzerland", nights: "2" }, { id: "2", name: "Interlaken, Switzerland", nights: "3" }, { id: "3", name: "Geneva, Switzerland", nights: "2" }],
  dubai:       [{ id: "1", name: "Dubai, UAE", nights: "3" }],
};

const tripActivities: Record<string, { id: string; name: string; date: string; cost: string }[]> = {
  bali:        [{ id: "1", name: "Ubud Cooking Class", date: "2026-05-16", cost: "45" }, { id: "2", name: "Kecak Dance Show", date: "2026-05-17", cost: "20" }, { id: "3", name: "Mount Batur Trek", date: "2026-05-19", cost: "35" }],
  japan:       [{ id: "1", name: "Tsukiji Fish Market Tour", date: "2026-06-02", cost: "55" }, { id: "2", name: "Tea Ceremony Kyoto", date: "2026-06-05", cost: "40" }],
  greece:      [{ id: "1", name: "Acropolis Guided Tour", date: "2026-07-11", cost: "35" }, { id: "2", name: "Greek Cooking Class", date: "2026-07-13", cost: "50" }],
  switzerland: [{ id: "1", name: "Jungfraujoch Train", date: "2026-04-12", cost: "120" }, { id: "2", name: "Paragliding Interlaken", date: "2026-04-14", cost: "180" }],
  dubai:       [{ id: "1", name: "Desert Safari", date: "2026-03-07", cost: "85" }],
};

const tripDates: Record<string, { start: string; end: string }> = {
  bali:        { start: "2026-05-15", end: "2026-05-23" },
  japan:       { start: "2026-06-01", end: "2026-06-14" },
  greece:      { start: "2026-07-10", end: "2026-07-20" },
  switzerland: { start: "2026-04-10", end: "2026-04-18" },
  dubai:       { start: "2026-03-05", end: "2026-03-10" },
};

export function EditTripModal({ trip, onClose }: Props) {
  const [activeTab, setActiveTab] = useState("Dates");
  const dates = tripDates[trip.id] ?? { start: "2026-05-15", end: "2026-05-23" };

  const [form, setForm] = useState({
    title: trip.title,
    startDate: dates.start,
    endDate: dates.end,
    budget: trip.budgetValue.replace(/[^0-9]/g, ""),
    currency: "USD",
    notes: "",
  });

  const [destinations, setDestinations] = useState(
    tripDestinations[trip.id] ?? tripDestinations.bali
  );

  const [travelers, setTravelers] = useState([
    { id: "1", name: "Aarav Sharma", role: "Organizer", avatar: trip.avatars[0] ?? "" },
    { id: "2", name: "Priya Mehta",  role: "Traveler",  avatar: trip.avatars[1] ?? "" },
    { id: "3", name: "Rohan Das",    role: "Traveler",  avatar: trip.avatars[2] ?? "" },
  ]);

  const [activities, setActivities] = useState(
    tripActivities[trip.id] ?? tripActivities.bali
  );

  // Invite traveler state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSent, setInviteSent] = useState(false);

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setInviteEmail("");
    }, 2500);
  }

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
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-[#F7F4EE] shadow-[-20px_0_60px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#E8DED1] bg-white px-5 py-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1F261F]">Edit Trip</h2>
            <p className="text-xs font-medium text-[#7F7A70]">{trip.title} {trip.emoji}</p>
          </div>
          <button type="button" onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0EDE8] text-[#7F7A70] hover:bg-[#E8DED1]"
            aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-[#E8DED1] bg-white px-4 py-2 scrollbar-hide">
          {TABS.map((t) => (
            <button key={t} type="button" onClick={() => setActiveTab(t)}
              className={cn("shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
                activeTab === t ? "bg-[#2F4F3E] text-white" : "text-[#7F7A70] hover:bg-[#F0EDE8] hover:text-[#1F261F]"
              )}>
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

          {activeTab === "Dates" && (
            <>
              <div>
                <label className={labelCls}>Trip Name</label>
                <input className={inputCls} value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Start Date</label>
                  <input type="date" className={inputCls} value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>End Date</label>
                  <input type="date" className={inputCls} value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Notes</label>
                <textarea rows={3} className={cn(inputCls, "resize-none")} value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any trip notes..." />
              </div>
            </>
          )}

          {activeTab === "Destinations" && (
            <div className="space-y-3">
              {destinations.map((d, i) => (
                <div key={d.id} className="flex items-center gap-3 rounded-2xl border border-[#E8DED1] bg-white p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2F4F3E] text-xs font-bold text-white">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      className="w-full bg-transparent text-sm font-semibold text-[#1F261F] outline-none"
                      value={d.name}
                      onChange={(e) => setDestinations(destinations.map((x) => x.id === d.id ? { ...x, name: e.target.value } : x))}
                    />
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs text-[#7F7A70]">Nights:</span>
                      <input
                        className="w-10 bg-transparent text-xs font-semibold text-[#7F7A70] outline-none"
                        value={d.nights}
                        onChange={(e) => setDestinations(destinations.map((x) => x.id === d.id ? { ...x, nights: e.target.value } : x))}
                      />
                    </div>
                  </div>
                  <button type="button"
                    onClick={() => setDestinations(destinations.filter((x) => x.id !== d.id))}
                    className="text-[#E87565] hover:text-[#D4604F]">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button type="button"
                onClick={() => setDestinations([...destinations, { id: Date.now().toString(), name: "", nights: "1" }])}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#D0C9BE] py-3 text-sm font-semibold text-[#7F7A70] hover:border-[#2F4F3E] hover:text-[#2F4F3E] transition-colors">
                <Plus className="h-4 w-4" /> Add Destination
              </button>
            </div>
          )}

          {activeTab === "Budget" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Total Budget</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#7F7A70]">$</span>
                    <input className={cn(inputCls, "pl-7")} value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Currency</label>
                  <select
                    className={inputCls}
                    value={form.currency}
                    onChange={(e) => setForm((prev) => ({ ...prev, currency: e.target.value }))}
                  >
                    <option value="USD">USD – US Dollar</option>
                    <option value="EUR">EUR – Euro</option>
                    <option value="GBP">GBP – British Pound</option>
                    <option value="INR">INR – Indian Rupee</option>
                    <option value="AUD">AUD – Australian Dollar</option>
                    <option value="JPY">JPY – Japanese Yen</option>
                    <option value="IDR">IDR – Indonesian Rupiah</option>
                  </select>
                </div>
              </div>
              <div className="rounded-2xl border border-[#E8DED1] bg-white p-4">
                <p className="text-sm font-semibold text-[#1F261F] mb-3">Budget Allocation</p>
                {[
                  { label: "Flights", pct: 28 },
                  { label: "Hotels", pct: 35 },
                  { label: "Activities", pct: 17 },
                  { label: "Food", pct: 14 },
                  { label: "Transport", pct: 6 },
                ].map((b) => (
                  <div key={b.label} className="mb-3 last:mb-0">
                    <div className="flex justify-between text-xs font-medium text-[#7F7A70] mb-1">
                      <span>{b.label}</span>
                      <span>{b.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#F0EDE8]">
                      <div className="h-full rounded-full bg-[#2F4F3E]" style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Travelers" && (
            <div className="space-y-3">
              {/* Current travelers */}
              {travelers.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-[#E8DED1] bg-white p-3">
                  {t.avatar
                    ? <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover shrink-0" />
                    : <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF4EE] text-sm font-bold text-[#2F4F3E]">{t.name[0]}</div>
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1F261F]">{t.name}</p>
                    <select
                      className="mt-0.5 bg-transparent text-xs font-medium text-[#7F7A70] outline-none cursor-pointer"
                      value={t.role}
                      onChange={(e) => setTravelers(travelers.map((x) => x.id === t.id ? { ...x, role: e.target.value } : x))}
                    >
                      <option value="Organizer">Organizer</option>
                      <option value="Traveler">Traveler</option>
                      <option value="Guest">Guest</option>
                    </select>
                  </div>
                  {t.role !== "Organizer" && (
                    <button type="button"
                      onClick={() => setTravelers(travelers.filter((x) => x.id !== t.id))}
                      className="text-[#E87565] hover:text-[#D4604F] shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}

              {/* Invite form */}
              <div className="rounded-2xl border border-[#E8DED1] bg-white p-4">
                <div className="flex items-center gap-2 mb-3">
                  <UserPlus className="h-4 w-4 text-[#2F4F3E]" strokeWidth={1.8} />
                  <p className="text-sm font-semibold text-[#1F261F]">Invite Traveler</p>
                </div>
                {inviteSent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-[#EAF4EE] px-4 py-3 text-sm font-semibold text-[#2F4F3E]"
                  >
                    ✓ Invite sent to {inviteEmail}
                  </motion.div>
                ) : (
                  <form onSubmit={handleInvite} className="flex gap-2">
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Enter email address..."
                      className={cn(inputCls, "flex-1")}
                      required
                    />
                    <button
                      type="submit"
                      className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#2F4F3E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3C6B52] transition-colors"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Send
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeTab === "Activities" && (
            <div className="space-y-3">
              {activities.map((a) => (
                <div key={a.id} className="rounded-2xl border border-[#E8DED1] bg-white p-3 space-y-2">
                  <input
                    className={cn(inputCls, "font-semibold")}
                    value={a.name}
                    placeholder="Activity name"
                    onChange={(e) => setActivities(activities.map((x) => x.id === a.id ? { ...x, name: e.target.value } : x))}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={labelCls}>Date</label>
                      <input type="date" className={inputCls} value={a.date}
                        onChange={(e) => setActivities(activities.map((x) => x.id === a.id ? { ...x, date: e.target.value } : x))} />
                    </div>
                    <div>
                      <label className={labelCls}>Cost (USD)</label>
                      <input className={inputCls} value={a.cost} placeholder="0"
                        onChange={(e) => setActivities(activities.map((x) => x.id === a.id ? { ...x, cost: e.target.value } : x))} />
                    </div>
                  </div>
                  <button type="button"
                    onClick={() => setActivities(activities.filter((x) => x.id !== a.id))}
                    className="flex items-center gap-1 text-xs font-medium text-[#E87565] hover:text-[#D4604F]">
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ))}
              <button type="button"
                onClick={() => setActivities([...activities, { id: Date.now().toString(), name: "", date: "", cost: "" }])}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#D0C9BE] py-3 text-sm font-semibold text-[#7F7A70] hover:border-[#2F4F3E] hover:text-[#2F4F3E] transition-colors">
                <Plus className="h-4 w-4" /> Add Activity
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 flex gap-3 border-t border-[#E8DED1] bg-white px-5 py-4">
          <button type="button" onClick={onClose}
            className="flex-1 rounded-xl border border-[#E8DED1] py-2.5 text-sm font-semibold text-[#7F7A70] hover:bg-[#F0EDE8]">
            Cancel
          </button>
          <button type="button" onClick={onClose}
            className="flex-1 rounded-xl bg-[#2F4F3E] py-2.5 text-sm font-semibold text-white hover:bg-[#3C6B52]">
            Save Changes
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
