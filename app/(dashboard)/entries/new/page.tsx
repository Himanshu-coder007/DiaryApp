import { EntryForm } from '@/components/entries/EntryForm'

export default function NewEntryPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">New Entry</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">What's on your mind today?</p>
      </div>
      <EntryForm mode="create" />
    </div>
  )
}
