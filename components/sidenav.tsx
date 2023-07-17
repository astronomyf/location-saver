import { MapPin, MapTrifold } from "@/assets/phosphor-icons";
import Logo from "./logo";
import { Button } from "./ui/button";
import SidenavItem from "./sidenav-item";

const Sidenav = () => {
  return (
    <div className="h-full w-full bg-background px-3 py-5 border-r border-slate-200 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center">
        <Logo withBackground />
        <div className="flex flex-col gap-y-4 mt-8">
          <SidenavItem active>
            <MapTrifold size="md" />
          </SidenavItem>
          <SidenavItem>
            <MapPin size="md" />
          </SidenavItem>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 items-center">
        <div className="h-10 w-10 rounded-full bg-slate-300" />
      </div>
    </div>
  );
};

export default Sidenav;
