import { useState } from "react";
import { Check, SlidersHorizontal, Save } from "lucide-react";
import {
  languageOptions,
  currencyOptions,
  dateFormatOptions,
  temperatureOptions,
  type ThemeOption,
} from "@/data/settings";
import { cn } from "@/lib/utils";

const selectClass =
  "w-full appearance-none rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-3 py-2.5 text-sm font-medium text-[#1F261F] outline-none focus:border-[#2F4F3E]/50 focus:ring-2 focus:ring-[#2F4F3E]/10 transition-all duration-200 cursor-pointer";

type SelectRowProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
};

function SelectRow({ label, options, value, onChange }: SelectRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#F0EDE8] py-3.5 last:border-0">
      <span className="text-sm font-semibold text-[#1F261F] shrink-0">{label}</span>
      <div className="relative w-44">
        <select value={value} onChange={(e) => onChange(e.target.value)} className={selectClass} aria-label={label}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="#7F7A70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const themes: { id: ThemeOption; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

export function PreferencesCard() {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD – US Dollar");
  const [dateFormat, setDateFormat] = useState("DD MMM YYYY");
  const [temperature, setTemperature] = useState("Celsius (°C)");
  const [theme, setTheme] = useState<ThemeOption>("light");
  const [saved, setSaved] = useState(false);

  // Track original values to detect changes
  const [original] = useState({ language, currency, dateFormat, temperature, theme });
  const hasChanges =
    language !== original.language ||
    currency !== original.currency ||
    dateFormat !== original.dateFormat ||
    temperature !== original.temperature ||
    theme !== original.theme;

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3EDF8]">
            <SlidersHorizontal className="h-5 w-5 text-[#9B6BB5]" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1F261F]">Preferences</h3>
            <p className="text-xs font-medium text-[#7F7A70]">Customize your app experience.</p>
          </div>
        </div>
        <button type="button" onClick={handleSave}
          className={cn(
            "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200",
            saved
              ? "bg-[#EAF4EE] text-[#2F4F3E]"
              : "border border-[#E8DED1] text-[#7F7A70] hover:bg-[#F0EDE8]"
          )}>
          {saved ? <><Check className="h-3.5 w-3.5" /> Saved</> : <><Save className="h-3.5 w-3.5" /> Save</>}
        </button>
      </div>

      <div className="mt-5">
        <SelectRow label="Language"    options={languageOptions}    value={language}    onChange={setLanguage} />
        <SelectRow label="Currency"    options={currencyOptions}    value={currency}    onChange={setCurrency} />
        <SelectRow label="Date Format" options={dateFormatOptions}  value={dateFormat}  onChange={setDateFormat} />
        <SelectRow label="Temperature" options={temperatureOptions} value={temperature} onChange={setTemperature} />
      </div>

      <div className="mt-4">
        <p className="mb-3 text-sm font-semibold text-[#1F261F]">Theme</p>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <button key={t.id} type="button" onClick={() => setTheme(t.id)}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all duration-200",
                theme === t.id ? "border-[#2F4F3E] bg-[#EAF4EE]" : "border-[#E8DED1] bg-[#F7F4EE] hover:border-[#2F4F3E]/30"
              )}
              aria-pressed={theme === t.id}>
              <div className={cn("h-10 w-full rounded-lg overflow-hidden",
                t.id === "light" && "bg-white border border-[#E8DED1]",
                t.id === "dark" && "bg-[#1F261F]",
                t.id === "system" && "bg-gradient-to-r from-white to-[#1F261F]")}>
                <div className={cn("m-1.5 h-2 w-1/2 rounded-full", t.id === "dark" ? "bg-white/20" : "bg-[#E8DED1]")} />
                <div className={cn("mx-1.5 h-1.5 w-3/4 rounded-full", t.id === "dark" ? "bg-white/10" : "bg-[#F0EDE8]")} />
              </div>
              <span className="text-xs font-semibold text-[#1F261F]">{t.label}</span>
              {theme === t.id && (
                <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#2F4F3E]">
                  <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
