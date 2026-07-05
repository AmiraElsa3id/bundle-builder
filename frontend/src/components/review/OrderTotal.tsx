import { formatPrice } from "../../utils/pricing";

interface OrderTotalProps {
  activeTotal: number;
  struckTotal: number;
  savings: number;
}

export function OrderTotal({ activeTotal, struckTotal, savings }: OrderTotalProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-end gap-2">
        <span className="text-lg text-ink-600 line-through">{formatPrice(struckTotal)}</span>
        <span className="text-2xl font-bold text-primary">{formatPrice(activeTotal)}</span>
      </div>
      {savings > 0 && (
        <p className="text-center text-xs font-semibold text-success">
          Congrats! You&rsquo;re saving {formatPrice(savings)} on your security bundle!
        </p>
      )}
    </div>
  );
}
