'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Bold, Italic, List, ListOrdered, Quote, Heading2, Undo, Redo } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichEditorProps { value: string; onChange: (value: string) => void }

export function RichEditor({ value, onChange }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Write your thoughts here...' }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-stone dark:prose-invert prose-sm sm:prose-base max-w-none focus:outline-none px-5 py-4 min-h-[16rem]',
      },
    },
  })

  if (!editor) return null

  const ToolBtn = ({ onClick, active, title, children }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) => (
    <button type="button" title={title} onClick={onClick}
      className={cn('p-2 rounded-lg transition-colors', active ? 'bg-amber-700 text-white' : 'text-stone-500 hover:bg-amber-50 dark:hover:bg-stone-800 hover:text-amber-700 dark:hover:text-amber-400')}>
      {children}
    </button>
  )

  return (
    <div>
      <div className="flex items-center gap-0.5 px-3 py-2 border-b border-amber-200 dark:border-stone-700 bg-amber-50/50 dark:bg-stone-800/50 flex-wrap">
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><Bold className="w-4 h-4" /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><Italic className="w-4 h-4" /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading"><Heading2 className="w-4 h-4" /></ToolBtn>
        <div className="w-px h-5 bg-stone-200 dark:bg-stone-700 mx-1" />
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list"><List className="w-4 h-4" /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered list"><ListOrdered className="w-4 h-4" /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote"><Quote className="w-4 h-4" /></ToolBtn>
        <div className="w-px h-5 bg-stone-200 dark:bg-stone-700 mx-1" />
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo className="w-4 h-4" /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo className="w-4 h-4" /></ToolBtn>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
