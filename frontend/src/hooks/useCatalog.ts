import { useEffect, useState } from "react";
import type { Catalog } from "../types/catalog";

interface UseCatalogResult {
  catalog: Catalog | null;
  loading: boolean;
  error: string | null;
}

export function useCatalog(): UseCatalogResult {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/catalog")
      .then((res) => {
        if (!res.ok) throw new Error(`Catalog request failed: ${res.status}`);
        return res.json() as Promise<Catalog>;
      })
      .then((data) => {
        if (!cancelled) setCatalog(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unknown error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { catalog, loading, error };
}
