import { fetchFor, getAuthHeaders, toFormData } from "@/services/fetch";
import { BASE_URL as ROOT_URL } from "@/services/apiConfig";

const BASE_URL = `${ROOT_URL}/farms`;

export const fetchFarmById = function (id) { 
    return fetchFor(`${BASE_URL}/${id}`, false)
};

export const fetchFarmAvailability = function (farmId, date) {
    return fetchFor(`${BASE_URL}/${farmId}/availability?date=${date}`);
};

export const fetchFarms = function (filters = "") {
    return fetchFor(`${BASE_URL}?${filters}`);    
};

export const fetchFarmsLocations = function (filters) {
    return fetchFor(`${BASE_URL}/locations?${filters}`);
};

export const fetchFarmsName = function (farmName) {
    return fetchFor(`${BASE_URL}/search?farmName=${farmName}`)
};

export const fetchMyFarms = function () {
    return fetchFor(`${BASE_URL}/my`);
};

export const createFarm = async function (farm) {
        const res = await fetch(`${BASE_URL}/`, {
            method: "POST",
            body: toFormData(farm),
            headers: getAuthHeaders({withContentType: false}),
        });

        if (!res.ok) throw await res.json();;
        return await res.json();
  
};


export const deleteFarm = async (farmId) => {
    try {
        const res = await fetch(`${BASE_URL}/${farmId}`, {
            method: `DELETE`,
            headers: getAuthHeaders(),
        });

        if (!res.ok) throw await res.json();
        return await res.json();

    } catch (err) {
        throw err;
    };
};
