import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import OneMarker from "./OneMarker";
import GetLocation from "./GetLocation";
import { useDarkMode } from "@/context/useDarkModeToggle";
import Markers from "./Markers";
import { getStoredCoordinates } from "@/utils/handleLocation";

export default function Map({
  className = "",
  onSelect,
  isEditable = false,
  markers = [],
  center,
  zoom = 15,
}) {
  const { isDarkMode } = useDarkMode();

  
  const storedCoords = getStoredCoordinates();
  

  let normalizedMarkers = [];
  if (Array.isArray(markers)) {
    if (Array.isArray(markers[0])) {
      normalizedMarkers = markers.filter(m => 
        Array.isArray(m) && m.length >= 2 && 
        m[0] !== null && m[0] !== undefined && 
        m[1] !== null && m[1] !== undefined
      );
    } 
    // If it's a single array [lat, lng]
    else if (markers.length >= 2 && markers[0] !== null && markers[1] !== null) {
      normalizedMarkers = [markers];
    }
  } 
  // If it's an object {lat, lng}
  else if (markers && typeof markers === 'object' && markers.lat !== undefined && markers.lng !== undefined) {
    normalizedMarkers = [[markers.lat, markers.lng]];
  }

  // Determine center with ultimate fallback
  const mapCenter = (center && Array.isArray(center) && center.length >= 2) 
    ? center 
    : (normalizedMarkers.length > 0 ? normalizedMarkers[0] : storedCoords);

  const LIGHT_TILE = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const DARK_TILE = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  // Final safety check for mapCenter to prevent crash on mapCenter[0]
  const safeCenter = (Array.isArray(mapCenter) && mapCenter.length >= 2 && mapCenter[0] !== null) 
    ? mapCenter 
    : defaultCoords;

  return (
    <div className={`${styles.container} ${className}`}>
      <MapContainer
        key={`${isDarkMode ? "dark" : "light"}-${safeCenter[0]}-${safeCenter[1]}`}
        center={safeCenter}
        zoom={zoom}
        className={styles.map}
        boxZoom={true}
      >
        <TileLayer url={isDarkMode ? DARK_TILE : LIGHT_TILE} />
        
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
