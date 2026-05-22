import { fetchFor, getAuthHeaders } from "@/services/fetch";
import { BASE_URL as ROOT_URL } from "@/services/apiConfig";

const BASE_URL = `${ROOT_URL}/owners`;

export const fetchOwnerDashboard = () => {
  return fetchFor(`${BASE_URL}/dashboard`);
}

export const fetchMyOwnerRequest = () => {
  return fetchFor(`${BASE_URL}/request`);
}

export const requestOwner = async (data) => {
  const res = await fetch(`${BASE_URL}/request-owner`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json();
  return res.json();
};