import Link from 'next/link'
import { BookOpen, PlusCircle } from 'lucide-react'

export function EmptyState({ search }: { search?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-3xl flex items-center justify-center mb-6">
        <BookOpen className="w-10 h-10 text-amber-600 dark:text-amber-400" />
      </div>
      <h3 className="text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
        {search ? `No results for "${search}"` : 'Your diary awaits'}
      </h3>
      <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-xs">
        {search ? 'Try different keywords or browse all entries.' : 'Start capturing your thoughts, memories, and moments.'}
      </p>
      {!search && (
        <Link href="/entries/new" className="flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-xl font-medium hover:bg-amber-800 transition-colors shadow-md shadow-amber-200 dark:shadow-none">
          <PlusCircle className="w-4 h-4" /> Write your first entry
        </Link>
      )}
    </div>
  )
}
