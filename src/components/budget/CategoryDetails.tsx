import { budgetCategories } from "@/data/budget";

export function CategoryDetails() {
  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <h3 className="font-serif text-xl font-bold text-[#1F261F]">
        Category Details
      </h3>

      <ul className="mt-5 space-y-4">
        {budgetCategories.map((cat) => {
          const Icon = cat.icon;
          const pct = Math.round((cat.spent / cat.budget) * 100);
          const isOver = pct >= 100;

          return (
            <li key={cat.id}>
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: cat.bgColor }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: cat.color }}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Label + amounts */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1F261F]">
                      {cat.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#1F261F]">
                        ${cat.spent}
                        <span className="font-normal text-[#7F7A70]">
                          {" "}/ ${cat.budget}
                        </span>
                      </span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: isOver ? "#E87565" : cat.color }}
                      >
                        {pct}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#F0EDE8]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(pct, 100)}%`,
                        backgroundColor: isOver ? "#E87565" : cat.color
                      }}
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
