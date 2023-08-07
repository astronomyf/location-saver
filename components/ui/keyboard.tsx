import { cn } from "@/lib/utils";

interface KbdProps {
  children: React.ReactNode;
  singleKey?: boolean;
  className?: string;
}

const Kbd = ({ className, children, singleKey = true }: KbdProps) => (
  <div
    className={cn(
      "bg-white max-w-fit text-xs border border-slate-200 border-b-2 rounded-sm flex items-center justify-center min-w-[20px] w-full",
      singleKey ? "px-1" : "px-2",
      className
    )}
  >
    {children}
  </div>
);

export default Kbd;
