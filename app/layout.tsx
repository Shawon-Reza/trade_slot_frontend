import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/QueryProvider";
import { authService } from "@/services/auth.service";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TradeSlot - Book trusted tradespeople without the hassle",
  description: "TradeSlot makes it easy to find, communicate with, and book qualified tradespeople for your home or business.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

const session= await authService.getSession()
console.log(session)





  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
        <Providers>
          {children}
        </Providers>
         <Toaster />
      </body>
    </html>
  );
}