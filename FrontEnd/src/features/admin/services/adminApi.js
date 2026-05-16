import { fetchFor, getAuthHeaders } from "@/services/fetch";
import { BASE_URL as ROOT_URL } from "@/services/apiConfig";

const BASE_URL = `${ROOT_URL}/admin`;

// Dashboard
export function fetchAdminDashboard() {
  return fetchFor(`${BASE_URL}/dashboard`);
}

// Owners
export const fetchPendingOwners = () => {
  return fetchFor(`${BASE_URL}/pending-owners`);
};

export const approveOwner = async (ownerId) => {
  const res = await fetch(`${BASE_URL}/approve-owner/${ownerId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw await res.json();
  return res.json();
};


export const rejectOwner = async (ownerId) => {
  const res = await fetch(`${BASE_URL}/reject-owner/${ownerId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const fetchAllUsers = () => {
  return fetchFor(`${ROOT_URL}/users`);
};
