import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/providers/QueryProvider";
import { authService } from "@/services/auth.service";
import { Toaster } from "sonner";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { ChatButton } from "@/components/chat/ChatButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = localFont({
  src: "./fonts/Sora-Regular.ttf",
  variable: "--font-my-font",
});


export const metadata: Metadata = {
  title: "TradeSlot - Book trusted tradespeople without the hassle",
  description: "TradeSlot makes it easy to find, communicate with, and book qualified tradespeople for your home or business.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const session = await authService.getSession()
  console.log(session)

  return (
    <html lang="en" className={`${sora.variable} } h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
        <Providers>
          <SmoothScrollProvider>
            {children}
            <ChatButton />
          </SmoothScrollProvider>

        </Providers>
        <Toaster />
      </body>
    </html>
  );
}