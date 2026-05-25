import { Marker, Popup } from "react-leaflet";

export default function Markers({ coordinates }) {
  if (!Array.isArray(coordinates)) return null;

  return (
    <>
      {coordinates.map((coordinate, index) => (
        <Marker key={index} position={[coordinate.lat, coordinate.lng]}>
          <Popup>Farm Location</Popup>
        </Marker>
      ))}
    </>
  );
}
