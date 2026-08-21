'use client';

import { useState } from 'react';
import { Building2, Search, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { axiosApi } from '@/lib/axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface BusinessType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface BusinessTypesResponse {
  success: boolean;
  data: BusinessType[];
}

interface TraderProfileSetupProps {
  onComplete: () => void;
}

export function TraderProfileSetup({ onComplete }: TraderProfileSetupProps) {
  const [businessType, setBusinessType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  //----------------- get all business types ---------------------
  const { data: businessTypes = [], isLoading: typesLoading, error: typesError } = useQuery<BusinessType[]>({
    queryKey: ['businessTypes'],
    queryFn: async () => {
      const res = await axiosApi.get<BusinessTypesResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/business/lists`);
      // Handle response format: { success: true, data: [...] }
      // Trim names to handle trailing spaces like "mechanic "
      return res.data.data.map(item => ({
        ...item,
        name: item.name.trim()
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  console.log(businessTypes)



  //  ---------------------- Create Trader Profile ---------------------

  const createTraderProfile = useMutation({

    mutationFn: async (data: { businessType: string }) => {
      const res = await axiosApi.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trader/createProfile`, data);
      return res.data;
    },
    onSuccess: () => {
      onComplete();
      toast.success("Your trader profile ready", {
        position: "bottom-right",
      });
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to create trader profile');
      setIsSubmitting(false);
    },
  });



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType) {
      setError('Please select a business type');
      return;
    }
    setIsSubmitting(true);
    createTraderProfile.mutate({ businessType });
  };

  if (typesLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
            <Building2 className="h-16 w-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Set up your Trader Profile
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Loading business types...
            </p>
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 text-black dark:text-white animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (typesError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
            <Building2 className="h-16 w-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Set up your Trader Profile
            </h2>
            <p className="text-red-600 dark:text-red-400 mb-6">
              Failed to load business types. Please refresh the page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
          <Building2 className="h-16 w-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Set up your Trader Profile
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            To start receiving bookings, please select your trade/business type.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" aria-hidden="true" />
                <select
                  id="businessType"
                  value={businessType}
                  onChange={(e) => {
                    setBusinessType(e.target.value)
                    console.log(e.target.value)
                  }}

                  className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select your trade</option>
                  {businessTypes.map((type) => (

                    <option key={type.id}
                      onClick={() => {
                        console.log(type)
                      }}
                      value={type.id}>{type.name}
                    </option>
                  ))}

                </select>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
              {isSubmitting ? 'Creating Profile...' : 'Create Trader Profile'}
            </Button>
          </form>

          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Don't see your trade? Select "Other" and contact support.
          </p>
        </div>
      </div>
    </div>
  );
}