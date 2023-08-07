import { cn } from "@/lib/utils";

interface SearchListItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  backgroundColor?: string;
  textColor?: string;
}

const SearchListItem = ({
  icon,
  title,
  description,
  backgroundColor = "bg-slate-200",
  textColor = "text-slate-500",
}: SearchListItemProps) => (
  <div className="flex items-center gap-x-2">
    <div
      className={cn(
        "w-8 h-8 flex items-center justify-center p-2 rounded-md",
        backgroundColor,
        textColor
      )}
    >
      {icon}
    </div>
    <div className="flex flex-col">
      <h1 className="text-sm font-medium">{title}</h1>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  </div>
);

export default SearchListItem;
