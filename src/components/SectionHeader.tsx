export function SectionHeader({
  eyebrow,
  title,
  note,
  action
}: {
  eyebrow: string;
  title: string;
  note?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#026c74]">{eyebrow}</p>
        <h2 className="text-3xl font-black text-[#172033]">{title}</h2>
      </div>
      {action ??
        (note ? (
          <p className="hidden max-w-xs text-right text-sm font-semibold text-[#4f5b6e] sm:block">
            {note}
          </p>
        ) : null)}
    </div>
  );
}
