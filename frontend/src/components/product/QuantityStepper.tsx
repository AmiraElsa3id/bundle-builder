import { MinusIcon, PlusIcon } from "../common/Icons";

interface QuantityStepperProps {
  qty: number;
  onChange: (qty: number) => void;
  disabled?: boolean;
  min?: number;
}

export function QuantityStepper({ qty, onChange, disabled = false, min = 0 }: QuantityStepperProps) {
  return (
    <div className="flex w-[72px] items-center justify-between" role="group" aria-label="Quantity">
      <button
        type="button"
        disabled={disabled || qty <= min}
        onClick={() => onChange(Math.max(min, qty - 1))}
        aria-label="Decrease quantity"
        className="flex h-5 w-5 items-center justify-center rounded-stepper border border-border-300 text-ink-obsidian disabled:opacity-40"
      >
        <MinusIcon />
      </button>
      <span className="min-w-[1ch] text-center text-base text-ink-obsidian">{qty}</span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(qty + 1)}
        aria-label="Increase quantity"
        className="flex h-5 w-5 items-center justify-center rounded-stepper bg-border-200 text-ink-obsidian disabled:opacity-40"
      >
        <PlusIcon />
      </button>
    </div>
  );
}
