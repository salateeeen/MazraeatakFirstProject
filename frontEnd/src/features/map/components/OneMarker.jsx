import { Marker, Popup } from "react-leaflet";

export default function OneMarker({ lat, lng }) {
  
  return (
    <Marker position={[lat, lng]}>
      <Popup>Farm Location</Popup>
    </Marker>
  );
}
  