import { useState, useEffect } from "react";

interface DebounceValueProps<T> {
  value: T;
  delayMs: number;
}

/**
 * Hook to debounce a value.
 *
 * Debouncing ensures that a function is not called too many times in a short
 * period of time. It takes a value and a delay (in milliseconds) and returns
 * the debounced value.
 *
 * The debounced value is the value that is returned after the specified delay
 * has elapsed.
 *
 * @param value The value to debounce
 * @param delayMs The delay in milliseconds
 * @returns The debounced value
 */
const useDebounce = <T>({ value, delayMs }: DebounceValueProps<T>): T => {
  const [debouncedValueState, setDebouncedValueState] = useState<T>(value);

  useEffect(() => {
    /**
     * Set a timeout to update the debounced value after the specified delay
     */
    const timeoutId = window.setTimeout(() => {
      setDebouncedValueState(value);
    }, delayMs);

    /**
     * Clear the timeout when the component is unmounted
     */
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value, delayMs]);

  return debouncedValueState;
};

export default useDebounce;
