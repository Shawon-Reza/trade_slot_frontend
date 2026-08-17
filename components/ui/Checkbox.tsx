'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './Label';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            'h-4 w-4 mt-0.5 rounded border-zinc-300 text-black focus:ring-2 focus:ring-black focus:ring-offset-2',
            'dark:border-zinc-600 dark:text-white dark:focus:ring-white',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <Label htmlFor={checkboxId} className="cursor-pointer select-none">
                {label}
              </Label>
            )}
            {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };