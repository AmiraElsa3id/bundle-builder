import type { Catalog, Product, ProductCategory } from "../types/catalog";
import { BASE_VARIANT, type ConfigState } from "./configReducer";

export function getActiveQty(state: ConfigState, product: Product): number {
  if (product.variants) {
    const activeId = state.activeVariant[product.id] ?? product.variants[0]?.id;
    return state.quantities[product.id]?.[activeId] ?? 0;
  }
  return state.quantities[product.id]?.[BASE_VARIANT] ?? 0;
}

export interface LineItem {
  key: string;
  productId: string;
  variantId: string;
  label: string;
  image: string;
  qty: number;
  unitPrice: number;
  unitCompareAtPrice?: number;
  required?: boolean;
  category: ProductCategory;
}

const CATEGORY_ORDER: ProductCategory[] = ["camera", "sensor", "accessory"];

export function getLineItems(state: ConfigState, catalog: Catalog): Record<ProductCategory, LineItem[]> {
  const result: Record<ProductCategory, LineItem[]> = { camera: [], sensor: [], accessory: [] };

  for (const step of catalog.steps) {
    for (const product of step.products ?? []) {
      if (product.variants) {
        const activeVariants = product.variants.filter(
          (variant) => (state.quantities[product.id]?.[variant.id] ?? 0) > 0,
        );
        const disambiguate = activeVariants.length > 1;
        for (const variant of activeVariants) {
          result[product.category].push({
            key: `${product.id}:${variant.id}`,
            productId: product.id,
            variantId: variant.id,
            label: disambiguate ? `${product.name} (${variant.label})` : product.name,
            image: variant.image ?? product.image,
            qty: state.quantities[product.id][variant.id],
            unitPrice: product.price,
            unitCompareAtPrice: product.compareAtPrice,
            required: product.required,
            category: product.category,
          });
        }
      } else {
        const qty = state.quantities[product.id]?.[BASE_VARIANT] ?? 0;
        if (qty > 0) {
          result[product.category].push({
            key: `${product.id}:${BASE_VARIANT}`,
            productId: product.id,
            variantId: BASE_VARIANT,
            label: product.name,
            image: product.image,
            qty,
            unitPrice: product.price,
            unitCompareAtPrice: product.compareAtPrice,
            required: product.required,
            category: product.category,
          });
        }
      }
    }
  }

  return result;
}

export function getOrderedCategories(): ProductCategory[] {
  return CATEGORY_ORDER;
}

export interface Totals {
  activeTotal: number;
  struckTotal: number;
  savings: number;
}

export function computeTotals(state: ConfigState, catalog: Catalog): Totals {
  const lineItems = getLineItems(state, catalog);
  let activeTotal = 0;
  let struckTotal = 0;

  for (const category of CATEGORY_ORDER) {
    for (const item of lineItems[category]) {
      activeTotal += item.unitPrice * item.qty;
      struckTotal += (item.unitCompareAtPrice ?? item.unitPrice) * item.qty;
    }
  }

  const planStep = catalog.steps.find((step) => step.type === "plan");
  const selectedPlan = planStep?.plans?.find((plan) => plan.id === state.selectedPlanId);
  if (selectedPlan) {
    activeTotal += selectedPlan.price;
    struckTotal += selectedPlan.compareAtPrice;
  }

  activeTotal += catalog.shipping.price;
  struckTotal += catalog.shipping.compareAtPrice ?? catalog.shipping.price;

  return { activeTotal, struckTotal, savings: struckTotal - activeTotal };
}
