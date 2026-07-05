import type { ReactNode } from "react";
import { StepHeader } from "./StepHeader";

interface AccordionStepProps {
  stepNumber: number;
  title: string;
  icon: string;
  selectedCount: number;
  isOpen: boolean;
  nextTitle?: string;
  onToggle: () => void;
  onNext: () => void;
  children: ReactNode;
}

export function AccordionStep({
  stepNumber,
  title,
  icon,
  selectedCount,
  isOpen,
  nextTitle,
  onToggle,
  onNext,
  children,
}: AccordionStepProps) {
  return (
    <section
      className={isOpen ? "overflow-hidden rounded-card bg-panel" : "border-b border-border-line"}
    >
      <StepHeader
        stepNumber={stepNumber}
        title={title}
        icon={icon}
        selectedCount={selectedCount}
        isOpen={isOpen}
        onToggle={onToggle}
      />
      {isOpen && (
        <div className="border-t border-ink-900/40 px-4 py-5">
          {children}
          {nextTitle && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={onNext}
                className="rounded-btn-outline border border-primary px-6 py-2 text-lg font-semibold text-primary"
              >
                Next: {nextTitle}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
