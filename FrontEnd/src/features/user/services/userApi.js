import { fetchFor, getAuthHeaders, toFormData } from "@/services/fetch";
import { BASE_URL as ROOT_URL } from "@/services/apiConfig";

const BASE_URL = `${ROOT_URL}/users`;


export const fetchMe = function () {
    return fetchFor(`${BASE_URL}/me`);
}

export const updateUserProfile = async (data) => {
    try {
        const res = await fetch(`${BASE_URL}/me`, {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!res.ok) throw await res.json();
        return await res.json();
    } catch (err) {
        throw err
    }
};

export const updateProfilePicture = async (file) => {
    try {
        const res = await fetch(`${BASE_URL}/me/profile-picture`, {
            method: "PATCH",
            body: toFormData({ profilePicture: file }),
            headers: getAuthHeaders({ withContentType: false }),
        });

        if (!res.ok) throw await res.json();
        return await res.json();
    } catch (err) {
        throw err
    }
};

export const fetchFavorites = function () {
    return fetchFor(`${BASE_URL}/favorites`);
}

export const fetchFavoritesFarms = function (filter) {
    return fetchFor(`${BASE_URL}/favorites-farms?${filter}`);
};

export const addToFavorites = async (farmId) => {
    try {
        const res = await fetch(`${BASE_URL}/favorites/${farmId}`,
            {
                method: "POST",
                headers: getAuthHeaders(),
            }
        );

        if (!res.ok) throw await res.json();
        return await res.json();

    } catch (err) {
        throw err
    };
};