import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export default function Markers({ coordinates }) {
  if (!Array.isArray(coordinates)) return null;
 
  const map = useMap();

  useEffect(() => {
    if (coordinates.length > 0) {
      map.flyTo([coordinates[0][1], coordinates[0][0]], 15);
    }
  }, []);

  return (
    <>
      {coordinates.map((coordinate, index) => (
        <Marker key={index} position={[coordinate[1], coordinate[0]]}>
          <Popup>Farm Location</Popup>
        </Marker>
      ))}
    </>
  );
}
