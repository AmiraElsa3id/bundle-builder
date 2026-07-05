import type { LineItem } from "../../state/selectors";
import { QuantityStepper } from "../product/QuantityStepper";
import { PriceBlock } from "../product/PriceBlock";

interface ReviewLineItemProps {
  item: LineItem;
  onQtyChange: (qty: number) => void;
}

export function ReviewLineItem({ item, onQtyChange }: ReviewLineItemProps) {
  return (
    <div className="flex items-center gap-3">
      <img src={item.image} alt="" className="h-10 w-10 flex-shrink-0 rounded-chip object-cover" />
      <span className="min-w-0 flex-1 text-xs text-ink-obsidian">{item.label}</span>
      <QuantityStepper
        qty={item.qty}
        onChange={onQtyChange}
        disabled={item.required}
        min={item.required ? 1 : 0}
      />
      <div className="flex-shrink-0">
        <PriceBlock
          price={item.unitPrice * item.qty}
          compareAtPrice={item.unitCompareAtPrice !== undefined ? item.unitCompareAtPrice * item.qty : undefined}
          variant="review"
        />
      </div>
    </div>
  );
}
