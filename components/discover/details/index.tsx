import Card from "@/components/ui/card";
import { useLoadInitialMarkers } from "@/lib/hooks/map/useLoadInitialMarkers";

const LocationDetails = () => {
  const { data, loading } = useLoadInitialMarkers();

  console.log("data", data);

  return (
    <div className="flex flex-col max-h-[calc(100vh-121px)] gap-y-4 pt-2">
      <h1 className="text-xl font-semibold">Discover popular destinations</h1>
      <div className="grid grid-cols-2 items-center gap-4 pb-8">
        {data.map(({ location, url }) => (
          <Card key={location} title={location} imageUrl={url} />
        ))}
      </div>
    </div>
  );
};

export default LocationDetails;
