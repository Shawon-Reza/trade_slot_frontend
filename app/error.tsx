'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
        <div className="max-w-md w-full text-center py-12">
          <div className="mb-6">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Something went wrong
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            We encountered an unexpected error. Please try refreshing the page or go back home.
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
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left">
              <summary className="text-sm text-zinc-500 dark:text-zinc-400 cursor-pointer">
                Error Details
              </summary>
              <pre className="mt-2 p-4 bg-zinc-100 dark:bg-zinc-800 rounded text-xs text-zinc-700 dark:text-zinc-300 overflow-auto max-h-64">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
                {error.stack && `\n\nStack:\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>
      </body>
    </html>
  );
}