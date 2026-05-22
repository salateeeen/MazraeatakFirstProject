import { getStoredCoordinates } from "@/utils/handleLocation";
import { useMemo } from "react";

const defaultCoords = [31.9539, 35.9106];

export function useMapState(markers = [], center) {
  const storedCoords = getStoredCoordinates();

  const normalizedMarkers = useMemo(() => {
    if (Array.isArray(markers)) {
      if (Array.isArray(markers[0])) {
        return markers.filter(
          (m) =>
            Array.isArray(m) &&
            m.length >= 2 &&
            m[0] != null &&
            m[1] != null
        );
      }

      if (
        markers.length >= 2 &&
        markers[0] != null &&
        markers[1] != null
      ) {
        return [markers];
      }
    }

    return [];
  }, [markers]);

  const mapCenter = useMemo(() => {
    if (
      Array.isArray(center) &&
      center.length >= 2 &&
      center[0] != null &&
      center[1] != null
    ) {
      return center;
    }

    if (normalizedMarkers.length > 0) {
      return normalizedMarkers[0];
    }

    return storedCoords || defaultCoords;
  }, [center, normalizedMarkers, storedCoords]);

  const safeCenter = useMemo(() => {
    if (
      Array.isArray(mapCenter) &&
      mapCenter.length >= 2 &&
      mapCenter[0] != null &&
      mapCenter[1] != null
    ) {
      return mapCenter;
    }

    return defaultCoords;
  }, [mapCenter]);


  const LIGHT_TILE = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const DARK_TILE = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return {
    normalizedMarkers,
    mapCenter,
    safeCenter,
    LIGHT_TILE,
    DARK_TILE,
  };
}