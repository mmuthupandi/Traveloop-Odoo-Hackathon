import { ExternalLink, HelpCircle, Mail, MessageSquare } from "lucide-react";
import { supportRows } from "@/data/settings";
import type { LucideIcon } from "lucide-react";

const rowIcons: Record<string, LucideIcon> = {
  help: HelpCircle,
  contact: Mail,
  feedback: MessageSquare
};

export function SupportCard() {
  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3EDF8]">
          <HelpCircle className="h-5 w-5 text-[#9B6BB5]" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1F261F]">Support</h3>
          <p className="text-xs font-medium text-[#7F7A70]">We're here to help you.</p>
        </div>
      </div>

      <ul className="mt-5 space-y-0">
        {supportRows.map((row) => {
          const Icon = rowIcons[row.id] ?? HelpCircle;
          return (
            <li key={row.id}>
              <button
                type="button"
                className="group flex w-full items-center gap-4 rounded-xl px-2 py-3.5 transition-all duration-200 hover:bg-[#F7F4EE]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F7F4EE] transition-colors duration-200 group-hover:bg-[#F3EDF8]">
                  <Icon className="h-4 w-4 text-[#7F7A70] group-hover:text-[#9B6BB5]" strokeWidth={1.8} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#1F261F]">{row.title}</p>
                  <p className="text-xs font-medium text-[#7F7A70]">{row.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-[#B0A898] transition-all duration-200 group-hover:text-[#9B6BB5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <div className="mx-2 h-px bg-[#F0EDE8] last:hidden" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
