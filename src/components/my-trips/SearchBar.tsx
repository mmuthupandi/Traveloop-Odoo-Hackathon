import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex h-12 min-w-[220px] flex-1 items-center gap-3 rounded-2xl border border-[#DDD4C6] bg-white px-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 focus-within:border-[#2F4F3E]/40 focus-within:shadow-[0_8px_24px_rgba(47,79,62,0.1)] sm:min-w-[260px] sm:flex-none">
      <Search className="h-4 w-4 shrink-0 text-[#6F695D]" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search trips..."
        className="w-full bg-transparent text-sm font-medium text-[#1F261F] outline-none placeholder:text-[#9A9386]"
        aria-label="Search trips"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="shrink-0 text-[#9A9386] hover:text-[#1F261F] transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </label>
  );
}
