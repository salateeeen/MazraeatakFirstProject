export function getAuthHeaders({ withContentType = true } = {}) {
    const token = localStorage.getItem("token");

    return {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(withContentType && { "Content-Type": "application/json" }),
    };
}

export function getNotAuthHeaders({ withContentType = true } = {}) {
    return {
        ...(withContentType && { "Content-Type": "application/json" }),
    };
}

export const toFormData = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value == null) return;

        if (value instanceof File) {
            formData.append(key, value);
            return;
        }

        if (Array.isArray(value)) {
            if (value.length && value.every(item => item instanceof File)) {
                value.forEach(file => {
                    formData.append(key, file);
                });
                return;
            }
        }

        if (key === "coordinates" || key === "location") {
            formData.append("coordinates", JSON.stringify([value.lng, value.lat]));
            return;
        }

        if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
            return;
        }
        
        if (typeof value === "object") {
            formData.append(key, JSON.stringify(value));
            return;
        }
        formData.append(key, value);
    });

    return formData;
};


export const fetchFor = async function (url, auth = true) {
    try {
        const res = await fetch(url, {
            headers: auth ? getAuthHeaders() : getNotAuthHeaders(),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        return data

    } catch (err) {
        throw err;
    }
}