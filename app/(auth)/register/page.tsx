'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push('/login?registered=1')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [key]: e.target.value })),
  })

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-700 rounded-2xl mb-4">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">Start your journal</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2">Create a free Chronicle account</p>
        </div>
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-amber-100 dark:border-stone-800 p-8 shadow-sm">
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-400">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: 'Name',     key: 'name'     as const, type: 'text',     placeholder: 'Alex Smith' },
              { label: 'Email',    key: 'email'    as const, type: 'email',    placeholder: 'you@example.com' },
              { label: 'Password', key: 'password' as const, type: 'password', placeholder: '••••••••' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{label}</label>
                <input type={type} placeholder={placeholder} required {...field(key)}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition" />
              </div>
            ))}
            <p className="text-xs text-stone-400 dark:text-stone-500">Password must be 8+ characters with an uppercase letter and a number.</p>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-amber-700 text-white rounded-xl font-medium hover:bg-amber-800 transition-colors disabled:opacity-50 shadow-sm shadow-amber-200 dark:shadow-none">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-stone-500 dark:text-stone-400">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-700 dark:text-amber-400 hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
