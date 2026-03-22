import { cn } from '@/lib/utils'

interface BadgeProps { children: React.ReactNode; variant?: 'soft' | 'solid'; className?: string }

export function Badge({ children, variant = 'soft', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variant === 'soft' && 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      variant === 'solid' && 'bg-amber-700 text-white',
      className
    )}>
      {children}
    </span>
  )
}
