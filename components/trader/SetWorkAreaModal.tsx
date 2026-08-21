'use client';

import * as React from 'react';
import { X, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { axiosApi } from '@/lib/axios';

interface SetWorkAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { date: string; area: string }) => void;
  isLoading?: boolean;
}

export function SetWorkAreaModal({ isOpen, onClose, onSubmit, isLoading = false }: SetWorkAreaModalProps) {
  const [date, setDate] = React.useState('');
  const [area, setArea] = React.useState('');
  const [err, seterr] = React.useState("")
  const [errors, setErrors] = React.useState<{ date?: string; area?: string }>({});

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  React.useEffect(() => {
    if (isOpen) {
      setDate(today);
      setArea('');
      setErrors({});
      seterr("");
    }
  }, [isOpen, today]);

  // ============ Set Work area=============\
  const setWorkAreaMutation = useMutation({
    mutationFn: async (data: { date: string; area: string }) => {
      const response = await axiosApi.post(
        "/api/work-areas/",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Successfully Set work area")
      onClose()
    },

    onError: () => {
      toast.error("Failed to set work are! Pleas try again", {
        position: "bottom-right"
      })
    }
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { date?: string; area?: string } = {};
    if (!date) newErrors.date = 'Date is required';
    if (!area.trim()) newErrors.area = 'Area name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = { date, area: area.trim() };
    setWorkAreaMutation.mutate(formData);
    console.log('Work Area Form Data:', formData);
  };


  if (!isOpen) return null;





  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in-0">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl animate-in zoom-in-95 slide-in-from-bottom-2 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Set Work Area</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {
          err ? <p className='text-center font-semibold text-red-500'>{err}</p> : null
        }


        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="workAreaDate">Date</Label>
            <div className="relative mt-1.5">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" aria-hidden="true" />
              <input
                type="date"
                id="workAreaDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onBlur={() => setErrors(prev => ({ ...prev, date: undefined }))}
                className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent dark:focus:ring-white"
                required
                disabled={isLoading}
                min={today}
              />
            </div>
            {errors.date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>}
          </div>

          <div>
            <Label htmlFor="workAreaName">Area / Location</Label>
            <div className="relative mt-1.5">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" aria-hidden="true" />
              <input
                type="text"
                id="workAreaName"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                onBlur={() => setErrors(prev => ({ ...prev, area: undefined }))}
                placeholder="e.g., Gulshan, Dhaka"
                className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent dark:focus:ring-white"
                required
                disabled={isLoading}
              />
            </div>
            {errors.area && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.area}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading} className="flex-1">
              Cancel
            </Button>



            <Button
              type="submit"
              variant="primary"
              loading={setWorkAreaMutation.isPending}
              className="flex-1"
            >
              {setWorkAreaMutation.isPending
                ? "Setting Work Area...."
                : "Set Work Area"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}