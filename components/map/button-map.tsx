import { cn } from "@/lib/utils";

interface ButtonMapProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "type"
  > {
  className?: string;
}

const ButtonMap = ({ className, ...rest }: ButtonMapProps) => (
  <button
    type="button"
    className={cn(
      "p-1.5 inline-flex justify-center items-center gap-2 first:rounded-t-md last:rounded-b-md border-t font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-ring transition-all text-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
      className
    )}
    {...rest}
  />
);

export default ButtonMap;
