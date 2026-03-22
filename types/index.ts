import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: { id: string } & DefaultSession['user']
  }
}

export interface IEntryLean {
  _id: string
  userId: string
  title: string
  content: string
  mood?: 'happy' | 'neutral' | 'sad' | 'excited' | 'anxious'
  tags: string[]
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

export interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}
