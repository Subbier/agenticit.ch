type BlogFilters = Readonly<{ query: string; category: string }>

// Volatile state for this browser document: survives client-side article
// navigation, but is neither persisted nor added to URLs or requests.
export function createBlogSearchState() {
  const initial: BlogFilters = Object.freeze({ query: "", category: "" })
  let current = initial
  const listeners = new Set<() => void>()
  return {
    getSnapshot: () => current,
    getServerSnapshot: () => initial,
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    set(patch: Partial<BlogFilters>) {
      const next = { ...current, ...patch }
      if (next.query === current.query && next.category === current.category)
        return
      current = Object.freeze(next)
      for (const listener of listeners) listener()
    },
  }
}
