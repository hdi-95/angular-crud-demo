import { PrefKeys } from "./constants";

export function getPref(key: PrefKeys): string {
  return localStorage.getItem(key) || "none";
}

export function savePref(key: PrefKeys, value: string) {
  localStorage.setItem(key, value);
}

export function generateUniqueId(): number {
  return Number(
    Date.now().toString() + Math.floor(Math.random() * 1000).toString()
  );
}
