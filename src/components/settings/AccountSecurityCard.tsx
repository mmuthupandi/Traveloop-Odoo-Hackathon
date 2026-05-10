import { ChevronRight, Eye, Lock, Monitor, Shield } from "lucide-react";
import { securityRows } from "@/data/settings";
import type { LucideIcon } from "lucide-react";

const rowIcons: Record<string, LucideIcon> = {
  password: Lock,
  "2fa": Shield,
  "login-activity": Monitor,
  privacy: Eye
};

export function AccountSecurityCard() {
  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6F1F8]">
          <Lock className="h-5 w-5 text-[#3F7EA7]" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1F261F]">Account & Security</h3>
          <p className="text-xs font-medium text-[#7F7A70]">Manage your account security and privacy.</p>
        </div>
      </div>

      {/* Rows */}
      <ul className="mt-5 space-y-0">
        {securityRows.map((row) => {
          const Icon = rowIcons[row.id] ?? Lock;
          return (
            <li key={row.id}>
              <button
                type="button"
                className="group flex w-full items-center gap-4 rounded-xl px-2 py-3.5 transition-all duration-200 hover:bg-[#F7F4EE]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F7F4EE] transition-colors duration-200 group-hover:bg-[#EAF4EE]">
                  <Icon className="h-4.5 w-4.5 text-[#7F7A70] group-hover:text-[#3C8B68]" strokeWidth={1.8} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#1F261F]">{row.title}</p>
                  <p className="text-xs font-medium text-[#7F7A70]">{row.subtitle}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-[#B0A898] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#2F4F3E]" />
              </button>
              <div className="mx-2 h-px bg-[#F0EDE8] last:hidden" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
