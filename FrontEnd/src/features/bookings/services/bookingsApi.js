import { fetchFor, getAuthHeaders } from "@/services/fetch";
import { BASE_URL as ROOT_URL } from "@/services/apiConfig";

const BASE_URL = `${ROOT_URL}/bookings`;

export const fetchBookings = function () {
    return fetchFor(`${BASE_URL}/user-bookings`);
}

export const fetchOwnerBookings = function () {
    return fetchFor(`${BASE_URL}/owner-bookings`);
}



export const createBooking = function (farmId) {
    return async function (bookingData) {
            const res = await fetch(`${BASE_URL}/create-booking/${farmId}`, {
                method: `POST`,
                headers: getAuthHeaders(),
                body: JSON.stringify(bookingData)
            });

            if (!res.ok) throw await res.json();
            return await res.json();
    }
}


export const cancleBooking = async (bookingId) => {
        const res = await fetch(`${BASE_URL}/cancel-booking/${bookingId}`, {
            method: `PATCH`,
            headers: getAuthHeaders(),
        });

        if (!res.ok) throw await res.json();
        return await res.json();
};

export const confirmBooking = async (bookingId) => {
        const res = await fetch(`${BASE_URL}/confirm-booking/${bookingId}`, {
            method: `PATCH`,
            headers: getAuthHeaders(),
        });

        if (!res.ok) throw await res.json();
        return await res.json();
};