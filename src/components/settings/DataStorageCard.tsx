import { useState } from "react";
import { Database, Download, Map, Trash2, Check, Loader2 } from "lucide-react";
import { storageRows } from "@/data/settings";
import type { LucideIcon } from "lucide-react";

const rowIcons: Record<string, LucideIcon> = {
  export: Download,
  cache: Trash2,
  offline: Map,
};

type ActionState = "idle" | "loading" | "done";

export function DataStorageCard() {
  const [states, setStates] = useState<Record<string, ActionState>>({
    export: "idle",
    cache: "idle",
    offline: "idle",
  });
  const [cacheSize, setCacheSize] = useState("24.6 MB");

  function handleAction(id: string) {
    setStates((s) => ({ ...s, [id]: "loading" }));
    setTimeout(() => {
      setStates((s) => ({ ...s, [id]: "done" }));
      if (id === "cache") setCacheSize("0 MB");
      setTimeout(() => setStates((s) => ({ ...s, [id]: "idle" })), 2000);
    }, 1200);
  }

  const actionColors: Record<string, string> = {
    Export: "text-[#3F7EA7] hover:bg-[#E6F1F8]",
    Clear:  "text-[#E87565] hover:bg-[#FDECEA]",
    Manage: "text-[#3C8B68] hover:bg-[#EAF4EE]",
  };

  const descriptions: Record<string, string> = {
    export:  "Download a copy of your data",
    cache:   `Free up space · ${cacheSize} cached`,
    offline: "Manage downloaded maps",
  };

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE]">
          <Database className="h-5 w-5 text-[#3C8B68]" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1F261F]">Data & Storage</h3>
          <p className="text-xs font-medium text-[#7F7A70]">Manage your data and app storage.</p>
        </div>
      </div>

      <ul className="mt-5 space-y-0">
        {storageRows.map((row) => {
          const Icon = rowIcons[row.id] ?? Database;
          const state = states[row.id];
          const btnColor = actionColors[row.action] ?? "text-[#2F4F3E] hover:bg-[#EAF4EE]";

          return (
            <li key={row.id} className="flex items-center gap-4 border-b border-[#F0EDE8] py-3.5 last:border-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F7F4EE]">
                <Icon className="h-4 w-4 text-[#7F7A70]" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1F261F]">{row.title}</p>
                <p className="text-xs font-medium text-[#7F7A70]">{descriptions[row.id] ?? row.description}</p>
              </div>
              <button
                type="button"
                disabled={state === "loading"}
                onClick={() => handleAction(row.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors duration-200 disabled:opacity-60 ${btnColor}`}
              >
                {state === "loading" && <Loader2 className="h-3 w-3 animate-spin" />}
                {state === "done" && <Check className="h-3 w-3" />}
                {state === "done" ? "Done" : row.action}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
