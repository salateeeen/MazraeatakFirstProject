import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export default function OneMarker({ lat, lng }) {
  const map = useMap();
  
  useEffect(() => {
    if (lat !== undefined && lat !== null && lng !== undefined && lng !== null) {
      map.flyTo([lat, lng], 15);
    }
  }, [lat, lng, map]);

  if (lat === undefined || lat === null || lng === undefined || lng === null) {
    return null;
  }
  
  return (
    <Marker position={[lat, lng]}>
      <Popup>Farm Location</Popup>
    </Marker>
  );
}
