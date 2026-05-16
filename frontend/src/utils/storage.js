export function migrateStorageKey(oldKey, newKey) {
  const existing = localStorage.getItem(newKey)
  const legacy = localStorage.getItem(oldKey)
  if (!existing && legacy) {
    localStorage.setItem(newKey, legacy)
    localStorage.removeItem(oldKey)
  }
}
