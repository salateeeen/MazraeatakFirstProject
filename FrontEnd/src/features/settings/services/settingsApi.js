import { fetchFor, getAuthHeaders } from "@/services/fetch";
import { BASE_URL as ROOT_URL } from "@/services/apiConfig";

const BASE_URL = `${ROOT_URL}/settings`;

export async function getMySettings() {
  return fetchFor(`${BASE_URL}/me`, true);
}

export async function updateSettingsSection(body) {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export async function resetMySettings() {
  try {
    const res = await fetch(`${BASE_URL}/reset`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
}

