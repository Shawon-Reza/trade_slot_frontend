import { Loader2 } from 'lucide-react';

export default function CustomerLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="h-16 mb-8 animate-pulse">
          <div className="h-full w-1/4 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-zinc-200 dark:bg-zinc-700 rounded-xl animate-pulse" />
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-zinc-200 dark:bg-zinc-700 rounded-xl animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-64 bg-zinc-200 dark:bg-zinc-700 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}