"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      className="
        relative
        min-h-[calc(100vh-64px)]
        bg-[url(https://res.cloudinary.com/dbmdhxmtx/image/upload/v1787073330/69511e44-ffa2-46f7-9ac7-7ad1fa2c0a7d.png)]
        bg-cover
        bg-center
        bg-no-repeat
        px-4
        sm:px-6
        lg:px-8
      "
    >
      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-64px)]
          max-w-7xl
          items-center
        "
      >
        <div
          className="
            w-full
            max-w-2xl
            pt-20
            text-center
            sm:pt-24
            md:text-left
            lg:max-w-xl
            lg:pt-0
          "
        >
          {/* Availability */}
          <div
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white/95
              px-4
              py-2
              text-sm
              font-medium
              text-zinc-700
              shadow-sm
              sm:mb-8
            "
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>

            Now available in Dhaka
          </div>

          {/* Heading */}
          <h1
            className="
              mb-5
              text-4xl
              font-bold
              leading-[1.05]
              tracking-tight
              text-white
              sm:text-5xl
              md:text-5xl
              lg:text-6xl
          "
          >
            Book trusted tradespeople{" "}
            <span className="text-zinc-300">
              without the hassle
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mx-auto
              mb-8
              max-w-xl
              text-base
              leading-relaxed
              text-zinc-300
              sm:text-lg
              md:mx-0
              lg:text-xl
            "
          >
            TradeSlot makes it easy to find, communicate with, and book
            qualified tradespeople for your home or business. No more endless
            calls, missed appointments, or payment confusion.
          </p>

          {/* Buttons */}
          <div
            className="
              flex
              flex-col
              items-center
              gap-3
              sm:flex-row
              sm:justify-center
              md:justify-start
              sm:gap-4
            "
          >
            <Link href="/register?type=customer">
              <Button size="xl" className="gap-2 rounded-xl hover:scale-105 transform transition-all duration-700 ease-in-out">
                Find a Trader
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/register?type=trader">
              <Button  size="xl" className="text-white rounded-xl hover:scale-105 transform transition-all duration-700 ease-in-out" >
                Join as a Trader
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}