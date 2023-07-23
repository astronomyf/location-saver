import { PushPin } from "@/assets/phosphor-icons";

const MarkerCustom = () => {
  return (
    <div className="w-6 h-6 border-2 border-white rounded-full bg-blue-500 flex items-center justify-center p-1 shadow-md">
      <PushPin weight="fill" className="w-4 h-4 text-white -rotate-45" />
    </div>
  );
};

export default MarkerCustom;
