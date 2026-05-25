// services/notificationAPI.js
import { fetchFor, getAuthHeaders } from "@/services/fetch";
import { BASE_URL as ROOT_URL } from "@/services/apiConfig";

const BASE_URL = `${ROOT_URL}/notifications`;

export const fetchNotifications = (query = "") => {
  return fetchFor(`${BASE_URL}/${query ? `?${query}` : ""}`);
};


export const markNotificationAsRead = async (notificationId) => {
  const res = await fetch(`${BASE_URL}/${notificationId}/read`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw await res.json();
  return await res.json();
};

export const deleteNotification = async (notificationId) => {
    const res = await fetch(`${BASE_URL}/${notificationId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw await res.json();
    return await res.json();
};