import { useState, useCallback } from 'react';

export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const start = useCallback(() => setIsLoading(true), []);
  const stop = useCallback(() => setIsLoading(false), []);
  const toggle = useCallback(() => setIsLoading((prev) => !prev), []);

  return { isLoading, start, stop, toggle };
};
