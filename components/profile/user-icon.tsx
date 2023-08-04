import { getInitials } from "@/lib/getUserInitials";
import { cn } from "@/lib/utils";
import { User } from "@/types/firestore";
import Image from "next/image";

interface UserIconProps {
  user: User;
  className?: string;
  textClassName?: string;
  clickable?: boolean;
}

const UserIcon = ({
  user,
  className,
  textClassName,
  clickable = true,
}: UserIconProps) => {
  const { photoUrl, name } = user;
  const userInitials = getInitials(name);

  return (
    <div
      className={cn(
        "w-9 h-9 rounded-full bg-primary-soft relative",
        clickable &&
          "hover:opacity-70 cursor-pointer transition-opacity ease-in-out border",
        photoUrl ? "border-slate-200" : "border-primary",
        className
      )}
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          fill
          className="object-cover rounded-full"
          alt="Profile picture"
        />
      ) : (
        <div
          className={cn(
            "w-full h-full text-xl text-primary flex justify-center items-center select-none",
            textClassName
          )}
        >
          {userInitials}
        </div>
      )}
    </div>
  );
};

export default UserIcon;
