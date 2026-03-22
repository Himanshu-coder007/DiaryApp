'use client'
import { useState, useEffect, useCallback } from 'react'
import { EntryCard } from '@/components/entries/EntryCard'
import { EntryGridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/entries/EmptyState'
import { useToast } from '@/components/ui/Toast'
import { Search } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import Link from 'next/link'
import type { IEntryLean, Pagination } from '@/types'

const MOODS = ['happy', 'excited', 'neutral', 'anxious', 'sad']

export default function DashboardPage() {
  const [entries, setEntries] = useState<IEntryLean[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [mood, setMood] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const { toast } = useToast()
  const debouncedSearch = useDebounce(search, 400)

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '9' })
      if (debouncedSearch) params.set('search', debouncedSearch)
      if (mood) params.set('mood', mood)
      const res = await fetch(`/api/entries?${params}`)
      const data = await res.json()
      setEntries(data.entries)
      setPagination(data.pagination)
    } catch { toast('Failed to load entries', 'error') }
    finally { setLoading(false) }
  }, [page, debouncedSearch, mood])

  useEffect(() => { fetchEntries() }, [fetchEntries])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry? This cannot be undone.')) return
    const res = await fetch(`/api/entries/${id}`, { method: 'DELETE' })
    if (res.ok) { toast('Entry deleted', 'success'); fetchEntries() }
    else toast('Failed to delete entry', 'error')
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-stone-100">My Journal</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">
            {pagination ? `${pagination.total} entr${pagination.total === 1 ? 'y' : 'ies'}` : ' '}
          </p>
        </div>
        <Link href="/entries/new" className="shrink-0 flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-xl text-sm font-medium hover:bg-amber-800 transition-colors shadow-sm">
          + New Entry
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search entries..."
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-xl text-sm text-stone-700 dark:text-stone-300 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition" />
        </div>
        <select value={mood} onChange={e => { setMood(e.target.value); setPage(1) }}
          className="px-4 py-2.5 bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-xl text-sm text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400">
          <option value="">All moods</option>
          {MOODS.map(m => <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}
        </select>
      </div>
      {loading ? <EntryGridSkeleton />
        : entries.length === 0 ? <EmptyState search={search} />
        : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {entries.map(entry => <EntryCard key={entry._id} entry={entry} onDelete={handleDelete} />)}
            </div>
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {Array.from({ length: pagination.pages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                      page === i + 1 ? 'bg-amber-700 text-white' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-amber-200 dark:border-stone-700 hover:border-amber-400'
                    }`}>{i + 1}</button>
                ))}
              </div>
            )}
          </>
        )}
    </div>
  )
}
