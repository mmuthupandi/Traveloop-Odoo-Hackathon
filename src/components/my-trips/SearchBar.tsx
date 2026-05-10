import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <label className="flex h-12 min-w-[260px] items-center gap-3 rounded-2xl border border-[#DDD4C6] bg-white px-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 focus-within:border-[#C8BAA7]">
      <Search className="h-4 w-4 text-[#6F695D]" />
      <input
        type="search"
        placeholder="Search trips..."
        className="w-full bg-transparent text-sm font-medium text-[#1F261F] outline-none placeholder:text-[#9A9386]"
      />
    </label>
  );
}

