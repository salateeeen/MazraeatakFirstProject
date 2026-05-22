import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import OneMarker from "./OneMarker";
import GetLocation from "./GetLocation";
import { useThemeMode } from "@/context/useThemeMode";
import Markers from "./Markers";
import { useMapState } from "../hooks/useMapState";

export default function Map({
  className = "",
  onSelect,
  isEditable = false,
  markers = [],
  center,
  zoom = 15,
}) {
  const { themeMode } = useThemeMode();

  const { normalizedMarkers, mapCenter, safeCenter, LIGHT_TILE, DARK_TILE } = useMapState(markers, center);

  return (
    <div className={`${styles.container} ${className}`}>
      <MapContainer
        key={`${themeMode === "dark" ? "dark" : "light"}-${safeCenter[0]}-${safeCenter[1]}`}
        center={safeCenter}
        zoom={zoom}
        className={styles.map}
        boxZoom={true}
      >
        <TileLayer url={themeMode === "dark" ? DARK_TILE : LIGHT_TILE} />
        
        {isEditable && <GetLocation onSelect={onSelect} />}
        
        {normalizedMarkers.length === 1 && (
          <OneMarker lat={normalizedMarkers[0][1]} lng={normalizedMarkers[0][0]} />
        )}
        
        {normalizedMarkers.length > 1 && (
          <Markers coordinates={normalizedMarkers} />
        )}
      </MapContainer>
    </div>
  );
}
