'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Avatar } from '@/components/ui/Avatar';
import { mockCustomerBookings } from '@/lib/mock-data';

interface RecentBookingsProps {
  bookings?: typeof mockCustomerBookings;
}

export function RecentBookings({ bookings = mockCustomerBookings }: RecentBookingsProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent Bookings</h3>
        <button className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-medium">
          View all
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Trader</TableHead>
            <TableHead>Service</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden md:table-cell">Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar src={booking.trader.avatar} alt={booking.trader.name} size="sm" />
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{booking.trader.businessName || booking.trader.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[150px]">{booking.location}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium text-zinc-700 dark:text-zinc-300">{booking.service}</TableCell>
              <TableCell className="hidden md:table-cell text-zinc-600 dark:text-zinc-400">{formatDate(booking.date)}</TableCell>
              <TableCell className="hidden md:table-cell text-zinc-600 dark:text-zinc-400">{booking.time}</TableCell>
              <TableCell>
                <StatusBadge status={booking.status} />
              </TableCell>
              <TableCell>
                <StatusBadge status={booking.paymentStatus} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}