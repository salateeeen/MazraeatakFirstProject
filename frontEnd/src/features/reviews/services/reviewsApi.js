import { fetchFor, getAuthHeaders } from "@/services/fetch";
import { BASE_URL as ROOT_URL } from "@/services/apiConfig";

const BASE_URL = `${ROOT_URL}/reviews`;

export const fetchReviews = function (farmId) {
    return fetchFor(`${BASE_URL}/farm/${farmId}`, false);
};

export const createReview = async function (farmId, data) {
    try {
        const res = await fetch(`${BASE_URL}/${farmId}`, {
            method: `POST`,
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });

        if (!res.ok) throw await res.json();

        return await res.json();

    } catch (err) {
        throw err
    }
}