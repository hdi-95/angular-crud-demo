import { PrefKeys } from "./constants";

export function getPref(key: PrefKeys): string | null {
  return localStorage.getItem(key);
}

export function savePref(key: PrefKeys, value: string) {
  localStorage.setItem(key, value);
}
