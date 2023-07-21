import * as React from "react";
import { cn } from "@/lib/utils";
import { isEmpty } from "lodash";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export type InputActions = {
  icon: React.ReactNode;
  onClick?: () => void;
  tooltipText?: string;
  className?: string;
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  actions?: InputActions[];
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, actions, containerClassName, ...props }, ref) => {
    const hasActions = !isEmpty(actions);

    return (
      <div className={cn("flex shadow-md rounded-md", containerClassName)}>
        <div className="relative">
          <input
            type={type}
            className={cn(
              "focus:z-20 h-10 w-full block bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pr-10",
              hasActions
                ? "border-y border-l rounded-l-md"
                : "border rounded-md",
              className
            )}
            ref={ref}
            {...props}
          />
          {icon && (
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-4">
              {icon}
            </div>
          )}
        </div>
        {actions &&
          actions.map(({ icon, tooltipText, className }, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    "focus:outline-none overflow-auto focus:z-20 focus:ring-2 focus:ring-ring justify-center bg-background hover:bg-slate-50 text-primary right-0 flex items-center px-2 last-of-type:pr-3 border-y last-of-type:border-r last-of-type:rounded-r-md border-l transition-all ease-in-out cursor-pointer",
                    className
                  )}
                >
                  {icon}
                </button>
              </TooltipTrigger>
              {tooltipText && <TooltipContent>{tooltipText}</TooltipContent>}
            </Tooltip>
          ))}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
