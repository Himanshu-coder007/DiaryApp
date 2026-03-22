import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Entry from '@/models/Entry'
import { EntryForm } from '@/components/entries/EntryForm'

export default async function EditEntryPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  await connectDB()
  const entry = await Entry.findOne({ _id: params.id, userId: session.user.id }).lean() as any
  if (!entry) notFound()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">Edit Entry</h1>
      </div>
      <EntryForm mode="edit" initialData={{
        _id:      params.id,
        title:    entry.title as string,
        content:  entry.content as string,
        mood:     entry.mood as string | undefined,
        tags:     entry.tags as string[],
        isPinned: entry.isPinned as boolean,
      }} />
    </div>
  )
}
