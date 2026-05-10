import { useState } from "react";
import { ChevronRight, Eye, EyeOff, Lock, Monitor, Shield, X, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { securityRows } from "@/data/settings";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const rowIcons: Record<string, LucideIcon> = {
  password: Lock,
  "2fa": Shield,
  "login-activity": Monitor,
  privacy: Eye,
};

// ── Password change panel ──────────────────────────────────────────────────
function PasswordPanel({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.current) { setError("Enter your current password."); return; }
    if (form.next.length < 8) { setError("New password must be at least 8 characters."); return; }
    if (form.next !== form.confirm) { setError("Passwords don't match."); return; }
    setError("");
    setSaved(true);
    setTimeout(onClose, 1200);
  }

  const inputCls = "flex-1 rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-3 py-2.5 text-sm font-medium text-[#1F261F] outline-none focus:border-[#2F4F3E]/50 focus:ring-2 focus:ring-[#2F4F3E]/10 transition-all";

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
      <form onSubmit={handleSave} className="mt-3 space-y-3 rounded-2xl border border-[#E8DED1] bg-[#F7F4EE] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[#7F7A70]">Change Password</p>
        {(["current", "next", "confirm"] as const).map((key) => (
          <div key={key} className="flex items-center gap-2">
            <input type={show[key] ? "text" : "password"} placeholder={key === "current" ? "Current password" : key === "next" ? "New password (min 8 chars)" : "Confirm new password"}
              value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className={inputCls} />
            <button type="button" onClick={() => setShow((s) => ({ ...s, [key]: !s[key] }))}
              className="shrink-0 text-[#7F7A70] hover:text-[#1F261F]">
              {show[key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        ))}
        {error && <p className="text-xs font-medium text-[#E87565]">{error}</p>}
        {saved && <p className="text-xs font-semibold text-[#3C8B68]">✓ Password updated!</p>}
        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onClose}
            className="flex-1 rounded-xl border border-[#E8DED1] py-2 text-sm font-semibold text-[#7F7A70] hover:bg-[#F0EDE8]">Cancel</button>
          <button type="submit"
            className="flex-1 rounded-xl bg-[#2F4F3E] py-2 text-sm font-semibold text-white hover:bg-[#3C6B52]">Save</button>
        </div>
      </form>
    </motion.div>
  );
}

// ── 2FA panel ─────────────────────────────────────────────────────────────
function TwoFAPanel({ enabled, onToggle, onClose }: { enabled: boolean; onToggle: () => void; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
      <div className="mt-3 rounded-2xl border border-[#E8DED1] bg-[#F7F4EE] p-4 space-y-3">
        <p className="text-xs font-bold uppercase tracking-wide text-[#7F7A70]">Two-Factor Authentication</p>
        <p className="text-sm text-[#3A3530]">
          {enabled ? "2FA is currently enabled. Your account is protected with an extra layer of security." : "Enable 2FA to add an extra layer of security to your account."}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => { onToggle(); onClose(); }}
            className={cn("flex-1 rounded-xl py-2 text-sm font-semibold transition-colors",
              enabled ? "border border-[#E8DED1] text-[#E87565] hover:bg-[#FDECEA]" : "bg-[#2F4F3E] text-white hover:bg-[#3C6B52]")}>
            {enabled ? "Disable 2FA" : "Enable 2FA"}
          </button>
          <button type="button" onClick={onClose}
            className="flex-1 rounded-xl border border-[#E8DED1] py-2 text-sm font-semibold text-[#7F7A70] hover:bg-[#F0EDE8]">Cancel</button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Login activity panel ───────────────────────────────────────────────────
const devices = [
  { name: "MacBook Pro – Chrome", location: "New Delhi, India", time: "Active now", current: true },
  { name: "iPhone 15 – Safari", location: "New Delhi, India", time: "2 hours ago", current: false },
  { name: "Windows PC – Edge", location: "Mumbai, India", time: "3 days ago", current: false },
];

function LoginActivityPanel({ onClose }: { onClose: () => void }) {
  const [sessions, setSessions] = useState(devices);
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
      <div className="mt-3 rounded-2xl border border-[#E8DED1] bg-[#F7F4EE] p-4 space-y-3">
        <p className="text-xs font-bold uppercase tracking-wide text-[#7F7A70]">Active Sessions</p>
        {sessions.map((s, i) => (
          <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 border border-[#E8DED1]">
            <div>
              <p className="text-sm font-semibold text-[#1F261F]">{s.name}</p>
              <p className="text-xs text-[#7F7A70]">{s.location} · {s.time}</p>
            </div>
            {s.current
              ? <span className="rounded-full bg-[#EAF4EE] px-2 py-0.5 text-[10px] font-bold text-[#2F4F3E]">This device</span>
              : <button type="button" onClick={() => setSessions((prev) => prev.filter((_, j) => j !== i))}
                  className="text-xs font-semibold text-[#E87565] hover:underline">Sign out</button>
            }
          </div>
        ))}
        <button type="button" onClick={onClose}
          className="w-full rounded-xl border border-[#E8DED1] py-2 text-sm font-semibold text-[#7F7A70] hover:bg-[#F0EDE8]">Close</button>
      </div>
    </motion.div>
  );
}

// ── Privacy panel ──────────────────────────────────────────────────────────
const privacyToggles = [
  { id: "profile-visible", label: "Public profile", desc: "Let others find your profile" },
  { id: "trip-sharing", label: "Trip sharing", desc: "Allow sharing trip itineraries" },
  { id: "analytics", label: "Usage analytics", desc: "Help improve the app with anonymous data" },
];

function PrivacyPanel({ onClose }: { onClose: () => void }) {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ "profile-visible": true, "trip-sharing": true, "analytics": false });
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
      <div className="mt-3 rounded-2xl border border-[#E8DED1] bg-[#F7F4EE] p-4 space-y-3">
        <p className="text-xs font-bold uppercase tracking-wide text-[#7F7A70]">Privacy Settings</p>
        {privacyToggles.map((t) => (
          <div key={t.id} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#1F261F]">{t.label}</p>
              <p className="text-xs text-[#7F7A70]">{t.desc}</p>
            </div>
            <Switch
              checked={prefs[t.id]}
              onCheckedChange={() => setPrefs((p) => ({ ...p, [t.id]: !p[t.id] }))}
              aria-label={t.label}
            />
          </div>
        ))}
        <button type="button" onClick={onClose}
          className="w-full rounded-xl border border-[#E8DED1] py-2 text-sm font-semibold text-[#7F7A70] hover:bg-[#F0EDE8]">Close</button>
      </div>
    </motion.div>
  );
}

