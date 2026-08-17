'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Sidebar, type NavItem } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { Avatar } from '@/components/ui/Avatar';
import { UserMenu, type UserMenuProps } from '@/components/ui/DropdownMenu';

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  user: UserMenuProps;
  headerTitle: string;
  headerBreadcrumb?: string;
}

export function DashboardLayout({ children, navItems, user, headerTitle, headerBreadcrumb }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex">
      <Sidebar
        navItems={navItems}
        user={user}
        onToggle={toggleCollapse}
        isCollapsed={sidebarCollapsed}
      />

      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        )}
      >
        <DashboardHeader
          title={headerTitle}
          breadcrumb={headerBreadcrumb}
          onMenuClick={toggleSidebar}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}