import type { PlanOption } from "../../types/catalog";
import { PlanCard } from "./PlanCard";

interface PlanListProps {
  plans: PlanOption[];
  selectedPlanId: string;
  onSelect: (planId: string) => void;
}

export function PlanList({ plans, selectedPlanId, onSelect }: PlanListProps) {
  return (
    <div className="flex flex-col gap-3">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isSelected={plan.id === selectedPlanId}
          onSelect={() => onSelect(plan.id)}
        />
      ))}
    </div>
  );
}
