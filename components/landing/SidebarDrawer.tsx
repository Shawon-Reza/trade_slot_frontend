"use client";

import Link from "next/link";
import {
  Home,
  User,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

// import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/Button";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";


const navigationItemsForCustomer = [
  {
    title: "customer Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
const navigationItemsForTrader = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];


export default function SidebarDrawer() {
  const { data: session, isPending } = authClient.useSession();


  return (
    <Drawer
      swipeDirection="right"
    >
      {/* Trigger */}
      <DrawerTrigger >

        {/* <Menu className="h-5 w-5" /> */}
        <Image
          src={
            session?.user?.image ||
            "https://res.cloudinary.com/dbmdhxmtx/image/upload/v1787060375/577b1528-9328-48fe-b735-44923e7efd05.png"
          }
          alt="Profile"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover hover:cursor-pointer"
        />

      </DrawerTrigger>

      {/* Sidebar */}
      <DrawerContent className="h-full w-[280px] rounded-none">
        <div className="flex h-full flex-col">
          {/* Header */}
          <DrawerHeader className="border-b text-left">
            <DrawerTitle className="text-xl font-bold">
              TradeSlot
            </DrawerTitle>
          </DrawerHeader>

          {/* Navigation */}
          <nav className="flex-1 p-4">
  <div className="space-y-1">
    {(() => {
      const activeMode = session?.user
        ? (session.user as typeof session.user & {
            activeMode: "CUSTOMER" | "TRADER";
          }).activeMode
        : "CUSTOMER";

      const navigationItems =
        activeMode === "TRADER"
          ? navigationItemsForTrader
          : navigationItemsForCustomer;

      return navigationItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        );
      });
    })()}
  </div>
</nav>




          {/* Logout */}
          <div className="border-t p-4">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-5 w-5"
              />
              <span
                onClick={async () => {
                  console.log("Logging out...");
                  try {
                    await authClient.signOut();

                    toast.success("Logged out successfully!", {
                      position: "top-right",
                    });
                   
                  } catch (error) {
                    toast.error("Failed to log out.", {
                      position: "bottom-right",
                    });
                  }


                }}
              >Logout</span>
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}