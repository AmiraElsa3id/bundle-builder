import type { Product } from "../../types/catalog";
import { BASE_VARIANT } from "../../state/configReducer";
import { DiscountBadge } from "./DiscountBadge";
import { PriceBlock } from "./PriceBlock";
import { QuantityStepper } from "./QuantityStepper";
import { VariantChipRow } from "./VariantChipRow";

interface ProductCardProps {
  product: Product;
  activeQty: number;
  activeVariantId?: string;
  onQtyChange: (variantId: string, qty: number) => void;
  onVariantChange: (variantId: string) => void;
}

export function ProductCard({
  product,
  activeQty,
  activeVariantId,
  onQtyChange,
  onVariantChange,
}: ProductCardProps) {
  const hasVariants = Boolean(product.variants?.length);
  const resolvedVariantId = hasVariants ? activeVariantId ?? product.variants![0].id : BASE_VARIANT;
  const image = hasVariants
    ? product.variants!.find((v) => v.id === resolvedVariantId)?.image ?? product.image
    : product.image;
  const isSelected = activeQty > 0;

  return (
    <div
      className={
        "flex gap-4 rounded-card bg-surface p-3 " +
        (isSelected ? "border-2 border-primary/70" : "border border-transparent")
      }
    >
      <div className="relative h-[101px] w-[101px] flex-shrink-0 overflow-hidden rounded-chip bg-border-200">
        <img src={image} alt={product.name} className="h-full w-full object-cover" />
        {product.badge && <DiscountBadge label={product.badge.label} />}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5">
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold text-ink-900">{product.name}</h3>
          {product.description && (
            <p className="text-xs leading-snug text-ink-900/75">
              {product.description}{" "}
              {product.learnMoreUrl && (
                <a href={product.learnMoreUrl} className="text-primary underline">
                  Learn More
                </a>
              )}
            </p>
          )}
          {hasVariants && (
            <VariantChipRow
              variants={product.variants!}
              activeVariantId={resolvedVariantId}
              onSelect={onVariantChange}
            />
          )}
        </div>
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <QuantityStepper
            qty={activeQty}
            onChange={(qty) => onQtyChange(resolvedVariantId, qty)}
            disabled={product.required}
            min={product.required ? 1 : 0}
          />
          <PriceBlock price={product.price} compareAtPrice={product.compareAtPrice} variant="card" />
        </div>
      </div>
    </div>
  );
}
