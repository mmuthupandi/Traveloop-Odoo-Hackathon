import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

export function DangerZoneCard() {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#F5C6C0] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      {/* Decorative travel illustration — bottom right */}
      <div className="pointer-events-none absolute bottom-0 right-0 opacity-[0.12]">
        <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mountains */}
          <path d="M0 160 L60 40 L120 100 L180 20 L200 50 L200 160 Z" fill="#2F4F3E" />
          <path d="M80 160 L130 70 L180 110 L200 80 L200 160 Z" fill="#3C8B68" opacity="0.6" />
          {/* Signpost */}
          <rect x="140" y="60" width="4" height="80" rx="2" fill="#C46A2D" />
          <rect x="130" y="70" width="40" height="14" rx="3" fill="#E87565" />
          <rect x="128" y="90" width="36" height="14" rx="3" fill="#C46A2D" />
        </svg>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDECEA]">
            <AlertTriangle className="h-5 w-5 text-[#E87565]" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1F261F]">Danger Zone</h3>
            <p className="text-xs font-medium text-[#7F7A70]">Irreversible and sensitive actions.</p>
          </div>
        </div>

        {/* Delete row */}
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FDECEA]">
              <Trash2 className="h-4 w-4 text-[#E87565]" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1F261F]">Delete Account</p>
              <p className="text-xs font-medium text-[#7F7A70]">
                Permanently delete your account and all your data.
              </p>
            </div>
          </div>

          {!confirming ? (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="shrink-0 rounded-xl bg-[#E87565] px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(232,117,101,0.3)] transition-all duration-200 hover:bg-[#D4604F] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(232,117,101,0.4)]"
            >
              Delete My Account
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[#E87565]">Are you sure?</p>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-4 py-2 text-sm font-semibold text-[#7F7A70] hover:bg-[#F0EDE8]"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-xl bg-[#E87565] px-4 py-2 text-sm font-bold text-white hover:bg-[#D4604F]"
              >
                Confirm Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
