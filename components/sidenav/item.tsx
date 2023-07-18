"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

interface SidenavItemProps {
  children: React.ReactNode;
  href: string;
}

const SidenavItem = ({ href, children }: SidenavItemProps) => {
  const segment = useSelectedLayoutSegment();
  const active = href === `/${segment || ""}`;

  return (
    <Link
      href={href}
      className={cn(
        "w-10 h-10 rounded-md p-2 flex items-center justify-center cursor-pointer hover:transition-all ease-in-out duration-150",
        active
          ? "bg-primary-soft text-primary-soft-foreground hover:bg-primary-soft/90"
          : "text-foreground hover:bg-primary-soft hover:text-primary-soft-foreground"
      )}
    >
      {children}
    </Link>
  );
};

export default SidenavItem;
