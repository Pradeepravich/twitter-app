import { useCallback, useEffect, useMemo, useState } from 'react';

const useAsync = <T, P = undefined, E = string>(
  asyncFunction: (params?: P) => Promise<T>,
  immediate: boolean,
  params?: P,
  initialState?: T
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T>((initialState || null) as T);
  const [error, setError] = useState<E | null>(null);

  const isLoading = useMemo(
    () =>
      (status === 'pending'
        ? true
        : status === 'success' || status === 'error'
        ? false
        : undefined) as boolean,
    [status]
  );

  const execute = useCallback(
    async (params?: P) => {
      setStatus('pending');
      setError(null);
      try {
        const res: T = await asyncFunction(params);
        setValue(res);
        (res as any)?.unProcessed?.length ? setStatus('error') : setStatus('success');
        return res;
      } catch (error) {
        setError(error);
        setStatus('error');
        throw error;
      }
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute(params);
    }
  }, [execute, immediate, params]);

  return { execute, status, value, error, isLoading, setValue } as const;
};

export default useAsync;
