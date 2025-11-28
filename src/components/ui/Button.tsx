'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'text-white focus-visible:ring-[--color-primary]',
        secondary: 'bg-slate-800 text-white hover:bg-slate-900 focus-visible:ring-slate-800',
        outline: 'border-2 focus-visible:ring-[--color-primary]',
        ghost: 'hover:bg-slate-100 hover:text-slate-900',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-11 px-8 text-sm',
        lg: 'h-14 px-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    const buttonStyle = variant === 'primary' 
      ? { 
          backgroundColor: 'var(--color-primary)',
          '--tw-ring-color': 'var(--color-primary)'
        } as React.CSSProperties
      : variant === 'outline'
      ? {
          borderColor: 'var(--color-primary)',
          color: 'var(--color-primary)',
          '--tw-ring-color': 'var(--color-primary)'
        } as React.CSSProperties
      : {};

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        style={buttonStyle}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
        onMouseEnter={(e) => {
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)';
          } else if (variant === 'outline') {
            e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
            e.currentTarget.style.opacity = '0.1';
          }
        }}
        onMouseLeave={(e) => {
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
          } else if (variant === 'outline') {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.opacity = '1';
          }
        }}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
