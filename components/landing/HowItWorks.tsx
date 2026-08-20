'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Search, Clock, CheckCircle, MapPin, MessageSquare, CreditCard } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Find a trader',
    description: 'Search for qualified tradespeople in your area. Filter by service type, ratings, and availability.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Choose a time',
    description: 'Pick a time slot that works for you. See real-time availability and get instant confirmation.',
    icon: Clock,
  },
  {
    number: '03',
    title: 'Confirm your booking',
    description: 'Secure your booking with a flat fee. Pay securely and track your tradesperson\'s arrival.',
    icon: CheckCircle,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            How it works
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Three simple steps to get your job done
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 transition-all hover:shadow-lg hover:scale-105 transform duration-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-zinc-300 dark:text-zinc-700">{step.number}</span>
                <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <step.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{step.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 hidden lg:block">
                  <svg className="h-6 w-6 text-zinc-300 dark:text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
          
        </div>

      </div>
    </section>
  );
}