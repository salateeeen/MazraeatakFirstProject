import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function FlyToLocation({ center, zoom = 15 }) {
  const map = useMap();

  useEffect(() => {
    if (!center) return;

    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();

    const sameLat =
      Math.abs(currentCenter.lat - center.lat) < 0.0001;

    const sameLng =
      Math.abs(currentCenter.lng - center.lng) < 0.0001;

    const sameZoom = currentZoom === zoom;

    if (sameLat && sameLng && sameZoom) return;

    map.flyTo([center.lat, center.lng], zoom, {
      animate: true,
      duration: 1.5,
    });
  }, [center, zoom, map]);

  return null;
}
