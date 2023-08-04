import { User } from "@/types/firestore";
import Logo from "../logo";
import NavbarItem from "./navbar-item";
import { userAtom } from "@/lib/store/atoms";
import { useAtomValue } from "jotai";
import UserProfile from "../profile/user-profile";

const Navbar = () => {
  const user = useAtomValue(userAtom);
  if (!user) return null;

  return (
    <div className="flex w-full px-6 py-3 items-center justify-between bg-slate-50 border-b border-slate-200">
      <div className="flex items-center gap-x-8">
        <Logo withBackground />
        <div className="flex items-center gap-x-5">
          <NavbarItem href="/">Discover</NavbarItem>
          <NavbarItem href="/locations">Locations</NavbarItem>
          <NavbarItem href="/itinerary">Itineraries</NavbarItem>
        </div>
      </div>
      <UserProfile user={user} />
    </div>
  );
};

export default Navbar;
