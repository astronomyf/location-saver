import { cn } from "@/lib/utils";

interface KbdProps {
  children: React.ReactNode;
  singleKey?: boolean;
  className?: string;
}

const Kbd = ({ className, children, singleKey = true }: KbdProps) => (
  <div
    className={cn(
      "bg-slate-50 border border-b-2 border-slate-200 max-w-fit text-xs rounded-sm flex items-center justify-center min-w-[20px] w-full",
      singleKey ? "px-1" : "px-2",
      className
    )}
  >
    {children}
  </div>
);

export default Kbd;
