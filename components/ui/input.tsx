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
  error?: boolean | string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      actions,
      containerClassName,
      error = false,
      ...props
    },
    ref
  ) => {
    const hasActions = !isEmpty(actions);

    return (
      <div className={cn("w-full", error && "flex flex-col gap-y-1")}>
        <div className={cn("flex shadow-sm rounded-md", containerClassName)}>
          <div className="relative w-full flex">
            <input
              type={type}
              className={cn(
                "focus:z-20 h-10 w-full block bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
                icon && "pr-10",
                hasActions
                  ? "border-y border-l rounded-l-md"
                  : "border rounded-md",
                error
                  ? "focus-visible:ring-red-200 !border-red-500"
                  : "focus-visible:ring-ring",
                className
              )}
              ref={ref}
              {...props}
            />
            {icon && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                {icon}
              </div>
            )}
          </div>
          {actions &&
            actions.map(({ icon, tooltipText, className, onClick }, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      "focus:outline-none overflow-auto min-w-fit focus:z-20 focus:ring-2 focus:ring-ring justify-center bg-background hover:bg-slate-50 text-primary right-0 flex items-center px-2 last-of-type:pr-2.5 border-y last-of-type:border-r last-of-type:rounded-r-md border-l transition-all ease-in-out cursor-pointer",
                      className
                    )}
                    onClick={onClick}
                  >
                    {icon}
                  </button>
                </TooltipTrigger>
                {tooltipText && <TooltipContent>{tooltipText}</TooltipContent>}
              </Tooltip>
            ))}
        </div>
        {error && <div className="text-red-500 text-xs">{error}</div>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
