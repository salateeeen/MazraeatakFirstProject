import { useMemo } from "react";
import { getCurrentPosition, isObjectCoords, toLatLngObject } from "../utils/handleLocation";

const LIGHT_TILE = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const DARK_TILE = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

const defaultCoords = {
  lat: 38.7223,
  lng: -9.1393,
};;

export function useMapState(markers, center) {
  const currentPos = getCurrentPosition();

  const normalizedMarkers = useMemo(() => {
    if (!Array.isArray(markers)) return [];
    if (Array.isArray(markers[0]) || isObjectCoords(markers[0])) {
      return markers
        .map((marker) => toLatLngObject(marker))
        .filter(Boolean);
    }

    const singleMarker = toLatLngObject(markers);

    return singleMarker ? [singleMarker] : [];
  }, [markers]);



  const mapCenter = useMemo(() => {
    const normalizedCenter = toLatLngObject(center);

    if (normalizedCenter) {
      return normalizedCenter;
    }

    if (normalizedMarkers.length > 0) {
      return normalizedMarkers[0];
    }

    if (currentPos) {
      return currentPos;
    }

    return defaultCoords;
  }, [center, normalizedMarkers, currentPos]);

  return {
    normalizedMarkers,
    mapCenter,
    LIGHT_TILE,
    DARK_TILE,
  };
}