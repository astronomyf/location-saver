import Logo from "../logo";
import NavbarItem from "./navbar-item";
import { userAtom } from "@/lib/store/atoms";
import { useAtomValue } from "jotai";
import UserProfile from "../profile/user-profile";
import { Input } from "../ui/input";

const Navbar = () => {
  const user = useAtomValue(userAtom);
  if (!user) return null;

  return (
    <div className="grid w-full px-6 grid-cols-[1fr_minmax(auto,500px)_1fr] grid-rows-1 gap-x-12 py-3 items-center bg-slate-50 border-b border-slate-200">
      <div className="flex items-center gap-x-8">
        <Logo withBackground />
        <div className="flex items-center gap-x-5">
          <NavbarItem href="/">Discover</NavbarItem>
          <NavbarItem href="/locations">Locations</NavbarItem>
          <NavbarItem href="/itinerary">Itineraries</NavbarItem>
        </div>
      </div>
      <Input
        className="rounded-full"
        placeholder="Search any place..."
        containerClassName="rounded-full"
      />
      <div className="flex justify-end w-full">
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default Navbar;
