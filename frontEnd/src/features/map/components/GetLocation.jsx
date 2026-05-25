import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

export default function GetLocation() {
  const { setValue, watch } = useFormContext();
  const latLng = watch("coordinates");

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setValue("coordinates", { lat, lng });      
    },
  });

  useEffect(() => {
    if (latLng?.lat && latLng?.lng) {
      map.setView([latLng.lat, latLng.lng], map.getZoom());
    }
  }, [latLng]);

  if (!latLng?.lat || !latLng?.lng) return null;
  return (
    <Marker position={[latLng.lat, latLng.lng]}>
      <Popup>Farm Location</Popup>
    </Marker>
  );
}
