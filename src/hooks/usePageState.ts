import { useState, useCallback } from 'react';

export interface PageState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UsePageStateReturn<T> extends PageState<T> {
  setLoading: () => void;
  setData: (data: T) => void;
  setError: (error: string) => void;
  reset: () => void;
  retry: () => void;
  isEmpty: boolean;
}

export function usePageState<T>(
  initialData: T | null = null,
  fetchFn?: () => Promise<T>,
): UsePageStateReturn<T> {
  const [state, setState] = useState<PageState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const setLoading = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
  }, []);

  const setData = useCallback((data: T) => {
    setState({ data, loading: false, error: null });
  }, []);

  const setError = useCallback((error: string) => {
    setState((prev) => ({ ...prev, loading: false, error }));
  }, []);

  const reset = useCallback(() => {
    setState({ data: initialData, loading: false, error: null });
  }, [initialData]);

  const retry = useCallback(() => {
    if (fetchFn) {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      fetchFn()
        .then((data) => setState({ data, loading: false, error: null }))
        .catch((err) =>
          setState((prev) => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err.message : 'Erro inesperado. Tente novamente.',
          })),
        );
    }
  }, [fetchFn]);

  const isEmpty =
    !state.loading &&
    !state.error &&
    (state.data === null ||
      (Array.isArray(state.data) && state.data.length === 0));

  return {
    ...state,
    setLoading,
    setData,
    setError,
    reset,
    retry,
    isEmpty,
  };
}
