import { useEffect } from "react";
import { useCatalog } from "./hooks/useCatalog";
import { ConfigProvider, useConfigDispatch, useConfigState } from "./state/configContext";
import { loadSavedConfig } from "./state/storage";
import { getActiveQty } from "./state/selectors";
import { BuilderLayout } from "./components/layout/BuilderLayout";
import { AccordionStep } from "./components/accordion/AccordionStep";
import { ProductCard } from "./components/product/ProductCard";
import { PlanList } from "./components/plan/PlanList";
import { ReviewPanel } from "./components/review/ReviewPanel";
import type { Catalog, StepConfig } from "./types/catalog";

function ProductsStepBody({ step }: { step: StepConfig }) {
  const state = useConfigState();
  const dispatch = useConfigDispatch();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
      {step.products!.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          activeQty={getActiveQty(state, product)}
          activeVariantId={state.activeVariant[product.id]}
          onQtyChange={(variantId, qty) =>
            dispatch({
              type: "SET_QUANTITY",
              productId: product.id,
              variantId,
              qty,
              required: product.required,
            })
          }
          onVariantChange={(variantId) =>
            dispatch({ type: "SET_ACTIVE_VARIANT", productId: product.id, variantId })
          }
        />
      ))}
    </div>
  );
}

function getSelectedCount(state: ReturnType<typeof useConfigState>, step: StepConfig): number {
  if (step.type === "plan") return 1;
  return (step.products ?? []).filter((product) => getActiveQty(state, product) > 0).length;
}

function BuilderApp({ catalog }: { catalog: Catalog }) {
  const state = useConfigState();
  const dispatch = useConfigDispatch();

  useEffect(() => {
    const saved = loadSavedConfig();
    if (saved) dispatch({ type: "HYDRATE_FROM_SAVED", saved, catalog });
    else dispatch({ type: "HYDRATE_FROM_CATALOG", catalog });
  }, [catalog, dispatch]);

  if (state.openStep === null && Object.keys(state.quantities).length === 0) {
    return <p className="p-8">Preparing your bundle…</p>;
  }

  return (
    <BuilderLayout
      builder={catalog.steps.map((step, i) => (
        <AccordionStep
          key={step.id}
          stepNumber={step.stepNumber}
          title={step.title}
          icon={step.icon}
          selectedCount={getSelectedCount(state, step)}
          isOpen={state.openStep === step.id}
          nextTitle={catalog.steps[i + 1]?.title}
          onToggle={() => dispatch({ type: "SET_OPEN_STEP", stepId: step.id })}
          onNext={() =>
            dispatch({ type: "SET_OPEN_STEP", stepId: catalog.steps[i + 1]?.id ?? step.id })
          }
        >
          {step.type === "products" ? (
            <ProductsStepBody step={step} />
          ) : (
            <PlanList
              plans={step.plans!}
              selectedPlanId={state.selectedPlanId}
              onSelect={(planId) => dispatch({ type: "SET_PLAN", planId })}
            />
          )}
        </AccordionStep>
      ))}
      review={<ReviewPanel catalog={catalog} />}
    />
  );
}

function App() {
  const { catalog, loading, error } = useCatalog();

  return (
    <ConfigProvider>
      {loading && <p className="p-8">Loading catalog…</p>}
      {error && <p className="p-8 text-strike">Error: {error}</p>}
      {catalog && <BuilderApp catalog={catalog} />}
    </ConfigProvider>
  );
}

export default App;
