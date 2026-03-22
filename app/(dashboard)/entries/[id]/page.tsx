import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Entry from '@/models/Entry'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, Edit, Pin } from 'lucide-react'

export default async function ViewEntryPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  await connectDB()
  const entry = await Entry.findOne({ _id: params.id, userId: session.user.id }).lean()
  if (!entry) notFound()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to journal
        </Link>
        <Link href={`/entries/${params.id}/edit`} className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-xl text-sm font-medium hover:bg-amber-800 transition-colors">
          <Edit className="w-3.5 h-3.5" /> Edit
        </Link>
      </div>
      <article>
        <div className="flex items-center gap-3 mb-4">
          <time className="text-sm font-mono text-stone-400 dark:text-stone-500">
            {format(new Date(entry.createdAt as Date), 'MMMM d, yyyy · h:mm a')}
          </time>
          {entry.isPinned && <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-stone-100 mb-6 leading-tight">
          {entry.title as string}
        </h1>
        {(entry.tags as string[]).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {(entry.tags as string[]).map(tag => (
              <span key={tag} className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm">#{tag}</span>
            ))}
          </div>
        )}
        <div
          className="prose prose-stone dark:prose-invert prose-sm sm:prose-base max-w-none"
          dangerouslySetInnerHTML={{ __html: entry.content as string }}
        />
      </article>
    </div>
  )
}
