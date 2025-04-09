
import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarIconProps {
  type: 'user' | 'assistant';
  className?: string;
}

export function AvatarIcon({ type, className }: AvatarIconProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center w-8 h-8 rounded-full shrink-0',
        type === 'user'
          ? 'bg-primary text-primary-foreground'
          : 'bg-accent text-accent-foreground',
        className
      )}
    >
      {type === 'user' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M12 8c2.648 0 4.644-.96 2.964-2.612C13.275 3.726 12 3.25 12 3.25s-1.276.476-2.964 2.138C7.356 7.04 9.352 8 12 8Z" />
          <path d="M18 11.5s-4-1-6-1-6 1-6 1 .332 3.838 1.376 6.674A2 2 0 0 0 9.108 19h5.784a2 2 0 0 0 1.732-.826C17.668 15.338 18 11.5 18 11.5Z" />
          <path d="M12 20v2" />
        </svg>
      )}
    </div>
  );
}
