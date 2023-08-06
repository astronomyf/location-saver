import { CircleFlag } from "react-circle-flags";
import { Button } from "../ui/button";

interface FlagButtonProps {
  countryCode: string;
  children: React.ReactNode;
}

const FlagButton = ({ countryCode, children }: FlagButtonProps) => (
  <Button variant="outline" size="sm">
    <div className="flex items-center gap-x-2">
      <CircleFlag countryCode={countryCode} className="w-4 h-4" />
      {children}
    </div>
  </Button>
);

export default FlagButton;
