
export function setCurrentPosition() {
   navigator.geolocation.getCurrentPosition((position) => {
    const { coords } = position;
    const { latitude: lat, longitude: lng } = coords;
    localStorage.setItem(`currentLocation`, JSON.stringify({ lat, lng }));
  });
}

export function getCurrentPosition() {
  return JSON.parse(localStorage.getItem(`currentLocation`));
}

export const isObjectCoords = (coords) => {
  return (
    coords &&
    typeof coords === "object" &&
    coords.lat != null &&
    coords.lng != null
  );
};

export const isArrayCoords = (coords) => {
  return (
    Array.isArray(coords) &&
    coords.length >= 2 &&
    coords[0] != null &&
    coords[1] != null
  );
};

export const toLatLngObject = (coords) => {

  if (isObjectCoords(coords)) {
    return {
      lat: Number(coords.lat),
      lng: Number(coords.lng),
    };
  }

  if (isArrayCoords(coords)) {
    const val0 = Number(coords[0]);
    const val1 = Number(coords[1]);

    if (val0 > 34 && val0 < 40 && val1 > 29 && val1 < 34) {
      return {
        lat: val1,
        lng: val0,
      };
    }

    if (val1 > val0) {
      return {
        lat: val0,
        lng: val1,
      };
    }

    return {
      lat: val0,
      lng: val1,
    };
  }

  return null;
};



