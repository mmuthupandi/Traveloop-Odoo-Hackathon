import { tips } from "@/data/itinerary-builder";
import { cn } from "@/lib/utils";

export function TipsCard() {
  return (
    <section className="rounded-3xl border border-[#E8DED1] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <h3 className="font-serif text-2xl font-bold text-[#1F261F]">Tips</h3>
      <div className="mt-5 space-y-5">
        {tips.map((tip) => {
          const Icon = tip.icon;
          return (
            <article key={tip.title} className="flex gap-4">
              <span
                className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
                  tip.colorClass
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h4 className="text-sm font-extrabold text-[#1F261F]">{tip.title}</h4>
                <p className="mt-1 text-sm font-medium leading-6 text-[#5D574D]">{tip.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

