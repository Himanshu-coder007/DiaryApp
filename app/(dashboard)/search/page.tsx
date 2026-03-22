'use client'
import { useState } from 'react'
import { EntryCard } from '@/components/entries/EntryCard'
import { EntryGridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/entries/EmptyState'
import { useToast } from '@/components/ui/Toast'
import { useDebounce } from '@/hooks/useDebounce'
import { Search } from 'lucide-react'
import { useEffect } from 'react'
import type { IEntryLean } from '@/types'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [entries, setEntries] = useState<IEntryLean[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const debounced = useDebounce(query, 400)

  useEffect(() => {
    if (!debounced) { setEntries([]); return }
    setLoading(true)
    fetch(`/api/entries?search=${encodeURIComponent(debounced)}&limit=18`)
      .then(r => r.json())
      .then(d => setEntries(d.entries))
      .catch(() => toast('Search failed', 'error'))
      .finally(() => setLoading(false))
  }, [debounced])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry?')) return
    const res = await fetch(`/api/entries/${id}`, { method: 'DELETE' })
    if (res.ok) { toast('Deleted', 'success'); setEntries(e => e.filter(x => x._id !== id)) }
    else toast('Failed to delete', 'error')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-stone-100">Search</h1>
      </div>
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
        <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search by title, content, or tag..."
          className="w-full pl-12 pr-5 py-3.5 bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-2xl text-stone-700 dark:text-stone-300 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition text-base" />
      </div>
      {!query ? (
        <p className="text-center text-stone-400 dark:text-stone-500 py-16">Type something to search your journal</p>
      ) : loading ? <EntryGridSkeleton />
      : entries.length === 0 ? <EmptyState search={query} />
      : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map(entry => <EntryCard key={entry._id} entry={entry} onDelete={handleDelete} />)}
        </div>
      )}
    </div>
  )
}
