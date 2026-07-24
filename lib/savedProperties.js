// Client-only "favorites" list, kept in the visitor's browser (no account
// system exists, so this intentionally doesn't touch Supabase).
const STORAGE_KEY = "ksemya_saved_properties";
export const SAVED_PROPERTIES_EVENT = "ksemya-saved-properties-changed";

function readAll() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeAll(ids) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(SAVED_PROPERTIES_EVENT));
}

export function isPropertySaved(id) {
  return readAll().includes(id);
}

export function getSavedProperties() {
  return readAll();
}

export function toggleSavedProperty(id) {
  const current = readAll();
  const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
  writeAll(next);
  return next.includes(id);
}
