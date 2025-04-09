
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface PromptProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit'> {
  className?: string;
  onSubmit: (value: string) => void;
}

export const PromptForm = React.forwardRef<HTMLTextAreaElement, PromptProps>(
  ({ className, onSubmit, ...props }, ref) => {
    const [input, setInput] = React.useState("");
    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLTextAreaElement);

    // Auto-resize the textarea based on content
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.style.height = "inherit";
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      }
    }, [input]);

    // Focus the textarea when the component mounts
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) {
        onSubmit(input);
        setInput("");
        if (inputRef.current) {
          inputRef.current.style.height = "inherit";
        }
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-end w-full max-w-3xl mx-auto",
          className
        )}
      >
        <Textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about meal ideas, recipes, or grocery lists..."
          className="min-h-12 resize-none py-3 pr-16 rounded-lg border border-input bg-background"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          {...props}
        />
        <div className="absolute right-2 bottom-2">
          <Button 
            type="submit" 
            size="icon" 
            disabled={input.trim().length === 0}
            className="h-8 w-8 bg-primary text-primary-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m22 2-7 20-4-9-9-4 20-7Z" />
              <path d="M22 2 11 13" />
            </svg>
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    );
  }
);

PromptForm.displayName = "PromptForm";
