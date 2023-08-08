import { useMapZoomDisabled } from "@/lib/hooks/map/useMapZoomDisabled";
import { useMap } from "react-map-gl/maplibre";
import ButtonMap from "./button-map";
import ChooseMapStyle from "./choose-map-style";
import { IconMinus, IconPlus } from "@tabler/icons-react";

const MapControls = () => {
  const { map } = useMap();

  const { zoomInDisabled, zoomOutDisabled } = useMapZoomDisabled(map);

  if (!map) return null;

  return (
    <div className="w-8 flex flex-col rounded-md shadow-sm">
      <ButtonMap onClick={() => map.zoomIn()} disabled={zoomInDisabled}>
        <IconPlus stroke={1.5} size={20} />
      </ButtonMap>
      <ButtonMap onClick={() => map.zoomOut()} disabled={zoomOutDisabled}>
        <IconMinus stroke={1.5} size={20} />
      </ButtonMap>
      <ChooseMapStyle />
    </div>
  );
};

export default MapControls;
