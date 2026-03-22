# Chronicle — Full-Stack Diary App

A private, beautiful diary app built with Next.js 14, MongoDB, and TailwindCSS.

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env.local` and fill in your values:
```
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
GOOGLE_CLIENT_ID=   # optional
GOOGLE_CLIENT_SECRET=  # optional
```

### 3. Run locally
```bash
npm run dev
```
Open http://localhost:3000

---

## Tech Stack
- **Next.js 14** — App Router, Server Components, API Routes
- **MongoDB + Mongoose** — Database with text search index
- **NextAuth.js** — JWT auth with Credentials + Google OAuth
- **Tiptap** — Rich text editor (bold, italic, headings, lists, blockquotes)
- **TailwindCSS** — Mobile-first responsive design
- **next-themes** — Dark mode toggle
- **Zod** — Input validation on all API routes
- **bcryptjs** — Password hashing (12 rounds)

## Features
- Create, edit, delete diary entries
- Rich text editor with formatting toolbar
- Mood tracking (happy, excited, neutral, anxious, sad)
- Tag entries (up to 10 tags each)
- Pin important entries to the top
- Full-text search across title, content, and tags
- Filter by mood
- Pagination (9 entries per page)
- Dark mode
- Fully responsive (mobile drawer sidebar, responsive grid)
- Loading skeletons
- Toast notifications
- Empty states

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set these env vars in the Vercel dashboard:
- `MONGODB_URI`
- `NEXTAUTH_URL` (your vercel domain)
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID` (optional)
- `GOOGLE_CLIENT_SECRET` (optional)

## Project Structure
```
chronicle/
├── app/
│   ├── (auth)/login|register     # Auth pages
│   ├── (dashboard)/              # Protected pages
│   │   ├── page.tsx              # Journal grid
│   │   ├── entries/new           # Create entry
│   │   ├── entries/[id]          # View entry
│   │   ├── entries/[id]/edit     # Edit entry
│   │   └── search                # Search page
│   └── api/auth|entries          # API routes
├── components/
│   ├── editor/RichEditor         # Tiptap editor
│   ├── entries/                  # Entry card, form, empty state
│   ├── layout/                   # Sidebar, header, theme toggle
│   └── ui/                       # Button, badge, skeleton, toast
├── lib/                          # MongoDB, NextAuth, Zod schemas, utils
├── models/                       # Mongoose User + Entry models
├── hooks/                        # useDebounce, useToast
└── types/                        # TypeScript interfaces
```
