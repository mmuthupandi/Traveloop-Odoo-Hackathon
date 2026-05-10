import { Button } from "@/components/ui/button";

type SectionHeaderProps = {
  title: string;
  action?: string;
  id?: string;
};

export function SectionHeader({ title, action, id }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 id={id} className="font-serif text-xl font-bold text-ink">
        {title}
      </h2>
      {action ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="px-0 text-sm font-bold text-forest hover:bg-transparent hover:text-clay"
        >
          {action}
        </Button>
      ) : null}
    </div>
  );
}
