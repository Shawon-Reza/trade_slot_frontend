'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { motion } from "framer-motion";
import { Search, MapPin, Clock, CheckCircle, Shield, MessageSquare, CreditCard } from 'lucide-react';

const customerFeatures = [
  {
    icon: Search,
    title: 'Find local traders',
    description: 'Search verified tradespeople near you with real reviews and ratings.',
  },
  {
    icon: Clock,
    title: 'Book in seconds',
    description: 'See real-time availability and book instantly — no phone calls needed.',
  },
  {
    icon: CheckCircle,
    title: 'Fixed pricing',
    description: 'Flat booking fee per job. No hidden costs or surprise charges.',
  },
  {
    icon: Shield,
    title: 'Secure payments',
    description: 'Pay securely online. Funds held until the job is completed to your satisfaction.',
  },
];

export function ForCustomers() {
  return (
    <section id="for-customers" className="py-10 lg:py-16 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          duration: 1.9,
          ease: "easeOut",
        }}
        className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            For homeowners & businesses
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Book trusted tradespeople with confidence. Simple, transparent, and hassle-free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-md  transition-all hover:scale-105 transform duration-700 "
            >
              <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{feature.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}