"use client";

import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Loader = ({ size = "md", className }: LoaderProps) => (
  <IconLoader2
    className={cn("text-primary animate-spin", className)}
    size={size === "md" ? 20 : size === "lg" ? 40 : 10}
  />
);

export default Loader;
