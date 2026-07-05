import { useState } from "react";
import type { Catalog } from "../../types/catalog";
import { useConfigDispatch, useConfigState } from "../../state/configContext";
import { computeTotals, getLineItems, type LineItem } from "../../state/selectors";
import { saveConfig } from "../../state/storage";
import { formatPrice } from "../../utils/pricing";
import { ReviewCategory } from "./ReviewCategory";
import { GuaranteeBadge } from "./GuaranteeBadge";
import { FinancingPill } from "./FinancingPill";
import { OrderTotal } from "./OrderTotal";
import { Toast } from "../common/Toast";

interface ReviewPanelProps {
  catalog: Catalog;
}

export function ReviewPanel({ catalog }: ReviewPanelProps) {
  const state = useConfigState();
  const dispatch = useConfigDispatch();
  const [showSaved, setShowSaved] = useState(false);

  const lineItems = getLineItems(state, catalog);
  const totals = computeTotals(state, catalog);

  const planStep = catalog.steps.find((step) => step.type === "plan");
  const selectedPlan = planStep?.plans?.find((plan) => plan.id === state.selectedPlanId);

  const handleQtyChange = (item: LineItem, qty: number) => {
    dispatch({
      type: "SET_QUANTITY",
      productId: item.productId,
      variantId: item.variantId,
      qty,
      required: item.required,
    });
  };

  const handleSave = () => {
    saveConfig(state);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <div className="rounded-card bg-panel p-5 2xl:p-8">
      <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-10">
        <div>
          <h2 className="text-2xl font-semibold text-ink-900">{catalog.reviewCopy.title}</h2>
          <p className="mt-1 text-sm text-ink-900/75">{catalog.reviewCopy.subtitle}</p>

          <div className="mt-4 flex flex-col gap-3">
            <ReviewCategory label="Cameras" items={lineItems.camera} onQtyChange={handleQtyChange} />
            <ReviewCategory label="Sensors" items={lineItems.sensor} onQtyChange={handleQtyChange} />
            <ReviewCategory label="Accessories" items={lineItems.accessory} onQtyChange={handleQtyChange} />

            {selectedPlan && (
              <div className="flex items-center justify-between gap-3 border-t border-border-line pt-3">
                <span className="text-sm font-semibold text-ink-900">
                  {selectedPlan.name}{" "}
                  {selectedPlan.nameAccent && (
                    <span className="text-primary">{selectedPlan.nameAccent}</span>
                  )}
                </span>
                <span className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="text-ink-600 text-xs line-through">
                    {formatPrice(selectedPlan.compareAtPrice)}
                    {selectedPlan.billingPeriod}
                  </span>
                  <span className="text-primary text-sm font-semibold">
                    {formatPrice(selectedPlan.price)}
                    {selectedPlan.billingPeriod}
                  </span>
                </span>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 border-t border-border-line pt-3">
              <span className="text-sm font-semibold text-ink-900">{catalog.shipping.label}</span>
              <span className="flex items-baseline gap-1.5 whitespace-nowrap">
                {catalog.shipping.compareAtPrice !== undefined && (
                  <span className="text-ink-600 text-xs line-through">
                    {formatPrice(catalog.shipping.compareAtPrice)}
                  </span>
                )}
                <span className="text-primary text-sm font-semibold">
                  {catalog.shipping.price === 0 ? "FREE" : formatPrice(catalog.shipping.price)}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-border-line pt-4 2xl:mt-0 2xl:border-t-0 2xl:pt-0">
          <div className="flex items-center justify-between gap-4">
            <GuaranteeBadge
              badgeImage={catalog.guarantee.badgeImage}
              badgeText={catalog.guarantee.badgeText}
              heading={catalog.guarantee.heading}
              body={catalog.guarantee.body}
            />
            <FinancingPill text={catalog.financing.text} />
          </div>

          <OrderTotal
            activeTotal={totals.activeTotal}
            struckTotal={totals.struckTotal}
            savings={totals.savings}
          />

          <button
            type="button"
            className="w-full rounded-btn bg-primary py-3 font-cta text-base font-bold text-white"
          >
            Checkout
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="text-center text-sm italic text-ink-700 underline"
          >
            Save my system for later
          </button>
        </div>
      </div>

      {showSaved && <Toast message="Saved! Your system will be here next time." />}
    </div>
  );
}
