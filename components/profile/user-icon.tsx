import { getInitials } from "@/lib/getUserInitials";
import { cn } from "@/lib/utils";
import { User } from "@/types/firestore";
import Image from "next/image";

interface UserIconProps {
  user: User;
  className?: string;
  textClassName?: string;
}

const UserIcon = ({
  user: { photoUrl, name },
  className,
  textClassName,
}: UserIconProps) => {
  const userInitials = getInitials(name);

  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full bg-primary-soft hover:opacity-70 cursor-pointer transition-opacity ease-in-out",
        !photoUrl && "border border-primary",
        className
      )}
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          fill
          className="object-cover"
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
