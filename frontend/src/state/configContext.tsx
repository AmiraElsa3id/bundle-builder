import { createContext, useContext, useReducer, type ReactNode } from "react";
import { configReducer, initialConfigState, type ConfigState, type ConfigAction } from "./configReducer";

const ConfigStateContext = createContext<ConfigState | null>(null);
const ConfigDispatchContext = createContext<React.Dispatch<ConfigAction> | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(configReducer, initialConfigState);

  return (
    <ConfigStateContext.Provider value={state}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigStateContext.Provider>
  );
}

export function useConfigState(): ConfigState {
  const ctx = useContext(ConfigStateContext);
  if (!ctx) throw new Error("useConfigState must be used within a ConfigProvider");
  return ctx;
}

export function useConfigDispatch(): React.Dispatch<ConfigAction> {
  const ctx = useContext(ConfigDispatchContext);
  if (!ctx) throw new Error("useConfigDispatch must be used within a ConfigProvider");
  return ctx;
}
