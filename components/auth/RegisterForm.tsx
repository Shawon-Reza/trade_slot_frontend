'use client';

import * as React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Checkbox } from '@/components/ui/Checkbox';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

import type { ApiErrorResponse } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { axiosApi } from '@/lib/axios';


interface RegisterFormProps {
  onSuccess?: () => void;
  initialType?: 'customer' | 'trader';
}

export function RegisterForm({ onSuccess, initialType = 'customer' }: RegisterFormProps) {
  React.useEffect(() => {
    console.log('RegisterForm component mounted');
  }, []);

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const registerMutation = useMutation({
    mutationFn: () =>
      axiosApi.post('/api/auth/sign-up/email', {
        name,
        email,
        password,
      }),

    onSuccess: (data) => {
      console.log('Register success:', data);
      onSuccess?.();
      router.push('/login');
    },

    onError: (err: AxiosError<ApiErrorResponse>) => {
      const apiMessage = err.response?.data?.message;
      const fallbackMessage = 'Registration failed. Please try again.';
      const message = apiMessage || err.message || fallbackMessage;

      console.error('Register error:', err);
      setError(message);
    },
  });

  console.log("aaaaaaaaaaaaaaaaaaaaaaa", registerMutation?.data)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== Form Submit Handler Called ===');
    setError('');

    // Console all form data
    console.log('Form Data:', {
      name,
      email,
      password,
      confirmPassword,
      agreedToTerms,
    });

    // Check if passwords match
    if (password !== confirmPassword) {
      console.log('ERROR: Passwords do not match');
      setError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      console.log('ERROR: Terms not agreed');
      setError('You must agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      await registerMutation.mutateAsync();
    } finally {
      setIsLoading(false);
    }



  };

  const { data: session } = authClient.useSession();

  console.log(session);

  return (
    <div className="w-full max-w-md mx-auto my-auto">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
            <span className="text-white font-bold text-xl">TS</span>
          </div>
          <span className="font-semibold text-xl text-zinc-900 dark:text-zinc-100">TradeSlot</span>
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Create your account</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Join TradeSlot today</p>
      </div>



      <form onSubmit={handleSubmit} className="space-y-5">

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" aria-hidden="true" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                console.log('Name changed to:', e.target.value);
              }}
              className="pl-10"
              required
              autoComplete="name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" aria-hidden="true" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
              autoComplete="email"
            />
          </div>
        </div>



        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" aria-hidden="true" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10"
              required
              autoComplete="new-password"
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" aria-hidden="true" />
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10"
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            label="I agree to the Terms of Service and Privacy Policy"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={isLoading}
          onClick={() => console.log('Button clicked! Is loading:', isLoading)}
        >
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-black hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300">
          Sign in
        </Link>
      </p>
    </div>
  );
}