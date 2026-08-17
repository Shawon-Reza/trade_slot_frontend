import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ForTraders } from '@/components/landing/ForTraders';
import { ForCustomers } from '@/components/landing/ForCustomers';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Hero />
        <HowItWorks />
        <ForTraders />
        <ForCustomers />
      </main>
      <Footer />
    </div>
  );
}