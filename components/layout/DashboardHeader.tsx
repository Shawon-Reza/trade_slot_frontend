'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  breadcrumb?: string;
  onMenuClick?: () => void;
  showSearch?: boolean;
}

export function DashboardHeader({ title, breadcrumb, onMenuClick, showSearch = true }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick} aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div>
            {breadcrumb && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[200px]">{breadcrumb}</p>
            )}
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 truncate">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {showSearch && (
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search..."
                className="h-9 w-64 pl-10 pr-4 text-sm bg-zinc-100 dark:bg-zinc-800 border-0 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                aria-label="Search"
              />
            </div>
          )}

          <Button variant="ghost" size="sm" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Button>

          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1" aria-hidden="true" />

          <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2" aria-label="User menu">
            <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">U</span>
            </div>
            <span className="hidden sm:block text-sm font-medium text-zinc-700 dark:text-zinc-300">User</span>
            <ChevronDown className="h-4 w-4 text-zinc-500 hidden sm:block" />
          </Button>
        </div>
      </div>
    </header>
  );
}