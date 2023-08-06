import { cn } from "@/lib/utils";

interface KbdProps {
  children: React.ReactNode;
  singleKey?: boolean;
}

const Kbd = ({ children, singleKey = true }: KbdProps) => (
  <div
    className={cn(
      "bg-white text-xs border border-slate-200 border-b-2 rounded-sm flex items-center justify-center min-w-[20px] w-full",
      singleKey ? "px-1" : "px-2"
    )}
  >
    {children}
  </div>
);

export default Kbd;
