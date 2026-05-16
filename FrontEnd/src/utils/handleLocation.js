const defaultCoords = [32.0668048, 36.1101954];

export function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition((position) => {
    const { coords } = position;
    const { latitude: lat, longitude: lng } = coords;
    localStorage.setItem(`coordinates`, JSON.stringify([lat, lng]));
  });
}


export function getStoredCoordinates() {
  try {
    const stored = localStorage.getItem("coordinates");
    if (!stored) return defaultCoords;
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length >= 2 && typeof parsed[0] === 'number' && typeof parsed[1] === 'number') {
      return parsed;
    }
    return defaultCoords;
  } catch (error) {
    console.error("Error parsing coordinates from localStorage:", error);
    return defaultCoords;
  }
};
