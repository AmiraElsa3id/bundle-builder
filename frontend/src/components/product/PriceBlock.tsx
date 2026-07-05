import { formatPrice } from "../../utils/pricing";

interface PriceBlockProps {
  price: number;
  compareAtPrice?: number;
  variant: "card" | "review";
}

export function PriceBlock({ price, compareAtPrice, variant }: PriceBlockProps) {
  const isFree = price === 0;
  const struckColor = variant === "card" ? "text-strike" : "text-ink-600";
  const activeColor = isFree ? "text-primary" : variant === "card" ? "text-ink-700" : "text-primary";

  return (
    <div className="flex items-baseline justify-end gap-1.5">
      {compareAtPrice !== undefined && (
        <span className={`${struckColor} text-sm line-through`}>{formatPrice(compareAtPrice)}</span>
      )}
      <span className={`${activeColor} text-base font-semibold`}>
        {isFree ? "FREE" : formatPrice(price)}
      </span>
    </div>
  );
}
