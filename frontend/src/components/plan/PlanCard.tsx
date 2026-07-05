import type { PlanOption } from "../../types/catalog";
import { formatPrice } from "../../utils/pricing";

interface PlanCardProps {
  plan: PlanOption;
  isSelected: boolean;
  onSelect: () => void;
}

export function PlanCard({ plan, isSelected, onSelect }: PlanCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={
        "flex w-full items-center justify-between gap-4 rounded-card bg-surface p-4 text-left " +
        (isSelected ? "border-2 border-primary/70" : "border border-transparent")
      }
    >
      <span className="flex items-center gap-3">
        <span
          className={
            "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 " +
            (isSelected ? "border-primary" : "border-border-line")
          }
        >
          {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
        </span>
        <span className="text-base font-semibold text-ink-900">
          {plan.name} {plan.nameAccent && <span className="text-primary">{plan.nameAccent}</span>}
        </span>
      </span>
      <span className="flex items-baseline gap-1.5 whitespace-nowrap">
        <span className="text-strike text-sm line-through">
          {formatPrice(plan.compareAtPrice)}
          {plan.billingPeriod}
        </span>
        <span className="text-base font-semibold text-ink-700">
          {formatPrice(plan.price)}
          {plan.billingPeriod}
        </span>
      </span>
    </button>
  );
}
