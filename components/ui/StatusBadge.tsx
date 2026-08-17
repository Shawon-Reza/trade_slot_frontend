'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { X, Check, AlertCircle, Clock, Loader2 } from 'lucide-react';

export interface StatusBadgeProps {
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'paid' | 'refunded';
  className?: string;
}

const statusConfig = {
  confirmed: { label: 'Confirmed', color: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: Check },
  pending: { label: 'Pending', color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: Clock },
  completed: { label: 'Completed', color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Check },
  cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: X },
  paid: { label: 'Paid', color: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: Check },
  refunded: { label: 'Refunded', color: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: AlertCircle },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full', config.color, className)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}