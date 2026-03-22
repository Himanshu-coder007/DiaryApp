'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/Toast'
import { RichEditor } from '@/components/editor/RichEditor'
import { Button } from '@/components/ui/Button'
import { Pin, Tag } from 'lucide-react'

const MOODS = [
  { value: 'happy',   emoji: '😊', label: 'Happy' },
  { value: 'excited', emoji: '⚡', label: 'Excited' },
  { value: 'neutral', emoji: '😐', label: 'Neutral' },
  { value: 'anxious', emoji: '😰', label: 'Anxious' },
  { value: 'sad',     emoji: '😢', label: 'Sad' },
]

interface EntryFormProps {
  initialData?: { _id?: string; title?: string; content?: string; mood?: string; tags?: string[]; isPinned?: boolean }
  mode: 'create' | 'edit'
}

export function EntryForm({ initialData, mode }: EntryFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [title,    setTitle]    = useState(initialData?.title    ?? '')
  const [content,  setContent]  = useState(initialData?.content  ?? '')
  const [mood,     setMood]     = useState(initialData?.mood     ?? '')
  const [tags,     setTags]     = useState<string[]>(initialData?.tags ?? [])
  const [tagInput, setTagInput] = useState('')
  const [isPinned, setIsPinned] = useState(initialData?.isPinned ?? false)

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim()) && tags.length < 10) setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) { toast('Title and content are required', 'error'); return }
    setLoading(true)
    try {
      const url    = mode === 'edit' ? `/api/entries/${initialData?._id}` : '/api/entries'
      const method = mode === 'edit' ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, mood: mood || undefined, tags, isPinned }),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error) }
      toast(mode === 'edit' ? 'Entry updated!' : 'Entry published!', 'success')
      router.push('/')
      router.refresh()
    } catch (err: any) {
      toast(err.message || 'Something went wrong', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <input
        value={title} onChange={e => setTitle(e.target.value)}
        placeholder="Entry title..."
        className="w-full text-3xl sm:text-4xl font-bold font-serif bg-transparent border-none outline-none text-stone-900 dark:text-stone-100 placeholder-stone-300 dark:placeholder-stone-600"
      />
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-stone-500 dark:text-stone-400">Mood:</span>
        {MOODS.map(m => (
          <button key={m.value} type="button" onClick={() => setMood(mood === m.value ? '' : m.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${
              mood === m.value ? 'bg-amber-700 border-amber-700 text-white' : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
            }`}>
            <span>{m.emoji}</span> {m.label}
          </button>
        ))}
      </div>
      <div className="border border-amber-200 dark:border-stone-700 rounded-2xl overflow-hidden">
        <RichEditor value={content} onChange={setContent} />
      </div>
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm">
              #{tag}
              <button onClick={() => setTags(tags.filter(t => t !== tag))} className="text-amber-600 hover:text-amber-800 ml-1 leading-none">×</button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-stone-400" />
          <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag}
            placeholder="Add tag, press Enter"
            className="text-sm bg-transparent outline-none text-stone-700 dark:text-stone-300 placeholder-stone-400" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-amber-100 dark:border-stone-800">
        <button type="button" onClick={() => setIsPinned(!isPinned)}
          className={`flex items-center gap-2 text-sm transition-colors ${isPinned ? 'text-amber-600' : 'text-stone-400 hover:text-amber-600'}`}>
          <Pin className={`w-4 h-4 ${isPinned ? 'fill-amber-600' : ''}`} />
          {isPinned ? 'Pinned' : 'Pin entry'}
        </button>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => router.back()} disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit} loading={loading}>{mode === 'edit' ? 'Save changes' : 'Publish entry'}</Button>
        </div>
      </div>
    </div>
  )
}
