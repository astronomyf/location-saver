import Map from "@/components/map";

export default function MapPage() {
  return (
    <div className="flex w-full justify-between gap-x-4">
      <div className="bg-background rounded-md flex flex-auto w-3/4 overflow-hidden">
        <Map />
      </div>
      <div className="bg-background rounded-md p-4 flex flex-auto w-1/4">
        <h1>Detail</h1>
      </div>
    </div>
  );
}
