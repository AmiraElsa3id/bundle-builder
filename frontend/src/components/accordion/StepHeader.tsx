import { ChevronIcon } from "../common/Icons";

interface StepHeaderProps {
  stepNumber: number;
  title: string;
  icon: string;
  selectedCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

export function StepHeader({ stepNumber, title, icon, selectedCount, isOpen, onToggle }: StepHeaderProps) {
  return (
    <div>
      <div className="flex justify-center px-4 pt-4">
        <p className="w-full text-[10px] font-medium uppercase tracking-[0.13em] text-ink-700">
          Step {stepNumber} of 4
        </p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 border-t border-ink-900/40 px-4 py-5"
      >
        <span className="flex items-center gap-2">
          <img src={icon} alt="" className="h-6 w-6" />
          <span className="text-xl font-semibold text-ink-obsidian">{title}</span>
        </span>
        <span className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-primary">
          {selectedCount} selected
          <ChevronIcon direction={isOpen ? "up" : "down"} />
        </span>
      </button>
    </div>
  );
}
