'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Avatar } from '@/components/ui/Avatar';
import { MapPin, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { mockCustomerBookings } from '@/lib/mock-data';

interface UpcomingBookingCardProps {
  booking?: typeof mockCustomerBookings[0];
}

export function UpcomingBookingCard({ booking = mockCustomerBookings[0] }: UpcomingBookingCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <Avatar src={booking.trader.avatar} alt={booking.trader.name} size="md" />
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">{booking.trader.businessName || booking.trader.name}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{booking.service}</p>
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 flex-shrink-0 text-zinc-400" />
          <span>{formatDate(booking.date)} • {booking.time} – {formatEndTime(booking.time, booking.duration)}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 flex-shrink-0 text-zinc-400" />
          <span>{booking.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Payment:</span>
          <StatusBadge status={booking.paymentStatus} />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          View Booking
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatEndTime(startTime: string, duration: number): string {
  const [time, modifier] = startTime.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  
  const totalMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  
  const displayHours = endHours === 0 ? 12 : endHours > 12 ? endHours - 12 : endHours;
  const displayModifier = endHours >= 12 ? 'PM' : 'AM';
  
  return `${displayHours}:${endMinutes.toString().padStart(2, '0')} ${displayModifier}`;
}