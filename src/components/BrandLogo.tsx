import { Mountain } from "lucide-react";

export function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-forest text-white shadow-[0_12px_26px_rgba(47,79,62,0.22)]">
        <Mountain className="h-7 w-7" strokeWidth={2.2} aria-hidden="true" />
      </div>
      <div>
        <p className="font-serif text-xl font-extrabold leading-none tracking-[0.01em] text-ink">
          Traveloop
        </p>
        <p className="mt-1 font-script text-lg leading-none text-forest">
          Stories begin here
        </p>
      </div>
    </div>
  );
}
