import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export default function GetLocation({ onSelect }) {
  const [latLng, setLatLng] = useState(null);
  
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLatLng({lat, lng});
      onSelect?.(lat, lng);
    },
  });

  if (!latLng) return null;
  return (
    <Marker position={latLng}>
      <Popup>Farm Location</Popup>
    </Marker>
  );
}
