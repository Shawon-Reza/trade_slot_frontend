'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Users, Calendar, CreditCard, Shield, MapPin, Smartphone } from 'lucide-react';

const traderFeatures = [
  {
    icon: Calendar,
    title: 'Manage your schedule',
    description: 'Set daily work areas with travel buffers. See all bookings at a glance.',
  },
  {
    icon: Users,
    title: 'Customer communication',
    description: 'Receive booking requests from web chat and WhatsApp in one place.',
  },
  {
    icon: CreditCard,
    title: 'Get paid automatically',
    description: 'Stripe Connect pays you directly. Platform fee deducted automatically.',
  },
  {
    icon: Shield,
    title: 'Verified bookings only',
    description: 'Every booking requires customer payment confirmation before it\'s confirmed.',
  },
];

export function ForTraders() {
  return (
    <section id="for-traders" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Built for tradespeople
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Manage your bookings, communicate with customers, and get paid — all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {traderFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{feature.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-zinc-900 dark:bg-zinc-100 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white dark:text-zinc-900 mb-4">Ready to grow your business?</h3>
          <p className="text-zinc-300 dark:text-zinc-600 mb-6 max-w-xl mx-auto">
            Join hundreds of tradespeople already using TradeSlot to fill their schedules and get paid on time.
          </p>
          <Link href="/register?type=trader">
            <Button size="lg" variant="secondary" className="gap-2">
              Join as a Trader
              <MapPin className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}