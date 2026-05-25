export const getCityInfo = async function (coords) {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords?.lat}&lon=${coords?.lng}&format=json`)
    const data = await res.json();
    return data
} 