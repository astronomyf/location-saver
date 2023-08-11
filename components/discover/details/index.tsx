import { useLoadInitialMarkers } from "@/lib/hooks/map/useLoadInitialMarkers";
import { atom, useAtom, useAtomValue } from "jotai";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { IconArrowLeft, IconX } from "@tabler/icons-react";
import { CircleFlag } from "react-circle-flags";

export const detailOpenAtom = atom<boolean>(false);
export const detailLocationIdAtom = atom<string | null>(null);

const LocationDetails = () => {
  const { data, loading } = useLoadInitialMarkers(false);
  const [open, setOpen] = useAtom(detailOpenAtom);
  const detailLocationId = useAtomValue(detailLocationIdAtom);

  const targetLocation = data.find(
    ({ location }) => location === detailLocationId
  );

  if (!targetLocation) return null;

  // <div className="w-full h-64 relative overflow-hidden">
  //           <Image
  //             src={targetLocation.url}
  //             alt={targetLocation.location}
  //             fill
  //             className="object-cover object-center"
  //           />
  //           {/* <div className="absolute bottom-0 left-0 w-full h-36"></div>
  //         <div className="absolute top-2 left-4">
  //           <div

  //             className="rounded-full bg-black/50 backdrop-blur-sm flex justify-center items-center w-8 h-8 hover:shadow-sm cursor-pointer"
  //           >
  //             <IconX size={20} className="text-white" />
  //           </div>
  //         </div> */}
  //         </div>

  return (
    <Transition
      show={open}
      enter="transform transition duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
      className="w-full h-full flex-col max-w-lg bg-white absolute top-0 right-0 flex z-10 shadow-[-14px_0px_15px_-16px_rgba(0,0,0,0.2)]"
    >
      <div className="w-full h-full relative overflow-hidden">
        <div className="w-full h-fit fixed bg-white z-10 shadow-sm border-b border-slate-200 px-4 py-2">
          <div
            className="flex items-center gap-x-2 hover:opacity-80 cursor-pointer select-none transition-opacity ease-in-out"
            onClick={() => setOpen(false)}
          >
            <IconArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </div>
        </div>
        <div className="w-full h-full overflow-y-scroll pt-[41px]">
          <div className="w-full h-fit bg-slate-50 p-3 grid grid-cols-3 grid-rows-2 grid-flow-col gap-3">
            <div className="w-full h-64 row-span-2 col-span-2 relative overflow-hidden rounded-lg">
              <Image
                src={targetLocation.url}
                alt={targetLocation.location}
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="w-full col-span-1 h-full relative overflow-hidden rounded-lg">
              <Image
                src={targetLocation.url}
                alt={targetLocation.location}
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="w-full col-span-1 h-full relative overflow-hidden rounded-lg">
              <Image
                src={targetLocation.url}
                alt={targetLocation.location}
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="w-full h-fit flex items-center p-3 bg-slate-100 border-y border-slate-200 gap-x-2">
            <CircleFlag countryCode="no" className="w-6 h-6" />
            <h1 className="font-medium text-slate-500">Norway</h1>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default LocationDetails;
