import { cn } from "@/lib/utils";
import { IconHeart, IconPhoto } from "@tabler/icons-react";
import Image from "next/image";

interface CardProps {
  title: string;
  imageUrl?: string;
  description?: string;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Card = ({
  title,
  imageUrl,
  description = "Lorem ipsum dolor sit amet",
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CardProps) => {
  return (
    <div
      className={cn(
        "w-full h-24 flex group rounded-md border border-slate-200 hover:shadow-sm cursor-pointer relative",
        className
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute top-2 right-3">
        <IconHeart size={20} />
      </div>
      <div className="w-36 h-full relative overflow-hidden rounded-l-md">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className="object-cover object-center rounded-l-md w-full group-hover:scale-110 transition-transform ease-in-out"
            fill
          />
        ) : (
          <div className="h-full w-full bg-slate-300 flex items-center justify-center">
            <IconPhoto size={20} className="text-slate-500" />
          </div>
        )}
      </div>
      <div className="w-full h-fit flex flex-col py-2 px-4">
        <h1 className="font-medium">{title}</h1>
        {description && <p className="text-sm text-slate-400">{description}</p>}
      </div>
    </div>
  );
};

export default Card;
