import type { ConfigState, SavedPayload } from "./configReducer";

const STORAGE_KEY = "bundle-builder:v1";

export function saveConfig(state: ConfigState): void {
  const payload: SavedPayload = {
    version: 1,
    savedAt: new Date().toISOString(),
    quantities: state.quantities,
    activeVariant: state.activeVariant,
    selectedPlanId: state.selectedPlanId,
    openStep: state.openStep,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadSavedConfig(): SavedPayload | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedPayload;
  } catch {
    return null;
  }
}

export function clearSavedConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}
