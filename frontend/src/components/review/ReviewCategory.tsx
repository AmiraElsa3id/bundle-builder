import type { LineItem } from "../../state/selectors";
import { ReviewLineItem } from "./ReviewLineItem";

interface ReviewCategoryProps {
  label: string;
  items: LineItem[];
  onQtyChange: (item: LineItem, qty: number) => void;
}

export function ReviewCategory({ label, items, onQtyChange }: ReviewCategoryProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 border-t border-border-line pt-3 first:border-t-0 first:pt-0">
      <p className="text-[10px] font-medium uppercase tracking-wide text-ink-500">{label}</p>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <ReviewLineItem
            key={item.key}
            item={item}
            onQtyChange={(qty) => onQtyChange(item, qty)}
          />
        ))}
      </div>
    </div>
  );
}
