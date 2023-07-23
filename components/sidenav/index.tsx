import { MapPin, MapTrifold } from "@/assets/phosphor-icons";
import SidenavItem from "./item";
import Logo from "../logo";
import Divider from "../ui/divider";

const Sidenav = () => {
  return (
    <nav className="h-full w-full bg-background px-3 py-5 border-r border-slate-200 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center">
        <Logo withBackground />
        <Divider />
        <ul className="flex flex-col gap-y-4">
          <SidenavItem href="/">
            <MapTrifold className="w-6 h-6" />
          </SidenavItem>
          <SidenavItem href="/locations">
            <MapPin className="w-6 h-6" />
          </SidenavItem>
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <Divider />
        <div className="h-10 w-10 rounded-full bg-slate-300" />
      </div>
    </nav>
  );
};

export default Sidenav;
