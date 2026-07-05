import type { Variant } from "../../types/catalog";

interface VariantChipRowProps {
  variants: Variant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}

export function VariantChipRow({ variants, activeVariantId, onSelect }: VariantChipRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId;
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            className={
              "flex items-center gap-1 rounded-chip border px-1 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-900 " +
              (isActive ? "border-success" : "border-border-line")
            }
          >
            {variant.image ? (
              <img src={variant.image} alt="" className="h-6 w-6 rounded-chip object-cover" />
            ) : variant.swatchColor ? (
              <span
                className="h-4 w-4 rounded-full border border-border-line"
                style={{ backgroundColor: variant.swatchColor }}
              />
            ) : null}
            {variant.label}
          </button>
        );
      })}
    </div>
  );
}
