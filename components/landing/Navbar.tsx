'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SidebarDrawer from './SidebarDrawer';

const navItems = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'For Traders', href: '#for-traders' },
  { label: 'For Customers', href: '#for-customers' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  console.log(session)



  return (
    <nav className=" fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="TradeSlot Home">
            <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white font-bold text-lg">TS</span>
            </div>
            <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">TradeSlot</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>




          {
            session ? (

              <div className="flex items-center gap-3 relative">
                {(() => {
                  const user = session?.user as
                    | (typeof session.user & {
                      activeMode: "CUSTOMER" | "TRADER";
                    })
                    | undefined;

                  return (
                    <>
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          if (!user) {
                            router.push("/login");
                            return;
                          }

                          if (user.activeMode === "CUSTOMER") {
                            router.push("/customer/dashboard");
                          } else {
                            router.push("/trader/dashboard");
                          }
                        }}
                      >
                        Dashboard
                      </button>

                      <select
                        name="activeMode"
                        id="activeMode"
                        value={user?.activeMode ?? "CUSTOMER"}
                        className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg px-2 py-1"
                        onChange={async (e) => {
                          const newMode = e.target.value as "CUSTOMER" | "TRADER";

                          console.log("New mode selected:", newMode);

                          // Later:
                          // await axiosApi.patch("/api/auth/active-mode", {
                          //   activeMode: newMode,
                          // });

                          // router.refresh();
                        }}
                      >
                        <option value="CUSTOMER">Customer</option>
                        <option value="TRADER">Trader</option>
                      </select>

                      
                      <SidebarDrawer />

                    </>
                  );
                })()}
              </div>


            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Login
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )
          }

          <button
            className="md:hidden p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}