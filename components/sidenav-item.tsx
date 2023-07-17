import { cn } from "@/lib/utils";
import { Icon, IconBase } from "@phosphor-icons/react";

interface SidenavItemProps {
  children: React.ReactNode;
  active?: boolean;
}

const SidenavItem = ({ children, active = false }: SidenavItemProps) => {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-md p-2 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-75",
        active
          ? "bg-primary-soft text-primary-soft-foreground hover:bg-primary-soft/90"
          : "text-foreground hover:bg-primary-soft hover:text-primary-soft-foreground"
      )}
    >
      {children}
    </div>
  );
};

export default SidenavItem;
