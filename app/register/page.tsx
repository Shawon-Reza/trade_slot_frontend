

import { RegisterForm } from '@/components/auth/RegisterForm';
import { Suspense } from 'react';
// import RegisterPageContent from './page';

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      {/* <RegisterPageContent /> */}
      <RegisterForm />
    </Suspense>
  );
}