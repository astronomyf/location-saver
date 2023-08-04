"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

interface SidenavItemProps {
  children: React.ReactNode;
  href: string;
}

const NavbarItem = ({ href, children }: SidenavItemProps) => {
  const segment = useSelectedLayoutSegment();
  const active = href === `/${segment || ""}`;

  return (
    <Link
      href={href}
      className={cn(
        "cursor-pointer hover:transition-all ease-in-out duration-150",
        active ? "text-primary font-medium" : "text-slate-400 hover:opacity-70"
      )}
    >
      {children}
    </Link>
  );
};

export default NavbarItem;
