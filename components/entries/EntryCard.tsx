'use client'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Pin, Smile, Meh, Frown, Zap, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { IEntryLean } from '@/types'

const moodConfig = {
  happy:   { icon: Smile,       color: 'text-yellow-500', label: 'Happy' },
  neutral: { icon: Meh,         color: 'text-stone-400',  label: 'Neutral' },
  sad:     { icon: Frown,       color: 'text-blue-400',   label: 'Sad' },
  excited: { icon: Zap,         color: 'text-orange-500', label: 'Excited' },
  anxious: { icon: AlertCircle, color: 'text-purple-500', label: 'Anxious' },
}

interface EntryCardProps { entry: IEntryLean; onDelete: (id: string) => void }

export function EntryCard({ entry, onDelete }: EntryCardProps) {
  const mood = entry.mood ? moodConfig[entry.mood] : null
  const MoodIcon = mood?.icon
  const preview = entry.content.replace(/<[^>]*>/g, '').slice(0, 130)

  return (
    <article className="group relative bg-white dark:bg-stone-800 rounded-2xl border border-amber-100 dark:border-stone-700 p-5 hover:shadow-lg hover:shadow-amber-100/50 dark:hover:shadow-stone-900/50 hover:-translate-y-0.5 transition-all duration-200">
      {entry.isPinned && (
        <div className="absolute top-3 right-3"><Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /></div>
      )}
      <Link href={`/entries/${entry._id}`} className="block">
        <time className="text-xs font-mono text-stone-400 dark:text-stone-500">
          {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
        </time>
        <h2 className="mt-2 text-base font-bold text-stone-900 dark:text-stone-100 leading-snug line-clamp-2 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
          {entry.title}
        </h2>
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed">{preview}…</p>
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {entry.tags.slice(0, 3).map(tag => <Badge key={tag} variant="soft">#{tag}</Badge>)}
        </div>
        {MoodIcon && mood && (
          <div className="flex items-center gap-1">
            <MoodIcon className={`w-4 h-4 ${mood.color}`} />
            <span className="text-xs text-stone-400">{mood.label}</span>
          </div>
        )}
      </div>
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <Link href={`/entries/${entry._id}/edit`} className="px-2.5 py-1 text-xs bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors">Edit</Link>
        <button onClick={e => { e.preventDefault(); onDelete(entry._id) }} className="px-2.5 py-1 text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">Delete</button>
      </div>
    </article>
  )
}
