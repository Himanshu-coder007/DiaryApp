import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import { registerSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = registerSchema.parse(body)
    await connectDB()
    const exists = await User.findOne({ email: data.email })
    if (exists) return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    const user = await User.create(data)
    return NextResponse.json(
      { message: 'Account created', user: { id: user._id, name: user.name, email: user.email } },
      { status: 201 }
    )
  } catch (err: any) {
    if (err.name === 'ZodError') return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
