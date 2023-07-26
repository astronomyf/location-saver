import { User } from "@/types/firestore/user";
import UserIcon from "./user-icon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Divider from "../ui/divider";
import { CreditCard, Gear, MapTrifold, SignOut } from "@/assets/phosphor-icons";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <UserIcon user={user} />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="end"
        sideOffset={10}
        className="w-52 p-0"
      >
        <div className="flex flex-col gap-y-1">
          <div className="flex gap-x-2.5 items-center pt-3 px-3">
            <UserIcon className="w-8 h-8" textClassName="text-md" user={user} />
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold">{user.name}</h1>
              <p className="text-xs text-muted-foreground max-w-[190px] truncate">
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
            <div className="flex items-center cursor-pointer py-1.5 px-2 hover:bg-slate-100 rounded-md transition-all ease-in-out">
              <SignOut
                weight="bold"
                className="w-4 h-4 mr-2.5 text-slate-700"
              />
              <p className="text-slate-700">Log out</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
