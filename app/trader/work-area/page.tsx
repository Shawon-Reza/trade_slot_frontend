'use client';

import * as React from 'react';
import { MapPin, Clock, Plus, Calendar, Edit2, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { mockTrader, navItemsTrader } from '@/lib/mock-data';
import { SetWorkAreaModal } from '@/components/trader/SetWorkAreaModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosApi } from '@/lib/axios';
import { toast } from 'sonner';

const navItems = navItemsTrader.map(item => ({
  ...item,
  icon: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath(item.icon)} />
    </svg>
  ),
}));

function getIconPath(iconName: string): string {
  const paths: Record<string, string> = {
    LayoutDashboard: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    MapPin: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
    Calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    CreditCard: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    Settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543-.826 3.31-2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  };
  return paths[iconName] || paths.LayoutDashboard;
}

interface WorkArea {
  id: string;
  traderId: string;
  date: string;
  area: string;
  createdAt: string;
  updatedAt: string;
}

interface WorkAreasApiResponse {
  success: boolean;
  message: string;
  data: WorkArea[];
}

interface WorkAreaByDateResponse {
  success: boolean;
  workArea: WorkArea;
}

interface WorkAreaSingleResponse {
  success: boolean;
  workArea: WorkArea;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
}



export default function TraderWorkAreaPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingWorkArea, setEditingWorkArea] = React.useState<WorkArea | null>(null);
  const queryClient = useQueryClient();

  // Fetch all work areas
  const { data: workAreas = [], isLoading, error, refetch } = useQuery<WorkArea[]>({
    queryKey: ["work_area_list"],
    queryFn: async () => {
      const res = await axiosApi.get<{ success: boolean; data: WorkArea[] }>('/api/work-areas/all');
      return res.data.data;
    },
  });

  // Fetch work area by date (for today's work area)

  const today = new Date().toISOString().split('T')[0];

  const { data: todayWorkArea, isLoading: todayLoading } = useQuery({
    queryKey: ['todayworkArea', 'date', today],
    queryFn: async () => {

      const res = await axiosApi.get('/api/work-areas/date',
        {
          params: {
            date: today,
          },
        }
      );
      return res.data.workArea || null;

    },
    // enabled: !!mockTrader.id,
  });

  const createWorkAreaMutation = useMutation({
    mutationFn: async (data: { date: string; area: string }) => {
      const res = await axiosApi.post('/api/work-areas/', data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Work area created successfully');
      queryClient.invalidateQueries({ queryKey: ["work_area_list"] });
      queryClient.invalidateQueries({ queryKey: ['workArea', 'date', today] });
    },
    onError: () => {
      toast.error('Failed to create work area');
    },
  });

  const updateWorkAreaMutation = useMutation({
    mutationFn: async (data: { id: string; area: string }) => {
      const res = await axiosApi.patch(`/api/work-areas/${data.id}`, { area: data.area });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Work area updated successfully');
      queryClient.invalidateQueries({ queryKey: ["work_area_list"] });
      queryClient.invalidateQueries({ queryKey: ['workArea', 'date', today] });
    },
    onError: () => {
      toast.error('Failed to update work area');
    },
  });

  const deleteWorkAreaMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosApi.delete(`/api/work-areas/${id}`);
    },
    onSuccess: () => {
      toast.success('Work area deleted');
      queryClient.invalidateQueries({ queryKey: ["work_area_list"] });
      queryClient.invalidateQueries({ queryKey: ['workArea', 'date', today] });
    },
    onError: () => {
      toast.error('Failed to delete work area');
    },
  });

  const handleSubmit = (data: { date: string; area: string }) => {
    if (editingWorkArea) {
      updateWorkAreaMutation.mutate({ id: editingWorkArea.id, area: data.area });
    } else {
      createWorkAreaMutation.mutate(data);
    }
    setIsModalOpen(false);
    setEditingWorkArea(null);
  };

  const handleEdit = (workArea: WorkArea) => {
    setEditingWorkArea(workArea);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this work area?')) {
      deleteWorkAreaMutation.mutate(id);
    }
  };

  const handleOpenCreate = () => {
    setEditingWorkArea(null);
    setIsModalOpen(true);
  };

  const isSubmitting = createWorkAreaMutation.isPending || updateWorkAreaMutation.isPending;

  return (
    <DashboardLayout
      navItems={navItems}
      user={{
        name: mockTrader.name,
        email: mockTrader.email,
        avatar: mockTrader.avatar,
        onLogout: () => window.location.href = '/login',
      }}
      headerTitle="Work Area"
      headerBreadcrumb="Trader / Dashboard"
    >
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Work Area</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">Set your daily service area and travel buffer.</p>
        </div>

        <SectionHeader
          title="Today's Work Area"
          action={
            <Button variant="primary" size="sm" className="gap-1.5" onClick={handleOpenCreate}>
              <Plus className="h-4 w-4" />
              Set Work Area
            </Button>
          }
        />

        {/* Today's Work Area */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          {todayLoading ? (
            <div className="p-4 space-y-4">
              <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
            </div>
          ) : todayWorkArea ? (
            <div className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{todayWorkArea.area}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Today ({formatDate(todayWorkArea.date)})
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(todayWorkArea)}
                  className="p-2 h-8 w-8"
                  aria-label="Edit work area"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(todayWorkArea.id)}
                  className="p-2 h-8 w-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  aria-label="Delete work area"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <MapPin className="h-16 w-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">No work area set for today</h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">Set your service area to start receiving booking requests.</p>
              <Button variant="primary" size="md" className="gap-2" onClick={handleOpenCreate}>
                <MapPin className="h-4 w-4" />
                Set Work Area
              </Button>
            </div>
          )}
        </div>





        <SectionHeader title="Upcoming Work Areas" />

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Upcoming</h3>
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {workAreas
              .filter((w: WorkArea) => new Date(w.date) > new Date(today))
              .sort((a: WorkArea, b: WorkArea) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((workArea: WorkArea) => (
                <div key={workArea.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">{workArea.area}</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(workArea.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(workArea)}
                      className="p-2 h-8 w-8"
                      aria-label="Edit work area"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(workArea.id)}
                      className="p-2 h-8 w-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      aria-label="Delete work area"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <SetWorkAreaModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingWorkArea(null);
        }}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </DashboardLayout>
  );
}