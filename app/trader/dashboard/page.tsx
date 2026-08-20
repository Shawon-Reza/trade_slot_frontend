'use client';

import * as React from 'react';
import { Plus, MapPin, Building2, Search, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { WorkAreaCard } from '@/components/trader/WorkAreaCard';
import { UpcomingBookings } from '@/components/trader/UpcomingBookings';
import { RecentActivity } from '@/components/trader/RecentActivity';
import { TraderProfileSetup } from '@/components/trader/TraderProfileSetup';
import { mockTraderStats, mockTrader, navItemsTrader } from '@/lib/mock-data';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { axiosApi } from '@/lib/axios';

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
    Settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-1.065-2.572c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  };
  return paths[iconName] || paths.LayoutDashboard;
}

// Loading State Component
function DashboardLoading() {
  return (
    <DashboardLayout
      navItems={navItems}
      user={{
        name: 'Loading...',
        email: '',
        onLogout: () => {},
      }}
      headerTitle="Dashboard"
      headerBreadcrumb="Trader"
    >
      <div className="space-y-8">
        <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded" />
        <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded-xl" />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded-xl" />
            <div className="h-64 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded-xl" />
          </div>
          <div className="space-y-6">
            <div className="h-64 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded-xl" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Error State Component
function DashboardError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <DashboardLayout
      navItems={navItems}
      user={{
        name: 'Error',
        email: '',
        onLogout: () => {},
      }}
      headerTitle="Dashboard"
      headerBreadcrumb="Trader"
    >
      <div className="max-w-md mx-auto text-center py-12">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Something went wrong
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">{message}</p>
        <Button variant="primary" onClick={onRetry} className="gap-2">
          <Loader2 className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </DashboardLayout>
  );
}

export default function TraderDashboardPage() {
  const router = useRouter();

  // Session hook - always called first
  const { data: session, isPending: sessionLoading, refetch: sessionRefetch } = authClient.useSession();

  // Trader existence query - always called, but enabled conditionally
  const { data: traderProfile, isLoading: profileLoading, error: profileError, refetch: refetchProfile } = useQuery({
    queryKey: ['traderExistance'],
    queryFn: async () => {
      try {
        const res = await axiosApi.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/trader/traderExistance`
        );
        console.log("asdsfsed============================", res)
        return res.data;


      } catch (error: any) {
        if (error.response?.status === 404) {
          return null;
        }

        throw error;
      }
    },
    staleTime: 0,
    refetchOnMount: "always",
  });

  console.log("----------------------------------------", traderProfile)

  // Early returns for loading/error states (after hooks)
  if (sessionLoading) {
    return <DashboardLoading />;
  }

  if (!session) {
    // Redirect will be handled by layout or middleware
    return null;
  }

  const user = session?.user as
    | (typeof session.user & {
      activeMode: 'CUSTOMER' | 'TRADER';
    })
    | undefined;

  const activeMode = user?.activeMode;

  // Handle CUSTOMER mode - redirect to customer dashboard
  if (activeMode === 'CUSTOMER') {
    return (
      <DashboardLayout
        navItems={navItems}
        user={{
          name: user?.name || 'User',
          email: user?.email || '',
          avatar: user?.image ?? undefined,
          onLogout: () => window.location.href = '/login',
        }}
        headerTitle="Dashboard"
        headerBreadcrumb="Trader"
      >
        <div className="max-w-md mx-auto text-center py-12 my-auto">
          <Building2 className="h-16 w-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Switch to Customer Mode
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Your account is currently in Customer mode. Please switch to Trader mode to access the trader dashboard.
          </p>
          <Button variant="primary" onClick={() => router.push('/customer/dashboard')} className="gap-2">
            Go to Customer Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Handle TRADER mode - check profile existence
  if (profileLoading) {
    return <DashboardLoading />;
  }

  if (profileError) {
    return (
      <DashboardError
        message="Failed to check trader profile. Please try again."
        onRetry={() => refetchProfile()}
      />
    );
  }

  // Profile doesn't exist - show setup centered on screen
  if (!traderProfile?.traderExistance) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
        <TraderProfileSetup onComplete={() => refetchProfile()} />
      </div>
    );
  }

  // Profile exists - show full dashboard
  return (
    <DashboardLayout
      navItems={navItems}
      user={{
        name: user?.name || mockTrader.name,
        email: user?.email || mockTrader.email,
        avatar: user?.image ?? mockTrader.avatar,
        onLogout: () => window.location.href = '/login',
      }}
      headerTitle="Dashboard"
      headerBreadcrumb="Trader"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Good morning, {user?.name || mockTrader.name}
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