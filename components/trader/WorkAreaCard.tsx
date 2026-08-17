'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { MapPin, Clock, Edit2, ChevronRight } from 'lucide-react';
import { mockWorkAreas } from '@/lib/mock-data';

interface WorkAreaCardProps {
  workAreas?: typeof mockWorkAreas;
}

export function WorkAreaCard({ workAreas = mockWorkAreas }: WorkAreaCardProps) {
  const activeArea = workAreas.find((w) => w.isActive);
  const upcomingAreas = workAreas.filter((w) => !w.isActive);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Today's Work Area</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Set your service area for today</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Edit2 className="h-4 w-4" />
          Edit Work Area
        </Button>
      </div>

      {activeArea ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{activeArea.area}</p>
              <div className="flex items-center gap-4 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  Travel buffer: {activeArea.travelBuffer} min
                </span>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </div>

          {upcomingAreas.length > 0 && (
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Upcoming Work Areas</p>
              <div className="space-y-2">
                {upcomingAreas.map((area) => (
                  <div key={area.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-zinc-500" />
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">{area.area}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(area.date)}</p>
                      </div>
                    </div>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">{area.travelBuffer} min buffer</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <MapPin className="h-12 w-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">No work area set for today</p>
          <Button variant="primary" size="md">
            <MapPin className="h-4 w-4 mr-2" />
            Set Work Area
          </Button>
        </div>
      )}
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}