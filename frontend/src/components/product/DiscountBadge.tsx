export function DiscountBadge({ label }: { label: string }) {
  return (
    <span className="absolute left-2 top-2 rounded-pill bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
      {label}
    </span>
  );
}
