import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Entry from '@/models/Entry'
import { entrySchema } from '@/lib/validations'

async function getOwned(id: string, userId: string) {
  return Entry.findOne({ _id: id, userId })
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const entry = await getOwned(params.id, session.user.id)
    if (!entry) return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    return NextResponse.json(entry)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const entry = await getOwned(params.id, session.user.id)
    if (!entry) return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    const body = await req.json()
    const data = entrySchema.partial().parse(body)
    const updated = await Entry.findByIdAndUpdate(params.id, data, { new: true, runValidators: true })
    return NextResponse.json(updated)
  } catch (err: any) {
    if (err.name === 'ZodError') return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const entry = await getOwned(params.id, session.user.id)
    if (!entry) return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    await Entry.findByIdAndDelete(params.id)
    return NextResponse.json({ message: 'Entry deleted' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
