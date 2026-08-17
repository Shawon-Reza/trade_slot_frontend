'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Clock, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { mockActivities } from '@/lib/mock-data';

interface ActivityItemProps {
  message: string;
  timestamp: string;
  type: 'booking' | 'payment' | 'workarea';
}

function ActivityItem({ message, timestamp, type }: ActivityItemProps) {
  const icons = {
    booking: { icon: Clock, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    payment: { icon: CreditCard, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
    workarea: { icon: MapPin, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  };

  const config = icons[type];

  return (
    <div className="flex items-start gap-3">
      <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0', config.bg)}>
        <config.icon className={cn('h-4 w-4', config.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{message}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{timestamp}</p>
      </div>
    </div>
  );
}

interface RecentActivityProps {
  activities?: typeof mockActivities;
}

export function RecentActivity({ activities = mockActivities }: RecentActivityProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
      </div>
    </div>
  );
}