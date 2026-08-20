import { Loader2 } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-black dark:text-white animate-spin" />
          <p className="text-zinc-600 dark:text-zinc-400 font-medium">Loading TradeSlot...</p>
        </div>
      </body>
    </html>
  );
}