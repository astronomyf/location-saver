import { User } from "@/types/firestore/user";
import UserIcon from "./user-icon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Divider from "../ui/divider";
import { CreditCard, Gear, MapTrifold, SignOut } from "@/assets/phosphor-icons";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);

      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <UserIcon user={user} />
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-52 p-0">
        <div className="flex flex-col gap-y-1">
          <div className="flex gap-x-2.5 items-center pt-3 px-3">
            <div className="flex flex-col ">
              <h1 className="text-sm font-semibold max-w-[170px] truncate">
                {user.name.split(" ")[0]}
              </h1>
              <p
                className="text-xs text-muted-foreground max-w-[170px] truncate"
                title={user.email}
              >
                {user.email}
              </p>
            </div>
          </div>
          <Divider className="my-2" />
          <div className="flex flex-col gap-y-1.5 px-2">
            <li className="flex items-center cursor-pointer py-1.5 px-2 hover:bg-slate-100 rounded-md transition-colors ease-in-out">
              <MapTrifold
                weight="bold"
                className="w-4 h-4 mr-2.5 text-slate-700"
              />
              <p className="text-slate-700">Map settings</p>
            </li>
            <li className="flex items-center cursor-pointer py-1.5 px-2 hover:bg-slate-100 rounded-md transition-all ease-in-out">
              <Gear weight="bold" className="w-4 h-4 mr-2.5 text-slate-700" />
              <p className="text-slate-700">Profile settings</p>
            </li>
            <li className="flex items-center cursor-pointer py-1.5 px-2 hover:bg-slate-100 rounded-md transition-all ease-in-out">
              <CreditCard
                weight="bold"
                className="w-4 h-4 mr-2.5 text-slate-700"
              />
              <p className="text-slate-700">Subscription</p>{" "}
            </li>
          </div>
          <Divider className="mt-2 mb-1" />
          <div className="px-2 pb-2.5">
            <div
              onClick={handleSignOut}
              className="flex items-center cursor-pointer py-1.5 px-2 hover:bg-red-50 rounded-md transition-all ease-in-out"
            >
              <SignOut weight="bold" className="w-4 h-4 mr-2.5 text-red-500" />
              <p className="text-red-500">Log out</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
