import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  toneClassName: string;
};

export function ProgressBar({ value, toneClassName }: ProgressBarProps) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#E9E1D6]">
      <div
        className={cn("h-full rounded-full transition-all duration-500", toneClassName)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

