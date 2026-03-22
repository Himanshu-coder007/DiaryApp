'use client'
import { useState } from 'react'
import { Menu, X, BookOpen } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="md:hidden flex items-center justify-between px-4 py-4 bg-amber-50 dark:bg-stone-900 border-b border-amber-200 dark:border-stone-700 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          <span className="font-bold text-amber-900 dark:text-amber-100 font-serif">Chronicle</span>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button onClick={() => setOpen(true)} className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-amber-100 dark:hover:bg-stone-800">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 flex flex-col shadow-xl">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/20 text-white hover:bg-black/30">
              <X className="w-4 h-4" />
            </button>
            <Sidebar onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
