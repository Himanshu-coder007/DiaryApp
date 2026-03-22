import type { Metadata } from 'next'
import { Lora, DM_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const lora  = Lora({ subsets: ['latin'], variable: '--font-lora' })
const dmMono = DM_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Chronicle — Your Private Diary',
  description: 'A beautiful, secure personal diary app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lora.variable} ${dmMono.variable} font-serif antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
