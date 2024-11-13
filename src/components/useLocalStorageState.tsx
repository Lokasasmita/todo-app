import { useState, useEffect } from "react";

function useLocalStorageState<T>(key: string, defaultValue: T) {
  // Lazy state initialization to load data from localStorage
  const [state, setState] = useState<T>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    return valueInLocalStorage ? JSON.parse(valueInLocalStorage) : defaultValue;
  });

  // Update localStorage whenever the state changes
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}

export default useLocalStorageState;
