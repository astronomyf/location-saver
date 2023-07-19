import {
  Binoculars,
  MagnifyingGlass,
  MapPin,
  MapPinLine,
  Plus,
} from "@/assets/phosphor-icons";
import { Input } from "../ui/input";

const MapActions = () => {
  return (
    <Input
      type="text"
      placeholder="Search for a location"
      icon={<MagnifyingGlass className="w-5 h-5" />}
      actions={[
        {
          icon: (
            <div className="relative">
              <MapPin weight="fill" className="w-5 h-5" />
              <div className="absolute bottom-0 left-3 text-primary w-2.5 h-2.5 bg-white rounded-full flex justify-center items-center">
                <Plus weight="bold" className="text-primary w-2 h-2" />
              </div>
            </div>
          ),
          tooltipText: "Add a new location",
        },
        {
          icon: <Binoculars weight="fill" className="w-5 h-5" />,
          tooltipText: "Add explorer's levels",
        },
      ]}
    />
  );
};

export default MapActions;
