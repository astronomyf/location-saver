import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

const Divider = ({ className }: DividerProps) => (
  <div className={cn("my-4 w-full h-[1px] bg-slate-200", className)} />
);

export default Divider;
