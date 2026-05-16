import { fetchFor, getAuthHeaders, toFormData } from "@/services/fetch";
import { BASE_URL as ROOT_URL } from "@/services/apiConfig";

const BASE_URL = `${ROOT_URL}/categories`;


export const fetchCategories = () =>
  fetchFor(`${BASE_URL}`);

export const addCategory = async (data) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { Authorization: getAuthHeaders().Authorization },
    body: toFormData(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const updateCategory = async ({ id, ...data }) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { Authorization: getAuthHeaders().Authorization },
    body: toFormData(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const deleteCategory = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};
