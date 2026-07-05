import type { Catalog, Product, StepId } from "../types/catalog";

export const BASE_VARIANT = "__base__";

export interface ConfigState {
  quantities: Record<string, Record<string, number>>; // productId -> (variantId|"__base__") -> qty
  activeVariant: Record<string, string>; // productId -> variantId
  selectedPlanId: string;
  openStep: StepId | null;
}

export interface SavedPayload {
  version: number;
  savedAt: string;
  quantities: Record<string, Record<string, number>>;
  activeVariant: Record<string, string>;
  selectedPlanId: string;
  openStep: StepId | null;
}

export type ConfigAction =
  | { type: "HYDRATE_FROM_CATALOG"; catalog: Catalog }
  | { type: "HYDRATE_FROM_SAVED"; saved: SavedPayload; catalog: Catalog }
  | { type: "SET_QUANTITY"; productId: string; variantId: string; qty: number; required?: boolean }
  | { type: "SET_ACTIVE_VARIANT"; productId: string; variantId: string }
  | { type: "SET_PLAN"; planId: string }
  | { type: "SET_OPEN_STEP"; stepId: StepId };

export const initialConfigState: ConfigState = {
  quantities: {},
  activeVariant: {},
  selectedPlanId: "",
  openStep: null,
};

function allProducts(catalog: Catalog): Product[] {
  return catalog.steps.flatMap((step) => step.products ?? []);
}

function hydrateFromCatalog(catalog: Catalog): ConfigState {
  const quantities: ConfigState["quantities"] = {};
  const activeVariant: ConfigState["activeVariant"] = {};

  for (const product of allProducts(catalog)) {
    if (product.variants) {
      quantities[product.id] = {};
      for (const variant of product.variants) {
        quantities[product.id][variant.id] = variant.qty;
      }
      if (product.activeVariantId) {
        activeVariant[product.id] = product.activeVariantId;
      }
    } else {
      quantities[product.id] = { [BASE_VARIANT]: product.qty ?? 0 };
    }
  }

  const planStep = catalog.steps.find((step) => step.type === "plan");

  return {
    quantities,
    activeVariant,
    selectedPlanId: planStep?.selectedPlanId ?? "",
    openStep: catalog.steps[0]?.id ?? null,
  };
}

function hydrateFromSaved(saved: SavedPayload, catalog: Catalog): ConfigState {
  const fresh = hydrateFromCatalog(catalog);
  const validProductIds = new Set(allProducts(catalog).map((p) => p.id));

  const quantities: ConfigState["quantities"] = { ...fresh.quantities };
  for (const [productId, variantQtys] of Object.entries(saved.quantities ?? {})) {
    if (!validProductIds.has(productId)) continue;
    const validVariantKeys = new Set(Object.keys(fresh.quantities[productId] ?? {}));
    const merged: Record<string, number> = { ...fresh.quantities[productId] };
    for (const [variantId, qty] of Object.entries(variantQtys)) {
      if (validVariantKeys.has(variantId)) merged[variantId] = qty;
    }
    quantities[productId] = merged;
  }

  const activeVariant: ConfigState["activeVariant"] = { ...fresh.activeVariant };
  for (const [productId, variantId] of Object.entries(saved.activeVariant ?? {})) {
    if (!validProductIds.has(productId)) continue;
    if (variantId in (fresh.quantities[productId] ?? {})) {
      activeVariant[productId] = variantId;
    }
  }

  const planIds = new Set(
    catalog.steps.flatMap((step) => step.plans?.map((p) => p.id) ?? []),
  );
  const selectedPlanId = planIds.has(saved.selectedPlanId) ? saved.selectedPlanId : fresh.selectedPlanId;

  return { quantities, activeVariant, selectedPlanId, openStep: fresh.openStep };
}

export function configReducer(state: ConfigState, action: ConfigAction): ConfigState {
  switch (action.type) {
    case "HYDRATE_FROM_CATALOG":
      return hydrateFromCatalog(action.catalog);

    case "HYDRATE_FROM_SAVED":
      return hydrateFromSaved(action.saved, action.catalog);

    case "SET_QUANTITY": {
      const qty = action.required ? Math.max(1, action.qty) : Math.max(0, action.qty);
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [action.productId]: {
            ...state.quantities[action.productId],
            [action.variantId]: qty,
          },
        },
      };
    }

    case "SET_ACTIVE_VARIANT":
      return {
        ...state,
        activeVariant: { ...state.activeVariant, [action.productId]: action.variantId },
      };

    case "SET_PLAN":
      return { ...state, selectedPlanId: action.planId };

    case "SET_OPEN_STEP":
      return { ...state, openStep: state.openStep === action.stepId ? null : action.stepId };

    default:
      return state;
  }
}
