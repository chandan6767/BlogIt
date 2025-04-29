import { useState } from "react";

import dayjs from "dayjs";
import Logger from "js-logger";

const useLocalStorage = (key, initialValue, expiryInMs = null) => {
  const getStoredValue = () => {
    try {
      const stored = window.localStorage.getItem(key);
      if (!stored) return initialValue;

      const parsed = JSON.parse(stored);
      const { value, expiry } = parsed;

      if (expiry && dayjs().isAfter(dayjs(expiry))) {
        window.localStorage.removeItem(key);

        return initialValue;
      }

      return value ?? initialValue;
    } catch (err) {
      Logger.error("Error reading from localStorage", err);

      return initialValue;
    }
  };

  const [value, setValue] = useState(getStoredValue);

  const setStoredValue = newValue => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;

      setValue(valueToStore);

      const data = {
        value: valueToStore,
        expiry: expiryInMs
          ? dayjs().add(expiryInMs, "millisecond").toISOString()
          : null,
      };

      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      Logger.error("Error writing to localStorage", err);
    }
  };

  const removeStoredValue = () => {
    try {
      window.localStorage.removeItem(key);
      setValue(initialValue);
    } catch (err) {
      Logger.error("Error removing from localStorage", err);
    }
  };

  return [value, setStoredValue, removeStoredValue];
};

export default useLocalStorage;
