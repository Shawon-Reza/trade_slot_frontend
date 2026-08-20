'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, Search, RotateCcw } from 'lucide-react';

export default function CustomerNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="max-w-md w-full text-center py-12">
        <div className="text-6xl font-bold text-zinc-200 dark:text-zinc-800 mb-4">404</div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Customer page not found
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          The customer page you're looking for doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/customer/dashboard">
            <Button variant="primary" className="gap-2">
              <Search className="h-4 w-4" />
              Customer Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}