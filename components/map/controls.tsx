import { Minus, Plus, Stack } from "@/assets/phosphor-icons";
import { useMapZoomDisabled } from "@/lib/hooks/useMapZoomDisabled";
import { useMap } from "react-map-gl/maplibre";
import ButtonMap from "./button-map";
import ChooseMapStyle from "./choose-map-style";

const MapControls = () => {
  const { map } = useMap();

  const { zoomInDisabled, zoomOutDisabled } = useMapZoomDisabled(map);

  if (!map) return null;

  return (
    <div className="w-8 flex flex-col rounded-md shadow-sm">
      <ButtonMap onClick={() => map.zoomIn()} disabled={zoomInDisabled}>
        <Plus className="w-4 h-4" />
      </ButtonMap>
      <ButtonMap onClick={() => map.zoomOut()} disabled={zoomOutDisabled}>
        <Minus className="w-4 h-4" />{" "}
      </ButtonMap>
      <ChooseMapStyle />
    </div>
  );
};

export default MapControls;
