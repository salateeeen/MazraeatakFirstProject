import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import OneMarker from "./OneMarker";
import GetLocation from "./GetLocation";
import { useThemeMode } from "@/context/useThemeMode";
import Markers from "./Markers";
import { useMapState } from "../hooks/useMapState";
import FlyToLocation from "./FlyToLocation";

export default function Map({
  className = "",
  isEditable = false,
  zoom = 15,
  markers,
  center,
}) {
  const { themeMode } = useThemeMode();

  const { normalizedMarkers, mapCenter, LIGHT_TILE, DARK_TILE } = useMapState(markers, center);
  
  return (
    <div className={`${styles.container} ${className}`}>
      <MapContainer
        key={`${themeMode === "dark" ? "dark" : "light"}`}
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={zoom}
        className={styles.map}
        boxZoom={true}
      >
        <TileLayer url={themeMode === "dark" ? DARK_TILE : LIGHT_TILE} />

        <FlyToLocation center={mapCenter} zoom={zoom} />

        {isEditable && <GetLocation />}

        {normalizedMarkers.length === 1 && !isEditable && (
          <OneMarker
            lat={normalizedMarkers[0].lat}
            lng={normalizedMarkers[0].lng}
          />
        )}

        {normalizedMarkers.length > 1 && !isEditable && (
          <Markers coordinates={normalizedMarkers} />
        )}
      </MapContainer>
    </div>
  );
}
