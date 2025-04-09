
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SendIcon } from 'lucide-react';

interface PromptFormProps {
  onSubmit: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function PromptForm({ onSubmit, className, placeholder = "Type your message..." }: PromptFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex items-center space-x-2', className)}
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full py-2 px-4 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        />
      </div>
      <Button type="submit" size="icon" className="rounded-full">
        <SendIcon className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
}