export function AccountSecurityCard() {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);

  const subtitles: Record<string, string> = {
    password: "••••••••",
    "2fa": twoFAEnabled ? "On" : "Off",
    "login-activity": "View recent devices",
    privacy: "Manage your data and privacy",
  };

  function toggle(id: string) {
    setOpenPanel((prev) => (prev === id ? null : id));
  }

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6F1F8]">
          <Lock className="h-5 w-5 text-[#3F7EA7]" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1F261F]">Account & Security</h3>
          <p className="text-xs font-medium text-[#7F7A70]">Manage your account security and privacy.</p>
        </div>
      </div>

      <ul className="mt-5 space-y-0">
        {securityRows.map((row) => {
          const Icon = rowIcons[row.id] ?? Lock;
          const isOpen = openPanel === row.id;
          return (
            <li key={row.id}>
              <button type="button" onClick={() => toggle(row.id)}
                className="group flex w-full items-center gap-4 rounded-xl px-2 py-3.5 transition-all duration-200 hover:bg-[#F7F4EE]">
                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
                  isOpen ? "bg-[#EAF4EE]" : "bg-[#F7F4EE] group-hover:bg-[#EAF4EE]")}>
                  <Icon className={cn("h-4 w-4 transition-colors duration-200",
                    isOpen ? "text-[#3C8B68]" : "text-[#7F7A70] group-hover:text-[#3C8B68]")} strokeWidth={1.8} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#1F261F]">{row.title}</p>
                  <p className="text-xs font-medium text-[#7F7A70]">{subtitles[row.id] ?? row.subtitle}</p>
                </div>
                <ChevronRight className={cn("h-4 w-4 text-[#B0A898] transition-all duration-200",
                  isOpen ? "rotate-90 text-[#2F4F3E]" : "group-hover:translate-x-0.5 group-hover:text-[#2F4F3E]")} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <>
                    {row.id === "password" && <PasswordPanel onClose={() => setOpenPanel(null)} />}
                    {row.id === "2fa" && <TwoFAPanel enabled={twoFAEnabled} onToggle={() => setTwoFAEnabled((v) => !v)} onClose={() => setOpenPanel(null)} />}
                    {row.id === "login-activity" && <LoginActivityPanel onClose={() => setOpenPanel(null)} />}
                    {row.id === "privacy" && <PrivacyPanel onClose={() => setOpenPanel(null)} />}
                  </>
                )}
              </AnimatePresence>

              <div className="mx-2 h-px bg-[#F0EDE8] last:hidden" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
