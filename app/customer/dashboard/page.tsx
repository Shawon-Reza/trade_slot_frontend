'use client';

import * as React from 'react';
import { Plus, Search } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { UpcomingBookingCard } from '@/components/customer/UpcomingBookingCard';
import { RecentBookings } from '@/components/customer/RecentBookings';
import { mockCustomerStats, mockCustomer, navItemsCustomer } from '@/lib/mock-data';

const navItems = navItemsCustomer.map(item => ({
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
    Search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    Calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    Settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  };
  return paths[iconName] || paths.LayoutDashboard;
}

export default function CustomerDashboardPage() {
  return (
    <DashboardLayout
      navItems={navItems}
      user={{
        name: mockCustomer.name,
        email: mockCustomer.email,
        avatar: mockCustomer.avatar,
        onLogout: () => window.location.href = '/login',
      }}
      headerTitle="Dashboard"
      headerBreadcrumb="Customer"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Good morning, {mockCustomer.name}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Manage your upcoming services and bookings.
          </p>
        </div>

        <SectionHeader
          title="Overview"
          action={
            <Button variant="primary" size="sm" className="gap-1.5">
              <Search className="h-4 w-4" />
              Book a Trader
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {mockCustomerStats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              comparison={stat.comparison}
              icon={stat.icon}
              trend={stat.label.includes('Spent') ? 'neutral' : 'up'}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <UpcomingBookingCard />
          </div>
          <div className="space-y-6">
            <RecentBookings />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}