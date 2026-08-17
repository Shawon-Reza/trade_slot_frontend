'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, X, AlertCircle, Info, HelpCircle } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info' | 'outline';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
      success: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      destructive: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      info: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      outline: 'bg-transparent border border-zinc-300 text-zinc-700 dark:border-zinc-600 dark:text-zinc-300',
    };

    const icons = {
      success: <Check className="h-3.5 w-3.5" />,
      warning: <AlertCircle className="h-3.5 w-3.5" />,
      destructive: <X className="h-3.5 w-3.5" />,
      info: <Info className="h-3.5 w-3.5" />,
      default: null,
      outline: null,
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full',
          variants[variant],
          className
        )}
        {...props}
      >
        {icons[variant]}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };