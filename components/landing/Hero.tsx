'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle, Clock, MapPin } from 'lucide-react';


export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Now available in Dhaka
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
          Book trusted tradespeople{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400">
            without the hassle
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          TradeSlot makes it easy to find, communicate with, and book qualified tradespeople for your home or business.
          No more endless calls, missed appointments, or payment confusion.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register?type=customer">
            <Button size="xl" className="gap-2">
              Find a Trader
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/register?type=trader">
            <Button variant="outline" size="xl">Join as a Trader</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}