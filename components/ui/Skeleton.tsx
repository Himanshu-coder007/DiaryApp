export function EntrySkeleton() {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border border-amber-100 dark:border-stone-700 p-5 animate-pulse">
      <div className="h-3 w-24 bg-stone-200 dark:bg-stone-700 rounded mb-3" />
      <div className="h-5 w-3/4 bg-stone-200 dark:bg-stone-700 rounded mb-2" />
      <div className="h-4 w-full bg-stone-100 dark:bg-stone-700/50 rounded mb-1" />
      <div className="h-4 w-5/6 bg-stone-100 dark:bg-stone-700/50 rounded mb-1" />
      <div className="h-4 w-2/3 bg-stone-100 dark:bg-stone-700/50 rounded" />
      <div className="flex gap-2 mt-4">
        <div className="h-5 w-14 bg-amber-100 dark:bg-amber-900/20 rounded-full" />
        <div className="h-5 w-16 bg-amber-100 dark:bg-amber-900/20 rounded-full" />
      </div>
    </div>
  )
}

export function EntryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => <EntrySkeleton key={i} />)}
    </div>
  )
}
