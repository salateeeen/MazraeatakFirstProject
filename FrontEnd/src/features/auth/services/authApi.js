import { fetchFor } from "@/services/fetch";
import { BASE_URL } from "@/services/apiConfig";

const AUTH_URL = `${BASE_URL}/auth`;

import { getNotAuthHeaders } from "@/services/fetch"

export const login = async (userInfo) => {

    const res = await fetch(`${AUTH_URL}/login`,
        {
            method: "POST",
            headers: getNotAuthHeaders(),
            body: JSON.stringify(userInfo)
        }
    );

    if (!res.ok) throw await res.json();
    return await res.json();
};

export const signup = async (userInfo) => {
    const res = await fetch(`${AUTH_URL}/signup`,
        {
            method: "POST",
            headers: getNotAuthHeaders(),
            body: JSON.stringify(userInfo)
        }
    );

    if (!res.ok) throw await res.json();

    return await res.json();
};

export async function requestPasswordReset(email) {
 
        const res = await fetch(`${AUTH_URL}/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!res.ok) {
            throw new Error("Something went wrong");
        }
        return res.json();
}

export async function verifyResetCode({ email, code }) {
        const res = await fetch(`${AUTH_URL}/verify-code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code }),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || "Invalid verification code");
        }
        return res.json();
}

export async function resetPassword({ email, password }) {
   
        const res = await fetch(`${AUTH_URL}/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw await res.json();
        return await res.json()
     }