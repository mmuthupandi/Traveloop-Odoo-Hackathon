import { Send } from "lucide-react";

export function QuoteCard() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#E8DED1] bg-[#EFE7DA] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <div className="absolute inset-0 opacity-70">
        <svg viewBox="0 0 360 240" className="h-full w-full" aria-hidden="true">
          <path
            d="M0 196 72 102l31 51 25-34 92 77"
            fill="#F7F4EE"
            stroke="#CBBEAA"
            strokeWidth="2"
          />
          <path
            d="M151 204 237 70l43 73 20-31 68 92"
            fill="#E6DED0"
            stroke="#BEB19E"
            strokeWidth="2"
          />
          <path
            d="M31 204c89-34 189-30 304 0"
            stroke="#C9BCA8"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M251 47c28 8 44 23 54 49"
            stroke="#2F4F3E"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            fill="none"
          />
        </svg>
      </div>
      <Send className="relative ml-auto h-6 w-6 rotate-12 text-[#2F4F3E]" />
      <blockquote className="relative mt-20 max-w-xs font-serif text-2xl font-bold leading-9 text-[#1F261F]">
        Every destination has a story, yours is waiting to be written.
      </blockquote>
    </section>
  );
}

