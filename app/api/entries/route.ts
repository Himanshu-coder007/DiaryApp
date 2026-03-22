import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Entry from '@/models/Entry'
import { entrySchema } from '@/lib/validations'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()

    const { searchParams } = new URL(req.url)
    const page  = parseInt(searchParams.get('page')  ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '9')
    const search = searchParams.get('search') ?? ''
    const tag    = searchParams.get('tag') ?? ''
    const mood   = searchParams.get('mood') ?? ''
    const skip   = (page - 1) * limit

    const query: any = { userId: session.user.id }
    if (search) query.$text = { $search: search }
    if (tag) query.tags = tag
    if (mood) query.mood = mood

    const [entries, total] = await Promise.all([
      Entry.find(query).sort({ isPinned: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      Entry.countDocuments(query),
    ])

    return NextResponse.json({ entries, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    const data = entrySchema.parse(body)
    await connectDB()
    const entry = await Entry.create({ ...data, userId: session.user.id })
    return NextResponse.json(entry, { status: 201 })
  } catch (err: any) {
    if (err.name === 'ZodError') return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
