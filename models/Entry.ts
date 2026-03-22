import mongoose, { Schema, Document } from 'mongoose'

export interface IEntry extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  content: string
  mood?: 'happy' | 'neutral' | 'sad' | 'excited' | 'anxious'
  tags: string[]
  isPinned: boolean
  createdAt: Date
  updatedAt: Date
}

const EntrySchema = new Schema<IEntry>(
  {
    userId:   { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title:    { type: String, required: [true, 'Title is required'], trim: true, maxlength: 200 },
    content:  { type: String, required: [true, 'Content is required'], maxlength: 50000 },
    mood:     { type: String, enum: ['happy', 'neutral', 'sad', 'excited', 'anxious'] },
    tags:     { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
)

EntrySchema.index({ title: 'text', content: 'text', tags: 'text' })
EntrySchema.index({ userId: 1, createdAt: -1 })

export default mongoose.models.Entry || mongoose.model<IEntry>('Entry', EntrySchema)
