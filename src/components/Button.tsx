
import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
          variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
          variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
          size === "default" && "h-10 px-6 py-2 text-sm",
          size === "sm" && "h-8 px-4 py-1 text-xs",
          size === "lg" && "h-12 px-8 py-3 text-base",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
