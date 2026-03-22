'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { BookOpen, PlusCircle, Search, LayoutGrid, LogOut } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/',            label: 'All Entries', icon: LayoutGrid },
  { href: '/entries/new', label: 'New Entry',   icon: PlusCircle },
  { href: '/search',      label: 'Search',      icon: Search },
]

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="flex flex-col h-full bg-amber-50 dark:bg-stone-900 border-r border-amber-200 dark:border-stone-700 w-64">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-amber-200 dark:border-stone-700">
        <BookOpen className="w-6 h-6 text-amber-700 dark:text-amber-400" />
        <span className="text-lg font-bold text-amber-900 dark:text-amber-100 font-serif tracking-tight">Chronicle</span>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} onClick={onClose} className={cn(
            'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
            pathname === href
              ? 'bg-amber-700 text-white shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:bg-amber-100 dark:hover:bg-stone-800 hover:text-amber-900 dark:hover:text-amber-200'
          )}>
            <Icon className="w-4 h-4" /> {label}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-amber-200 dark:border-stone-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {session?.user?.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate">{session?.user?.name}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{session?.user?.email}</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-2 w-full px-4 py-2 rounded-xl text-sm text-stone-600 dark:text-stone-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </aside>
  )
}
