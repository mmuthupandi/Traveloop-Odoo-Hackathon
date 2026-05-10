import { Bell, ArrowUpRight } from "lucide-react";
import { dontForgetMessage } from "@/data/packing";

export function DontForgetCard() {
  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF6EE]">
          <Bell className="h-5 w-5 text-[#C46A2D]" strokeWidth={1.8} />
        </div>
        <h3 className="font-serif text-base font-bold text-[#1F261F]">
          Don't Forget
        </h3>
      </div>

      <p className="mt-3 text-sm font-medium leading-relaxed text-[#1F261F]/75">
        {dontForgetMessage}
      </p>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E8DED1] bg-[#F7F4EE] py-2.5 text-sm font-semibold text-[#1F261F] transition-all duration-200 hover:border-[#2F4F3E]/30 hover:bg-[#2F4F3E] hover:text-white"
      >
        Check Weather
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}
