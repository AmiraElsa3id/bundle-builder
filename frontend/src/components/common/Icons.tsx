export function ChevronIcon({ direction = "down" }: { direction?: "up" | "down" }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={direction === "up" ? "rotate-180" : ""}
      aria-hidden="true"
    >
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MinusIcon() {
  return (
    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" aria-hidden="true">
      <path d="M0 5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
      <path d="M4 0V8M0 4H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
