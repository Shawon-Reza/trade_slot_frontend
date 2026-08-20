'use client';

import { Button } from '@/components/ui/Button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface TraderErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TraderError({ error, reset }: TraderErrorProps) {
  console.error('Trader dashboard error:', error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="max-w-md w-full text-center py-12">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Trader Dashboard Error
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Something went wrong loading your trader dashboard. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" onClick={reset} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
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