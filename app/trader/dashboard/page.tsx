'use client';

import * as React from 'react';
import { Plus, MapPin } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { WorkAreaCard } from '@/components/trader/WorkAreaCard';
import { UpcomingBookings } from '@/components/trader/UpcomingBookings';
import { RecentActivity } from '@/components/trader/RecentActivity';
import { mockTraderStats, mockTrader, navItemsTrader } from '@/lib/mock-data';

const navItems = navItemsTrader.map(item => ({
  ...item,
  icon: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath(item.icon)} />
    </svg>
  ),
}));

function getIconPath(iconName: string): string {
  const paths: Record<string, string> = {
    LayoutDashboard: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    MapPin: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
    Calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    CreditCard: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    Settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  };
  return paths[iconName] || paths.LayoutDashboard;
}

export default function TraderDashboardPage() {
  return (
    <DashboardLayout
      navItems={navItems}
      user={{
        name: mockTrader.name,
        email: mockTrader.email,
        avatar: mockTrader.avatar,
        onLogout: () => window.location.href = '/login',
      }}
      headerTitle="Dashboard"
      headerBreadcrumb="Trader"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Good morning, {mockTrader.name}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Here's what's happening with your business today.
          </p>
        </div>

        <SectionHeader
          title="Overview"
          action={
            <Button variant="primary" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Set Work Area
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTraderStats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              comparison={stat.comparison}
              icon={stat.icon}
              trend={stat.label.includes('Earnings') ? 'up' : 'neutral'}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WorkAreaCard />
            <UpcomingBookings />
          </div>
          <div className="space-y-6">
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}