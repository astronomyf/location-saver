import Image from "next/image";

interface CardProps {
  title: string;
  imageUrl?: string;
  description?: string;
}

const Card = ({ title, imageUrl, description }: CardProps) => {
  return (
    <div className="w-full h-20 flex items-center rounded-md border border-slate-200 hover:shadow-sm cursor-pointer">
      <div className="h-full w-2/6 relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className="object-cover rounded-l-md w-full"
            fill
          />
        ) : (
          <div className="h-full w-full bg-slate-400" />
        )}
      </div>
      <div className="h-full w-4/6 flex flex-col p-2">
        <h1 className="font-medium text-sm">{title}</h1>
        {description && <p className="text-sm">{description}</p>}
      </div>
    </div>
  );
};

export default Card;
